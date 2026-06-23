<template>
  <PortfolioGallery
    v-if="columnType === 'gallery' && images && images.length > 0"
    :images="images"
    :timing="timing || 1000"
    :alt="alt"
    :click-zoom="clickZoom"
  />
  <div
    v-else-if="columnType === 'image' && image?.asset"
    v-bind="clickZoom ? { 'data-click-zoom': '' } : {}"
    class="portfolio-image-container"
    :style="getImageAspectRatio(image.asset)"
  >
    <NuxtImg
      :src="image.asset.url || ''"
      :alt="alt"
      fit="cover"
      :width="image.asset.metadata?.dimensions?.width"
      :height="image.asset.metadata?.dimensions?.height"
      class="portfolio-image"
      @load="emit('image-load')"
    />
  </div>
  <div
    v-else-if="columnType === 'video' && hasVideo"
    class="portfolio-image-container portfolio-two-column-video-container"
    :class="{ 'portfolio-two-column-video-container--vimeo': !!vimeoId }"
    :style="videoContainerStyle"
  >
    <iframe
      v-if="vimeoId"
      :src="vimeoBackgroundUrl"
      class="portfolio-two-column-vimeo"
      :title="`${alt} background video`"
      allow="autoplay; fullscreen; picture-in-picture"
      loading="lazy"
    />
    <video
      v-else-if="video?.asset?.url"
      autoplay
      muted
      loop
      playsinline
      class="portfolio-two-column-video"
    >
      <source
        :src="video.asset.url"
        :type="videoMimeTypeFromUrl(video.asset.url)"
      >
    </video>
  </div>
</template>

<script setup>
const props = defineProps({
  columnType: {
    type: String,
    default: 'image',
  },
  image: {
    type: Object,
    default: null,
  },
  images: {
    type: Array,
    default: () => [],
  },
  timing: {
    type: Number,
    default: 1000,
  },
  videoSource: {
    type: String,
    default: 'file',
  },
  video: {
    type: Object,
    default: null,
  },
  videoVimeo: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  clickZoom: {
    type: Boolean,
    default: true,
  },
  getImageAspectRatio: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['image-load'])

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

const vimeoId = computed(() => {
  if (props.columnType !== 'video' || props.videoSource !== 'vimeo') return ''
  return parseVimeoId(props.videoVimeo) || ''
})

const vimeoBackgroundUrl = computed(() => {
  if (!vimeoId.value) return ''
  return `https://player.vimeo.com/video/${vimeoId.value}?background=1&autoplay=1&muted=1&loop=1`
})

const hasVideo = computed(() => {
  if (props.columnType !== 'video') return false
  if (vimeoId.value) return true
  return !!props.video?.asset?.url
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

const videoContainerStyle = computed(() => {
  if (!vimeoId.value || !vimeoAspectRatio.value) return {}
  return { '--portfolio-two-column-video-aspect': vimeoAspectRatio.value }
})
</script>

<style scoped>
.portfolio-two-column-video-container {
  min-height: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
}

.portfolio-two-column-video-container--vimeo {
  aspect-ratio: var(--portfolio-two-column-video-aspect, 16 / 9);
}

.portfolio-two-column-video,
.portfolio-two-column-vimeo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: 0;
  pointer-events: none;
}

@media (max-width: 999px) {
  .portfolio-two-column-video-container {
    width: 100%;
    max-width: 100%;
    aspect-ratio: unset;
    min-height: 0;
    height: auto;
  }

  .portfolio-two-column-video-container--vimeo {
    aspect-ratio: var(--portfolio-two-column-video-aspect, 16 / 9);
    position: relative;
    width: 100%;
  }

  .portfolio-two-column-video {
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
</style>
