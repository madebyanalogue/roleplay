<template>
  <div
    v-if="images.length > 0"
    ref="wrapRef"
    class="spiral-gallery"
    :class="{ 'spiral-gallery--dark': isDark }"
  >
    <SectionIntroText
      v-if="showTextBefore && textBefore?.length"
      :blocks="textBefore"
      :animation="introAnimation"
    />
    <div ref="pinHeightRef" class="spiral-gallery__pin-height">
      <div ref="containerRef" class="spiral-gallery__container">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="spiral-gallery__media-wrapper"
        >
          <img
            class="spiral-gallery__media"
            :src="img"
            :alt="''"
            loading="lazy"
          >
        </div>
      </div>
    </div>
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
const pinHeightRef = ref(null)
const containerRef = ref(null)

const isDark = computed(() => props.section?.spiralGalleryDark === true)
const showTextBefore = computed(() => props.section?.spiralGalleryShowTextBefore === true)
const textBefore = computed(() => props.section?.spiralGalleryTextBefore || [])
const introAnimation = computed(() => props.section?.spiralGalleryIntroAnimation || 'none')

const images = computed(() => {
  const items = props.section?.spiralGalleryImages || []
  return items
    .map((item) => {
      const asset = item?.asset
      return asset ? getImageSrc(asset) : ''
    })
    .filter(Boolean)
})

let pinTrigger = null
let animTimeline = null

function initSpiralGallery() {
  if (!import.meta.client || !containerRef.value || !pinHeightRef.value || !wrapRef.value || images.value.length === 0) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  const mediaWrappers = containerRef.value.querySelectorAll('.spiral-gallery__media-wrapper')
  const medias = containerRef.value.querySelectorAll('.spiral-gallery__media')
  const mediasLength = mediaWrappers.length

  if (mediasLength === 0) return

  const angle = 360 / mediasLength

  gsap.set(medias, { autoAlpha: 0 })
  mediaWrappers.forEach((wrapper, index) => {
    gsap.set(wrapper, { rotation: -angle * index })
  })
  medias.forEach((media, index) => {
    gsap.set(media, { rotation: angle * index })
  })

  pinTrigger = ScrollTrigger.create({
    trigger: wrapRef.value,
    start: 'top top',
    end: 'bottom bottom',
    pin: containerRef.value,
    pinSpacing: true,
    invalidateOnRefresh: true,
  })

  animTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: wrapRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
    },
  })

  animTimeline.to(mediaWrappers, {
    rotation: '+=180',
    stagger: 0.04,
    ease: 'power1.out',
  })
  animTimeline.to(medias, {
    x: 0,
    rotation: '-=180',
    ease: 'power1.out',
    stagger: 0.04,
  }, '<')
  animTimeline.from(medias, {
    autoAlpha: 0,
    duration: 0.03,
    stagger: 0.04,
  }, '<')

  nextTick(() => ScrollTrigger.refresh())
  setTimeout(() => ScrollTrigger.refresh(), 150)
}

onMounted(() => {
  if (!import.meta.client) return
  nextTick(() => {
    if (document.body.classList.contains('preloader-complete')) {
      initSpiralGallery()
    } else {
      document.addEventListener('preloader-complete', () => initSpiralGallery(), { once: true })
    }
  })
  const nuxtApp = useNuxtApp()
  const TRANSITION_DURATION_MS = 1100
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      nextTick(() => ScrollTrigger.refresh())
      setTimeout(() => ScrollTrigger.refresh(), 150)
    }, TRANSITION_DURATION_MS)
  })
})

onUnmounted(() => {
  if (pinTrigger) pinTrigger.kill()
  if (animTimeline?.scrollTrigger) animTimeline.scrollTrigger.kill()
})
</script>

<style scoped>
.spiral-gallery {
  overflow: hidden;
}

.spiral-gallery--dark {
  --spiral-gallery-bg: #111;
  background-color: var(--spiral-gallery-bg);
}

.spiral-gallery__pin-height {
  position: relative;
  height: 500vh;
}

.spiral-gallery__container {
  position: absolute;
  width: 18%;
  aspect-ratio: 1;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spiral-gallery__media-wrapper {
  position: absolute;
  inset: 0;
}

.spiral-gallery__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2%;
  transform: translate(60vw, 0);
}

@media (max-width: 768px) {
  .spiral-gallery__container {
    width: 45%;
  }

  .spiral-gallery__media {
    transform: translate(100vw, 0);
  }
}
</style>
