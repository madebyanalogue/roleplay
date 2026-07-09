<template>
  <section class="hero-carousel">
    <div class="sticky-corner-two-columns" />
    <div v-if="hasDesktop" class="hero-carousel__desktop">
      <div class="hero-carousel__column rounded-medium">
        <div class="hero-carousel__stack">
          <template v-for="(item, index) in leftItems" :key="`left-item-${item._key || index}`">
            <div
              v-if="item.mediaType === 'video' && vimeoBgUrlFor(item)"
              class="hero-carousel__slide hero-carousel__vimeo"
              :class="{ 'hero-carousel__slide--active': index === leftIndex }"
              :style="vimeoSlideStyle(item)"
            >
              <iframe
                :src="vimeoBgUrlFor(item)"
                class="hero-carousel__vimeo-frame"
                title=""
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <video
              v-else-if="item.mediaType === 'video' && item.video?.asset?.url"
              class="hero-carousel__media hero-carousel__slide"
              :class="{ 'hero-carousel__slide--active': index === leftIndex }"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            >
              <source
                :src="item.video.asset.url"
                :type="videoMimeTypeFromUrl(item.video.asset.url)"
              >
            </video>
            <NuxtImg
              v-else-if="item.image?.asset?.url"
              :src="item.image.asset.url"
              :alt="section.title || ''"
              class="hero-carousel__media hero-carousel__slide"
              :class="{ 'hero-carousel__slide--active': index === leftIndex }"
              fit="cover"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : undefined"
            />
          </template>
        </div>
      </div>

      <div v-if="showRightDesktop" class="hero-carousel__column rounded-medium">
        <div class="hero-carousel__stack">
          <template v-for="(item, index) in rightItems" :key="`right-item-${item._key || index}`">
            <div
              v-if="item.mediaType === 'video' && vimeoBgUrlFor(item)"
              class="hero-carousel__slide hero-carousel__vimeo"
              :class="{ 'hero-carousel__slide--active': index === rightIndex }"
              :style="vimeoSlideStyle(item)"
            >
              <iframe
                :src="vimeoBgUrlFor(item)"
                class="hero-carousel__vimeo-frame"
                title=""
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <video
              v-else-if="item.mediaType === 'video' && item.video?.asset?.url"
              class="hero-carousel__media hero-carousel__slide"
              :class="{ 'hero-carousel__slide--active': index === rightIndex }"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            >
              <source
                :src="item.video.asset.url"
                :type="videoMimeTypeFromUrl(item.video.asset.url)"
              >
            </video>
            <NuxtImg
              v-else-if="item.image?.asset?.url"
              :src="item.image.asset.url"
              :alt="section.title || ''"
              class="hero-carousel__media hero-carousel__slide"
              :class="{ 'hero-carousel__slide--active': index === rightIndex }"
              fit="cover"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : undefined"
            />
          </template>
        </div>
      </div>
    </div>

    <div v-if="mobileActive" class="hero-carousel__mobile rounded-medium">
      <div class="hero-carousel__stack">
        <template v-for="(item, index) in mobileSourceItems" :key="`mobile-item-${item._key || index}`">
          <div
            v-if="item.mediaType === 'video' && vimeoBgUrlFor(item)"
            class="hero-carousel__slide hero-carousel__vimeo"
            :class="{ 'hero-carousel__slide--active': index === mobileIndex }"
            :style="vimeoSlideStyle(item)"
          >
            <iframe
              :src="vimeoBgUrlFor(item)"
              class="hero-carousel__vimeo-frame"
              title=""
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
          <video
            v-else-if="item.mediaType === 'video' && item.video?.asset?.url"
            class="hero-carousel__media hero-carousel__slide"
            :class="{ 'hero-carousel__slide--active': index === mobileIndex }"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          >
            <source
              :src="item.video.asset.url"
              :type="videoMimeTypeFromUrl(item.video.asset.url)"
            >
          </video>
          <NuxtImg
            v-else-if="item.image?.asset?.url"
            :src="item.image.asset.url"
            :alt="section.title || ''"
            class="hero-carousel__media hero-carousel__slide"
            :class="{ 'hero-carousel__slide--active': index === mobileIndex }"
            fit="cover"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : undefined"
          />
        </template>
      </div>
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
let preloadSession = 0

function parseVimeoId(value) {
  const s = String(value || '').trim()
  if (!s) return null
  if (/^\d+$/.test(s)) return s
  let match = s.match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  if (match) return match[1]
  match = s.match(/player\.vimeo\.com\/video\/(\d+)/i)
  return match ? match[1] : null
}

function vimeoIdFor(item) {
  if (item?.mediaType !== 'video' || item?.videoSource !== 'vimeo') return ''
  return parseVimeoId(item?.videoVimeo) || ''
}

function vimeoBgUrlFor(item) {
  const id = vimeoIdFor(item)
  if (!id) return ''
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1`
}

const vimeoAspectRatios = ref({})

async function fetchVimeoAspectRatio(id) {
  if (!id || vimeoAspectRatios.value[id]) return
  try {
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}`,
    )
    if (!response.ok) return
    const data = await response.json()
    const { width, height } = data
    if (width > 0 && height > 0) {
      vimeoAspectRatios.value = { ...vimeoAspectRatios.value, [id]: { w: width, h: height } }
    }
  } catch {
    // ignore
  }
}

function vimeoSlideStyle(item) {
  const id = vimeoIdFor(item)
  const ratio = id ? vimeoAspectRatios.value[id] : null
  if (!ratio) return {}
  return {
    '--vimeo-ar': ratio.w / ratio.h,
  }
}

function isValidItem(item) {
  if (!item) return false
  if (item.mediaType === 'video') {
    if (item.videoSource === 'vimeo') return Boolean(vimeoIdFor(item))
    return Boolean(item.video?.asset?.url)
  }
  return Boolean(item.image?.asset?.url)
}

function parseTimingMs(value, fallback = 4000) {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed < 100) return fallback
  return parsed
}

function parseBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (['true', '1', 'yes', 'on'].includes(normalized)) return true
    if (['false', '0', 'no', 'off', ''].includes(normalized)) return false
  }
  if (typeof value === 'number') return value !== 0
  return fallback
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

const enableRight = computed(() => parseBoolean(props.section?.heroCarouselEnableRight, false))
const syncRightToLeftLoop = computed(() => parseBoolean(props.section?.heroCarouselLoopAtSameTime, false))
const showRightDesktop = computed(() => enableRight.value && rightItems.value.length > 0)
const hasDesktop = computed(() => leftItems.value.length > 0)

const leftTimingMs = computed(() => parseTimingMs(props.section?.heroCarouselLeftTiming, 4000))
const rightTimingMs = computed(() => parseTimingMs(props.section?.heroCarouselRightTiming, 4000))
const mobileTimingMs = computed(() => leftTimingMs.value)

const mobileSourceItems = computed(() => {
  return mobileItems.value.length ? mobileItems.value : leftItems.value
})

const allVimeoIds = computed(() => {
  const ids = new Set()
  for (const items of [leftItems.value, rightItems.value, mobileSourceItems.value]) {
    for (const item of items) {
      const id = vimeoIdFor(item)
      if (id) ids.add(id)
    }
  }
  return [...ids]
})

const mobileActive = computed(() => {
  if (!mobileSourceItems.value.length) return null
  return mobileSourceItems.value[mobileIndex.value % mobileSourceItems.value.length]
})

function imageUrlsFromItems(items = []) {
  return items
    .filter(item => item?.mediaType !== 'video' && item?.image?.asset?.url)
    .map(item => item.image.asset.url)
}

function preloadImage(url) {
  return new Promise((resolve) => {
    if (!import.meta.client || !url) {
      resolve()
      return
    }

    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = url
  })
}

async function preloadImageSet(items = []) {
  const urls = imageUrlsFromItems(items)
  if (!urls.length) return true
  await Promise.all(urls.map(url => preloadImage(url)))
  return true
}

function preloadAllImageSets() {
  if (!import.meta.client) return

  const session = ++preloadSession

  Promise.all([
    preloadImageSet(leftItems.value),
    preloadImageSet(rightItems.value),
    preloadImageSet(mobileSourceItems.value),
  ]).then(() => {
    if (session !== preloadSession) return
  })
}

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

function setupCarousels() {
  preloadAllImageSets()
  initCarousels()
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
  () => {
    if (import.meta.client) {
      setupCarousels()
    }
  },
)

watch(
  allVimeoIds,
  (ids) => {
    if (!import.meta.client) return
    ids.forEach(fetchVimeoAspectRatio)
  },
  { immediate: true },
)

onMounted(() => {
  setupCarousels()
})

onActivated(() => {
  setupCarousels()
})

onDeactivated(() => {
  // Invalidate any in-flight preload before leaving cached page instances.
  preloadSession += 1
  clearIntervals()
})

onBeforeUnmount(() => {
  preloadSession += 1
  clearIntervals()
})
</script>

<style scoped>
.hero-carousel {
  width: 100%;
  --hero-height: calc(100dvh - var(--header-height) - calc(var(--gutter) * 3));
}

.hero-carousel__desktop {
  display: flex;
  gap: var(--gutter);
  height: var(--hero-height);
  max-height: 49vw;
  min-height: 800px;
}

.hero-carousel__column {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  background: #000;
}

.hero-carousel__mobile {
  position: relative;
  display: none;
  width: 100%;
  aspect-ratio: .9;
  max-height: 120dvh;
  overflow: hidden;
}

.hero-carousel__media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-carousel__stack {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Vimeo background: crop the letterboxed iframe to cover the slide (object-fit: cover equivalent) */
.hero-carousel__vimeo {
  overflow: hidden;
  container-type: size;
  background: #000;
}

.hero-carousel__vimeo-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Container wider than video -> pin width, overscan height */
@container (min-aspect-ratio: var(--vimeo-ar, 1.7777777778)) {
  .hero-carousel__vimeo-frame {
    height: calc(100cqw / var(--vimeo-ar, 1.7777777778));
  }
}

/* Container taller than video -> pin height, overscan width */
@container (max-aspect-ratio: var(--vimeo-ar, 1.7777777778)) {
  .hero-carousel__vimeo-frame {
    width: calc(100cqh * var(--vimeo-ar, 1.7777777778));
  }
}

.hero-carousel__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.hero-carousel__slide--active {
  opacity: 1;
  z-index: 2;
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
