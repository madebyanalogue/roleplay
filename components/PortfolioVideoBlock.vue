<template>
  <div
    class="portfolio-image-container portfolio-video-block-inner"
    :class="{
      'portfolio-video-block-inner--natural-mobile': useNaturalMobileFileRatio,
      'portfolio-video-block-inner--natural-mobile-vimeo': useNaturalMobileVimeoRatio,
    }"
    :style="containerAspectStyle"
  >
    <template v-if="isBackground">
      <iframe
        v-if="vimeoId"
        :src="vimeoBackgroundUrl"
        class="portfolio-video-block-bg"
        :title="`${alt} background video`"
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
      />
      <video
        v-else-if="block.video?.asset?.url"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        class="portfolio-video-block-bg"
      >
        <source
          :src="block.video.asset.url"
          :type="videoMimeTypeFromUrl(block.video.asset.url)"
        >
      </video>
    </template>
    <template v-else>
      <Transition name="portfolio-video-fade">
        <button
          v-if="!activated"
          type="button"
          class="portfolio-video-cta"
          @click="activated = true"
        >
          <NuxtImg
            v-if="block.poster?.asset?.url"
            :src="block.poster.asset.url"
            :alt="`${alt} video poster`"
            fit="cover"
            class="portfolio-video-poster"
            @load="emit('image-load')"
          />
          <span class="portfolio-video-cta__play" aria-hidden="true">Play</span>
          <span class="sr-only">Play video with sound</span>
        </button>
      </Transition>
      <PlyrPlayer
        v-if="activated && vimeoId"
        :key="`video-vimeo-${block._key || 'block'}-${vimeoId}`"
        type="vimeo"
        :vimeo-id="vimeoId"
        :autoplay="true"
        :muted="false"
        fill
      />
      <PlyrPlayer
        v-else-if="activated && block.video?.asset?.url"
        :key="`video-mp4-${block._key || 'block'}-${block.video.asset.url}`"
        type="html5"
        :src="block.video.asset.url"
        :autoplay="true"
        :muted="false"
        fill
      />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['image-load'])

const activated = ref(false)

watch(
  () => props.block?._key,
  () => {
    activated.value = false
  },
)

function parseVimeoId(value) {
  const s = String(value || '').trim()
  if (!s) return null
  if (/^\d+$/.test(s)) return s
  let match = s.match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  if (match) return match[1]
  match = s.match(/player\.vimeo\.com\/video\/(\d+)/i)
  return match ? match[1] : null
}

function videoMimeTypeFromUrl(url) {
  if (!url || typeof url !== 'string') return 'video/mp4'
  const lower = url.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

function aspectRatioFromAsset(asset) {
  if (!asset?.metadata?.dimensions) return null
  const { width, height, aspectRatio } = asset.metadata.dimensions
  if (width && height) return `${width} / ${height}`
  if (aspectRatio) return `${aspectRatio}`
  return null
}

const isBackground = computed(() => props.block?.playbackMode !== 'interactive')

const vimeoId = computed(() => {
  if (props.block?.videoSource !== 'vimeo') return ''
  return parseVimeoId(props.block?.videoVimeo) || ''
})

const vimeoAspectRatio = ref(null)

watch(
  vimeoId,
  async (id) => {
    vimeoAspectRatio.value = null
    if (!id || !import.meta.client) return
    try {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}`,
      )
      if (!response.ok) return
      const data = await response.json()
      const { width, height } = data
      if (width > 0 && height > 0) {
        vimeoAspectRatio.value = `${width} / ${height}`
      }
    } catch {
      // ignore
    }
  },
  { immediate: true },
)

const vimeoBackgroundUrl = computed(() => {
  if (!vimeoId.value) return ''
  return `https://player.vimeo.com/video/${vimeoId.value}?background=1&autoplay=1&muted=1&loop=1`
})

const useNaturalMobileFileRatio = computed(
  () => isBackground.value && !vimeoId.value && !!props.block?.video?.asset?.url,
)

const useNaturalMobileVimeoRatio = computed(
  () => isBackground.value && !!vimeoId.value,
)

const containerAspectStyle = computed(() => {
  const posterRatio = aspectRatioFromAsset(props.block?.poster?.asset)
  const vimeoRatio = vimeoAspectRatio.value

  if (props.block?.playbackMode === 'interactive' && posterRatio) {
    return {
      '--portfolio-video-aspect': posterRatio,
      '--portfolio-video-aspect-mobile': posterRatio,
    }
  }

  const desktopAspect = vimeoId.value && vimeoRatio ? vimeoRatio : '16 / 9'
  const mobileAspect = vimeoId.value
    ? (vimeoRatio || posterRatio || '16 / 9')
    : (posterRatio || '16 / 9')

  return {
    '--portfolio-video-aspect': desktopAspect,
    '--portfolio-video-aspect-mobile': mobileAspect,
  }
})
</script>

<style scoped>
.portfolio-video-block-inner {
  width: 100%;
}

@media (min-width: 1000px) {
  .portfolio-video-block-inner {
    aspect-ratio: var(--portfolio-video-aspect, 16 / 9);
  }
}

@media (max-width: 999px) {
  .portfolio-video-block-inner:not(.portfolio-video-block-inner--natural-mobile):not(.portfolio-video-block-inner--natural-mobile-vimeo) {
    aspect-ratio: var(--portfolio-video-aspect-mobile, var(--portfolio-video-aspect, 16 / 9));
  }

  .portfolio-video-block-inner--natural-mobile,
  .portfolio-video-block-inner--natural-mobile-vimeo {
    width: 100%;
    max-width: 100%;
  }

  .portfolio-video-block-inner--natural-mobile {
    aspect-ratio: unset;
  }

  .portfolio-video-block-inner--natural-mobile-vimeo {
    aspect-ratio: var(--portfolio-video-aspect-mobile, 16 / 9);
    position: relative;
    height: auto;
  }

  .portfolio-video-block-inner--natural-mobile video.portfolio-video-block-bg {
    position: relative;
    inset: unset;
    top: auto;
    left: auto;
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: unset;
  }
}

.portfolio-video-block-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
  pointer-events: none;
}

video.portfolio-video-block-bg {
  object-fit: cover;
}

.portfolio-video-cta {
  position: absolute;
  inset: 0;
  z-index: 2;
  border: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: #000;
  color: #fff;
}

.portfolio-video-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.portfolio-video-cta__play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 6.5rem;
  min-height: 3.25rem;
  border-radius: 999px;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.portfolio-video-fade-enter-active,
.portfolio-video-fade-leave-active {
  transition: opacity 0.35s ease;
}

.portfolio-video-fade-enter-from,
.portfolio-video-fade-leave-to {
  opacity: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.portfolio-video-block-inner :deep(.plyr-player-wrap) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.portfolio-video-block-inner :deep(.plyr),
.portfolio-video-block-inner :deep(.plyr__video-wrapper),
.portfolio-video-block-inner :deep(.plyr__video-embed) {
  width: 100%;
  height: 100%;
}

.portfolio-video-block-inner :deep(.plyr video),
.portfolio-video-block-inner :deep(.plyr iframe) {
  object-fit: cover;
}
</style>
