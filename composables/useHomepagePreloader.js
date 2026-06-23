const ENTRY_PATH_KEY = 'roleplay-entry-path'
const PRELOADER_DONE_KEY = 'roleplay-home-preloader-done'

export function isHomepagePath(path) {
  return path === '/' || path === '/home'
}

export function shouldShowHomepagePreloader() {
  if (!import.meta.client) return false

  const path = window.location.pathname
  if (!isHomepagePath(path)) return false

  const nav = performance.getEntriesByType('navigation')[0]
  if (nav?.type === 'reload') return true

  const entryPath = sessionStorage.getItem(ENTRY_PATH_KEY)
  if (!entryPath) {
    sessionStorage.setItem(ENTRY_PATH_KEY, path)
    return true
  }

  if (!isHomepagePath(entryPath)) return false

  return !sessionStorage.getItem(PRELOADER_DONE_KEY)
}

export function markHomepagePreloaderDone() {
  if (!import.meta.client) return
  sessionStorage.setItem(PRELOADER_DONE_KEY, '1')
}

export function useHomepagePreloader() {
  return {
    isHomepagePath,
    shouldShowHomepagePreloader,
    markHomepagePreloaderDone,
  }
}
