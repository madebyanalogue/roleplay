<template>
  <PageSectionCards
    v-if="hasCards"
    :section="mobileSection"
    class="stacking-cards-section__mobile"
  />

  <section
    v-if="hasCards"
    ref="sectionRef"
    class="sticky-cards stacking-cards-section__desktop grid gap-30"
  >
    <h2
      v-if="cardsSectionTitle"
      class="sticky-cards__heading subtitle subtitle--circle purple-dot"
    >
      {{ cardsSectionTitle }}
    </h2>

    <div class="sticky-cards__container">
        <article
          v-for="(card, index) in section.cards"
          :key="card._key || `card-${index}`"
          class="sticky-cards__card rounded-medium pad-20 pad-sm-50"
          :style="{
            zIndex: section.cards.length - index,
            '--card-index': index,
          }"
        >
        <div class="sticky-cards__grid">
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
        </div>
        </article>
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
    let scrollTrigger = null
    let cancelled = false

    const onResize = () => {
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

      const cardEls = section.querySelectorAll('.sticky-cards__card')
      const totalCards = cardEls.length
      if (totalCards < 1 || section.offsetHeight === 0) {
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

      const segmentSize = 1 / totalCards
      const cardYOffset = 5
      const cardScaleStep = 0.075
      const maxAnimProgress =
        totalCards <= 1 ? 0 : (totalCards - 1) / totalCards

      cardEls.forEach((card, index) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + index * cardYOffset,
          scale: 1 - index * cardScaleStep,
        })
      })

      function updateCards(rawProgress) {
        const animProgress =
          totalCards <= 1 ? 0 : Math.min(rawProgress, 1) * maxAnimProgress
        const activeIndex = Math.min(
          Math.floor(animProgress / segmentSize),
          totalCards - 1,
        )
        const segProgress =
          (animProgress - activeIndex * segmentSize) / segmentSize

        cardEls.forEach((card, index) => {
          if (index < activeIndex) {
            gsap.set(card, {
              xPercent: -50,
              yPercent: -250,
              rotationX: 35,
              scale: 1,
            })
          } else if (index === activeIndex) {
            gsap.set(card, {
              xPercent: -50,
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            })
          } else {
            const behindIndex = index - activeIndex
            const currentYOffset = (behindIndex - segProgress) * cardYOffset
            const currentScale =
              1 - (behindIndex - segProgress) * cardScaleStep

            gsap.set(card, {
              xPercent: -50,
              yPercent: -50 + currentYOffset,
              rotationX: 0,
              scale: currentScale,
            })
          }
        })
      }

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () =>
          `+=${window.innerHeight * Math.max((totalCards - 1) * 2, 1)}`,
        pin: section,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          updateCards(self.progress)
        },
        onRefresh(self) {
          constrainPinSpacerWidth(self, section)
          updateCards(self.progress)
        },
        onEnter(self) {
          constrainPinSpacerWidth(self, section)
          updateCards(self.progress)
        },
        onEnterBack(self) {
          constrainPinSpacerWidth(self, section)
          updateCards(self.progress)
        },
        onLeave() {
          updateCards(1)
        },
        onLeaveBack() {
          updateCards(0)
        },
      })

      constrainPinSpacerWidth(scrollTrigger, section)
      updateCards(scrollTrigger.progress)
      initAttempts = 0
      scheduleScrollTriggerRefresh(hasFeaturedProjectsSection() ? 500 : 120)
    }

    setup()

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      scrollTrigger?.kill()
      scrollTrigger = null
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
  // Allow layout/fonts to settle in production builds.
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

  // Fallback if featured projects never initializes (e.g. fewer than 2 projects).
  startInit(TRANSITION_SETTLE_MS)
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
  display: block;
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
  height: 100svh;
  overflow: hidden;
  perspective: 1000px;
  grid-template-rows: auto 1fr;
  align-content: start;
}

.sticky-cards__heading {
  position: relative;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  padding-top: calc(var(--gutter) * 1.5);
}

.sticky-cards__container {
  position: relative;
  width: 100%;
  min-height: 100dvh;
}

.sticky-cards__card {
  position: absolute;
  top: calc(50% - calc(var(--gutter) * 3));
  left: 50%;
  width: calc(100% - calc(var(--gutter) * 2));
  height: calc(100vh - calc(var(--gutter) * 10) - var(--header-height));
  aspect-ratio: 1.6;
  color: var(--black);
  transform-origin: center bottom;
  will-change: transform;
}

@media (min-width: 1000px) {
  /* Match GSAP progress 0 before ScrollTrigger inits. */
  .sticky-cards__card {
    transform: translate(-50%, calc(-50% + var(--card-index, 0) * 5%))
      scale(calc(1 - var(--card-index, 0) * 0.075));
  }
}

.sticky-cards__card:nth-child(4n - 1) {
  background-color: var(--purple);
}

.sticky-cards__card:nth-child(4n - 2) {
  background-color: var(--purple-tint-2);
}

.sticky-cards__card:nth-child(4n - 3) {
  background-color: var(--purple-tint-3);
}

.sticky-cards__card:nth-child(4n - 4) {
  background-color: var(--purple-tint-4);
}

.sticky-cards__grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'text media';
  height: 100%;
}

.sticky-cards__text {
  grid-area: text;
}

.sticky-cards__media {
  grid-area: media;
  aspect-ratio: 1.4;
  border-radius: calc(var(--unit) * 80) calc(var(--unit) * 20)
    calc(var(--unit) * 20) calc(var(--unit) * 80);
  overflow: hidden;
  height: 100%;
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
</style>
