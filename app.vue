<template>
  <ClientOnly>
    <Preloader 
      @preloader-complete="onPreloaderComplete" 
      @preloader-ready="onPreloaderReady" 
    />
  </ClientOnly>
  
  <div v-if="preloaderReady || disablePreloader" id="app" :style="appStyles">
    <Header />
    <main class="page-wrapper">
      <NuxtPage />
    </main>
    <Footer :class="{ 'footer-fade-out': isNavigating }" />
  </div>
  <!-- Body teleport: avoids transformed/layout ancestors breaking fixed centering + GSAP FLIP -->
  <Teleport to="body">
    <div
      data-click-zoom-lightbox
      class="click-zoom__lightbox"
      aria-hidden="true"
    />
  </Teleport>
</template>

<script setup>
import Preloader from '~/components/Preloader.vue'
import { useSiteSettings } from '~/composables/useSiteSettings'
import { providePageLoading } from '~/composables/usePageLoading'

const { 
  maxWidth, 
  seoTitle, 
  seoDescription, 
  facebookShareImage,
  mobileBreakpoint,
  headerType,
  disablePreloader,
} = useSiteSettings()

// Preloader state - hide content until preloader is ready
const preloaderReady = ref(false)

// Page loading state - track when pages are loading
const { isLoading: isPageLoading } = providePageLoading()

// Store header height to prevent useHead from resetting it
// Initialize from sessionStorage if available, otherwise default to 0px
const currentHeaderHeight = ref('0px')

// Initialize from sessionStorage on client side
if (process.client) {
  const stored = sessionStorage.getItem('header-height')
  if (stored) {
    currentHeaderHeight.value = stored
  }
}

// Preloader handlers
const onPreloaderReady = () => {
  // Preloader is ready to start, show content
  preloaderReady.value = true
  if (process.client) {
    document.body.classList.add('preloader-ready')
    // Update header height once header is rendered
    nextTick(() => {
      updateHeaderHeight()
    })
  }
}

const onPreloaderComplete = () => {
  // Preloader animation finished, site is ready
  if (process.client) {
    document.body.classList.add('preloader-complete')
    // Ensure header height is updated after preloader completes
    nextTick(() => {
      updateHeaderHeight()
    })
  }
}

// If preloader is disabled, show content immediately
watch(disablePreloader, (disabled) => {
  if (disabled) {
    preloaderReady.value = true
    if (process.client) {
      document.body.classList.add('preloader-ready')
      document.body.classList.add('preloader-complete')
    }
  }
}, { immediate: true })

// Inject layout variables (breakpoint, header height). Gutters: see main.css :root.
useHead(() => ({
  htmlAttrs: {
    lang: 'en',
    class: headerType.value === 'static' ? 'header-static' : '',
    style: `
      --header-height: ${currentHeaderHeight.value};
      --mobile-breakpoint: ${mobileBreakpoint.value};
    `,
  },
}))

const appStyles = computed(() => {
  return {
    '--max-width': maxWidth.value || '1800px',
    '--mobile-breakpoint': `${mobileBreakpoint.value}`,
  }
})

// Track if this is the initial page load
const isInitialLoad = ref(true)
// Footer / shell coordination during page transition
const isNavigating = ref(false)
const route = useRoute()
let previousPath = route.path

// Store ResizeObserver for cleanup
let headerResizeObserver = null

onUnmounted(() => {
  if (headerResizeObserver) {
    headerResizeObserver.disconnect()
    headerResizeObserver = null
  }
})

const updateLayoutCssVars = () => {
  if (process.client) {
    document.documentElement.style.setProperty('--mobile-breakpoint', `${mobileBreakpoint.value}`)
  }
}

// Update header height CSS variable (only on window resize or initial load)
const updateHeaderHeight = () => {
  if (process.client) {
    const header = document.querySelector('.header')
    if (header) {
      const height = header.offsetHeight
      const heightValue = `${height}px`
      // Only update if height actually changed
      if (currentHeaderHeight.value !== heightValue) {
        // Update the ref so useHead uses the correct value
        currentHeaderHeight.value = heightValue
        // Store in sessionStorage for persistence across navigations
        sessionStorage.setItem('header-height', heightValue)
        // Set on html element for global access
        document.documentElement.style.setProperty('--header-height', heightValue)
      }
      return true // Return true if header was found and height was set
    }
  }
  return false // Return false if header not found
}

onMounted(async () => {
  updateLayoutCssVars()
  
  // Update header type class on html element
  const updateHeaderTypeClass = () => {
    if (process.client) {
      const html = document.documentElement
      if (headerType.value === 'static') {
        html.classList.add('header-static')
      } else {
        html.classList.remove('header-static')
      }
    }
  }
  updateHeaderTypeClass()
  
  // Set up header height - only update on window resize
  const setupHeaderHeight = () => {
    const header = document.querySelector('.header')
    if (header) {
      // Set initial header height from stored value or calculate if not stored
      const storedHeight = sessionStorage.getItem('header-height')
      if (storedHeight) {
        currentHeaderHeight.value = storedHeight
        document.documentElement.style.setProperty('--header-height', storedHeight)
      } else {
        // Only calculate on initial load if not stored
        updateHeaderHeight()
      }
      
      // Update header height on window resize only
      const handleResize = () => {
        updateHeaderHeight()
      }
      window.addEventListener('resize', handleResize, { passive: true })
      
      // Also use ResizeObserver on header for more precise resize detection
      headerResizeObserver = new ResizeObserver(() => {
        updateHeaderHeight()
      })
      headerResizeObserver.observe(header)
      
      return true
    }
    return false
  }
  
  // Try to set up header height management immediately, or wait for preloader if needed
  if (preloaderReady.value || disablePreloader.value) {
    // Header should be rendered, set up
    await nextTick()
    setupHeaderHeight()
  } else {
    // If header wasn't found, watch for preloaderReady and set up then
    const unwatch = watch(preloaderReady, (ready) => {
      if (ready) {
        nextTick(() => {
          if (setupHeaderHeight()) {
            unwatch() // Stop watching once set up
          }
        })
      }
    }, { immediate: true })
  }

  isInitialLoad.value = false
  previousPath = route.path
})

// Watch for route changes to detect navigation (not initial load)
watch(() => route.path, (newPath) => {
  if (!isInitialLoad.value && newPath !== previousPath) {
    isNavigating.value = true
    // Match page transition duration, then scroll and clear navigating state
    setTimeout(() => {
      if (process.client) {
        window.scrollTo(0, 0)
      }
      setTimeout(() => {
        isNavigating.value = false
      }, 50)
    }, 600)
  }
  previousPath = newPath
})

watch(mobileBreakpoint, () => {
  if (process.client) {
    updateLayoutCssVars()
  }
}, { immediate: false })

// Watch header type and update class
watch(headerType, () => {
  if (process.client) {
    const html = document.documentElement
    if (headerType.value === 'static') {
      html.classList.add('header-static')
    } else {
      html.classList.remove('header-static')
    }
  }
}, { immediate: false })

useHead(() => {
  const meta = []
  const siteTitle = seoTitle.value || 'Roleplay'
  const siteUrl = process.client ? window.location.origin : 'https://roleplay.example.com'
  const currentUrl = process.client ? window.location.href : siteUrl
  
  // Meta description
  if (seoDescription.value) {
    meta.push({
      name: 'description',
      content: seoDescription.value,
    })
  }
  
  // Open Graph / Facebook
  meta.push(
    {
      property: 'og:title',
      content: siteTitle,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:site_name',
      content: siteTitle,
    },
    {
      property: 'og:url',
      content: currentUrl,
    }
  )
  
  if (seoDescription.value) {
    meta.push({
      property: 'og:description',
      content: seoDescription.value,
    })
  }
  
  // OG Image with dimensions
  if (facebookShareImage.value) {
    meta.push(
      {
        property: 'og:image',
        content: facebookShareImage.value,
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      }
    )
  }
  
  // Twitter Card
  meta.push(
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: siteTitle,
    }
  )
  
  if (seoDescription.value) {
    meta.push({
      name: 'twitter:description',
      content: seoDescription.value,
    })
  }
  
  if (facebookShareImage.value) {
    meta.push({
      name: 'twitter:image',
      content: facebookShareImage.value,
    })
  }
  
  return {
    title: siteTitle,
    meta,
  }
})
</script>

<style>
/* Hide content until preloader is ready */
body:not(.preloader-ready) #app {
  visibility: hidden;
  opacity: 0;
}

body.preloader-ready #app {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-in;
}

/* Page wrapper to ensure stable DOM structure during transitions */
.page-wrapper {
  min-height: 1px; /* Ensure wrapper has height */
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.6s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Footer fades with page transition */
.footer-fade-out {
  opacity: 0;
  transition: opacity 0.6s ease;
}

/* Footer fade-in transition */
.fade-enter-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
}

/* Footer hidden state - use opacity to prevent layout shifts */
.footer-hidden {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>

