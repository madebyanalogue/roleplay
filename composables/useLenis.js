let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

export function useLenis() {
  const scrollTo = (target, options = {}) => {
    if (!import.meta.client) return

    if (lenisInstance) {
      lenisInstance.scrollTo(target, options)
      return
    }

    if (typeof target === 'number') {
      window.scrollTo(0, target)
      return
    }

    if (typeof target === 'string') {
      const el = document.querySelector(target)
      if (el) {
        el.scrollIntoView(options)
      }
    }
  }

  const stop = () => {
    lenisInstance?.stop()
  }

  const start = () => {
    lenisInstance?.start()
  }

  return {
    get lenis() {
      return lenisInstance
    },
    scrollTo,
    stop,
    start,
  }
}
