<template>
  <section class="two-columns">
    <div class="two-columns__grid">
      <div class="two-columns__left">
        <div v-if="section.twoColumnsSubtitle" class="h6">
          {{ section.twoColumnsSubtitle }}
        </div>
        <div v-if="section.twoColumnsTitle" class="h3 small fractul">
          {{ section.twoColumnsTitle }}
        </div>
        <div v-if="section.twoColumnsDescription?.length" class="two-columns__description subdued">
          <SanityBlocks :blocks="section.twoColumnsDescription" />
        </div>
      </div>
      <div class="two-columns__right">
        <div class="two-columns__media">
          <video
            v-if="isVideo && videoUrl"
            autoplay
            muted
            playsinline
            loop
            class="two-columns__video"
            :poster="imageUrl || undefined"
          >
            <source :src="videoUrl" :type="videoMimeType">
          </video>
          <img
            v-else-if="imageUrl"
            :src="imageUrl"
            alt=""
            class="two-columns__image"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { getImageSrc } = useSanityImage()

const imageUrl = computed(() => {
  const asset = props.section?.twoColumnsImage?.asset
  return asset ? getImageSrc(asset) : ''
})

const videoUrl = computed(() => props.section?.twoColumnsVideo?.asset?.url || '')

const isVideo = computed(() => {
  return props.section?.twoColumnsMediaType === 'video' && videoUrl.value
})

const videoMimeType = computed(() => {
  const url = videoUrl.value
  if (!url) return 'video/mp4'
  return url.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4'
})
</script>

<style scoped>
.two-columns {
  padding: calc(var(--unit-grid) * 1) calc(var(--unit-grid) * 2);
}

.two-columns__grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
}

@media all and (min-width: 1000px) {
  .two-columns__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.two-columns__left {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit-grid) * 0.35);
  padding: 0 calc(var(--unit-grid) * 2) 0 calc(var(--unit-grid) * 1);
}

.two-columns__right {
  position: relative;
  padding: calc(var(--unit-grid) * 1);
}

.two-columns__media {
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.two-columns__image,
.two-columns__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
}
</style>
