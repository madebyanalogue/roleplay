import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { nextTick } from 'vue'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, Flip)

function initHighlightText() {
  const headings = document.querySelectorAll('[data-highlight-text]')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !headings.length) return

  headings.forEach((heading) => {
    const scrollStart = heading.getAttribute('data-highlight-scroll-start') || 'top 90%'
    const scrollEnd = heading.getAttribute('data-highlight-scroll-end') || 'center 40%'
    const fadedValue = parseFloat(heading.getAttribute('data-highlight-fade')) || 0.2
    const staggerValue = parseFloat(heading.getAttribute('data-highlight-stagger')) || 0.01

    try {
      const split = new SplitType(heading, {
        types: 'words, chars',
      })
      if (!split.chars?.length) return

      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: true,
          trigger: heading,
          start: scrollStart,
          end: scrollEnd,
        },
      })
      tl.from(split.chars, {
        autoAlpha: fadedValue,
        stagger: staggerValue,
        ease: 'linear',
      })
    } catch (e) {
      // SplitType can fail on empty/simple content
    }
  })
}

function initFlipOnScroll() {
  const roots = document.querySelectorAll('[data-scaling-reveal-init]')
  if (!roots.length) return

  roots.forEach((root) => {
    const smallWrapper = root.querySelector('.scaling-reveal__small-box [data-flip-element="wrapper"]')
    const slot = root.querySelector('.scaling-reveal__flip-destination .scaling-reveal__slot[data-flip-element="wrapper"]')
    const targetEl = root.querySelector('[data-flip-element="target"]')
    if (!targetEl || !smallWrapper || !slot) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      slot.appendChild(targetEl)
      targetEl.style.position = 'absolute'
      targetEl.style.inset = '0'
      const firstSlideText = root.querySelector('[data-flip-element="target"] [data-slide-text]')
      if (firstSlideText) firstSlideText.classList.add('is--visible')
      return
    }

    let tl = null

    function flipTimeline() {
      if (tl) {
        tl.kill()
        gsap.set(targetEl, { clearProps: 'all' })
      }

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: smallWrapper,
          start: 'center center',
          endTrigger: slot,
          end: 'center center',
          scrub: 0.25,
          onUpdate: (self) => {
            if (self.progress >= 0.99) {
              const firstSlideText = root.querySelector('[data-flip-element="target"] [data-slide-text]')
              if (firstSlideText) firstSlideText.classList.add('is--visible')
            }
          },
        },
      })

      const slotRect = slot.getBoundingClientRect()
      const smallRect = smallWrapper.getBoundingClientRect()
      const slotCenter = slotRect.top + window.pageYOffset + slotRect.height / 2
      const smallCenter = smallRect.top + window.pageYOffset + smallRect.height / 2
      const offset = slotCenter - smallCenter

      tl.add(
        Flip.fit(targetEl, slot, {
          duration: offset,
          ease: 'none',
        })
      )
    }

    flipTimeline()

    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(flipTimeline, 100)
    })
  })
}

function initLineReveal() {
  const elements = document.querySelectorAll('[data-line-reveal]')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !elements.length) return

  elements.forEach((el) => {
    try {
      const split = new SplitType(el, { types: 'lines' })
      if (!split.lines?.length) return

      gsap.set(split.lines, { yPercent: 100, opacity: 0 })

      const scrollStart = el.getAttribute('data-line-reveal-start') || 'top 85%'
      const scrollEnd = el.getAttribute('data-line-reveal-end') || 'center 50%'
      const duration = parseFloat(el.getAttribute('data-line-reveal-duration')) || 0.75
      const stagger = parseFloat(el.getAttribute('data-line-reveal-stagger')) || 0.1

      gsap.to(split.lines, {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      })
    } catch (e) {
      // SplitType can fail on empty/simple content
    }
  })
}

function initHorizontalScrolling() {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isMobile: '(max-width:479px)',
      isMobileLandscape: '(max-width:767px)',
      isTablet: '(max-width:991px)',
      isDesktop: '(min-width:992px)',
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions

      const ctx = gsap.context(() => {
        const wrappers = document.querySelectorAll('[data-horizontal-scroll-wrap]')
        if (!wrappers.length) return

        wrappers.forEach((wrap) => {
          const disable = wrap.getAttribute('data-horizontal-scroll-disable')
          if (
            (disable === 'mobile' && isMobile) ||
            (disable === 'mobileLandscape' && isMobileLandscape) ||
            (disable === 'tablet' && isTablet)
          ) {
            return
          }

          const panels = gsap.utils.toArray('[data-horizontal-scroll-panel]', wrap)
          if (panels.length < 2) return

          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (reduceMotion) return

          const getScrollDistance = () => {
            const dist = wrap.scrollWidth - window.innerWidth
            return dist > 0 ? dist : (panels.length - 1) * window.innerWidth
          }

          gsap.to(panels, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: () => `+=${getScrollDistance()}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress
                const slideInView = Math.min(
                  Math.floor(progress * panels.length),
                  panels.length - 1
                )
                panels.forEach((panel, i) => {
                  const textEl = panel.querySelector('[data-slide-text]')
                  if (textEl) textEl.classList.toggle('is--visible', i === slideInView)
                })
              },
            },
          })
        })
      })

      return () => ctx.revert()
    }
  )
}

function init() {
  initHighlightText()
  initFlipOnScroll()
  initLineReveal()
  initHorizontalScrolling()
  requestAnimationFrame(() => ScrollTrigger.refresh())
  setTimeout(() => ScrollTrigger.refresh(), 150)
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hook('app:mounted', () => {
      nextTick(init)
    })
    nuxtApp.hook('page:finish', () => {
      nextTick(init)
    })
  }
})
