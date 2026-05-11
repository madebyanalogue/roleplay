<template>
  <section
    v-if="useGridMode"
    class="cards-section grid gap-30"
  >

    
    <h2 v-if="cardsSectionTitle" class="subtitle subtitle--circle purple-dot">
      {{ cardsSectionTitle }}
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
            <h3 v-if="card.title" class="cards-section__title fluid-type pad-60 pad-right" style="--desktop: 58; --mobile: 24;">{{ card.title }}</h3>
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

  <section
    v-else
    ref="droppingStackRef"
    class="cards-section cards-section--stack-mode grid gap-50 pad-30 pad-top"
    data-dropping-stack-init
  >
    <h2 v-if="cardsSectionTitle" class="subtitle subtitle--circle purple-dot">
      {{ cardsSectionTitle }}
    </h2>

    <div class="cards-section__container">
      <article
        v-for="(card, index) in section.cards || []"
        :key="card._key || index"
        class="cards-section__item rounded-medium pad-20 pad-sm-50"
      >
        <div class="cards-section__grid">
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
            <div class="grid gap-30 pad-md-50 pad-right">
              <h3 v-if="card.title" class="cards-section__title fluid-type line-height-1 pad-60 pad-right" style="--desktop: 56; --mobile: 24;">{{ card.title }}</h3>
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

    <!-- <div>
      <div data-dropping-stack-collection class="dropping-stack__collection">
        <div ref="droppingStackListRef" class="dropping-stack__list">
          <div
            v-for="(card, index) in section.cards || []"
            :key="card._key || index"
            data-dropping-stack-item
            class="dropping-stack__item"
          >
            <article
              class="dropping-stack-card rounded-medium"
              :class="`dropping-stack-card--tone-${(index % 5) + 1}`"
            >
              <div class="dropping-stack-card__before" />
              <div class="dropping-stack-card__content">
                <div class="dropping-stack-card__start">
                  <div class="dropping-stack-card__visual">
                    <div class="dropping-stack-card__visual-before" />
                    <video
                      v-if="card.mediaType === 'video' && card.video?.asset?.url"
                      autoplay
                      muted
                      loop
                      playsinline
                      class="droping-stack-card__visual-img"
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
                      class="droping-stack-card__visual-img"
                    />
                  </div>
                  <div
                    v-if="card.description?.length"
                    class="dropping-stack-card__words fluid-type"
                    style="--desktop: 18; --mobile: 14;"
                  >
                    <SanityBlocks :blocks="card.description" />
                  </div>
                </div>
                <div class="dropping-stack-card__end">
                  <h3 v-if="card.title" class="dropping-stack-card__h fluid-type" style="--desktop: 82; --mobile: 38;">
                    {{ card.title }}
                  </h3>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div class="dropping-stack__controls">
        <button
          ref="droppingStackPrevRef"
          type="button"
          data-dropping-stack-prev
          class="dropping-stack__control is--prev"
          aria-label="Previous card"
        >
          <span class="dropping-stack__control-circle is--prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 18 18" fill="none" class="dropping-stack__control-svg"><path d="M6.74976 14.25L11.9998 9L6.74976 3.75" stroke="currentColor" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </button>
        <button
          ref="droppingStackNextRef"
          type="button"
          data-dropping-stack-next
          class="dropping-stack__control"
          aria-label="Next card"
        >
          <span class="dropping-stack__control-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 18 18" fill="none" class="dropping-stack__control-svg"><path d="M6.74976 14.25L11.9998 9L6.74976 3.75" stroke="currentColor" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </button>
      </div>
    </div> -->
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(Draggable, CustomEase)
CustomEase.create('osmo', '0.625, 0.05, 0, 1')

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const useGridMode = computed(() => props.section?.cardsDisableScrollDemo === true)
const cardsSectionTitle = computed(() =>
  props.section?.cardsSectionTitle || props.section?.cardsTitle || props.section?.title || '',
)
const cards = computed(() => props.section?.cards || [])

const droppingStackRef = ref(null)
const droppingStackListRef = ref(null)
const droppingStackPrevRef = ref(null)
const droppingStackNextRef = ref(null)
let droppingCleanup = () => {}

function videoMimeTypeFromUrl(url) {
  if (!url || typeof url !== 'string') return 'video/mp4'
  const lower = url.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

function initDroppingCardsStack() {
  droppingCleanup()
  if (useGridMode.value) return
  if (!import.meta.client) return

  const stackEl = droppingStackRef.value
  const list = droppingStackListRef.value
  if (!stackEl || !list) return

  const visibleCount = 4
  const minTotalForLoop = 5
  const duration = 0.75
  const mainEase = 'osmo'
  const dragThresholdPercent = 20
  const clones = []
  let stackCards = Array.from(list.querySelectorAll('[data-dropping-stack-item]'))
  if (stackCards.length < 3) return

  const getUnitValue = (val, depth) => {
    const num = Number.parseFloat(val) || 0
    const unit = String(val).replace(/[0-9.-]/g, '') || 'px'
    return `${num * depth}${unit}`
  }
  const mod = (n, m) => ((n % m) + m) % m

  const originalCount = stackCards.length
  if (stackCards.length < minTotalForLoop) {
    const setsNeeded = Math.ceil(minTotalForLoop / originalCount)
    const clonesToAdd = setsNeeded * originalCount - originalCount
    for (let i = 0; i < clonesToAdd; i++) {
      const clone = stackCards[i % originalCount].cloneNode(true)
      clone.setAttribute('aria-hidden', 'true')
      list.appendChild(clone)
      clones.push(clone)
    }
    stackCards = Array.from(list.querySelectorAll('[data-dropping-stack-item]'))
  }

  const total = stackCards.length
  let activeIndex = 0
  let isAnimating = false
  let dragCard = null
  let draggableInstance = null
  let limitX = 1
  let limitY = 1
  let offsetX = '0em'
  let offsetY = '0em'
  let isActive = false

  const cardAt = offset => stackCards[mod(activeIndex + offset, total)]

  function updateOffsetsFromPadding() {
    const collectionEl = stackEl.querySelector('[data-dropping-stack-collection]')
    if (!collectionEl) return
    const styles = window.getComputedStyle(collectionEl)
    const padRight = Number.parseFloat(styles.paddingRight) || 0
    const padLeft = Number.parseFloat(styles.paddingLeft) || 0
    const padBottom = Number.parseFloat(styles.paddingBottom) || 0
    const padTop = Number.parseFloat(styles.paddingTop) || 0
    const steps = Math.max(1, visibleCount - 1)
    const usePadX = Math.max(padRight, padLeft)
    const usePadY = Math.max(padBottom, padTop)
    const signX = padLeft > padRight ? -1 : 1
    const signY = padTop > padBottom ? -1 : 1
    offsetX = `${(usePadX / steps) * signX}px`
    offsetY = `${(usePadY / steps) * signY}px`
  }

  function updateDragLimits() {
    if (!dragCard) return
    const cardRect = dragCard.getBoundingClientRect()
    limitX = cardRect.width || 1
    limitY = cardRect.height || 1
  }

  function magnetize(raw, limit) {
    const sign = Math.sign(raw) || 1
    const abs = Math.abs(raw)
    const out = limit * Math.tanh(abs / limit)
    return sign * out
  }

  function applyState() {
    updateOffsetsFromPadding()
    stackCards.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 0,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
      })
    })

    for (let depth = 0; depth < visibleCount; depth++) {
      const card = cardAt(depth)
      const xVal = getUnitValue(offsetX, depth)
      const yVal = getUnitValue(offsetY, depth)
      const state = {
        opacity: 1,
        zIndex: 999 - depth,
        pointerEvents: depth === 0 ? 'auto' : 'none',
      }
      if (offsetX.includes('%')) state.xPercent = Number.parseFloat(xVal)
      else state.x = xVal
      if (offsetY.includes('%')) state.yPercent = Number.parseFloat(yVal)
      else state.y = yVal
      gsap.set(card, state)
    }

    dragCard = cardAt(0)
    gsap.set(dragCard, { touchAction: 'none' })
    updateDragLimits()
    draggableInstance?.kill()
    draggableInstance = Draggable.create(dragCard, {
      type: 'x,y',
      inertia: false,
      onPress: function () {
        if (isAnimating) return
        gsap.killTweensOf(dragCard)
        gsap.set(dragCard, { zIndex: 2000, opacity: 1 })
      },
      onDrag: function () {
        if (isAnimating) return
        const x = magnetize(this.x, limitX)
        const y = magnetize(this.y, limitY)
        gsap.set(dragCard, { x, y, opacity: 1 })
      },
      onRelease: function () {
        if (isAnimating) return
        const currentX = gsap.getProperty(dragCard, 'x')
        const currentY = gsap.getProperty(dragCard, 'y')
        const movedXPercent = Math.abs(currentX) / limitX * 100
        const movedYPercent = Math.abs(currentY) / limitY * 100
        const movedPercent = Math.max(movedXPercent, movedYPercent)
        if (movedPercent >= dragThresholdPercent) {
          animateNext(true, currentX, currentY)
          return
        }
        gsap.to(dragCard, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.7)',
          onComplete: applyState,
        })
      },
    })[0]
  }

  function animateNext(fromDrag = false, releaseX = 0, releaseY = 0) {
    if (isAnimating) return
    isAnimating = true
    const outgoing = cardAt(0)
    const incomingBack = cardAt(visibleCount)
    const tl = gsap.timeline({
      defaults: { duration, ease: mainEase },
      onComplete: () => {
        activeIndex = mod(activeIndex + 1, total)
        applyState()
        isAnimating = false
      },
    })

    gsap.set(outgoing, { zIndex: 2000, opacity: 1 })
    if (fromDrag) gsap.set(outgoing, { x: releaseX, y: releaseY })
    tl.to(outgoing, { yPercent: 200 }, 0)
    tl.to(outgoing, { opacity: 0, duration: duration * 0.2, ease: 'none' }, duration * 0.4)

    for (let depth = 1; depth < visibleCount; depth++) {
      const xVal = getUnitValue(offsetX, depth - 1)
      const yVal = getUnitValue(offsetY, depth - 1)
      const move = { zIndex: 999 - (depth - 1) }
      if (offsetX.includes('%')) move.xPercent = Number.parseFloat(xVal)
      else move.x = xVal
      if (offsetY.includes('%')) move.yPercent = Number.parseFloat(yVal)
      else move.y = yVal
      tl.to(cardAt(depth), move, 0)
    }

    const backX = getUnitValue(offsetX, visibleCount)
    const backY = getUnitValue(offsetY, visibleCount)
    const startX = getUnitValue(offsetX, visibleCount - 1)
    const startY = getUnitValue(offsetY, visibleCount - 1)
    const incomingSet = { opacity: 0, zIndex: 999 - visibleCount }
    if (offsetX.includes('%')) incomingSet.xPercent = Number.parseFloat(backX)
    else incomingSet.x = backX
    if (offsetY.includes('%')) incomingSet.yPercent = Number.parseFloat(backY)
    else incomingSet.y = backY
    gsap.set(incomingBack, incomingSet)

    const incomingTo = { opacity: 1 }
    if (offsetX.includes('%')) incomingTo.xPercent = Number.parseFloat(startX)
    else incomingTo.x = startX
    if (offsetY.includes('%')) incomingTo.yPercent = Number.parseFloat(startY)
    else incomingTo.y = startY
    tl.to(incomingBack, incomingTo, 0)
  }

  function animatePrev() {
    if (isAnimating) return
    isAnimating = true
    const incomingTop = cardAt(-1)
    const leavingBack = cardAt(visibleCount - 1)
    const tl = gsap.timeline({
      defaults: { duration, ease: mainEase },
      onComplete: () => {
        activeIndex = mod(activeIndex - 1, total)
        applyState()
        isAnimating = false
      },
    })

    gsap.set(leavingBack, { zIndex: 1 })
    gsap.set(incomingTop, { opacity: 0, x: 0, xPercent: 0, yPercent: -200, zIndex: 2000 })
    tl.to(incomingTop, { yPercent: 0 }, 0)
    tl.to(incomingTop, { opacity: 1, duration: duration * 0.2, ease: 'none' }, duration * 0.3)

    for (let depth = 0; depth < visibleCount - 1; depth++) {
      const xVal = getUnitValue(offsetX, depth + 1)
      const yVal = getUnitValue(offsetY, depth + 1)
      const move = { zIndex: 999 - (depth + 1) }
      if (offsetX.includes('%')) move.xPercent = Number.parseFloat(xVal)
      else move.x = xVal
      if (offsetY.includes('%')) move.yPercent = Number.parseFloat(yVal)
      else move.y = yVal
      tl.to(cardAt(depth), move, 0)
    }

    const backX = getUnitValue(offsetX, visibleCount)
    const backY = getUnitValue(offsetY, visibleCount)
    const hideBack = { opacity: 0 }
    if (offsetX.includes('%')) hideBack.xPercent = Number.parseFloat(backX)
    else hideBack.x = backX
    if (offsetY.includes('%')) hideBack.yPercent = Number.parseFloat(backY)
    else hideBack.y = backY
    tl.to(leavingBack, hideBack, 0)
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isActive = entry.isIntersecting && entry.intersectionRatio >= 0.6
    })
  }, { threshold: [0, 0.6, 1] })
  observer.observe(stackEl)

  const onKeyDown = (e) => {
    if (!isActive || isAnimating) return
    const tag = e.target?.tagName?.toLowerCase?.() || ''
    const isTyping =
      tag === 'input' || tag === 'textarea' || tag === 'select' || e.target?.isContentEditable
    if (isTyping) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      animateNext(false)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      animatePrev()
    }
  }

  const onResize = () => applyState()
  const onNextClick = () => animateNext(false)
  const onPrevClick = () => animatePrev()

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('resize', onResize)
  droppingStackNextRef.value?.addEventListener('click', onNextClick)
  droppingStackPrevRef.value?.addEventListener('click', onPrevClick)
  applyState()

  droppingCleanup = () => {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('resize', onResize)
    droppingStackNextRef.value?.removeEventListener('click', onNextClick)
    droppingStackPrevRef.value?.removeEventListener('click', onPrevClick)
    observer.disconnect()
    draggableInstance?.kill()
    gsap.killTweensOf(stackCards)
    clones.forEach(clone => clone.remove())
  }
}

watch(
  () =>
    `${useGridMode.value}:${cards.value
      .map((c) =>
        [c._key, c.mediaType, c.title, c.image?.asset?.url, c.video?.asset?.url].filter(Boolean).join(':'),
      )
      .join('|')}`,
  async () => {
    await nextTick()
    initDroppingCardsStack()
  },
)

onMounted(async () => {
  await nextTick()
  initDroppingCardsStack()
})

onUnmounted(() => {
  droppingCleanup()
})
</script>

<style scoped>




@media all and (min-width: 1000px) {
  .cards-section__item {
    display: flex;
    flex-direction: row;
    gap: var(--gutter);
  }
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



/*================= STACK MODE =================*/

.cards-section--stack-mode .cards-section__container { 
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  align-items: center;
}



.cards-section__image,
.cards-section__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cards-section--stack-mode .cards-section__item {
  width: 100%;
}
.cards-section--stack-mode .cards-section__grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "media text";
}

.cards-section--stack-mode .cards-section__text {
  grid-area: text;
}
.cards-section--stack-mode .cards-section__media {
  grid-area: media;
}

.cards-section--stack-mode .cards-section__item:nth-child(4n - 1) {
  background-color: var(--purple);
}
.cards-section--stack-mode .cards-section__item:nth-child(4n - 2) {
  background-color: var(--purple-tint-2);
}
.cards-section--stack-mode .cards-section__item:nth-child(4n - 3) {
  background-color: var(--purple-tint-3);
}
.cards-section--stack-mode .cards-section__item:nth-child(4n - 4) {
  background-color: var(--purple-tint-4);
}

.cards-section--stack-mode .cards-section__media {
  aspect-ratio: .95;
  border-radius: calc(var(--unit) * 80) calc(var(--unit) * 20) calc(var(--unit) * 20) calc(var(--unit) * 80);
  overflow: hidden;
}

@media all and (min-width: 1000px) {
  .cards-section--stack-mode .cards-section__container { 
    padding: var(--gutter);
    margin-top: calc(var(--unit) * 220);
    position: relative;
    z-index: 0;
  }
  .cards-section--stack-mode .cards-section__media{
    aspect-ratio: 1.4;
  }
  .cards-section--stack-mode .cards-section__grid {
    grid-template-areas: "text media";
  }
  .cards-section--stack-mode .cards-section__item:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .cards-section--stack-mode .cards-section__item:nth-child(2) {
    top: calc(var(--unit) * -90);
    z-index: -1;
    transform: scale(.875);
    transform-origin: center top;
  }
  .cards-section--stack-mode .cards-section__item:nth-child(3) {
    top: calc(var(--unit) * -220);
    z-index: -2;
    transform: scale(.8);
    transform-origin: center top;
  }
}

.cards-section__title {
  line-height: 1.15;
}


/*================= GRID MODE =================*/

.cards-section--grid-mode .cards-section__item {
  width: 100%;
  background-color: var(--purple);
}

.cards-section--grid-mode .cards-section__text,
.cards-section--grid-mode .cards-section__media {
  grid-column: 1 / -1;
}

.cards-section--grid-mode {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gutter);
}

.cards-section--grid-mode .cards-section__grid {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gutter) * 1.4);
  align-items: start;
}

.cards-section--grid-mode .cards-section__text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
}

.cards-section--grid-mode .cards-section__title {
  margin-top: 0;
}

.cards-section--grid-mode .cards-section__media {
  width: 100%;
  aspect-ratio: var(--aspect-ratio);
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
  .cards-section--grid-mode .cards-section__media {
    aspect-ratio: .95;
  }
}

@media (max-width: 999px) {
  .cards-section--grid-mode {
    grid-template-columns: 1fr;
   gap: var(--gutter);
  }

  .cards-section--grid-mode .cards-section__grid {
    grid-template-columns: 1fr;
  }

  .cards-section--grid-mode .cards-section__text,
  .cards-section--grid-mode .cards-section__media {
    grid-column: 1 / -1;
  }
}

</style>
