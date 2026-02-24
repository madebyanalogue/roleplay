import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick } from 'vue'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function initLineRevealTestimonials() {
  const wraps = document.querySelectorAll('[data-testimonial-wrap]')
  if (!wraps.length) return

  wraps.forEach((wrap) => {
    if (wrap.hasAttribute('data-testimonial-initialized')) return

    const list = wrap.querySelector('[data-testimonial-list]')
    if (!list) return

    const items = Array.from(list.querySelectorAll('[data-testimonial-item]'))
    if (!items.length) return

    const btnPrev = wrap.querySelector('[data-prev]')
    const btnNext = wrap.querySelector('[data-next]')
    const elCurrent = wrap.querySelector('[data-current]')
    const elTotal = wrap.querySelector('[data-total]')

    if (elTotal) elTotal.textContent = String(items.length)

    let activeIndex = items.findIndex((el) => el.classList.contains('is--active'))
    if (activeIndex < 0) activeIndex = 0

    let isAnimating = false
    let reduceMotion = false

    const autoplayEnabled = wrap.getAttribute('data-autoplay') === 'true'
    const autoplayDuration = parseInt(wrap.getAttribute('data-autoplay-duration'), 10) || 4000

    let autoplayCall = null
    let isInView = true

    const slides = items.map((item) => {
      const splitTargets = [
        item.querySelector('[data-testimonial-text]'),
        ...item.querySelectorAll('[data-testimonial-split]'),
      ].filter(Boolean)

      return {
        item,
        image: item.querySelector('[data-testimonial-img]'),
        largeImage: item.querySelector('.testimonial-lines__large-image'),
        splitTargets,
        splitInstances: [],
        getLines() {
          return this.splitInstances.flatMap((instance) => (instance?.lines || []))
        },
      }
    })

    function setSlideState(slideIndex, isActive) {
      const { item } = slides[slideIndex]
      item.classList.toggle('is--active', isActive)
      item.setAttribute('aria-hidden', String(!isActive))
      gsap.set(item, {
        autoAlpha: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
      })
    }

    function updateCounter() {
      if (elCurrent) elCurrent.textContent = String(activeIndex + 1)
    }

    function startAutoplay() {
      if (!autoplayEnabled) return
      if (autoplayCall) autoplayCall.kill()

      autoplayCall = gsap.delayedCall(autoplayDuration / 1000, () => {
        if (!isInView || isAnimating) {
          startAutoplay()
          return
        }
        goTo((activeIndex + 1) % slides.length)
        startAutoplay()
      })
    }

    function pauseAutoplay() {
      if (autoplayCall) autoplayCall.pause()
    }

    function resumeAutoplay() {
      if (!autoplayEnabled) return
      if (!autoplayCall) startAutoplay()
      else autoplayCall.resume()
    }

    function resetAutoplay() {
      if (!autoplayEnabled) return
      startAutoplay()
    }

    slides.forEach((slide, i) => {
      setSlideState(i, i === activeIndex)
      if (slide.largeImage) {
        gsap.set(slide.largeImage, { autoAlpha: i === activeIndex ? 1 : 0, scale: i === activeIndex ? 1 : 0.98 })
      }
    })
    updateCounter()

    gsap.matchMedia().add({ reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
      reduceMotion = context.conditions.reduce
    })

    slides.forEach((slide, slideIndex) => {
      slide.splitInstances = slide.splitTargets
        .map((el) => {
          try {
            const instance = new SplitType(el, {
              types: 'lines',
              lineClass: 'text-line',
            })
            if (instance?.lines?.length && !reduceMotion) {
              el.style.overflow = 'hidden'
              // Wrap each line in a mask div (like GSAP SplitText mask: "lines")
              // so text crops into the line boundaries during yPercent animation
              instance.lines.forEach((line) => {
                const mask = document.createElement('div')
                mask.className = 'text-line-mask'
                line.parentNode.insertBefore(mask, line)
                mask.appendChild(line)
              })
              gsap.set(instance.lines, { yPercent: slideIndex === activeIndex ? 0 : 110 })
              if (slide.image) {
                gsap.set(slide.image, {
                  clipPath: slideIndex === activeIndex ? 'circle(50% at 50% 50%)' : 'circle(0% at 50% 50%)',
                })
              }
              if (slide.largeImage) {
                gsap.set(slide.largeImage, {
                  autoAlpha: slideIndex === activeIndex ? 1 : 0,
                  scale: slideIndex === activeIndex ? 1 : 0.98,
                })
              }
            }
            return instance
          } catch (e) {
            return null
          }
        })
        .filter(Boolean)
    })

    function goTo(nextIndex) {
      if (isAnimating || nextIndex === activeIndex) return
      isAnimating = true

      const outgoingSlide = slides[activeIndex]
      const incomingSlide = slides[nextIndex]

      const tl = gsap.timeline({
        onComplete: () => {
          setSlideState(activeIndex, false)
          setSlideState(nextIndex, true)
          activeIndex = nextIndex
          updateCounter()
          isAnimating = false
        },
      })

      if (reduceMotion) {
        tl.to(outgoingSlide.item, { autoAlpha: 0, duration: 0.4, ease: 'power2' }, 0)
        tl.fromTo(incomingSlide.item, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power2' }, 0)
        if (outgoingSlide.largeImage) tl.to(outgoingSlide.largeImage, { autoAlpha: 0, duration: 0.4, ease: 'power2' }, 0)
        if (incomingSlide.largeImage) tl.to(incomingSlide.largeImage, { autoAlpha: 1, duration: 0.4, ease: 'power2' }, 0)
        return
      }

      const outgoingLines = outgoingSlide.getLines()
      const incomingLines = incomingSlide.getLines()

      gsap.set(incomingSlide.item, { autoAlpha: 1, pointerEvents: 'auto' })
      gsap.set(incomingLines, { yPercent: 110 })

      if (incomingSlide.image) gsap.set(incomingSlide.image, { clipPath: 'circle(0% at 50% 50%)' })
      if (outgoingSlide.image) gsap.set(outgoingSlide.image, { clipPath: 'circle(50% at 50% 50%)' })
      if (incomingSlide.largeImage) gsap.set(incomingSlide.largeImage, { autoAlpha: 0, scale: 0.98 })
      if (outgoingSlide.largeImage) gsap.set(outgoingSlide.largeImage, { autoAlpha: 1, scale: 1 })

      tl.to(
        outgoingLines,
        {
          yPercent: -110,
          duration: 0.6,
          ease: 'power4.inOut',
          stagger: { amount: 0.25 },
        },
        0
      )

      if (outgoingSlide.image) {
        tl.to(
          outgoingSlide.image,
          {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 0.6,
            ease: 'power4.inOut',
          },
          0
        )
      }

      if (outgoingSlide.largeImage) {
        tl.to(
          outgoingSlide.largeImage,
          {
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.6,
            ease: 'power4.inOut',
          },
          0
        )
      }

      tl.to(
        incomingLines,
        {
          yPercent: 0,
          duration: 0.7,
          ease: 'power4.inOut',
          stagger: { amount: 0.4 },
        },
        '>-=0.3'
      )

      if (incomingSlide.image) {
        tl.to(
          incomingSlide.image,
          {
            clipPath: 'circle(50% at 50% 50%)',
            duration: 0.75,
            ease: 'power4.inOut',
          },
          '<'
        )
      }

      if (incomingSlide.largeImage) {
        tl.to(
          incomingSlide.largeImage,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.75,
            ease: 'power4.inOut',
          },
          '<'
        )
      }

      tl.set(outgoingSlide.item, { autoAlpha: 0 }, '>')
    }

    startAutoplay()

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        resetAutoplay()
        goTo((activeIndex + 1) % slides.length)
      })
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        resetAutoplay()
        goTo((activeIndex - 1 + slides.length) % slides.length)
      })
    }

    function onKeyDown(e) {
      if (!isInView) return

      const t = e.target
      const isTypingTarget =
        t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)

      if (isTypingTarget) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        resetAutoplay()
        goTo((activeIndex + 1) % slides.length)
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        resetAutoplay()
        goTo((activeIndex - 1 + slides.length) % slides.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        isInView = true
        resumeAutoplay()
      },
      onEnterBack: () => {
        isInView = true
        resumeAutoplay()
      },
      onLeave: () => {
        isInView = false
        pauseAutoplay()
      },
      onLeaveBack: () => {
        isInView = false
        pauseAutoplay()
      },
    })

    wrap.setAttribute('data-testimonial-initialized', '')
  })
}

export { initLineRevealTestimonials }

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const init = () => {
      initLineRevealTestimonials()
    }
    nuxtApp.provide('initTestimonials', init)
    // Run after hydration to avoid DOM mismatch (SplitType modifies DOM structure)
    nuxtApp.hook('app:mounted', () => {
      nextTick(init)
    })
    nuxtApp.hook('page:finish', () => {
      nextTick(init)
    })
  }
})
