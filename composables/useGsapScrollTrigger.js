let gsapPromise = null
let refreshTimer = null

export async function loadGsapScrollTrigger() {
  if (!import.meta.client) {
    return { gsap: null, ScrollTrigger: null }
  }

  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    })
  }

  return gsapPromise
}

export function scheduleScrollTriggerRefresh(delay = 120) {
  if (!import.meta.client) return

  if (refreshTimer) clearTimeout(refreshTimer)

  refreshTimer = setTimeout(async () => {
    refreshTimer = null
    const { ScrollTrigger } = await loadGsapScrollTrigger()
    if (!ScrollTrigger) return
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  }, delay)
}

export function constrainPinSpacerWidth(scrollTrigger, referenceEl) {
  const spacer = scrollTrigger?.pinSpacer
  const pinEl = scrollTrigger?.pin || referenceEl
  if (!pinEl || !spacer) return

  const container =
    pinEl.closest('.page') ||
    pinEl.closest('.page-section') ||
    pinEl.parentElement

  const width = container?.offsetWidth || pinEl.offsetWidth
  if (width > 0) {
    spacer.style.width = `${width}px`
    spacer.style.maxWidth = `${width}px`
  }

  spacer.style.overflow = 'hidden'
  spacer.style.boxSizing = 'border-box'
}
