<template>
  <div
    v-if="slides.length > 0"
    ref="wrapRef"
    class="scroll-slider"
  >
    <SectionIntroText
      v-if="showTextBefore && textBefore?.length"
      :blocks="textBefore"
      :animation="introAnimation"
    />

    <section class="scroll-slider__slider">
      <div class="scroll-slider__images">
        <img
          v-if="firstSlideImage"
          :src="firstSlideImage"
          :alt="slides[0]?.title || 'Slide 1'"
          class="scroll-slider__img"
        >
      </div>

      <div class="scroll-slider__title">
        <h2
          ref="titleRef"
          :key="activeSlide"
          class="scroll-slider__title-text h3"
        >
          {{ slides[activeSlide]?.title }}
        </h2>
      </div>

      <div class="scroll-slider__indicator">
        <div class="scroll-slider__indices">
          <p
            v-for="(slide, index) in slides"
            :key="index"
            class="scroll-slider__index-item"
            :class="{ 'is--active': activeSlide === index }"
          >
            <span class="scroll-slider__marker" />
            <span class="scroll-slider__index-num h6">{{ String(index + 1).padStart(2, '0') }}</span>
          </p>
        </div>
        <div class="scroll-slider__progress-bar">
          <div
            ref="progressRef"
            class="scroll-slider__progress"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSanityImage } from '~/composables/useSanityImage'
import { useLineRevealAnimation } from '~/composables/useLineRevealAnimation'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  section: {
    type: Object,
    default: () => ({}),
  },
})

const { getImageSrc } = useSanityImage()
const { animateLineReveal } = useLineRevealAnimation()

const wrapRef = ref(null)
const titleRef = ref(null)
const progressRef = ref(null)

const showTextBefore = computed(() => props.section?.scrollSliderShowTextBefore === true)
const textBefore = computed(() => props.section?.scrollSliderTextBefore || [])
const introAnimation = computed(() => props.section?.scrollSliderIntroAnimation || 'none')
const slides = computed(() => props.section?.scrollSliderSlides || [])

const firstSlideImage = computed(() => {
  const slide = slides.value[0]
  const asset = slide?.image?.asset
  return asset ? getImageSrc(asset) : ''
})

const activeSlide = ref(0)
let scrollTriggerInstance = null

watch(activeSlide, () => {
  nextTick(() => {
    if (titleRef.value) {
      animateLineReveal(titleRef.value)
    }
  })
}, { immediate: true })

function getSlideImageUrl(slide) {
  const asset = slide?.image?.asset
  return asset ? getImageSrc(asset) : ''
}

function animateNewSlide(index) {
  if (!import.meta.client || !wrapRef.value) return

  const imagesEl = wrapRef.value.querySelector('.scroll-slider__images')
  const indicesEl = wrapRef.value.querySelector('.scroll-slider__indices')

  if (!imagesEl) return

  const slide = slides.value[index]
  if (!slide) return

  const imgUrl = getSlideImageUrl(slide)
  if (imgUrl) {
    const newImg = document.createElement('img')
    newImg.src = imgUrl
    newImg.alt = slide.title || `Slide ${index + 1}`
    newImg.className = 'scroll-slider__img'

    gsap.set(newImg, { opacity: 0, scale: 1.1 })
    imagesEl.appendChild(newImg)

    gsap.to(newImg, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    gsap.to(newImg, { scale: 1, duration: 1, ease: 'power2.out' })

    const allImgs = imagesEl.querySelectorAll('.scroll-slider__img')
    if (allImgs.length > 3) {
      for (let i = 0; i < allImgs.length - 3; i++) {
        imagesEl.removeChild(allImgs[i])
      }
    }
  }

  if (indicesEl) {
    const items = indicesEl.querySelectorAll('.scroll-slider__index-item')
    items.forEach((item, i) => {
      const marker = item.querySelector('.scroll-slider__marker')
      const num = item.querySelector('.scroll-slider__index-num')
      if (i === index) {
        gsap.to(num, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(marker, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(num, { opacity: 0.5, duration: 0.3, ease: 'power2.out' })
        gsap.to(marker, { scaleX: 0, duration: 0.3, ease: 'power2.out' })
      }
    })
  }
}

function initScrollSlider() {
  if (!import.meta.client || !wrapRef.value || slides.value.length === 0) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  const sliderEl = wrapRef.value.querySelector('.scroll-slider__slider')
  const progressEl = progressRef.value
  if (!sliderEl || !progressEl) return

  const pinDistance = window.innerHeight * slides.value.length

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: sliderEl,
    start: 'top top',
    end: `+=${pinDistance}px`,
    scrub: 1,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      gsap.set(progressEl, { scaleY: self.progress })
      const currentSlide = Math.floor(self.progress * slides.value.length)
      if (activeSlide.value !== currentSlide && currentSlide < slides.value.length) {
        activeSlide.value = currentSlide
        animateNewSlide(activeSlide.value)
      }
    },
  })
}

onMounted(() => {
  if (!import.meta.client) return
  nextTick(() => {
    if (document.body.classList.contains('preloader-complete')) {
      initScrollSlider()
    } else {
      document.addEventListener('preloader-complete', initScrollSlider, { once: true })
    }
  })
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', () => {
    nextTick(() => ScrollTrigger.refresh())
  })
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<style scoped>
.scroll-slider {
  position: relative;
}
.scroll-slider__slider {
  --text-color:white;
  color: var(--text-color);
}

.scroll-slider__slider {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
}

.scroll-slider__images {
  position: absolute;
  inset: 0;
}

.scroll-slider__images::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
}

.scroll-slider__images :deep(img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center;
  will-change: transform, opacity;
}

.scroll-slider__title {
  position: absolute;
  top: 50%;
  left: var(--unit-grid);
  transform: translateY(-50%);
  width: 50%;
  color: var(--text-color);
  overflow: hidden;
}

.scroll-slider__title-text {
  margin: 0;
}

.scroll-slider__indicator {
  position: absolute;
  top: 50%;
  right: var(--unit-grid);
  transform: translateY(-50%);
}

.scroll-slider__indices {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit-grid) * 0.5);
  padding: calc(var(--unit-grid) * 0.25);
}

.scroll-slider__index-item {
  display: flex;
  align-items: center;
  gap: calc(var(--unit-grid) * 0.25);
  margin: 0;
}

.scroll-slider__index-num {
  position: relative;
  width: calc(var(--unit-grid) * 0.25);
  display: flex;
  justify-content: flex-end;
  will-change: opacity;
}

.scroll-slider__index-item:not(.is--active) .scroll-slider__index-num {
  opacity: 0.5;
}

.scroll-slider__marker {
  position: relative;
  width: calc(var(--unit-grid) * 0.25);
  height: 1px;
  background-color: currentColor;
  transform-origin: right;
  will-change: transform;
}

.scroll-slider__index-item:not(.is--active) .scroll-slider__marker {
  transform: scaleX(0);
}

.scroll-slider__progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.35);
}

.scroll-slider__progress {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scaleY(0);
  width: 3px;
  height: 100%;
  background-color: currentColor;
  transform-origin: top;
  will-change: transform;
}

@media (max-width: 1000px) {
  .scroll-slider__title {
    top: 5rem;
    left: 0;
    transform: none;
    width: 100%;
    padding: 2rem;
  }

  .scroll-slider__title-text {
    font-size: 2rem;
    letter-spacing: 0;
  }

  .scroll-slider__indicator {
    top: unset;
    transform: none;
    bottom: 2rem;
  }
}
</style>
