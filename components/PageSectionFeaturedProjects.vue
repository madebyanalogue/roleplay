<template>
  <section
    ref="sectionRef"
    class="featured-projects grid gap-30"
    data-featured-projects-scroll
  >
    <h2 v-if="props.section.featuredProjectsTitle || props.section.title" class="subtitle subtitle--circle orange-dot">
      {{ props.section.featuredProjectsTitle || props.section.title }}
    </h2>

    <div ref="scrollRef" class="featured-projects__scroll">
      <div ref="viewportRef" class="featured-projects__viewport">
        <div ref="trackRef" class="featured-projects__track">
          <article
            v-for="item in projects"
            :key="item.project?._id || item._key"
            class="featured-project"
          >
            <NuxtLink
              v-if="item.project?.slug?.current"
              :to="`/portfolio/${item.project.slug.current}`"
              class="featured-project-link"
            >
              <div class="featured-project-image-container rounded-medium">
                <div class="featured-project-image-wrapper">
                  <NuxtImg
                    v-if="item.project?.featuredImage?.asset"
                    :src="item.project.featuredImage.asset.url || ''"
                    alt=""
                    :class="[
                      'featured-project-image',
                      item.project.featuredImageMobile?.asset ? 'is-desktop-archive-img' : '',
                    ]"
                    :width="item.project.featuredImage.asset.metadata?.dimensions?.width || 3200"
                    :height="item.project.featuredImage.asset.metadata?.dimensions?.height"
                  />
                  <NuxtImg
                    v-if="item.project?.featuredImageMobile?.asset"
                    :src="item.project.featuredImageMobile.asset.url || ''"
                    alt=""
                    class="featured-project-image is-mobile-archive-img"
                    :width="item.project.featuredImageMobile.asset.metadata?.dimensions?.width || 3200"
                    :height="item.project.featuredImageMobile.asset.metadata?.dimensions?.height"
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

const sectionRef = ref(null)
const scrollRef = ref(null)
const viewportRef = ref(null)
const trackRef = ref(null)
const nuxtApp = useNuxtApp()
const { isLoading: isPageLoading } = injectPageLoading()
let mmContext = null
let initTimer = null
let removePageFinishHook = () => {}

const projects = computed(() => props.section?.featuredProjects || [])

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
  await Promise.all(
    Array.from(images).map(
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
  )
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
      const track = trackRef.value
      const viewport = viewportRef.value
      if (cancelled || !section || !track || !viewport) return

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
        pin: viewport,
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
  if (initTimer) clearTimeout(initTimer)
  initTimer = null
  removePageFinishHook()
  mmContext?.revert()
  mmContext = null
})
</script>

<style scoped>
.featured-projects {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;
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
  flex: 0 0 calc(100cqw / 1.75);
  width: calc(100cqw / 1.75);
  min-width: 0;
  max-width: calc(100cqw / 1.75);
}

.featured-project-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  min-width: 0;
}

.featured-project-image-container {
  aspect-ratio: 0.605;
  position: relative;
  overflow: hidden;
}

.featured-project-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.featured-project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  position: absolute;
}

.portfolio-item-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  color: var(--white, #fff);
  opacity: 1;
  transition: opacity 0.28s ease;
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
  transition: opacity 0.2s ease 0s;
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
  transition: opacity 0.4s ease 0.15s;
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
  .featured-project {
    flex: 0 0 calc((100vw - var(--gutter) * 2) / 3.33);
    width: calc((100vw - var(--gutter) * 2) / 3.33);
    max-width: calc((100vw - var(--gutter) * 2) / 3.33);
  }

  .featured-project-image.is-mobile-archive-img {
    display: none;
  }

  .featured-projects__viewport {
    overflow: hidden;
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
