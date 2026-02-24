<template>
  <div ref="heroSplitRef" class="hero-split" :class="{ 'hero-split--single': isSingleSide }">
    <div
      v-for="(side, index) in sides"
      :key="index"
      class="hero-split__side"
    >
      <!-- Parallax layers (when configured) -->
      <template v-if="hasParallaxLayers(side)">
        <div class="hero-split__visuals">
          <div class="hero-split__black-line-overflow" />
          <div
            :ref="(el) => setParallaxRef(el, index)"
            class="hero-split__layers"
            data-parallax-layers
          >
            <template
              v-for="(layer, layerIndex) in side.parallaxLayers"
              :key="layer._key || layerIndex"
            >
              <img
                v-if="layer.layerType === 'image' && getLayerImageUrl(layer)"
                :src="getLayerImageUrl(layer)"
                loading="eager"
                :data-parallax-layer="String(layer.parallaxDepth ?? 2)"
                class="hero-split__layer-img"
                alt=""
              >
              <div
                v-else-if="layer.layerType === 'heading' && layer.heading"
                :data-parallax-layer="String(layer.parallaxDepth ?? 2)"
                class="hero-split__layer-title"
              >
                <h2 class="hero-split__parallax-heading chunky-heading">{{ layer.heading }}</h2>
              </div>
            </template>
          </div>
          <div class="hero-split__fade" />
        </div>
      </template>

      <!-- Background image (fallback when no parallax layers) -->
      <div
        v-else-if="getBackgroundImageUrl(side)"
        class="hero-split__bg-image"
        :style="{ backgroundImage: `url(${getBackgroundImageUrl(side)})` }"
      />

      <!-- Background video (hidden for now - was: when media type is video and no parallax) -->
      <!--
      <video
        v-else-if="isVideoSide(side) && getBackgroundVideoUrl(side)"
        class="hero-split__bg-video"
        ...
      />
      -->

      <!-- Content (always on top - title, subtitle, button, categories) -->
      <div
        :ref="(el) => setContentRef(el, index)"
        class="hero-split__content"
      >
        <div v-if="side.categories?.length" class="hero-split__categories">
          <span
            v-for="(cat, catIndex) in side.categories"
            :key="catIndex"
            class="pill h6"
          >
            {{ cat }}
          </span>
        </div>
        <div class="hero-split__text">
          <!-- <h2 class="hero-split__title chunky-heading">{{ side.title }}</h2> -->
          <p v-if="side.subtitle" class="hero-split__subtitle">{{ side.subtitle }}</p>
        </div>
        <Button
          v-if="hasButton(side)"
          :to="getButtonLinkUrl(side)"
          class="hero-split__button"
        >
          {{ side.buttonText }}
        </Button>
      </div>
    </div>
  </div>
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

const layout = computed(() => props.section?.heroSplitLayout || 'split')

const isSingleSide = computed(() => layout.value === 'single')

const sides = computed(() => {
  const left = props.section?.heroLeft || {}
  const right = props.section?.heroRight || {}
  const allSides = [
    {
      title: left.title || '',
      subtitle: left.subtitle || '',
      backgroundImage: left.backgroundImage,
      backgroundMediaType: left.backgroundMediaType,
      backgroundMediaImage: left.backgroundMediaImage,
      backgroundMediaVideo: left.backgroundMediaVideo,
      categories: left.categories || [],
      buttonLink: left.buttonLink,
      buttonText: left.buttonText || '',
      parallaxLayers: left.parallaxLayers || [],
    },
    {
      title: right.title || '',
      subtitle: right.subtitle || '',
      backgroundImage: right.backgroundImage,
      backgroundMediaType: right.backgroundMediaType,
      backgroundMediaImage: right.backgroundMediaImage,
      backgroundMediaVideo: right.backgroundMediaVideo,
      categories: right.categories || [],
      buttonLink: right.buttonLink,
      buttonText: right.buttonText || '',
      parallaxLayers: right.parallaxLayers || [],
    },
  ]
  if (layout.value === 'single') return [allSides[0]]
  return allSides
})

const heroSplitRef = ref(null)
const parallaxRefs = ref([])
const contentRefs = ref([])

const setParallaxRef = (el, index) => {
  if (el) {
    parallaxRefs.value[index] = el
  }
}

const setContentRef = (el, index) => {
  if (el) {
    contentRefs.value[index] = el
  }
}

const hasParallaxLayers = (side) => {
  const layers = side.parallaxLayers
  if (!layers?.length) return false
  return layers.some(
    (l) =>
      (l.layerType === 'image' && getLayerImageUrl({ image: l.image }))
      || (l.layerType === 'heading' && l.heading),
  )
}

const getLayerImageUrl = (layer) => {
  const asset = layer.image?.asset
  return asset ? getImageSrc(asset) : ''
}

const getBackgroundImageUrl = (side) => {
  const asset = side.backgroundImage?.asset
  return asset ? getImageSrc(asset) : ''
}

const getBackgroundVideoUrl = (side) => {
  return side.backgroundMediaVideo?.asset?.url || ''
}

const isVideoSide = (side) => {
  return side.backgroundMediaType === 'video'
}

const getVideoMimeType = (url) => {
  if (!url) return 'video/mp4'
  return url.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4'
}

const getButtonLinkUrl = (side) => {
  const link = side.buttonLink
  if (!link?.slug?.current) return null
  return link.slug.current === 'home' ? '/' : `/${link.slug.current}`
}

const hasButton = (side) => !!side.buttonText && !!getButtonLinkUrl(side)

// 0 = none. 1-4 = original strength.
const DEPTH_TO_Y_PERCENT = {
  0: 0,
  1: 5,
  2: 10,
  3: 15,
  4: 20,
  5: 25,
  6: 30,
  7: 35,
  8: 40,
  9: 45,
  10: 50,
  11: 55,
  12: 60,
}

let scrollTriggerInstances = []
let pageFinishUnregister = null

onMounted(() => {
  if (import.meta.server) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  Promise.all([
    import('gsap').then((m) => m.default),
    import('gsap/ScrollTrigger').then((m) => m.ScrollTrigger),
  ]).then(async ([gsap, ScrollTrigger]) => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    const triggerEl = heroSplitRef.value
    const containers = parallaxRefs.value.filter(Boolean)
    const contentElements = contentRefs.value.filter(Boolean)
    const contentFadeEnabled = props.section?.heroSplitContentFadeOnScroll

    if (!triggerEl) return

    // Content fade on scroll (when enabled)
    if (contentFadeEnabled && contentElements.length > 0) {
      const fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      fadeTl.to(contentElements, { opacity: 0, duration: 0.2 }, 0)
      scrollTriggerInstances.push(fadeTl.scrollTrigger)
    }

    if (containers.length === 0) {
      nextTick(() => ScrollTrigger.refresh())
      setTimeout(() => ScrollTrigger.refresh(), 150)
      const nuxtApp = useNuxtApp()
      const TRANSITION_DURATION_MS = 1100
      pageFinishUnregister = nuxtApp.hook('page:finish', () => {
        setTimeout(() => {
          nextTick(() => ScrollTrigger.refresh())
          setTimeout(() => ScrollTrigger.refresh(), 150)
        }, TRANSITION_DURATION_MS)
      })
      return
    }

    scrollTriggerInstances = scrollTriggerInstances.concat(containers.map((containerEl) => {
      const layers = [...new Set(
        Array.from(containerEl.querySelectorAll('[data-parallax-layer]'))
          .map((el) => el.getAttribute('data-parallax-layer')),
      )].filter(Boolean)

      if (layers.length === 0) return null

      const layerConfigs = layers.map((layerId) => ({
        layer: layerId,
        yPercent: DEPTH_TO_Y_PERCENT[Number(layerId)] ?? 40,
      }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0,
        },
      })

      layerConfigs.forEach((layerObj, idx) => {
        tl.to(
          containerEl.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<',
        )
      })

      return tl.scrollTrigger
    }).filter(Boolean))

    nextTick(() => ScrollTrigger.refresh())
    setTimeout(() => ScrollTrigger.refresh(), 150)

    const nuxtApp = useNuxtApp()
    const TRANSITION_DURATION_MS = 1100
    pageFinishUnregister = nuxtApp.hook('page:finish', () => {
      setTimeout(() => {
        nextTick(() => ScrollTrigger.refresh())
        setTimeout(() => ScrollTrigger.refresh(), 150)
      }, TRANSITION_DURATION_MS)
    })
  })
})

onUnmounted(() => {
  if (pageFinishUnregister) {
    pageFinishUnregister()
  }
  scrollTriggerInstances.forEach((st) => st?.kill())
})
</script>

<style scoped>
.hero-split {
  display: flex;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 800px;
  height: 100dvh;
  overflow: hidden;
  color: var(--white);
}

.hero-split__side {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(30px, 4vw, calc(var(--unit-grid) * 1));
  overflow: hidden;
}

.hero-split--single .hero-split__side {
  flex: 1 1 100%;
}

.hero-split__visuals {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-split__black-line-overflow {
  z-index: 20;
  background-color: #000;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: -1px;
  left: 0;
}

.hero-split__layers {
  object-fit: cover;
  width: 100%;
  max-width: none;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.hero-split__layer-img {
  pointer-events: none;
  object-fit: cover;
  width: 100%;
  max-width: none;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.hero-split__layer-title {
  pointer-events: auto;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 86%;
  /* min-height: 100dvh; */
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
}

.hero-split__parallax-heading {
  text-align: center;
  text-transform: none;
  margin: 0;
  font-size:clamp(50px, 7vw, 130px);
  font-weight: 700;
  line-height: 1;
  position: relative;
}

.hero-split__fade {
  z-index: 30;
  object-fit: cover;
  background-image: linear-gradient(transparent, #000);
  width: 100%;
  max-width: none;
  height: 20%;
  position: absolute;
  bottom: 0;
  left: 0;
}

/* Fallback background */
.hero-split__bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-split__bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-split__content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 2vw, calc(var(--unit-grid) * 0.35));
  justify-content: flex-end;
  min-height: 0;
  text-decoration: none;
  color: inherit;
  align-items: center;
}

a.hero-split__content {
  cursor: pointer;
}

.hero-split__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 5px;
}

.hero-split__title {
  margin: 0;
  flex-shrink: 0;
}



.hero-split__button {
  flex-shrink: 0;
}

.hero-split__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}



.btn-animate-chars.hero-split__button {
  font-size: 21px;
  padding: 13px 24px 10px;
  letter-spacing: -0.02em;
}
.btn-animate-chars__bg {
  background-color: var(--red) !important;
}

.btn-animate-chars__text span:last-child {
  border-left: 1px solid var(--black);
  padding-left: 10px;
  display: inline-block;
}

.hero-split__subtitle {
  margin: 0;
  flex-shrink: 0;
  font-size: 1.3em;
}
.hero-split__subtitle--single {
    font-size:clamp(24px, 4vw,1.65em);
}
</style>
