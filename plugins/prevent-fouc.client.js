export default defineNuxtPlugin({
  name: 'prevent-fouc',
  enforce: 'pre',
  setup() {
    let isReady = false

    function reveal() {
      if (isReady) return
      isReady = true
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.add('css-loaded')
        })
      })
    }

    /** Wait for all stylesheet links to load before revealing (prevents FOUC) */
    function waitForStylesheets() {
      const links = document.querySelectorAll('link[rel="stylesheet"]')
      if (links.length === 0) return Promise.resolve()

      let pending = links.length
      return new Promise((resolve) => {
        const check = () => {
          if (--pending <= 0) resolve()
        }
        links.forEach((link) => {
          if (link.sheet) {
            check()
          } else {
            link.addEventListener('load', check)
            link.addEventListener('error', check)
          }
        })
        // Fallback: resolve after 2s in case some links never fire
        setTimeout(resolve, 2000)
      })
    }

    function showContent() {
      waitForStylesheets().then(() => {
        if (document.fonts?.ready) {
          const fontTimeout = setTimeout(reveal, 1200)
          document.fonts.ready.then(() => {
            clearTimeout(fontTimeout)
            reveal()
          }).catch(reveal)
        } else {
          reveal()
        }
      })
    }

    function waitForLoad() {
      if (document.readyState === 'complete') {
        showContent()
      } else {
        window.addEventListener('load', showContent, { once: true })
        setTimeout(() => {
          if (!isReady) showContent()
        }, 3500)
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', waitForLoad)
    } else {
      waitForLoad()
    }
  },
})
