<template>
  <video
    v-if="showDesktopVideo"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    :class="[imageClass, hasSeparateMobileThumbnail ? 'is-desktop-archive-img' : '']"
  >
    <source
      :src="desktopVideoUrl"
      type="video/mp4"
    >
  </video>
  <NuxtImg
    v-else-if="showDesktopImage"
    :src="project.featuredImage.asset.url || ''"
    alt=""
    fit="cover"
    :class="[imageClass, hasSeparateMobileThumbnail ? 'is-desktop-archive-img' : '']"
    :width="project.featuredImage.asset.metadata?.dimensions?.width"
    :height="project.featuredImage.asset.metadata?.dimensions?.height"
  />

  <video
    v-if="showMobileVideo"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    :class="[imageClass, 'is-mobile-archive-img']"
  >
    <source
      :src="mobileVideoUrl"
      type="video/mp4"
    >
  </video>
  <NuxtImg
    v-else-if="showMobileImage"
    :src="mobileImageUrl"
    alt=""
    fit="cover"
    :class="[imageClass, 'is-mobile-archive-img']"
    :width="mobileImageWidth"
    :height="mobileImageHeight"
  />
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  imageClass: {
    type: String,
    default: 'portfolio-thumbnail-media',
  },
})

function effectiveMobileMediaType(project) {
  const mobileType = project?.thumbnailMediaTypeMobile
  if (!mobileType || mobileType === 'inherit') {
    return project?.thumbnailMediaType || 'image'
  }
  return mobileType
}

const desktopMediaType = computed(
  () => props.project?.thumbnailMediaType || 'image',
)

const mobileMediaType = computed(
  () => effectiveMobileMediaType(props.project),
)

const desktopVideoUrl = computed(
  () => props.project?.featuredVideo?.asset?.url || '',
)

const mobileVideoUrl = computed(() => {
  if (mobileMediaType.value !== 'video') return ''
  return props.project?.featuredVideoMobile?.asset?.url || desktopVideoUrl.value
})

const mobileImageUrl = computed(() => {
  if (mobileMediaType.value !== 'image') return ''
  return props.project?.featuredImageMobile?.asset?.url
    || props.project?.featuredImage?.asset?.url
    || ''
})

const mobileImageWidth = computed(
  () =>
    props.project?.featuredImageMobile?.asset?.metadata?.dimensions?.width
    || props.project?.featuredImage?.asset?.metadata?.dimensions?.width,
)

const mobileImageHeight = computed(
  () =>
    props.project?.featuredImageMobile?.asset?.metadata?.dimensions?.height
    || props.project?.featuredImage?.asset?.metadata?.dimensions?.height,
)

const hasSeparateMobileThumbnail = computed(() => {
  if (mobileMediaType.value !== desktopMediaType.value) return true
  if (mobileMediaType.value === 'video') {
    return !!props.project?.featuredVideoMobile?.asset?.url
  }
  return !!props.project?.featuredImageMobile?.asset
})

const showDesktopVideo = computed(
  () => desktopMediaType.value === 'video' && !!desktopVideoUrl.value,
)

const showDesktopImage = computed(
  () => desktopMediaType.value === 'image' && !!props.project?.featuredImage?.asset,
)

const showMobileVideo = computed(
  () =>
    hasSeparateMobileThumbnail.value
    && mobileMediaType.value === 'video'
    && !!mobileVideoUrl.value,
)

const showMobileImage = computed(
  () =>
    hasSeparateMobileThumbnail.value
    && mobileMediaType.value === 'image'
    && !!mobileImageUrl.value,
)
</script>

<style scoped>
.portfolio-thumbnail-media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  border: 0;
  pointer-events: none;
}
</style>
