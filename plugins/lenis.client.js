import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenis } from '~/composables/useLenis'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  let lenis = null
  let tickerFn = null

  async function initLenis() {
    if (lenis) return

    const { gsap, ScrollTrigger } = await loadGsapScrollTrigger()
    if (!gsap || !ScrollTrigger) return

    lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
    })

    setLenis(lenis)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    lenis.on('scroll', ScrollTrigger.update)

    tickerFn = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }

  function startWhenReady() {
    if (document.body.classList.contains('preloader-complete')) {
      initLenis()
      return
    }

    document.addEventListener('preloader-complete', initLenis, { once: true })
  }

  nuxtApp.hook('app:mounted', startWhenReady)

  nuxtApp.hook('page:finish', () => {
    if (!lenis) return

    nextTick(() => {
      loadGsapScrollTrigger().then(({ ScrollTrigger }) => {
        ScrollTrigger?.refresh()
      })
    })
  })
})
