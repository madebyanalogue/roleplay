<template>
  <PageSectionCards
    v-if="hasCards"
    :section="mobileSection"
    class="stacking-cards-section__mobile"
  />

  <section
    v-if="hasCards"
    ref="sectionRef"
    class="sticky-cards stacking-cards-section__desktop"
    data-stacking-cards-scroll
  >
    <div
      v-if="cardsSectionTitle"
      class="sticky-cards__heading-spacer"
      aria-hidden="true"
    />

     <!-- <div
      v-if="cardsSectionTitle"
      class="sticky-cards__heading-anchor"
    >
    <h2 class="sticky-cards__heading subtitle subtitle--circle purple-dot">
        {{ cardsSectionTitle }}
      </h2>
    </div> -->

    <div class="sticky-cards__slides">
      <h2 class="sticky-cards__heading subtitle subtitle--circle purple-dot">
        {{ cardsSectionTitle }}
      </h2>
      <article
        v-for="(card, index) in section.cards"
        :key="card._key || `card-${index}`"
        class="sticky-cards__slide"
      >
        <div class="sticky-cards__wrapper">
          <div
            class="sticky-cards__card rounded-medium pad-20 pad-sm-50"
            :class="`sticky-cards__card--${(index % 4) + 1}`"
          >
            <div class="sticky-cards__grid">
              <div class="sticky-cards__text">
                <div class="grid gap-30 pad-md-50 pad-right">
                  <h3
                    v-if="card.title"
                    class="sticky-cards__title fluid-type line-height-1 pad-60 pad-right"
                    style="--desktop: 56; --mobile: 24;"
                  >
                    {{ card.title }}
                  </h3>
                  <div class="fluid-type" style="--desktop: 40; --mobile: 16;">
                    <SanityBlocks
                      v-if="card.description?.length"
                      :blocks="card.description"
                    />
                  </div>
                </div>
              </div>

              <div class="sticky-cards__media">
                <video
                  v-if="card.mediaType === 'video' && card.video?.asset?.url"
                  autoplay
                  muted
                  loop
                  playsinline
                  class="sticky-cards__video"
                >
                  <source
                    :src="card.video.asset.url"
                    :type="videoMimeTypeFromUrl(card.video.asset.url)"
                  >
                </video>

                <NuxtImg
                  v-else-if="card.image?.asset?.url"
                  :src="card.image.asset.url"
                  :alt="card.title || ''"
                  :width="card.image.asset.metadata?.dimensions?.width"
                  :height="card.image.asset.metadata?.dimensions?.height"
                  class="sticky-cards__image"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const DESKTOP_MQ = '(min-width: 1000px)'
const TRANSITION_SETTLE_MS = 650
const CARDS_HEADING_SPACE_PX = 0
const PIN_RELEASE_EARLY_PX = 20

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const sectionRef = ref(null)
const nuxtApp = useNuxtApp()
const { isLoading: isPageLoading } = injectPageLoading()
let mmContext = null
let initTimer = null
let followUpTimer = null
let removePageFinishHook = () => {}
let removeFeaturedProjectsReadyListener = () => {}

const MAX_INIT_ATTEMPTS = 10
let initAttempts = 0

const hasCards = computed(() => (props.section?.cards || []).length > 0)

const cardsSectionTitle = computed(
  () =>
    props.section?.cardsSectionTitle ||
    props.section?.cardsTitle ||
    props.section?.title ||
    '',
)

const mobileSection = computed(() => ({
  ...props.section,
  cardsDisableScrollDemo: true,
}))

function videoMimeTypeFromUrl(url) {
  if (!url || typeof url !== 'string') return 'video/mp4'
  const lower = url.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

function getHeaderHeightPx() {
  if (!import.meta.client) return 49
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .trim()
  const value = Number.parseFloat(raw)
  return Number.isFinite(value) ? value : 49
}

function getGutterPx() {
  if (!import.meta.client) return 20
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--gutter')
    .trim()
  const value = Number.parseFloat(raw)
  return Number.isFinite(value) ? value : 20
}

function initHeadingScrollTransform(section, gsap, ScrollTrigger) {
  const heading = section.querySelector('.sticky-cards__heading')
  if (!heading) return null

  const { lenis } = useLenis()
  let removeLenisScrollListener = () => {}

  gsap.set(heading, { y: 0 })

  const syncHeadingY = () => {
    const rect = section.getBoundingClientRect()
    const viewportBottom = window.innerHeight
    const gutter = getGutterPx()
    const triggerLine = viewportBottom - gutter

    if (rect.bottom > triggerLine) {
      gsap.set(heading, { y: 0 })
      return
    }

    const travel = Math.min(
      Math.max(0, triggerLine - rect.bottom),
      section.offsetHeight,
    )
    gsap.set(heading, { y: -travel })
  }

  const trigger = ScrollTrigger.create({
    scroller: document.documentElement,
    trigger: section,
    start: () => `bottom bottom-=${getGutterPx()}`,
    end: 'top bottom',
    invalidateOnRefresh: true,
    onUpdate: syncHeadingY,
    onRefresh: syncHeadingY,
    onLeaveBack: () => gsap.set(heading, { y: 0 }),
  })

  if (lenis) {
    const onLenisScroll = () => syncHeadingY()
    lenis.on('scroll', onLenisScroll)
    removeLenisScrollListener = () => lenis.off('scroll', onLenisScroll)
  }

  syncHeadingY()

  return {
    kill() {
      trigger.kill()
      removeLenisScrollListener()
    },
  }
}

function getSlideScrollDistance() {
  return Math.max(
    window.innerHeight - getHeaderHeightPx() - getGutterPx() * 2,
    1,
  )
}

function getSlidePinScrollDistance() {
  return Math.max(getSlideScrollDistance() - PIN_RELEASE_EARLY_PX, 1)
}

function getPinStart() {
  return `top top+=${getHeaderHeightPx() + getGutterPx()}`
}

function getCardRotationZ(index) {
  return ((index % 5) - 2) * 2
}

function syncHeadingSpace(section, totalSlides = 0) {
  const heading = section.querySelector('.sticky-cards__heading')
  if (!heading) {
    section.style.setProperty('--cards-heading-space', '0px')
    section.style.setProperty('--stacking-heading-height', '100px')
    section.style.removeProperty('--heading-anchor-height')
    return
  }

  const space = CARDS_HEADING_SPACE_PX
  const stickyTop = getHeaderHeightPx() + getGutterPx()
  const slideCount = totalSlides || section.querySelectorAll('.sticky-cards__slide').length
  const anchorHeight =
    Math.max(slideCount - 1, 0) * getSlideScrollDistance() + stickyTop + space

  section.style.setProperty('--cards-heading-space', `${space}px`)
  section.style.setProperty('--stacking-heading-height', '100px')
  section.style.setProperty('--heading-anchor-height', `${anchorHeight}px`)
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

async function initStickyCards() {
  mmContext?.revert()
  mmContext = null

  if (!import.meta.client || !hasCards.value) return

  const { gsap, ScrollTrigger } = await loadGsapScrollTrigger()
  if (!gsap || !ScrollTrigger) return

  mmContext = gsap.matchMedia()

  mmContext.add(DESKTOP_MQ, () => {
    const scrollTriggers = []
    let cancelled = false

    const onResize = () => {
      const section = sectionRef.value
      if (section) {
        const totalSlides = section.querySelectorAll('.sticky-cards__slide').length
        syncHeadingSpace(section, totalSlides)
      }
      scheduleScrollTriggerRefresh()
    }

    window.addEventListener('resize', onResize, { passive: true })

    const setup = async () => {
      const section = sectionRef.value
      if (cancelled || !section) {
        if (initAttempts < MAX_INIT_ATTEMPTS) {
          initAttempts += 1
          scheduleInitStickyCards(150)
        }
        return
      }

      const slideEls = section.querySelectorAll('.sticky-cards__slide')
      const totalSlides = slideEls.length
      if (totalSlides < 1 || section.offsetHeight === 0) {
        if (initAttempts < MAX_INIT_ATTEMPTS) {
          initAttempts += 1
          scheduleInitStickyCards(150)
        }
        return
      }

      await waitForMedia(section)
      if (cancelled) return

      await new Promise((resolve) => requestAnimationFrame(resolve))
      await new Promise((resolve) => requestAnimationFrame(resolve))
      if (cancelled) return

      syncHeadingSpace(section, totalSlides)

      slideEls.forEach((slide, index) => {
        const wrapper = slide.querySelector('.sticky-cards__wrapper')
        const card = slide.querySelector('.sticky-cards__card')
        if (!wrapper || !card) return

        const isLastSlide = index === totalSlides - 1

        gsap.set(card, {
          rotationX: 0,
          rotationZ: 0,
          scale: 1,
          autoAlpha: 1,
        })

        if (isLastSlide) return

        const pinTrigger = ScrollTrigger.create({
          animation: gsap.to(card, {
            rotationZ: getCardRotationZ(index),
            scale: 0.7,
            rotationX: 40,
            ease: 'power1.in',
          }),
          pin: wrapper,
          trigger: slide,
          start: getPinStart,
          end: () => `+=${getSlidePinScrollDistance()}`,
          scrub: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onRefresh(self) {
            constrainPinSpacerWidth(self, section)
          },
          onEnter(self) {
            constrainPinSpacerWidth(self, section)
          },
          onEnterBack(self) {
            constrainPinSpacerWidth(self, section)
          },
        })

        const fadeTrigger = ScrollTrigger.create({
          animation: gsap.to(card, {
            autoAlpha: 0,
            ease: 'power1.in',
          }),
          trigger: card,
          start: 'top -80%',
          end: () => `+=${getSlideScrollDistance() * 0.2}`,
          scrub: true,
          invalidateOnRefresh: true,
        })

        scrollTriggers.push(pinTrigger, fadeTrigger)
      })

      const headingScrollTrigger = initHeadingScrollTransform(
        section,
        gsap,
        ScrollTrigger,
      )
      if (headingScrollTrigger) {
        scrollTriggers.push(headingScrollTrigger)
      }

      initAttempts = 0
      scheduleScrollTriggerRefresh(hasFeaturedProjectsSection() ? 500 : 120)
    }

    setup()

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      scrollTriggers.forEach((trigger) => trigger.kill())
      const heading = sectionRef.value?.querySelector('.sticky-cards__heading')
      if (heading) {
        gsap.set(heading, { clearProps: 'transform' })
      }
      const cards = sectionRef.value?.querySelectorAll('.sticky-cards__card')
      if (cards?.length) {
        gsap.set(cards, { clearProps: 'all' })
      }
    }
  })
}

function hasFeaturedProjectsSection() {
  return !!document.querySelector('[data-featured-projects-scroll]')
}

function isFeaturedProjectsReady() {
  return !!document.querySelector(
    '[data-featured-projects-scroll][data-featured-projects-ready]',
  )
}

function getInitDelay() {
  if (!import.meta.client) return 0
  return hasFeaturedProjectsSection() ? 450 : 150
}

function scheduleFollowUpInit() {
  if (!hasFeaturedProjectsSection()) return
  if (followUpTimer) clearTimeout(followUpTimer)
  followUpTimer = setTimeout(() => {
    followUpTimer = null
    initAttempts = 0
    scheduleInitStickyCards(TRANSITION_SETTLE_MS)
  }, 750)
}

function scheduleInitStickyCards(delay = 0) {
  if (!import.meta.client) return
  if (initTimer) clearTimeout(initTimer)
  initTimer = setTimeout(async () => {
    initTimer = null
    await nextTick()
    initStickyCards()
  }, delay + getInitDelay())
}

function scheduleInitWhenDependenciesReady(extraDelay = 0) {
  const startInit = (delay = 0) => {
    scheduleInitStickyCards(delay + extraDelay)
    scheduleFollowUpInit()
  }

  if (!hasFeaturedProjectsSection() || isFeaturedProjectsReady()) {
    startInit()
    return
  }

  const onFeaturedProjectsReady = () => {
    removeFeaturedProjectsReadyListener()
    initAttempts = 0
    startInit(TRANSITION_SETTLE_MS)
  }

  removeFeaturedProjectsReadyListener()
  document.addEventListener(
    'featured-projects-scroll-ready',
    onFeaturedProjectsReady,
    { once: true },
  )
  removeFeaturedProjectsReadyListener = () => {
    document.removeEventListener(
      'featured-projects-scroll-ready',
      onFeaturedProjectsReady,
    )
  }

  startInit(TRANSITION_SETTLE_MS)
}

function runWhenPreloaderReady(callback) {
  if (document.body.classList.contains('preloader-complete')) {
    callback()
    return
  }
  document.addEventListener('preloader-complete', callback, { once: true })
}

watch(cardsSectionTitle, async () => {
  await nextTick()
  if (sectionRef.value) {
    const totalSlides = sectionRef.value.querySelectorAll('.sticky-cards__slide').length
    syncHeadingSpace(sectionRef.value, totalSlides)
  }
  scheduleInitWhenDependenciesReady(TRANSITION_SETTLE_MS)
})

watch(
  () =>
    (props.section?.cards || [])
      .map((card) =>
        [
          card._key,
          card.title,
          card.mediaType,
          card.image?.asset?.url,
          card.video?.asset?.url,
        ].join(':'),
      )
      .join('|'),
  async () => {
    scheduleInitWhenDependenciesReady(TRANSITION_SETTLE_MS)
  },
)

watch(isPageLoading, (loading) => {
  if (loading) return
  scheduleInitWhenDependenciesReady(TRANSITION_SETTLE_MS)
})

onMounted(async () => {
  await nextTick()

  removePageFinishHook = nuxtApp.hook('page:finish', () => {
    scheduleInitWhenDependenciesReady(TRANSITION_SETTLE_MS)
  })

  runWhenPreloaderReady(() => {
    scheduleInitWhenDependenciesReady()
  })
})

onActivated(() => {
  scheduleInitWhenDependenciesReady(TRANSITION_SETTLE_MS)
})

onUnmounted(() => {
  if (initTimer) clearTimeout(initTimer)
  initTimer = null
  if (followUpTimer) clearTimeout(followUpTimer)
  followUpTimer = null
  removePageFinishHook()
  removeFeaturedProjectsReadyListener()
  mmContext?.revert()
  mmContext = null
})
</script>

<style scoped>
.stacking-cards-section__mobile {
  display: grid;
}

.stacking-cards-section__desktop {
  display: none;
}

@media (min-width: 1000px) {
  .stacking-cards-section__mobile {
    display: none;
  }

  .stacking-cards-section__desktop {
    display: block;
  }
}

.sticky-cards {
  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;
}

.sticky-cards__heading-spacer {
  height: var(--cards-heading-space, 140px);
  pointer-events: none;
}

.sticky-cards__heading-anchor {
  position: sticky;
  top: calc(var(--header-height) + var(--gutter));
  left: 0;
  right: 0;
  height: calc(100vh - var(--header-height) - calc(var(--gutter) * 2));
  z-index: 30;
  pointer-events: none;
}

.sticky-cards__heading {
  position: relative;
  pointer-events: none;
  width: 100%;
  margin: 0;
  padding: calc(var(--gutter) * 2) var(--gutter) calc(var(--gutter) / 2);
  will-change: transform;
}

.sticky-cards__slides {
  position: relative;
}

.sticky-cards__slide {
  height: calc(100svh - var(--header-height) - calc(var(--gutter) * 2));
  position: relative;
}

.sticky-cards__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 250vw;
  margin-top: -70px;
}

.sticky-cards__card {
  position: absolute;
  top: 100px;
  right: var(--gutter);
  bottom: var(--gutter);
  left: var(--gutter);
  color: var(--black);
  transform-style: preserve-3d;
  transform-origin: 50% 10%;
  will-change: transform, opacity;
}

.sticky-cards__card--1 {
  background-color: var(--purple);
}

.sticky-cards__card--2 {
  background-color: var(--purple-tint-2);
}

.sticky-cards__card--3 {
  background-color: var(--purple-tint-3);
}

.sticky-cards__card--4 {
  background-color: var(--purple-tint-4);
}

.sticky-cards__grid {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: var(--gutter);
  height: 100%;
  width: 100%;
}

.sticky-cards__text {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sticky-cards__media {
  flex: 0 0 auto;
  aspect-ratio: 4 / 3;
  width: auto;
  border-radius: calc(var(--unit) * 60) calc(var(--unit) * 20)
    calc(var(--unit) * 20) calc(var(--unit) * 60);
  overflow: hidden;
  width: 100%;
}

.sticky-cards__title {
  line-height: 1.15;
  margin: 0;
}

.sticky-cards__image,
.sticky-cards__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (min-width: 700px) {
  .sticky-cards__media {
    aspect-ratio: 3/2;
  }
}
@media (min-width: 700px) {
  .sticky-cards__media {
max-width: 75%;
  }
}




@media (min-width: 1000px) {
  .sticky-cards__heading {
    position: sticky;
    top: calc(var(--header-height) + calc(var(--gutter) * 1));
    z-index: 2;
  }
}

</style>
