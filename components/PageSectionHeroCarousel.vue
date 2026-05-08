<template>
  <section class="hero-carousel">
    <div v-if="hasDesktop" class="hero-carousel__desktop">
      <div class="hero-carousel__column rounded-medium">
        <template v-if="leftActive">
          <video
            v-if="leftActive.mediaType === 'video' && leftActive.video?.asset?.url"
            :key="`left-video-${leftActive._key || leftIndex}`"
            class="hero-carousel__media"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          >
            <source
              :src="leftActive.video.asset.url"
              :type="videoMimeTypeFromUrl(leftActive.video.asset.url)"
            >
          </video>
          <NuxtImg
            v-else-if="leftActive.image?.asset?.url"
            :key="`left-image-${leftActive._key || leftIndex}`"
            :src="leftActive.image.asset.url"
            :alt="section.title || ''"
            class="hero-carousel__media"
            fit="cover"
          />
        </template>
      </div>

      <div v-if="showRightDesktop" class="hero-carousel__column rounded-medium">
        <template v-if="rightActive">
          <video
            v-if="rightActive.mediaType === 'video' && rightActive.video?.asset?.url"
            :key="`right-video-${rightActive._key || rightIndex}`"
            class="hero-carousel__media"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          >
            <source
              :src="rightActive.video.asset.url"
              :type="videoMimeTypeFromUrl(rightActive.video.asset.url)"
            >
          </video>
          <NuxtImg
            v-else-if="rightActive.image?.asset?.url"
            :key="`right-image-${rightActive._key || rightIndex}`"
            :src="rightActive.image.asset.url"
            :alt="section.title || ''"
            class="hero-carousel__media"
            fit="cover"
          />
        </template>
      </div>
    </div>

    <div v-if="mobileActive" class="hero-carousel__mobile rounded-medium">
      <video
        v-if="mobileActive.mediaType === 'video' && mobileActive.video?.asset?.url"
        :key="`mobile-video-${mobileActive._key || mobileIndex}`"
        class="hero-carousel__media"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      >
        <source
          :src="mobileActive.video.asset.url"
          :type="videoMimeTypeFromUrl(mobileActive.video.asset.url)"
        >
      </video>
      <NuxtImg
        v-else-if="mobileActive.image?.asset?.url"
        :key="`mobile-image-${mobileActive._key || mobileIndex}`"
        :src="mobileActive.image.asset.url"
        :alt="section.title || ''"
        class="hero-carousel__media"
        fit="cover"
      />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const leftIndex = ref(0)
const rightIndex = ref(0)
const mobileIndex = ref(0)

let leftInterval = null
let rightInterval = null
let mobileInterval = null

function isValidItem(item) {
  if (!item) return false
  if (item.mediaType === 'video') return Boolean(item.video?.asset?.url)
  return Boolean(item.image?.asset?.url)
}

function parseTimingMs(value, fallback = 4000) {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed < 100) return fallback
  return parsed
}

function videoMimeTypeFromUrl(url) {
  if (!url || typeof url !== 'string') return 'video/mp4'
  const lower = url.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

const leftItems = computed(() => (props.section?.heroCarouselLeft || []).filter(isValidItem))
const rightItems = computed(() => (props.section?.heroCarouselRight || []).filter(isValidItem))
const mobileItems = computed(() => (props.section?.heroCarouselMobile || []).filter(isValidItem))

const enableRight = computed(() => Boolean(props.section?.heroCarouselEnableRight))
const syncRightToLeftLoop = computed(() => Boolean(props.section?.heroCarouselLoopAtSameTime))
const showRightDesktop = computed(() => enableRight.value && rightItems.value.length > 0)
const hasDesktop = computed(() => leftItems.value.length > 0)

const leftTimingMs = computed(() => parseTimingMs(props.section?.heroCarouselLeftTiming, 4000))
const rightTimingMs = computed(() => parseTimingMs(props.section?.heroCarouselRightTiming, 4000))
const mobileTimingMs = computed(() => leftTimingMs.value)

const leftActive = computed(() => {
  if (!leftItems.value.length) return null
  return leftItems.value[leftIndex.value % leftItems.value.length]
})

const rightActive = computed(() => {
  if (!rightItems.value.length) return null
  return rightItems.value[rightIndex.value % rightItems.value.length]
})

const mobileSourceItems = computed(() => {
  return mobileItems.value.length ? mobileItems.value : leftItems.value
})

const mobileActive = computed(() => {
  if (!mobileSourceItems.value.length) return null
  return mobileSourceItems.value[mobileIndex.value % mobileSourceItems.value.length]
})

function clearIntervals() {
  if (leftInterval) {
    clearInterval(leftInterval)
    leftInterval = null
  }
  if (rightInterval) {
    clearInterval(rightInterval)
    rightInterval = null
  }
  if (mobileInterval) {
    clearInterval(mobileInterval)
    mobileInterval = null
  }
}

function resetIndexes() {
  leftIndex.value = 0
  rightIndex.value = 0
  mobileIndex.value = 0
}

function initCarousels() {
  clearIntervals()
  resetIndexes()

  if (leftItems.value.length > 1) {
    leftInterval = setInterval(() => {
      const next = (leftIndex.value + 1) % leftItems.value.length
      const wrapped = next === 0
      leftIndex.value = next

      if (showRightDesktop.value && syncRightToLeftLoop.value && wrapped) {
        rightIndex.value = (rightIndex.value + 1) % rightItems.value.length
      }
    }, leftTimingMs.value)
  }

  if (showRightDesktop.value && !syncRightToLeftLoop.value && rightItems.value.length > 1) {
    rightInterval = setInterval(() => {
      rightIndex.value = (rightIndex.value + 1) % rightItems.value.length
    }, rightTimingMs.value)
  }

  if (mobileSourceItems.value.length > 1) {
    mobileInterval = setInterval(() => {
      mobileIndex.value = (mobileIndex.value + 1) % mobileSourceItems.value.length
    }, mobileTimingMs.value)
  }
}

watch(
  () => [
    leftItems.value.length,
    rightItems.value.length,
    mobileItems.value.length,
    enableRight.value,
    syncRightToLeftLoop.value,
    leftTimingMs.value,
    rightTimingMs.value,
  ],
  initCarousels,
  { immediate: true },
)

onBeforeUnmount(() => {
  clearIntervals()
})
</script>

<style scoped>
.hero-carousel {
  width: 100%;
}

.hero-carousel__desktop {
  display: flex;
  gap: var(--gutter);
  height: 100dvh;
  max-height: 200vw;
}

.hero-carousel__column {
  flex: 1 1 0;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  background: #000;
}

.hero-carousel__mobile {
  display: none;
  width: 100%;
  aspect-ratio: 5 / 4;
  max-height: 120dvh;
  overflow: hidden;
  background: #000;
}

.hero-carousel__media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 999px) {
  .hero-carousel__desktop {
    display: none;
  }

  .hero-carousel__mobile {
    display: block;
  }
}
</style>
