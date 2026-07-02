<template>
  <div
    v-if="active"
    class="preloader-homepage"
    data-loading-container
  >
    <div ref="panelRef" class="preloader-homepage__panel orange">
      <div ref="lottieWrapRef" class="preloader-homepage__lottie">
        <LottieAnimation
          ref="lottieRef"
          :animation-data="showPreloaderLottie ? footerLottieAnimationData : undefined"
          :path="showPreloaderLottie ? '' : '/lottie/roleplay.lottie'"
          :loop="false"
          :autoplay="false"
          class-name="preloader-lottie"
          aria-label="Roleplay"
          @ready="onLottieReady"
          @complete="onLottieComplete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  markHomepagePreloaderDone,
  shouldShowHomepagePreloader,
} from '~/composables/useHomepagePreloader'

const props = defineProps({
  autoHide: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['preloader-complete', 'preloader-ready'])

const {
  disablePreloader,
  footerLottieAnimation,
  footerLottieAnimationData,
} = useSiteSettings()

const showPreloaderLottie = computed(
  () => footerLottieAnimation.value && footerLottieAnimationData.value,
)

const active = ref(false)
const panelRef = ref(null)
const lottieWrapRef = ref(null)
const lottieRef = ref(null)

let animationTimeline = null
let started = false
let lottieCompleteResolve = null
let lottieReadyResolve = null

function onLottieReady() {
  lottieRef.value?.resize?.()
  lottieReadyResolve?.()
}

function onLottieComplete() {
  lottieCompleteResolve?.()
}

function lockScroll() {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

function finishPreloader() {
  markHomepagePreloaderDone()
  active.value = false
  unlockScroll()
  document.body.classList.remove('homepage-intro-pending')
  document.body.classList.add('preloader-complete')
  document.dispatchEvent(new CustomEvent('preloader-complete'))
  emit('preloader-complete')
}

function skipPreloader() {
  if (started) return
  started = true
  active.value = false
  unlockScroll()
  document.body.classList.remove('homepage-intro-pending')
  document.body.classList.add('preloader-ready')
  document.body.classList.add('preloader-complete')
  emit('preloader-ready')
  emit('preloader-complete')
  document.dispatchEvent(new CustomEvent('preloader-complete'))
}

function runHomepageIntroAnimations(gsap) {
  const header = document.querySelector('.header')
  const heroColumns = document.querySelectorAll('.hero-carousel__desktop .hero-carousel__column')

  if (header) {
    gsap.fromTo(
      header,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.9, ease: 'power2.out' },
    )
  }

  if (heroColumns.length > 0) {
    gsap.set(heroColumns, { transformOrigin: 'center center' })
    gsap.fromTo(
      heroColumns[0],
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
    )
  }

  if (heroColumns.length > 1) {
    gsap.fromTo(
      heroColumns[1],
      { autoAlpha: 0, scale: 0.9 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        delay: 0.15,
        ease: 'power2.out',
      },
    )
  }
}

async function initHomepagePreloader() {
  if (!import.meta.client || started) return
  started = true
  active.value = true
  lockScroll()
  document.body.classList.add('homepage-intro-pending')

  await nextTick()

  const { gsap } = await import('gsap')
  if (!gsap) {
    finishPreloader()
    return
  }

  const panel = panelRef.value
  const lottieWrap = lottieWrapRef.value

  if (!panel || !lottieWrap || !lottieRef.value) {
    finishPreloader()
    return
  }

  gsap.set(panel, { clipPath: 'inset(0% 0% 0% 0%)' })
  gsap.set(lottieWrap, { y: 0 })

  await new Promise((resolve) => {
    lottieReadyResolve = resolve
    if (lottieRef.value?.getAnimation?.()) resolve()
    setTimeout(resolve, 3000)
  })
  lottieReadyResolve = null

  emit('preloader-ready')
  document.body.classList.add('preloader-ready')

  await Promise.race([
    new Promise((resolve) => {
      lottieCompleteResolve = resolve
      lottieRef.value.play()
    }),
    new Promise((resolve) => setTimeout(resolve, 5000)),
  ])
  lottieCompleteResolve = null

  const wipeDuration = 1
  const lottieParallaxFactor = 1.2

  animationTimeline = gsap.timeline({
    onComplete: () => {
      if (props.autoHide) finishPreloader()
    },
  })

  animationTimeline.add(() => {
    runHomepageIntroAnimations(gsap)
  })

  animationTimeline.to(
    panel,
    {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: wipeDuration,
      ease: 'power2.inOut',
    },
    'wipe',
  )

  animationTimeline.to(
    lottieWrap,
    {
      yPercent: -18,
      duration: wipeDuration * lottieParallaxFactor,
      ease: 'power2.inOut',
    },
    'wipe',
  )
}

function bootstrap() {
  if (!import.meta.client) return

  if (disablePreloader.value || !shouldShowHomepagePreloader()) {
    skipPreloader()
    return
  }

  initHomepagePreloader()
}

watch(
  disablePreloader,
  (disabled) => {
    if (disabled) skipPreloader()
  },
  { immediate: true },
)

onMounted(() => {
  if (!disablePreloader.value) {
    bootstrap()
  }
})

onUnmounted(() => {
  animationTimeline?.kill()
  animationTimeline = null
  unlockScroll()
})
</script>

<style scoped>
.preloader-homepage {
  position: fixed;
  inset: 0;
  z-index: 99999;
  pointer-events: auto;
  --max-width: 1400px;
}

.preloader-homepage__panel {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  will-change: clip-path;
}

.preloader-homepage__lottie {
  /* Match footer: full content width inside site max-width, minus footer-like padding */
  --preloader-lottie-width: min(calc(100vw - 6.25rem), var(--max-width, 1800px));
  width: var(--preloader-lottie-width);
  max-width: 100%;
  will-change: transform;
}

.preloader-homepage__lottie :deep(.lottie-animation) {
  width: 100%;
}

.preloader-homepage__lottie :deep(.lottie-animation svg),
.preloader-homepage__lottie :deep(.lottie-animation canvas) {
  width: 100% !important;
  height: auto !important;
  max-width: 100%;
}




:is(.wf-design-mode, .w-editor) .preloader-homepage {
  display: none;
}
</style>
