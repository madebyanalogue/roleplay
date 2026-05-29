<template>
  <div class="portfolio-image-container portfolio-video-block-inner">
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
            :width="block.poster.asset.metadata?.dimensions?.width"
            :height="block.poster.asset.metadata?.dimensions?.height"
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
      />
      <PlyrPlayer
        v-else-if="activated && block.video?.asset?.url"
        :key="`video-mp4-${block._key || 'block'}-${block.video.asset.url}`"
        type="html5"
        :src="block.video.asset.url"
        :autoplay="true"
        :muted="false"
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

const isBackground = computed(() => props.block?.playbackMode !== 'interactive')

const vimeoId = computed(() => {
  if (props.block?.videoSource !== 'vimeo') return ''
  return parseVimeoId(props.block?.videoVimeo) || ''
})

const vimeoBackgroundUrl = computed(() => {
  if (!vimeoId.value) return ''
  return `https://player.vimeo.com/video/${vimeoId.value}?background=1&autoplay=1&muted=1&loop=1`
})
</script>

<style scoped>
.portfolio-video-block-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: 0;
  pointer-events: none;
}
</style>
