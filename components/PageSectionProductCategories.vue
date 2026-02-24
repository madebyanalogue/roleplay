<template>
  <section
    v-if="categories.length > 0"
    class="product-categories"
  >
    <div class="product-categories__grid">
      <!-- Column 1: Category tabs -->

      <!-- Column 2: Video player (center) -->
      <div class="product-categories__video-col">
        <div ref="videoWrapRef" class="product-categories__video-wrap">
          <video
            v-for="(cat, index) in categories"
            :key="cat._key || index"
            :ref="(el) => setVideoRef(index, el)"
            :src="getVideoSrc(cat)"
            :poster="getPosterSrc(cat)"
            :aria-label="cat.title"
            class="product-categories__video-player"
            :class="{ 'is--active': activeIndex === index }"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            @loadeddata="(e) => onVideoLoaded(e.target, index)"
            @canplay="(e) => onVideoCanPlay(e.target)"
          />
          <div class="product-categories__dial">
            <svg
              class="product-categories__dial-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <line
                v-for="(line, i) in dialLines"
                :key="i"
                :x1="line.x1"
                :y1="line.y1"
                :x2="line.x2"
                :y2="line.y2"
                :style="{ opacity: line.opacity }"
                class="product-categories__dial-line"
                :data-index="i"
              />
            </svg>
          </div>
          <div class="product-categories__dial-ns">
            <svg
              class="product-categories__dial-ns-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              overflow="visible"
              aria-hidden="true"
            >
              <line
                v-for="(line, i) in dialNsLines"
                :key="i"
                :x1="line.x1"
                :y1="line.y1"
                :x2="line.x2"
                :y2="line.y2"
                class="product-categories__dial-ns-line"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="product-categories__tabs-col">
        <nav
          class="product-categories__tabs"
          role="tablist"
          aria-label="Product categories"
        >
          <button
            v-for="(cat, index) in categories"
            :key="cat._key || index"
            type="button"
            role="tab"
            :aria-selected="activeIndex === index"
            :aria-controls="`tabpanel-${index}`"
            :id="`tab-${index}`"
            class="product-categories__tab fractul h4"
            :class="{ 'is--active': activeIndex === index }"
            @click="setActiveIndex(index)"
          >
            {{ cat.title }}
          </button>
        </nav>
      </div>

      <!-- Column 3: Description -->
      <div class="product-categories__desc-col">
        <div
          v-if="activeCategory"
          class="product-categories__desc grid-1 "
          role="tabpanel"
          :id="`tabpanel-${activeIndex}`"
          :aria-labelledby="`tab-${activeIndex}`"
        >
          <div v-if="activeCategory.description" class="product-categories__desc-title h4 fractul">
            {{ activeCategory.title }}
          </div>
          <p v-if="activeCategory.description" class="product-categories__desc-text subdued">
            {{ activeCategory.description }}
          </p>
        </div>
        <Button
          v-if="linkUrl && section.productCategoriesButtonText"
          :to="linkUrl"
        >
          {{ section.productCategoriesButtonText }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    default: () => ({}),
  },
})

// Categories from Sanity (title, description, model). Model videoNumber (1–6) maps to local video file
const categories = computed(() => {
  const items = props.section?.productCategories || []
  return items.filter((c) => c?.model?.videoNumber)
})

const activeIndex = ref(0)

const activeCategory = computed(() => categories.value[activeIndex.value] || null)

const linkUrl = computed(() => {
  const link = props.section?.productCategoriesLink
  if (!link?.slug?.current) return null
  return link.slug.current === 'home' ? '/' : `/${link.slug.current}`
})

function getVideoSrc(cat) {
  const num = cat?.model?.videoNumber
  if (num == null || num < 1) return ''
  const n = String(Math.floor(num)).padStart(2, '0')
  return `/assets/models/model-${n}.mp4`
}

function getPosterSrc(cat) {
  const num = cat?.model?.videoNumber
  if (num == null || num < 1) return ''
  const n = String(Math.floor(num)).padStart(2, '0')
  return `/assets/posters/model-${n}.jpg`
}

const videoRefs = ref({})
const syncedTime = ref(0)
const videoProgress = ref(0) // 0–1, synced with video currentTime over 12s loop
const VIDEO_LOOP_DURATION = 12

// Dial: 180 lines. Mexican wave: opacity pulses as wave passes.
const cx = 50
const cy = 50
const innerR = 47
const outerR = 50

const nsInnerR = 47
const nsOuterR = 54

const WAVE_WIDTH = 0.08
const MIN_OPACITY = 0.15
const MAX_OPACITY = 0.8
const WAVE_SPEED = 1

const dialLines = computed(() => {
  const progress = (videoProgress.value * WAVE_SPEED) % 1
  const lines = []
  for (let i = 0; i < 180; i++) {
    const linePos = i / 180
    const dist = Math.min(
      Math.abs(linePos - progress),
      Math.abs(linePos - progress + 1),
      Math.abs(linePos - progress - 1)
    )
    const t = dist < WAVE_WIDTH ? 1 - dist / WAVE_WIDTH : 0
    const opacity = MIN_OPACITY + t * (MAX_OPACITY - MIN_OPACITY)
    const deg = i * 2
    const rad = ((90 - deg) * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    lines.push({
      x1: cx + innerR * cos,
      y1: cy - innerR * sin,
      x2: cx + outerR * cos,
      y2: cy - outerR * sin,
      opacity,
    })
  }
  return lines
})

const dialNsLines = computed(() => {
  const lines = []
  for (const dir of [-1, 1]) {
    const sin = -dir
    const cos = 0
    lines.push({
      x1: cx + nsInnerR * cos,
      y1: cy - nsInnerR * sin,
      x2: cx + nsOuterR * cos,
      y2: cy - nsOuterR * sin,
    })
  }
  return lines
})

function setVideoRef(i, el) {
  if (el) videoRefs.value[i] = el
  else delete videoRefs.value[i]
}

function setActiveIndex(index) {
  if (index === activeIndex.value) return
  const video = videoRefs.value[activeIndex.value]
  if (video) syncedTime.value = video.currentTime
  activeIndex.value = index
}

function syncAllVideosTo(time) {
  Object.values(videoRefs.value).forEach((v) => {
    if (v && !Number.isNaN(time)) v.currentTime = time
  })
}

function onVideoLoaded(video, index) {
  if (!video) return
  const master = videoRefs.value[activeIndex.value]
  const t = master ? master.currentTime : syncedTime.value
  if (t > 0 || master) {
    syncedTime.value = t
    syncAllVideosTo(t)
  }
  updateVideoProgress()
  playVideo(video)
}

function onVideoCanPlay(video) {
  if (video) playVideo(video)
}

function updateVideoProgress() {
  const video = videoRefs.value[activeIndex.value]
  if (!video) return
  const t = video.currentTime
  const duration = video.duration && !Number.isNaN(video.duration) ? video.duration : VIDEO_LOOP_DURATION
  videoProgress.value = (t % duration) / duration
}

function onVideoTimeUpdate() {
  updateVideoProgress()
}

let rafId = null
function tick() {
  updateVideoProgress()
  rafId = requestAnimationFrame(tick)
}

function playVideo(video) {
  video.play().catch(() => {
    // Autoplay blocked (e.g. user hasn't interacted). Muted videos usually allowed.
  })
  if (!rafId) rafId = requestAnimationFrame(tick)
}

// Ensure play when section becomes visible (Intersection Observer)
const videoWrapRef = ref(null)
let io = null
onMounted(() => {
  if (!import.meta.client || categories.value.length === 0) return
  nextTick(() => {
    const wrap = videoWrapRef.value
    if (!wrap) return
    io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          Object.values(videoRefs.value).forEach(playVideo)
        }
      },
      { threshold: 0.25 }
    )
    io.observe(wrap)
  })
})
onUnmounted(() => {
  io?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.product-categories {
  padding: var(--gutter);
  /* background:url('/images/product-categories.png') no-repeat center top / 100%; */
  padding: calc(var(--unit-grid) * 1);
  height: calc(var(--unit-grid) * 14);
  background:#eee;
}

.product-categories__grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin: 0 auto;
  align-items: stretch;
  padding: calc(var(--unit-grid) * 1) 0px;
  grid-template-areas: "desc video tabs";
  gap:calc(var(--unit-grid) * 1);
}
.product-categories__desc-col {
  grid-area: desc;
}
.product-categories__tabs-col, .product-categories__desc-col {
  padding-top: calc(var(--unit-grid) * 3);
}

.product-categories__tabs-col {
  grid-area: tabs;
  display: flex;
  flex-direction: column;
}

.product-categories__tabs,
.product-categories__desc {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit-grid) * .35);
}

.product-categories__tab {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  opacity: 0.25;
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  text-decoration: none;
  text-align: left;
  transition: opacity 0.2s ease;
  cursor: pointer;
}
.product-categories .h4 {
  font-size: 1.35em;
}
 
.product-categories__tab:not(.is--active):hover {
  opacity: 1;
}

.product-categories__tab.is--active {
  opacity: 1;
}

.product-categories__video-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-categories__video-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  /* overflow: hidden; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-categories__dial {
  position: absolute;
  inset: 0;
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  max-width: min(100%, 100%);
  max-height: min(100%, 100%);
  margin: auto;
  pointer-events: none;
  z-index: 1;
}

.product-categories__dial-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.product-categories__dial-line {
  stroke: currentColor;
  stroke-width:1;
  vector-effect: non-scaling-stroke;
}

.product-categories__dial-ns {
  position: absolute;
  inset: 0;
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  max-width: min(100%, 100%);
  max-height: min(100%, 100%);
  margin: auto;
  pointer-events: none;
  transform-origin: center;
  z-index: 1;
}

.product-categories__dial-ns-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.product-categories__dial-ns-line {
  stroke: currentColor;
  stroke-width: 0.5;
  vector-effect: non-scaling-stroke;
}

.product-categories__video-player {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.15s ease-out;
}

.product-categories__video-player.is--active {
  opacity: 1;
  z-index: 1;
}

.product-categories__desc-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-categories__desc-text {
  margin: 0;
  color: var(--text-color);
}

@media screen and (max-width: 767px) {
  .product-categories__grid {
    grid-template-columns: 1fr;
  }

  .product-categories__tabs {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .product-categories__tab {
    flex: 1 1 auto;
  }

  .product-categories__video-wrap {
    aspect-ratio: 1;
  }
}

</style>
