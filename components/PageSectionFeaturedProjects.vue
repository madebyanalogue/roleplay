<template>
  <section
    ref="sectionRef"
    class="featured-projects"
    data-featured-projects-scroll
  >
    <div ref="pinRef" class="featured-projects__pin grid gap-30 pad-gutter pad-top">
      <h2
        v-if="props.section.featuredProjectsTitle || props.section.title"
        class="featured-projects__title subtitle subtitle--circle orange-dot"
      >
        {{ props.section.featuredProjectsTitle || props.section.title }}
      </h2>

      <div ref="scrollRef" class="featured-projects__scroll">
        <div
          ref="viewportRef"
          class="featured-projects__viewport"
          :data-lenis-prevent="isMobileHorizontalScroll ? '' : undefined"
        >
          <div ref="trackRef" class="featured-projects__track">
          <article
            v-for="item in projects"
            :key="item.project?._id || item._key"
            class="featured-project"
          >
            <NuxtLink
              v-if="item.project?.slug?.current"
              :to="portfolioProjectPath(item.project.slug)"
              class="featured-project-link"
            >
              <div class="featured-project-image-container rounded-medium">
                <div class="featured-project-image-wrapper">
                  <PortfolioThumbnailMedia
                    :project="item.project"
                    image-class="featured-project-image"
                  />
                  <div class="portfolio-item-overlay pad-40">
                    <div
                      class="portfolio-item-overlay-bg"
                      aria-hidden="true"
                    />
                    <div class="portfolio-item-overlay-inner gap-40">
                      <h3 class="portfolio-item-overlay-title fluid-type line-height-1" style="--desktop:72;">
                        {{ item.project?.title }}
                      </h3>
                      <div class="portfolio-item-overlay-content gap-50">
                        <div
                          v-if="item.project?.thumbnailDescription"
                          class="portfolio-item-overlay-desc fluid-type pad-20 pad-bottom"
                          style="--desktop:36;"
                        >
                          {{ item.project.thumbnailDescription }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const DESKTOP_MQ = '(min-width: 1000px)'
const TRANSITION_SETTLE_MS = 650

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { portfolioProjectPath } = useSiteSettings()

const sectionRef = ref(null)
const pinRef = ref(null)
const scrollRef = ref(null)
const viewportRef = ref(null)
const trackRef = ref(null)
const nuxtApp = useNuxtApp()
const { isLoading: isPageLoading } = injectPageLoading()
let mmContext = null
let initTimer = null
let removePageFinishHook = () => {}

const projects = computed(() => props.section?.featuredProjects || [])

const isMobileHorizontalScroll = ref(false)
let mobileScrollMq = null
let syncMobileScrollMode = () => {}

const MAX_INIT_ATTEMPTS = 10
let initAttempts = 0

function getGutterPx() {
  if (!import.meta.client) return 20
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--gutter').trim()
  const value = Number.parseFloat(raw)
  return Number.isFinite(value) ? value : 20
}

function getPinStart() {
  return `bottom bottom-=${getGutterPx()}`
}

function getScrollDistance() {
  const track = trackRef.value
  const viewport = viewportRef.value
  if (!track || !viewport) return 0
  return Math.max(0, track.scrollWidth - viewport.clientWidth)
}

function constrainPinSpacer(scrollTrigger) {
  constrainPinSpacerWidth(scrollTrigger, sectionRef.value)
}

async function waitForMedia(root) {
  const images = root.querySelectorAll('img')
  const videos = root.querySelectorAll('video')

  await Promise.all([
    ...Array.from(images).map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete) {
            resolve()
            return
          }

          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        }),
    ),
    ...Array.from(videos).map(
      (video) =>
        new Promise((resolve) => {
          if (video.readyState >= 1) {
            resolve()
            return
          }

          video.addEventListener('loadedmetadata', resolve, { once: true })
          video.addEventListener('error', resolve, { once: true })
        }),
    ),
  ])
}

async function initInsideScroll() {
  mmContext?.revert()
  mmContext = null

  if (!import.meta.client || projects.value.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { gsap, ScrollTrigger } = await loadGsapScrollTrigger()
  if (!gsap || !ScrollTrigger) return

  mmContext = gsap.matchMedia()

  mmContext.add(DESKTOP_MQ, () => {
    let tween = null
    let scrollTrigger = null
    let cancelled = false

    const onResize = () => {
      scheduleScrollTriggerRefresh()
    }

    window.addEventListener('resize', onResize, { passive: true })

    const setup = async () => {
      const section = sectionRef.value
      const pin = pinRef.value
      const track = trackRef.value
      const viewport = viewportRef.value
      if (cancelled || !section || !pin || !track || !viewport) return

      await waitForMedia(section)
      if (cancelled) return

      await new Promise((resolve) => requestAnimationFrame(resolve))
      await new Promise((resolve) => requestAnimationFrame(resolve))
      if (cancelled) return

      const scrollDistance = getScrollDistance()
      if (scrollDistance <= 0) {
        if (projects.value.length > 1 && initAttempts < MAX_INIT_ATTEMPTS) {
          initAttempts += 1
          scheduleInitInsideScroll(150)
        }
        return
      }

      initAttempts = 0
      gsap.set(track, { x: 0 })

      tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
      })

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        pin: pin,
        pinSpacing: true,
        start: getPinStart,
        scrub: 0.45,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        end: () => `+=${getScrollDistance()}`,
        animation: tween,
        onRefresh(self) {
          constrainPinSpacer(self)
        },
        onEnter(self) {
          constrainPinSpacer(self)
        },
        onEnterBack(self) {
          constrainPinSpacer(self)
        },
      })

      constrainPinSpacer(scrollTrigger)
      scheduleScrollTriggerRefresh()

      section.dataset.featuredProjectsReady = 'true'
      document.dispatchEvent(new CustomEvent('featured-projects-scroll-ready'))
    }

    setup()

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      scrollTrigger?.kill()
      scrollTrigger = null
      tween?.kill()
      tween = null
      if (trackRef.value) {
        gsap.set(trackRef.value, { clearProps: 'transform' })
      }
    }
  })
}

function scheduleInitInsideScroll(delay = 0) {
  if (!import.meta.client) return
  if (initTimer) clearTimeout(initTimer)
  initTimer = setTimeout(async () => {
    initTimer = null
    await nextTick()
    initInsideScroll()
  }, delay)
}

function runWhenPreloaderReady(callback) {
  if (document.body.classList.contains('preloader-complete')) {
    callback()
    return
  }
  document.addEventListener('preloader-complete', callback, { once: true })
}

watch(
  () =>
    projects.value
      .map((item) =>
        [
          item._key,
          item.project?._id,
          item.project?.slug?.current,
          item.project?.featuredImage?.asset?.url,
          item.project?.featuredImageMobile?.asset?.url,
          item.project?.thumbnailMediaType,
          item.project?.thumbnailMediaTypeMobile,
          item.project?.featuredVideo?.asset?.url,
          item.project?.featuredVideoMobile?.asset?.url,
        ].join(':'),
      )
      .join('|'),
  () => {
    scheduleInitInsideScroll(TRANSITION_SETTLE_MS)
  },
)

watch(isPageLoading, (loading) => {
  if (loading) return
  scheduleInitInsideScroll(TRANSITION_SETTLE_MS)
})

onMounted(async () => {
  await nextTick()

  mobileScrollMq = window.matchMedia('(max-width: 999px)')
  syncMobileScrollMode = () => {
    isMobileHorizontalScroll.value = mobileScrollMq.matches
  }
  syncMobileScrollMode()
  mobileScrollMq.addEventListener('change', syncMobileScrollMode)

  removePageFinishHook = nuxtApp.hook('page:finish', () => {
    scheduleInitInsideScroll(TRANSITION_SETTLE_MS)
  })

  runWhenPreloaderReady(() => {
    scheduleInitInsideScroll()
  })
})

onActivated(() => {
  scheduleInitInsideScroll(TRANSITION_SETTLE_MS)
})

onUnmounted(() => {
  mobileScrollMq?.removeEventListener('change', syncMobileScrollMode)
  mobileScrollMq = null
  if (initTimer) clearTimeout(initTimer)
  initTimer = null
  removePageFinishHook()
  if (sectionRef.value) {
    delete sectionRef.value.dataset.featuredProjectsReady
  }
  mmContext?.revert()
  mmContext = null
})
</script>

<style scoped>
.featured-projects {
  --featured-project-max-height: calc(100dvh - var(--header-full) - var(--gutter) - var(--gutter));
  --featured-project-card-width: max(280px, calc(100cqw / 1.75));
  --featured-project-card-min-width: 280px;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;
}

.featured-projects__pin {
  width: 100%;
  min-width: 0;
}

.featured-projects__title {
  margin: 0;
  flex-shrink: 0;
}

.featured-projects__scroll {
  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow:hidden;
  border-radius: var(--rounded-medium);
}

.featured-projects__viewport {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  container-type: inline-size;
  container-name: featured-projects;
}

.featured-projects__track {
  display: flex;
  align-items: stretch;
  gap: var(--gutter);
  width: max-content;
  max-width: none;
  will-change: transform;
}

.featured-project {
  flex: 0 0 var(--featured-project-card-width);
  width: var(--featured-project-card-width);
  min-width: var(--featured-project-card-min-width);
  max-width: var(--featured-project-card-width);
}

.featured-project-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
}

.featured-project-image-container {
  width: 100%;
  height: min(
    calc(var(--featured-project-card-width) / 0.605),
    var(--featured-project-max-height)
  );
  position: relative;
  overflow: hidden;
}

.featured-project-image-wrapper {
  position: absolute;
  inset: 0;
}

.featured-project-image,
.featured-project-image-wrapper :deep(img),
.featured-project-image-wrapper :deep(video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  position: absolute;
  inset: 0;
}

.featured-project-image-wrapper :deep(video) {
  border: 0;
  pointer-events: none;
}

.portfolio-item-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  color: var(--white, #fff);
  opacity: 1;
  transition: opacity 0.18s ease;
  pointer-events: none;
  flex-direction: column;
}

.portfolio-item-overlay-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-color: var(--orange);
  opacity: 0;
  transition: opacity 0.6s ease 0s;
}

.portfolio-item-overlay-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 100%;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.4s ease 0s;
}

.portfolio-item-overlay-title {
  font-weight: normal;
  flex: 1;
}

.portfolio-item-overlay-content {
  display: flex;
  flex-direction: column;
  max-width: 28vw;
  line-height: 1.1;
}

.featured-project-link:hover .portfolio-item-overlay-bg,
.featured-project-link:focus-visible .portfolio-item-overlay-bg {
  opacity: 0.9;
  transition: opacity 0.5s ease 0s;
}

.featured-project-link:hover .portfolio-item-overlay-inner,
.featured-project-link:focus-visible .portfolio-item-overlay-inner {
  opacity: 1;
  transition: opacity 0.6s ease 0.3s;
}

@media (max-width: 999px) {
  .portfolio-item-overlay {
    display: none;
  }

  .featured-project-image.is-desktop-archive-img {
    display: none;
  }

  .featured-projects__viewport {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .featured-projects__viewport::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 1000px) {
  .featured-projects {
    --featured-project-card-width: max(320px, calc(100cqw / 3.33));
    --featured-project-card-min-width: 320px;
  }

  .featured-projects__viewport {
    overflow: hidden;
    border-radius: var(--rounded-medium);
    max-height: var(--featured-project-max-height);
  }

  .featured-project-image.is-mobile-archive-img {
    display: none;
  }
}

.featured-project-title {
  margin-top: calc(var(--gutter) / 1.5);
  margin-bottom: calc(var(--gutter) / 2);
  font-size: var(--font-size-body);
  font-weight: normal;
}

.featured-project-title span {
  display: inline-block;
  position: relative;
}

.featured-project-title span:after {
  content: '';
  position: absolute;
  bottom: var(--underline-offset);
  left: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.32s ease;
  background: currentColor;
}

.featured-project-link:hover .featured-project-title span:after {
  transform: scaleX(1);
}
</style>
