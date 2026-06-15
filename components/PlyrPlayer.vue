<template>
  <div
    class="plyr-player-wrap"
    :class="{
      'plyr-player-wrap--ready': isReady,
      'plyr-player-wrap--contact': variant === 'contact',
    }"
  >
    <video
      v-if="type === 'html5'"
      ref="mediaEl"
      class="plyr-player-video"
      :src="src"
      playsinline
    />
    <div
      v-else-if="type === 'vimeo' && vimeoId"
      ref="mediaEl"
      class="plyr-player-vimeo"
      data-plyr-provider="vimeo"
      :data-plyr-embed-id="vimeoId"
    />

    <button
      v-if="variant === 'contact' && isReady && !isPlaying"
      type="button"
      class="portfolio-hear-btn gap-bounce-hover plyr-contact-play fluid-type mono lavender"
      style="--desktop: 18; --mobile: 14;"
      @click="playFromContactButton"
    >
      <span>Play</span>
      <svg
        class="plyr-contact-play-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M4 2.5v11L13 8L4 2.5z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import 'plyr/css'

const props = defineProps({
  /** html5 = uploaded file / mp4 URL; vimeo = numeric embed id */
  type: {
    type: String,
    required: true,
    validator: (v) => v === 'html5' || v === 'vimeo',
  },
  src: {
    type: String,
    default: '',
  },
  vimeoId: {
    type: String,
    default: '',
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => v === 'default' || v === 'contact',
  },
  fill: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['ready'])

const mediaEl = ref(null)
const isReady = ref(false)
const isPlaying = ref(false)
let player = null

const defaultControls = [
  'play-large',
  'play',
  'progress',
  'current-time',
  'duration',
  'mute',
  'volume',
  'fullscreen',
]

function getControls() {
  if (props.variant === 'contact') {
    return ['progress', 'fullscreen']
  }
  return defaultControls
}

function syncPlayingState() {
  if (!player) {
    isPlaying.value = false
    return
  }
  isPlaying.value = !player.paused && !player.ended
}

function playFromContactButton() {
  player?.play().catch(() => {})
}

async function setupPlyr() {
  if (import.meta.server) return
  isReady.value = false
  isPlaying.value = false
  await nextTick()
  const el = mediaEl.value
  if (!el) return

  if (props.type === 'html5' && !props.src) return
  if (props.type === 'vimeo' && !props.vimeoId) return

  const { default: Plyr } = await import('plyr')

  player?.destroy()
  player = null

  player = new Plyr(el, {
    controls: getControls(),
    ratio: props.fill || props.variant === 'contact' ? null : '16:9',
    autoplay: props.autoplay,
    muted: props.muted,
    hideControls: props.variant === 'contact' ? false : true,
    clickToPlay: true,
    fullscreen: { enabled: true, iosNative: true },
    vimeo: {
      byline: false,
      portrait: false,
      title: false,
      speed: true,
      transparent: false,
    },
  })

  player.on('ready', () => {
    isReady.value = true
    syncPlayingState()
    if (props.autoplay) {
      player.muted = props.muted
      if (!props.muted) {
        player.volume = 1
      }
      player.play().catch(() => {})
    }
    emit('ready')
  })

  player.on('play', syncPlayingState)
  player.on('pause', syncPlayingState)
  player.on('ended', syncPlayingState)
}

function teardown() {
  player?.destroy()
  player = null
  isReady.value = false
  isPlaying.value = false
}

watch(
  () => [props.type, props.src, props.vimeoId, props.autoplay, props.muted, props.variant, props.fill],
  () => {
    setupPlyr()
  },
  { flush: 'post' },
)

onMounted(() => {
  setupPlyr()
})

onBeforeUnmount(() => {
  teardown()
})
</script>

<style scoped>
.plyr-player-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease-in;
}

.plyr-player-wrap--ready {
  opacity: 1;
}

.plyr-player-wrap :deep(.plyr) {
  width: 100%;
  height: 100%;
}

.plyr-player-wrap :deep(.plyr__video-wrapper) {
  height: 100%;
}

.plyr-player-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plyr-player-vimeo {
  width: 100%;
  height: 100%;
  min-height: 180px;
}

.plyr-contact-play {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 4;
}

.plyr-contact-play-icon {
  flex-shrink: 0;
  display: block;
  color: currentColor;
  margin:0 -4px;
}

.plyr-player-wrap--contact :deep(.plyr),
.plyr-player-wrap--contact :deep(.plyr__video-wrapper),
.plyr-player-wrap--contact :deep(video),
.plyr-player-wrap--contact :deep(iframe) {
  cursor: pointer;
}

.plyr-player-wrap--contact :deep(.plyr__control--overlaid),
.plyr-player-wrap--contact :deep([data-plyr='play']),
.plyr-player-wrap--contact :deep(.plyr__time),
.plyr-player-wrap--contact :deep(.plyr__volume),
.plyr-player-wrap--contact :deep(.plyr__menu) {
  display: none !important;
}

.plyr-player-wrap--contact :deep(.plyr.plyr--paused .plyr__controls),
.plyr-player-wrap--contact :deep(.plyr.plyr--stopped .plyr__controls) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.plyr-player-wrap--contact :deep(.plyr.plyr--playing .plyr__controls) {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.plyr-player-wrap--contact :deep(.plyr__controls) {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  background: linear-gradient(transparent, rgb(0 0 0 / 45%));
}

.plyr-player-wrap--contact :deep(.plyr__progress__container) {
  flex: 1;
  margin: 0;
}

.plyr-player-wrap--contact :deep([data-plyr='fullscreen']) {
  flex-shrink: 0;
  margin-left: 8px;
}
</style>
