<template>
  <div
    v-if="images.length > 0"
    ref="wrapRef"
    class="zoom-scroller"
    :class="{
      dark: isDark,
      'zoom-scroller--gallery-edge': galleryEdgeToEdge,
    }"
  >
    <MatrixGrid
      v-if="showMatrixGrid"
      :color="isDark ? 'white' : 'dark'"
      :gap="20"
      :opacity="0.06"
      :spotlight-opacity="0.2"
      class="zoom-scroller__matrix"
    >
      <div
        v-if="scrollProgress !== null"
        class="zoom-scroller__indicator"
        aria-hidden="true"
      >
        {{ Math.round((scrollProgress ?? 0) * 100) }}% {{ startProgress !== null ? `(${Math.round(startProgress * 100)}% start)` : '' }}
      </div>
      <section
        class="zoom-scroller__section"
        :class="{ 'zoom-scroller__section--fullwidth': !showContent }"
      >
        <div class="zoom-scroller__grid">
          <div
            v-if="showContent"
            class="zoom-scroller__left"
          >
          <h3
            v-if="subtitle"
            class="zoom-scroller__subtitle h6"
          >
            {{ subtitle }}
          </h3>
          <div
            v-if="description?.length"
            class="zoom-scroller__description h4"
          >
            <SanityBlocks :blocks="description" />
          </div>
          <div v-if="linkUrl && buttonText" class="zoom-scroller__button pad-top">
            <Button :to="linkUrl">
              {{ buttonText }}
            </Button>
          </div>
        </div>

        <div class="zoom-scroller__right">
          <div
            ref="galleryRef"
            class="zoom-scroller__gallery"
          >
            <div
              ref="containerRef"
              class="zoom-scroller__container"
              :class="{ 'zoom-scroller__container--edge': galleryEdgeToEdge }"
              aria-hidden="true"
            >
              <img
                v-for="(img, i) in images"
                :key="i"
                class="zoom-scroller__real-image"
                :src="img"
                :data-index="i"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    </MatrixGrid>
    <template v-else>
      <div
        v-if="scrollProgress !== null"
        class="zoom-scroller__indicator"
        aria-hidden="true"
      >
        {{ Math.round((scrollProgress ?? 0) * 100) }}% {{ startProgress !== null ? `(${Math.round(startProgress * 100)}% start)` : '' }}
      </div>
      <section
        class="zoom-scroller__section"
        :class="{ 'zoom-scroller__section--fullwidth': !showContent }"
      >
        <div class="zoom-scroller__grid">
          <div
            v-if="showContent"
            class="zoom-scroller__left"
          >
            <h3
              v-if="subtitle"
              class="zoom-scroller__subtitle h6"
            >
              {{ subtitle }}
            </h3>
            <div
              v-if="description?.length"
              class="zoom-scroller__description h4"
            >
              <SanityBlocks :blocks="description" />
            </div>
            <div v-if="linkUrl && buttonText" class="zoom-scroller__button pad-top">
              <Button :to="linkUrl">
                {{ buttonText }}
              </Button>
            </div>
          </div>
          <div class="zoom-scroller__right">
            <div ref="galleryRef" class="zoom-scroller__gallery">
              <div
                ref="containerRef"
                class="zoom-scroller__container"
                :class="{ 'zoom-scroller__container--edge': galleryEdgeToEdge }"
                aria-hidden="true"
              >
                <img
                  v-for="(img, i) in images"
                  :key="i"
                  class="zoom-scroller__real-image"
                  :src="img"
                  :data-index="i"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSanityImage } from '~/composables/useSanityImage'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  section: {
    type: Object,
    default: () => ({}),
  },
})

const { getImageSrc } = useSanityImage()

const wrapRef = ref(null)
const galleryRef = ref(null)
const containerRef = ref(null)
const scrollProgress = ref(null)
const startProgress = ref(null)

const isDark = computed(() => props.section?.zoomScrollerDark === true)
const galleryEdgeToEdge = computed(() => props.section?.zoomScrollerGalleryEdgeToEdge === true)
const showMatrixGrid = computed(() => props.section?.zoomScrollerMatrixGrid === true)
const showContent = computed(() => props.section?.zoomScrollerShowContent !== false)
const subtitle = computed(() => props.section?.zoomScrollerSubtitle || '')
const description = computed(() => props.section?.zoomScrollerDescription || [])
const buttonText = computed(() => props.section?.zoomScrollerButtonText || '')
const linkUrl = computed(() => {
  const link = props.section?.zoomScrollerLink
  const slug = link?.slug
  if (!slug) return null
  return slug === 'home' ? '/' : `/${slug}`
})

const images = computed(() => {
  const items = props.section?.zoomScrollerImages || []
  return items
    .map((item) => {
      const asset = item?.asset
      return asset ? getImageSrc(asset) : ''
    })
    .filter(Boolean)
})

let scrollTriggerInstance = null

function initZoomScroller() {
  if (!import.meta.client || !containerRef.value || !wrapRef.value || images.value.length === 0) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  const realImages = containerRef.value.querySelectorAll('.zoom-scroller__real-image')
  const N = realImages.length
  if (N === 0) return

  const container = containerRef.value
  const borderRadiusPx = galleryEdgeToEdge.value ? 0 : (parseFloat(getComputedStyle(container).borderRadius) || 24)
  gsap.set(realImages, { scale: 0, borderRadius: 0 })
  realImages.forEach((img, i) => {
    img.style.zIndex = i + 100
  })

  const STAGGER_EACH = 2
  const SCALE_DURATION = 8
  const totalDuration = (N - 1) * STAGGER_EACH + SCALE_DURATION
  const base = 0.87 - 0.29 * Math.log(N);

// minute boost that ramps up with N, but is 0 at N=3
const boost = 0.03 * (1 - 3 / N);

const START_PROGRESS = base + boost;
  startProgress.value = START_PROGRESS

  const tl = gsap.timeline({ paused: true })
  tl.to(realImages, {
    scale: 1.005,
    borderRadius: `${borderRadiusPx}px`,
    ease: 'expo.inOut',
    duration: SCALE_DURATION,
    stagger: { each: STAGGER_EACH },
  })

  const SCROLL_MULTIPLIER = 3
  const unitGridPx = parseFloat(getComputedStyle(wrapRef.value).getPropertyValue('--unit-grid')) || 0
  const pinDistance = typeof window !== 'undefined' ? window.innerHeight * SCROLL_MULTIPLIER - unitGridPx * 2 : 2000

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: wrapRef.value,
    start: 'top top',
    end: `+=${pinDistance}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = Math.min(1, Math.max(0, self.progress))
      scrollProgress.value = progress
      const effectiveProgress = START_PROGRESS + progress * (1 - START_PROGRESS)
      tl.time(effectiveProgress * totalDuration)
    },
  })

  ScrollTrigger.refresh()
  const initialProgress = Math.min(1, Math.max(0, scrollTriggerInstance.progress))
  scrollProgress.value = initialProgress
  const effectiveProgress = START_PROGRESS + initialProgress * (1 - START_PROGRESS)
  tl.time(effectiveProgress * totalDuration)
}

onMounted(() => {
  if (!import.meta.client) return
  nextTick(() => {
    if (document.body.classList.contains('preloader-complete')) {
      initZoomScroller()
    } else {
      document.addEventListener('preloader-complete', () => initZoomScroller(), { once: true })
    }
  })
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', () => {
    nextTick(() => ScrollTrigger.refresh())
  })
})

onUnmounted(() => {
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
})
</script>

<style scoped>
.zoom-scroller {
  position: relative;
  padding: var(--unit-grid);
  --gallery-height: calc(100dvh - calc(var(--unit-grid) * 2));
  min-height: var(--gallery-height);
}


.zoom-scroller.dark {
  --text-color: #fff;
  --background-color: #111;
  background-color: var(--background-color);
  color: var(--text-color);
}

.zoom-scroller--gallery-edge {
  padding: 0;
  --gallery-height: 100dvh;
}

.zoom-scroller__container--edge {
  border-radius: 0;
}

.zoom-scroller__matrix {
  z-index: 0;
}

.zoom-scroller__indicator {
  position: absolute;
  top: calc(var(--unit-grid) * 0.5);
  right: calc(var(--unit-grid) * 0.5);
  z-index: 10;
  font-family: var(--mono);
  font-size: 0.75rem;
  opacity: 0.7;
}

.zoom-scroller__button {
  padding-top: calc(var(--unit-grid) * 0.25);
}

.zoom-scroller__section {
  position: relative;
  height: var(--gallery-height);
  display: flex;
  align-items: center;
}

.zoom-scroller__grid {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 100%;
  align-items: center;
  height: var(--gallery-height);
}

.zoom-scroller__section--fullwidth .zoom-scroller__grid {
  grid-template-columns: 1fr;
}

@media (min-width: 1000px) {
  .zoom-scroller__grid {
    grid-template-columns: 1fr 1fr;
  }

  .zoom-scroller__section--fullwidth .zoom-scroller__grid {
    grid-template-columns: 1fr;
  }
}

.zoom-scroller__left {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit-grid) * 0.5);
  padding: calc(var(--unit-grid) * 1);
  padding-right: calc(var(--unit-grid) * 2);
}
.zoom-scroller--gallery-edge .zoom-scroller__left {
  padding-left: calc(var(--unit-grid) * 2);
}

.zoom-scroller__subtitle {
  margin: 0;
}

.zoom-scroller__description :deep(p) {
  margin: 0 0 0.5em;
}

.zoom-scroller__description :deep(p:last-child) {
  margin-bottom: 0;
}

.zoom-scroller__right {
  position: relative;
  width: 100%;
  min-height: 400px;
  height: var(--gallery-height);
}

@media (min-width: 1000px) {
  .zoom-scroller__right {
    min-height: var(--gallery-height);
  }
}

.zoom-scroller__gallery {
  position: relative;
  width: 100%;
  min-height: 400px;
}

@media (min-width: 1000px) {
  .zoom-scroller__gallery {
    min-height: var(--gallery-height);
  }
}

.zoom-scroller__container {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 400px;
  display: block;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.zoom-scroller--gallery-edge .zoom-scroller__container {
  border-radius: 0;
}

@media (min-width: 1000px) {
  .zoom-scroller__container {
    min-height: var(--gallery-height);
  }
}

.zoom-scroller__real-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: center;
  object-fit: cover;
  will-change: transform;
}
</style>
