<template>
  <section
    v-if="useGridMode"
    class="cards-section grid gap-30"
  >

    
    <h2 v-if="section.cardsTitle || section.title" class="subtitle subtitle--circle orange-dot">
      {{ section.cardsTitle || section.title }}
    </h2>

    <div class="cards-section--grid-mode">
      <article
        v-for="(card, index) in section.cards || []"
        :key="card._key || index"
        class="cards-section__item pad-25 rounded-medium"
      >
        <div class="cards-section__grid pad-20 pad-md-60 pad-bottom">


          <div class="cards-section__media">
            <video
              v-if="card.mediaType === 'video' && card.video?.asset?.url"
              autoplay
              muted
              loop
              playsinline
              class="cards-section__video"
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
              class="cards-section__image"
            />
          </div>
          
          <div class="cards-section__text">
            <h3 v-if="card.title" class="cards-section__title fluid-type line-height-1 pad-60 pad-right" style="--desktop: 58; --mobile: 24;">{{ card.title }}</h3>
            <div class="fluid-type" style="--desktop: 30; --mobile: 16;">
              <SanityBlocks
                v-if="card.description?.length"
                :blocks="card.description"
              />
            </div>
          </div>
        </div>
      </article>
    </div>

  </section>

  <template v-else>
    <section
      ref="stickySectionRef"
      class="cards-section cards-section--sticky-cards show-md"
      :inert="layoutKnown && !isDesktopLayout"
    >
      <div
        v-for="(card, index) in section.cards || []"
        :key="card._key || index"
        class="cards-section__sticky-card"
        :class="`cards-section__sticky-card--tone-${(index % 5) + 1}`"
        :style="{ zIndex: stickyCardZBase - index }"
      >
        <div class="cards-section__sticky-col cards-section__sticky-col--text">
          <div class="cards-section__sticky-copy">
            <div
              v-if="card.description?.length"
              class="cards-section__sticky-eyebrow underline-links"
            >
              <SanityBlocks :blocks="card.description" />
            </div>
            <h2 v-if="card.title" class="cards-section__sticky-title">{{ card.title }}</h2>
          </div>
        </div>
        <div class="cards-section__sticky-col cards-section__sticky-col--media rounded-medium">
          <video
            v-if="card.mediaType === 'video' && card.video?.asset?.url"
            autoplay
            muted
            loop
            playsinline
            class="cards-section__sticky-media-el"
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
            class="cards-section__sticky-media-el"
          />
        </div>
      </div>
    </section>

    <!-- Stacked grid fallback when sticky scroll is on (matches 3-up grid mobile layout; hide-md / show-md at 1000px) -->
    <section
      class="cards-section cards-section--grid-mode hide-md"
      :inert="layoutKnown && isDesktopLayout"
    >
      <article
        v-for="(card, index) in section.cards || []"
        :key="`m-${card._key || index}`"
        class="cards-section__item"
      >
        <div class="cards-section__grid">
          <div class="cards-section__text">
            <h3 v-if="card.title" class="cards-section__title">{{ card.title }}</h3>
            <SanityBlocks
              v-if="card.description?.length"
              :blocks="card.description"
            />
          </div>

          <div class="cards-section__media">
            <video
              v-if="card.mediaType === 'video' && card.video?.asset?.url"
              autoplay
              muted
              loop
              playsinline
              class="cards-section__video"
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
              class="cards-section__image"
            />
          </div>
        </div>
      </article>
    </section>
  </template>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const useGridMode = computed(() => props.section?.cardsDisableScrollDemo === true)

/** Matches main.css show-md / hide-md breakpoint */
const MQ_STICKY_DESKTOP = '(min-width: 1000px)'

const stickySectionRef = ref(null)
const isDesktopLayout = ref(false)
const layoutKnown = ref(false)

const cardCount = computed(() => (props.section?.cards || []).length)
const stickyCardZBase = computed(() => cardCount.value + 4)

let stickyCleanup = () => {}

function videoMimeTypeFromUrl(url) {
  if (!url || typeof url !== 'string') return 'video/mp4'
  const lower = url.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

function mountStickyCards() {
  stickyCleanup()

  const triggerEl = stickySectionRef.value
  if (!triggerEl || useGridMode.value) return

  if (typeof window !== 'undefined' && !window.matchMedia(MQ_STICKY_DESKTOP).matches) return

  const cards = triggerEl.querySelectorAll('.cards-section__sticky-card')
  const totalCards = cards.length
  if (!totalCards) return

  const cardYOffset = 5
  const cardScaleStep = 0.075

  cards.forEach((card, i) => {
    gsap.set(card, {
      xPercent: -50,
      yPercent: -50 + i * cardYOffset,
      scale: 1 - i * cardScaleStep,
    })
  })

  /** Pin scroll distance in viewport heights (drives pinSpacing). Lower = shorter spacer on the page. */
  const scrollMultiplier = Math.max(2.25, totalCards * 1.05)
  /**
   * Last card doesn’t peel, but scroll progress is still split into n equal segments — without trimming,
   * the final segment would add “empty” scroll. We shorten pin spacing by ((n-1)/n)²:
   * once for skipping the last peel’s motion budget, once so spacer matches (n-1) segments not n.
   */
  const scrollLengthFactor =
    totalCards > 1 ? ((totalCards - 1) / totalCards) ** 2 : 1

  const st = ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top top',
    end: () =>
      `+=${window.innerHeight * scrollMultiplier * scrollLengthFactor}`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const progress = self.progress
      const segmentSize = 1 / totalCards
      const activeIndex = Math.min(
        Math.floor(progress / segmentSize),
        totalCards - 1,
      )
      const segProgress = (progress - activeIndex * segmentSize) / segmentSize

      cards.forEach((card, i) => {
        if (i < activeIndex) {
          gsap.set(card, {
            xPercent: -50,
            yPercent: -250,
            rotationX: 35,
          })
        }
        else if (i === activeIndex) {
          const lastCard = i === totalCards - 1
          const onlyCard = totalCards === 1
          if (lastCard || onlyCard) {
            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,
              rotationX: 0,
              scale: 1,
            })
          }
          else {
            gsap.set(card, {
              xPercent: -50,
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            })
          }
        }
        else {
          const behindIndex = i - activeIndex
          const currentYOffset = (behindIndex - segProgress) * cardYOffset
          const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50 + currentYOffset,
            rotationX: 0,
            scale: currentScale,
          })
        }
      })
    },
  })

  function onResize() {
    ScrollTrigger.refresh()
  }

  window.addEventListener('resize', onResize)

  stickyCleanup = () => {
    window.removeEventListener('resize', onResize)
    st.kill()
    gsap.killTweensOf(cards)
  }
}

function syncStickyScroll() {
  if (useGridMode.value) {
    stickyCleanup()
    return
  }
  if (typeof window === 'undefined') return
  const mq = window.matchMedia(MQ_STICKY_DESKTOP)
  isDesktopLayout.value = mq.matches
  layoutKnown.value = true
  if (mq.matches) {
    nextTick(() => mountStickyCards())
  }
  else {
    stickyCleanup()
    ScrollTrigger.refresh()
  }
}

let mqStickyRef
let mqStickyListener

watch(
  () =>
    `${useGridMode.value}:${(props.section?.cards || [])
      .map((c) =>
        [c._key, c.mediaType, c.title, c.image?.asset?.url, c.video?.asset?.url].filter(Boolean).join(':'),
      )
      .join('|')}`,
  async () => {
    await nextTick()
    syncStickyScroll()
  },
)

onMounted(async () => {
  await nextTick()
  if (typeof window === 'undefined') return

  mqStickyRef = window.matchMedia(MQ_STICKY_DESKTOP)
  isDesktopLayout.value = mqStickyRef.matches
  layoutKnown.value = true

  mqStickyListener = () => syncStickyScroll()
  mqStickyRef.addEventListener('change', mqStickyListener)

  syncStickyScroll()
})

onUnmounted(() => {
  if (mqStickyRef && mqStickyListener) {
    mqStickyRef.removeEventListener('change', mqStickyListener)
  }
  stickyCleanup()
})
</script>

<style scoped>

.cards-section__item {
  background-color: var(--purple);
}
.cards-section__item:nth-child(2) {
  background-color: var(--purple-tint-1);
}
.cards-section__item:nth-child(3) {
  background-color: var(--purple-tint-2);
}
.cards-section__item:nth-child(4) {
  background-color: var(--purple-tint-3);
}
.cards-section__item:nth-child(5) {
  background-color: var(--purple-tint-4);
}

.cards-section--grid-mode {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gutter);
  /* opacity: 0.7; */
}

.cards-section__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: calc(var(--gutter) * 1.4);
  align-items: start;
}

.cards-section__text {
  grid-column: span 4;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
}

.cards-section__title {
  margin-top: 0;
  letter-spacing: -0.021em;
}

.cards-section__media {
  grid-column: span 8;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.cards-section--grid-mode .cards-section__media {
  aspect-ratio: 1.4;
}
.cards-section--grid-mode .cards-section__item:nth-child(3n - 2) .cards-section__media {
  border-radius: calc(var(--unit) * 50) calc(var(--unit) * 20) calc(var(--unit) * 20) calc(var(--unit) * 50);
}
.cards-section--grid-mode .cards-section__item:nth-child(3n - 1) .cards-section__media {
  border-radius: calc(var(--unit) * 20) calc(var(--unit) * 20) calc(var(--unit) * 20) calc(var(--unit) * 20);
}
.cards-section--grid-mode .cards-section__item:nth-child(3n - 0) .cards-section__media {
  border-radius: calc(var(--unit) * 20) calc(var(--unit) * 50) calc(var(--unit) * 50) calc(var(--unit) * 20);
}

@media all and (min-width: 1000px) {
  .cards-section--grid-mode .cards-section__media{
    aspect-ratio: .95;
  }
}

.cards-section__image,
.cards-section__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cards-section--grid-mode .cards-section__item {
  width: 100%;
}

.cards-section--grid-mode .cards-section__grid {
  grid-template-columns: 1fr;
}

.cards-section--grid-mode .cards-section__text,
.cards-section--grid-mode .cards-section__media {
  grid-column: 1 / -1;
}

/* Codegrid Brand Appart — sticky stacked cards (scroll-driven) */
.cards-section--sticky-cards {
  position: relative;
  width: calc(100% + 2 * var(--gutter));
  max-width: none;
  margin-left: calc(-1 * var(--gutter));
  margin-right: calc(-1 * var(--gutter));
  height: 100svh;
  min-height: 100svh;
  overflow: hidden;
  padding: 0;
  perspective: 1000px;
  background-color: #e3e3db;
}

.cards-section__sticky-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 65%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem;
  border-radius: 1rem;
  color: #fff;
  transform-origin: center bottom;
  will-change: transform;
}

.cards-section__sticky-card--tone-1 {
  background-color: var(--purple);
}

.cards-section__sticky-card--tone-2 {
  background-color: var(--purple-tint-1);
}

.cards-section__sticky-card--tone-3 {
  background-color: var(--purple-tint-2);
}

.cards-section__sticky-card--tone-4 {
  background-color: var(--purple-tint-3);
}

.cards-section__sticky-card--tone-5 {
  background-color: var(--purple-tint-4);
}

.cards-section__sticky-col {
  flex: 1;
  height: 100%;
}

.cards-section__sticky-col--text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  min-width: 0;
  color: var(--text-color);
}

.cards-section__sticky-copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: flex-start;
  height: 100%;
}

.cards-section__sticky-eyebrow {
  text-transform: uppercase;
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  line-height: 1.4;
  font-weight: 400;
}

.cards-section__sticky-title {
  margin: 0;
  text-transform: uppercase;
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1;
  font-family: inherit;
}

.cards-section__sticky-col--media {
  border-radius: 0.75rem;
  overflow: hidden;
  min-height: 0;
}

.cards-section__sticky-media-el {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 1000px) {
  .cards-section__sticky-card {
    width: calc(100% - 4rem);
    height: 75%;
    flex-direction: column;
  }

  .cards-section__sticky-col {
    width: 100%;
  }

  .cards-section__sticky-col--text {
    flex: 0 0 auto;
    max-height: 42%;
    overflow: auto;
  }

  .cards-section__sticky-col--media {
    flex: 1;
    min-height: 0;
  }
}

@media (max-width: 999px) {
  .cards-section--grid-mode {
    grid-template-columns: 1fr;
  gap: var(--gutter);
  }

  .cards-section__grid {
    grid-template-columns: 1fr;
  }

  .cards-section__text,
  .cards-section__media {
    grid-column: 1 / -1;
  }
}


.cards-section__item:nth-child(4n - 1) {
  background-color: var(--purple);
}

.cards-section__item:nth-child(4n - 2) {
  background-color: var(--purple-tint-2);
}

.cards-section__item:nth-child(4n - 3) {
  background-color: var(--purple-tint-3);
}

.cards-section__item:nth-child(4n - 4) {
  background-color: var(--purple-tint-4);
}
</style>
