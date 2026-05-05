<template>
  <section
    ref="wrapperRef"
    data-draggable-marquee-init=""
    :data-direction="direction"
    :data-duration="duration"
    data-multiplier="35"
    data-sensitivity="0.01"
    class="draggable-marquee"
    :style="sectionStyle"
  >
    <div data-draggable-marquee-collection="" class="draggable-marquee__collection">
      <div data-draggable-marquee-list="" class="draggable-marquee__list">
        <component
          :is="item.link ? 'a' : 'div'"
          v-for="(item, index) in items"
          :key="item._key || index"
          class="draggable-marquee__item"
          :href="item.link || undefined"
          :target="item.link ? '_blank' : undefined"
          :rel="item.link ? 'noopener noreferrer' : undefined"
        >
          <video
            v-if="item.mediaType === 'video' && item.video?.asset?.url"
            class="draggable-marquee__item-media"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          >
            <source :src="item.video.asset.url" type="video/mp4">
          </video>
          <NuxtImg
            v-else-if="item.image?.asset?.url"
            :src="item.image.asset.url"
            :alt="''"
            fit="cover"
            class="draggable-marquee__item-media"
          />
        </component>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Observer, ScrollTrigger)

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const wrapperRef = ref(null)

function parseAspectRatio(input) {
  const raw = (input || '3/5').trim()
  const parts = raw.split('/').map(s => s.trim()).filter(Boolean)
  if (parts.length === 2) {
    const w = Number.parseFloat(parts[0])
    const h = Number.parseFloat(parts[1])
    if (w > 0 && h > 0 && Number.isFinite(w) && Number.isFinite(h)) {
      return `${w} / ${h}`
    }
  }
  return '3 / 5'
}

const sectionStyle = computed(() => ({
  '--autoscroll-gallery-aspect-ratio': parseAspectRatio(props.section?.autoscrollGalleryAspectRatio),
}))

const duration = computed(() => {
  const raw = Number.parseFloat(String(props.section?.autoscrollGalleryDuration ?? 20))
  return Number.isFinite(raw) && raw > 0 ? raw : 20
})

const direction = computed(() => {
  const raw = (props.section?.autoscrollGalleryDirection || 'left').toLowerCase()
  return raw === 'right' ? 'right' : 'left'
})

const items = computed(() => (props.section?.autoscrollGalleryItems || []).filter((item) => {
  if (!item) return false
  if (item.mediaType === 'video') return Boolean(item.video?.asset?.url)
  return Boolean(item.image?.asset?.url)
}))

const cleanupFns = []

function getNumberAttr(el, name, fallback) {
  const value = Number.parseFloat(el.getAttribute(name) || '')
  return Number.isFinite(value) ? value : fallback
}

function initDraggableMarquee() {
  const wrapper = wrapperRef.value
  if (!wrapper) return

  const existingState = wrapper.getAttribute('data-draggable-marquee-init')
  if (existingState === 'initialized') return

  const collection = wrapper.querySelector('[data-draggable-marquee-collection]')
  const list = wrapper.querySelector('[data-draggable-marquee-list]')
  if (!collection || !list) return

  const oldClones = collection.querySelectorAll('[data-draggable-marquee-clone]')
  oldClones.forEach(node => node.remove())

  const animDuration = getNumberAttr(wrapper, 'data-duration', 20)
  const multiplier = getNumberAttr(wrapper, 'data-multiplier', 35)
  const sensitivity = getNumberAttr(wrapper, 'data-sensitivity', 0.01)

  const wrapperWidth = wrapper.getBoundingClientRect().width
  const listWidth = list.scrollWidth || list.getBoundingClientRect().width
  if (!wrapperWidth || !listWidth) return

  const minRequiredWidth = wrapperWidth + listWidth + 2
  while (collection.scrollWidth < minRequiredWidth) {
    const listClone = list.cloneNode(true)
    listClone.setAttribute('data-draggable-marquee-clone', '')
    listClone.setAttribute('aria-hidden', 'true')
    collection.appendChild(listClone)
  }

  const wrapX = gsap.utils.wrap(-listWidth, 0)
  gsap.set(collection, { x: 0 })

  const marqueeLoop = gsap.to(collection, {
    x: -listWidth,
    duration: animDuration,
    ease: 'none',
    repeat: -1,
    onReverseComplete: () => marqueeLoop.progress(1),
    modifiers: {
      x: (x) => `${wrapX(Number.parseFloat(x))}px`,
    },
  })

  const initialDirectionAttr = (wrapper.getAttribute('data-direction') || 'left').toLowerCase()
  const baseDirection = initialDirectionAttr === 'right' ? -1 : 1
  const timeScale = { value: baseDirection }

  if (baseDirection < 0) marqueeLoop.progress(1)

  function applyTimeScale() {
    marqueeLoop.timeScale(timeScale.value)
    wrapper.setAttribute('data-direction', timeScale.value < 0 ? 'right' : 'left')
  }
  applyTimeScale()

  const marqueeObserver = Observer.create({
    target: wrapper,
    type: 'pointer,touch',
    preventDefault: true,
    debounce: false,
    onChangeX: (observerEvent) => {
      let velocityTimeScale = observerEvent.velocityX * -sensitivity
      velocityTimeScale = gsap.utils.clamp(-multiplier, multiplier, velocityTimeScale)

      gsap.killTweensOf(timeScale)
      const restingDirection = velocityTimeScale < 0 ? -1 : 1

      gsap.timeline({ onUpdate: applyTimeScale })
        .to(timeScale, { value: velocityTimeScale, duration: 0.1, overwrite: true })
        .to(timeScale, { value: restingDirection, duration: 1.0 })
    },
  })

  const scrollTrigger = ScrollTrigger.create({
    trigger: wrapper,
    start: 'top bottom',
    end: 'bottom top',
    onEnter: () => { marqueeLoop.resume(); applyTimeScale(); marqueeObserver.enable() },
    onEnterBack: () => { marqueeLoop.resume(); applyTimeScale(); marqueeObserver.enable() },
    onLeave: () => { marqueeLoop.pause(); marqueeObserver.disable() },
    onLeaveBack: () => { marqueeLoop.pause(); marqueeObserver.disable() },
  })

  wrapper.setAttribute('data-draggable-marquee-init', 'initialized')

  cleanupFns.push(() => {
    marqueeObserver.kill()
    scrollTrigger.kill()
    marqueeLoop.kill()
    gsap.killTweensOf(timeScale)
    wrapper.setAttribute('data-draggable-marquee-init', '')
    const clones = collection.querySelectorAll('[data-draggable-marquee-clone]')
    clones.forEach(node => node.remove())
    gsap.set(collection, { clearProps: 'transform' })
  })
}

onMounted(() => {
  nextTick(initDraggableMarquee)
})

watch(
  () => [
    props.section?.autoscrollGalleryAspectRatio,
    props.section?.autoscrollGalleryDuration,
    props.section?.autoscrollGalleryDirection,
    items.value.length,
  ],
  () => {
    cleanupFns.splice(0).forEach(fn => fn())
    nextTick(initDraggableMarquee)
  }
)

onBeforeUnmount(() => {
  cleanupFns.splice(0).forEach(fn => fn())
})
</script>

<style scoped>
.draggable-marquee {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
}

.draggable-marquee__collection {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  will-change: transform;
}

.draggable-marquee__list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: none;
}

.draggable-marquee__item {
  width: min(24vw, 20rem);
  aspect-ratio: var(--autoscroll-gallery-aspect-ratio, 3 / 5);
  border-radius: 1.25em;
  margin-right: 1em;
  flex: none;
  overflow: hidden;
  display: block;
  text-decoration: none;
}

.draggable-marquee__item-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 999px) {
  .draggable-marquee__item {
    width: min(56vw, 16rem);
  }
}
</style>
