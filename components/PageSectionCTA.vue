<template>
  <section class="cta-section" :class="{ 'has--video': hasVideo }">
    <video
      v-if="hasVideo"
      class="cta-section__bg-video"
      autoplay
      muted
      playsinline
      loop
    >
      <source :src="videoUrl" :type="videoMimeType">
    </video>
    <div v-if="hasVideo" class="cta-section__overlay" />
    <div class="cta-section__inner gap-3">
      <!-- <div v-if="section.ctaTitle" class="h1">{{ section.ctaTitle }}</div> -->
      <div v-if="section.ctaSubtitle?.length" class="cta-section__subtitle">
        <SanityBlocks :blocks="section.ctaSubtitle" />
      </div>
      <div class="cta-section__buttons pad-1 pad-top">
        <Button
          v-if="linkUrl && section.ctaButtonText"
          :to="linkUrl"
        >
          {{ section.ctaButtonText }}
        </Button>
      </div>

    </div>
    <div class="top-right z-index-1"><div class="triangle triangle--top-left"></div></div>
  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const linkUrl = computed(() => {
  const link = props.section?.ctaLink
  if (!link?.slug?.current) return null
  return link.slug.current === 'home' ? '/' : `/${link.slug.current}`
})

const videoUrl = computed(() => props.section?.ctaBackgroundVideo?.asset?.url || '')

// Set client-side only to avoid hydration mismatch (server may not have asset resolved)
const hasVideo = ref(false)
onMounted(() => {
  hasVideo.value = !!videoUrl.value
})

const videoMimeType = computed(() => {
  const url = videoUrl.value
  if (!url) return 'video/mp4'
  return url.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4'
})

</script>

<style scoped>
.cta-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--unit-grid) * 10);
  overflow: hidden;
}

.cta-section.has--video {
  color: var(--white);
}

.cta-section__bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Force h3 typography regardless of block style (avoids hydration mismatch) */
.cta-section__subtitle :deep(.sanity-block) {
  font-size: 2.5em;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-weight: 500;
  margin: 0;
  white-space: pre;
}
.cta-section__overlay {
  position: absolute;
  inset: 0;
  background-color: color-mix(in srgb, #151515 48%, transparent);
  z-index: 1;
}

.cta-section__inner {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>