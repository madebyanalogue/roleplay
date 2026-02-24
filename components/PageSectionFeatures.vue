<template>
  <div
    v-if="features.length > 0"
    ref="wrapRef"
    data-sticky-feature-wrap
    class="sticky-features__wrap"
  >
    <div class="sticky-features__scroll">
      <div class="sticky-features__container">
        <div class="sticky-features__col is--img">
          <div class="sticky-features__img-collection">
            <div class="sticky-features__img-list">
              <div
                v-for="(feature, index) in features"
                :key="`visual-${feature._key || index}`"
                data-sticky-feature-visual-wrap
                class="sticky-features__img-item"
              >
                <img
                  :src="getImageSrc(feature.image)"
                  :alt="feature.heading"
                  class="sticky-features__img"
                >
              </div>
            </div>
          </div>
          <div class="sticky-features__progress-w">
            <div
              data-sticky-feature-progress
              class="sticky-features__progress-bar"
            />
          </div>
        </div>
        <div class="sticky-features__col">
          <div class="sticky-features__text-collection">
            <div class="sticky-features__text-list">
              <div
                v-for="(feature, index) in features"
                :key="`item-${feature._key || index}`"
                data-sticky-feature-item
                class="sticky-features__text-item"
              >
                <span data-sticky-feature-text class="sticky-features__tag">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <h2 data-sticky-feature-text class="sticky-features__heading">
                  {{ feature.heading }}
                </h2>
                <p data-sticky-feature-text class="sticky-features__p">
                  {{ feature.description }}
                </p>
                <p
                  v-if="feature.link"
                  data-sticky-feature-text
                  class="sticky-features__p is--link"
                >
                  <LinkAnimateChars
                    :to="feature.link?.startsWith('http') ? undefined : feature.link"
                    :href="feature.link?.startsWith('http') ? feature.link : undefined"
                  >
                    {{ feature.linkText || 'Learn more' }}
                  </LinkAnimateChars>
                </p>
                <p
                  v-else-if="feature.linkText"
                  data-sticky-feature-text
                  class="sticky-features__p is--link"
                >
                  {{ feature.linkText }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSanityImage } from '~/composables/useSanityImage'

gsap.registerPlugin(ScrollTrigger)

const wrapRef = ref(null)
let scrollTriggerInstance = null

const props = defineProps({
  section: {
    type: Object,
    default: () => ({}),
  },
})

const { getImageSrc: getSanityImageSrc } = useSanityImage()

const defaultFeatures = [
  {
    _key: 'd1',
    image: 'https://cdn.prod.website-files.com/68b83c9a431270d8deb1e6b1/68b847956497fe87b81b7025_Iced%20Matcha%20Latte.avif',
    heading: 'Fresh Iced Matcha Latte',
    description: 'A glass of iced matcha latte with a metal straw, sitting on a red surface against a dark background, showcasing its vibrant green color.',
    linkText: 'Learn more',
  },
  {
    _key: 'd2',
    image: 'https://cdn.prod.website-files.com/68b83c9a431270d8deb1e6b1/68b847956468e74ee70e259e_Matcha%20Whisking%20Art.avif',
    heading: 'Matcha Whisking Art',
    description: 'A hand sprinkles green powder using a bamboo whisk into another hand, set against a dark fabric background, creating a dramatic visual.',
    linkText: 'Learn more',
  },
  {
    _key: 'd3',
    image: 'https://cdn.prod.website-files.com/68b83c9a431270d8deb1e6b1/68b84795dd49cb5a5f2a2640_Steaming%20Orange%20Beverage.avif',
    heading: 'Steaming Orange Fizz',
    description: 'A glass of orange beverage with a sugared rim and a floating leaf, emitting steam, set against a warm orange background.',
    linkText: 'Learn more',
  },
  {
    _key: 'd4',
    image: 'https://cdn.prod.website-files.com/68b83c9a431270d8deb1e6b1/68b8479522525b321756af2e_Hands%20Holding%20Matcha%20Cup.avif',
    heading: 'Home Away From Home',
    description: 'Hands holding a copper cup of green matcha tea on a brown surface, adorned with simple bracelets, creating a warm and serene scene.',
    linkText: 'Learn more',
  },
]

const features = computed(() => {
  const items = props.section?.features || []
  if (items.length > 0) {
    const seen = new Set()
    return items
      .filter((f) => {
        const id = f._key || f.heading || JSON.stringify(f)
        if (seen.has(id)) return false
        seen.add(id)
        return true
      })
      .map((f, i) => ({
        _key: f._key || `f-${i}`,
        image: f.image?.asset || f.image,
        heading: f.heading || '',
        description: f.description || '',
        link: f.link?.slug ? (f.link.slug === 'home' ? '/' : `/${f.link.slug}`) : f.link?.url,
        linkText: f.linkText || 'Learn more',
      }))
  }
  return defaultFeatures
})

const getImageSrc = (asset) => {
  if (typeof asset === 'string') return asset
  return getSanityImageSrc(asset)
}

function initStickyFeatures(wrap) {
  if (!wrap) return
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }
  const visualWraps = Array.from(wrap.querySelectorAll('[data-sticky-feature-visual-wrap]'))
  const items = Array.from(wrap.querySelectorAll('[data-sticky-feature-item]'))
  const progressBar = wrap.querySelector('[data-sticky-feature-progress]')

  if (visualWraps.length !== items.length || visualWraps.length < 1) return

  const count = Math.min(visualWraps.length, items.length)
  const rm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const DURATION = rm ? 0.01 : 0.75
  const EASE = 'power4.inOut'
  const SCROLL_AMOUNT = 1

  const getTexts = (el) => Array.from(el.querySelectorAll('[data-sticky-feature-text]'))

  gsap.set(visualWraps[0], { clipPath: 'inset(0% round 0.75em)' })
  gsap.set(items[0], { autoAlpha: 1 })

  let currentIndex = 0

  function transition(fromIndex, toIndex) {
    if (fromIndex === toIndex) return
    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } })

    if (fromIndex < toIndex) {
      tl.to(visualWraps[toIndex], { clipPath: 'inset(0% round 0.75em)', duration: DURATION, ease: EASE }, 0)
    } else {
      tl.to(visualWraps[fromIndex], { clipPath: 'inset(50% round 0.75em)', duration: DURATION, ease: EASE }, 0)
    }
    animateOut(items[fromIndex])
    animateIn(items[toIndex])
  }

  function animateOut(itemEl) {
    const texts = getTexts(itemEl)
    gsap.to(texts, {
      autoAlpha: 0,
      y: -30,
      ease: 'power4.out',
      duration: 0.4,
      onComplete: () => gsap.set(itemEl, { autoAlpha: 0 }),
    })
  }

  function animateIn(itemEl) {
    const texts = getTexts(itemEl)
    gsap.set(itemEl, { autoAlpha: 1 })
    gsap.fromTo(texts, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: 'power4.out', duration: DURATION, stagger: 0.1 })
  }

  /* Equal scroll per slide: transitions at 33%, 66%; indicator at 100% = section unsticks */
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: wrap,
    start: 'top top',
    end: () => `+=${count * 100}%`,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = Math.min(self.progress, SCROLL_AMOUNT) / SCROLL_AMOUNT
      let idx = Math.floor(p * count + 1e-6)
      idx = Math.max(0, Math.min(count - 1, idx))

      if (progressBar) {
        gsap.set(progressBar, { scaleX: p })
      }

      if (idx !== currentIndex) {
        transition(currentIndex, idx)
        currentIndex = idx
      }
    },
  })
}

onMounted(() => {
  if (!import.meta.client || !wrapRef.value) return
  const init = () => {
    if (!wrapRef.value) return
    initStickyFeatures(wrapRef.value)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }
  nextTick(() => {
    if (document.body.classList.contains('preloader-complete')) {
      init()
    } else {
      document.addEventListener('preloader-complete', init, { once: true })
    }
  })
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', () => {
    nextTick(() => ScrollTrigger.refresh())
  })
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }
})
</script>

<style scoped>
.sticky-features__wrap {
  width: 100%;
  padding-left: 1.25em;
  padding-right: 1.25em;
  position: relative;
  background-color: var(--black);
  color: var(--white);
}

.sticky-features__scroll {
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
}

.sticky-features__container {
  grid-column-gap: 1.25em;
  grid-row-gap: 1.25em;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.sticky-features__col {
  flex: 1;
  position: relative;
}

.sticky-features__col.is--img {
  overflow: hidden;
  border-radius: 0.75em;
}

.sticky-features__progress-w {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.25em;
  background-color: rgba(255, 255, 255, 0.15);
}

.sticky-features__progress-bar {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  transform: scale3d(0, 1, 1);
  transform-origin: 0% 50%;
}

.sticky-features__img-collection {
  width: 100%;
}

.sticky-features__img-list {
  aspect-ratio: 1 / 1.3;
  width: 100%;
  position: relative;
}

.sticky-features__img-item {
  clip-path: inset(50% round 0.75em);
  -webkit-clip-path: inset(50% round 0.75em);
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.sticky-features__img-item:first-of-type {
  clip-path: inset(0% round 0.75em);
  -webkit-clip-path: inset(0% round 0.75em);
}

.sticky-features__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.sticky-features__text-collection {
  height: 100%;
}

.sticky-features__text-list {
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  max-height: 100%;
  display: flex;
  position: relative;
}

.sticky-features__text-item {
  grid-column-gap: 1.5em;
  grid-row-gap: 1.5em;
  visibility: hidden;
  flex-flow: column;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 27.5em;
  margin-left: auto;
  display: flex;
  position: absolute;
  right: 0;
}

.sticky-features__text-item:first-of-type {
  visibility: visible;
}

.sticky-features__heading {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3.75em;
  font-weight: 500;
  line-height: 1;
}

.sticky-features__p {
  color: #ffffffb3;
  margin-bottom: 0;
  font-size: 1.25em;
  line-height: 1.2;
}

.sticky-features__p.is--link {
  color: #fff;
  text-decoration: underline;
}

.sticky-features__p.is--link a {
  color: inherit;
  text-decoration: inherit;
}

.sticky-features__tag {
  background-color: #ffffff1a;
  border-radius: 0.25em;
  margin-bottom: 1.5em;
  padding: 0.5em 0.625em;
  font-size: 1em;
  line-height: 1;
}

@media screen and (max-width: 767px) {
  .sticky-features__scroll {
    justify-content: center;
    align-items: center;
    height: auto;
    min-height: 100svh;
    padding-top: 1.25em;
    padding-bottom: 2.5em;
  }

  .sticky-features__container {
    grid-column-gap: 2em;
    grid-row-gap: 2em;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  .sticky-features__img-list {
    aspect-ratio: 1;
  }

  .sticky-features__text-list {
    min-height: 20em;
    max-height: none;
  }

  .sticky-features__text-item {
    max-width: none;
  }

  .sticky-features__heading {
    font-size: 2.5em;
  }

  .sticky-features__p {
    font-size: 1em;
  }

  .sticky-features__tag {
    margin-bottom: 0;
  }
}
</style>
