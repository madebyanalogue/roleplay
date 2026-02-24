<template>
  <section
    ref="heroRef"
    class="hero"
  >
    <div class="hero__bg">
      <div
        ref="parallaxRef"
        class="hero__bg-image"
        :style="bgImageStyle"
      />
    </div>
    <div class="hero__overlay" ref="overlayRef" />
    <!-- Centered layout -->
    <div
      v-if="isCentered"
      class="hero__content hero__content--centered"
      ref="contentRef"
    >
      <div class="hero__inner hero__inner--centered gap-2">
        <h1 v-if="section.heroTitle" class="h6">{{ section.heroTitle }}</h1>
        <p v-if="section.heroSubtitle" class="h2 hero__subtitle">{{ section.heroSubtitle }}</p>
        <Button
          v-if="heroButtonLinkUrl && section.heroButtonText"
          :to="heroButtonLinkUrl"
        >
          {{ section.heroButtonText }}
        </Button>
      </div>
    </div>
    <!-- Bottom-aligned layout (separate div for different styling) -->
    <div
      v-else
      class="hero__content hero__content--bottom"
      ref="contentRef"
    >
      <div class="hero__inner hero__inner--bottom gap-2">
        <h1 v-if="section.heroTitle" class="h1 fractul bold">{{ section.heroTitle }}</h1>
        <p v-if="section.heroSubtitle" class="h5">{{ section.heroSubtitle }}</p>
        <Button
          v-if="heroButtonLinkUrl && section.heroButtonText"
          :to="heroButtonLinkUrl"
        >
          {{ section.heroButtonText }}
        </Button>
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

const heroRef = ref(null)
const parallaxRef = ref(null)
const overlayRef = ref(null)
const contentRef = ref(null)

const { getImageSrc } = useSanityImage()

const isCentered = computed(() => (props.section?.heroTextAlignment ?? 'centered') === 'centered')

const heroButtonLinkUrl = computed(() => {
  const link = props.section?.heroButtonLink
  if (!link?.slug?.current) return null
  return link.slug.current === 'home' ? '/' : `/${link.slug.current}`
})

const bgImageStyle = computed(() => {
  const img = props.section?.heroImage?.asset ?? props.section?.heroImage
  const url = getImageSrc(img)
  if (!url) return {}
  return { backgroundImage: `url(${url})` }
})

let scrollTriggerInstance = null
let pageFinishUnregister = null

onMounted(() => {
  if (import.meta.server) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  const hero = heroRef.value
  const parallax = parallaxRef.value
  const overlay = overlayRef.value
  const content = contentRef.value
  if (!hero || !parallax || !overlay || !content) return

  Promise.all([
    import('gsap').then((m) => m.default),
    import('gsap/ScrollTrigger').then((m) => m.ScrollTrigger),
  ]).then(async ([gsap, ScrollTrigger]) => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    scrollTriggerInstance = tl.scrollTrigger

    tl.to(parallax, { y: '15%', force3D: true }, 0)
      .to(content, { opacity: 0, duration: 0.2 }, 0)
      .to(overlay, { opacity: 0.7 }, 0)

    nextTick(() => ScrollTrigger.refresh())
    setTimeout(() => ScrollTrigger.refresh(), 150)

    const nuxtApp = useNuxtApp()
    const TRANSITION_DURATION_MS = 1100
    pageFinishUnregister = nuxtApp.hook('page:finish', () => {
      // Wait for page transition to complete before refreshing (layout is wrong during transition)
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
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background-color: var(--overlay-color);
}

.hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
}

.hero__content--centered {
  align-items: center;
}

.hero__content--bottom {
  align-items: flex-end;
  align-self: flex-end;
}

.hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero__inner--centered {
  justify-content: center;
}

.hero__inner--bottom {
  justify-content: flex-end;
}

.hero__inner .h6 {
  margin: 0;
}

.hero__inner .h2 {
  margin: 0;
}
@media all and (min-width: 1000px) {
.hero__subtitle {
  white-space: pre-line;
}
}
</style>
