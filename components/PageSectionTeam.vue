<template>
  <section ref="wrapRef" data-follower-wrap class="preview-container">
    <div class="preview-item__row tablet--hide">
      <div class="preview-item__col is--large"><span class="preview-container__label">Name</span></div>
      <div class="preview-item__col is--medium"><span class="preview-container__label">Role</span></div>
    </div>

    <div data-follower-collection class="preview-collection">
      <div class="preview-list">
        <div v-for="(member, index) in members" :key="member._key || index" data-follower-item class="preview-item">
          <div class="preview-item__inner">
            <div class="preview-item__row">
              <div class="preview-item__col is--large">
                <h2 class="preview-item__heading">{{ member.name }}</h2>
              </div>
              <div class="preview-item__col is--medium">
                <p class="preview-item__text">{{ member.role }}</p>
              </div>
            </div>
            <div data-follower-visual class="preview-item__visual">
              <NuxtImg
                v-if="member?.image?.asset"
                :src="getImageSrc(member.image.asset)"
                :alt="member.name || ''"
                class="preview-item__visual-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div data-follower-cursor class="preview-follower">
      <div data-follower-cursor-inner class="preview-follower__inner">
        <div class="preview-follower__label">
          <div class="preview-follower__label-span">View team</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const wrapRef = ref(null)
const { getImageSrc } = useSanityImage()
const members = computed(() => props.section?.teamMembers || [])

let cleanupFn = null

function initPreviewFollower(wrap) {
  const collection = wrap?.querySelector('[data-follower-collection]')
  const items = wrap?.querySelectorAll('[data-follower-item]') || []
  const follower = wrap?.querySelector('[data-follower-cursor]')
  const followerInner = wrap?.querySelector('[data-follower-cursor-inner]')

  if (!collection || !items.length || !follower || !followerInner) return () => {}

  let prevIndex = null
  let firstEntry = true
  const offset = 100
  const duration = 0.5
  const ease = 'power2.inOut'

  gsap.set(follower, { xPercent: -50, yPercent: -50 })
  const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' })
  const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' })

  const onMouseMove = (event) => {
    xTo(event.clientX)
    yTo(event.clientY)
  }

  window.addEventListener('mousemove', onMouseMove)

  const itemListeners = []

  items.forEach((item, index) => {
    const onEnter = () => {
      const forward = prevIndex === null || index > prevIndex
      prevIndex = index

      follower.querySelectorAll('[data-follower-visual]').forEach((el) => {
        gsap.killTweensOf(el)
        gsap.to(el, {
          yPercent: forward ? -offset : offset,
          duration,
          ease,
          overwrite: 'auto',
          onComplete: () => el.remove(),
        })
      })

      const visual = item.querySelector('[data-follower-visual]')
      if (!visual) return

      const clone = visual.cloneNode(true)
      followerInner.appendChild(clone)

      if (!firstEntry) {
        gsap.fromTo(
          clone,
          { yPercent: forward ? offset : -offset },
          { yPercent: 0, duration, ease, overwrite: 'auto' },
        )
      } else {
        firstEntry = false
      }
    }

    const onLeave = () => {
      const el = follower.querySelector('[data-follower-visual]')
      if (!el) return
      gsap.killTweensOf(el)
      gsap.to(el, {
        yPercent: -offset,
        duration,
        ease,
        overwrite: 'auto',
        onComplete: () => el.remove(),
      })
    }

    item.addEventListener('mouseenter', onEnter)
    item.addEventListener('mouseleave', onLeave)
    itemListeners.push(() => {
      item.removeEventListener('mouseenter', onEnter)
      item.removeEventListener('mouseleave', onLeave)
    })
  })

  const onCollectionLeave = () => {
    follower.querySelectorAll('[data-follower-visual]').forEach((el) => {
      gsap.killTweensOf(el)
      gsap.delayedCall(duration, () => el.remove())
    })
    firstEntry = true
    prevIndex = null
  }

  collection.addEventListener('mouseleave', onCollectionLeave)

  return () => {
    window.removeEventListener('mousemove', onMouseMove)
    collection.removeEventListener('mouseleave', onCollectionLeave)
    itemListeners.forEach((off) => off())
  }
}

onMounted(() => {
  cleanupFn = initPreviewFollower(wrapRef.value)
})

onBeforeUnmount(() => {
  if (cleanupFn) cleanupFn()
})
</script>

<style scoped>
.preview-container {
  width: 100%;
}

.preview-collection {
  width: 100%;
  margin-top: 0.5em;
}

.preview-item__row {
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  display: flex;
}

.preview-item__col {
  flex: 1;
}

.preview-item__col.is--large {
  max-width: 60%;
}

.preview-item__col.is--medium {
  max-width: 40%;
}

.preview-container__label {
  color: #0a0a0a80;
  text-transform: uppercase;
  font-size: 0.75em;
}

.preview-list {
  flex-flow: column;
  width: 100%;
  display: flex;
  position: relative;
}

.preview-item {
  width: 100%;
  transition: opacity 0.2s;
}

.preview-item__heading {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3.5em;
  font-weight: 400;
  line-height: 1;
}

.preview-item__text {
  margin-bottom: 0;
  font-size: 1.25em;
  font-weight: 400;
  line-height: 1.2;
}

.preview-item__visual {
  aspect-ratio: 1 / 1.25;
  width: 20em;
  display: none;
  position: absolute;
  overflow: hidden;
}

.preview-follower [data-follower-visual] {
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.preview-item__inner {
  border-top: 1px solid #00000040;
  width: 100%;
  padding-top: 2.5em;
  padding-bottom: 2.5em;
}

.preview-item__visual-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.preview-follower {
  z-index: 100;
  aspect-ratio: 1 / 1.25;
  pointer-events: none;
  border-radius: 0.75em;
  justify-content: center;
  align-items: center;
  width: 20em;
  display: flex;
  position: fixed;
  inset: 0 auto auto 0;
  overflow: hidden;
}

.preview-follower__label {
  z-index: 2;
  position: absolute;
  opacity: 0;
  transform: translate(0, 100%);
  transition: opacity 0.1s ease, transform 0.6s cubic-bezier(0.65, 0.1, 0, 1);
}

.preview-follower__label-span {
  background-color: #fff;
  border-radius: 0.25em;
  padding: 0.75em 1.25em;
  font-size: 1em;
}

.preview-follower__inner {
  z-index: 2;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.1s ease, transform 0.6s cubic-bezier(0.65, 0.1, 0, 1);
}

@media screen and (min-width: 992px) {
  .preview-item:last-of-type {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
}

@media (hover: hover) and (min-width: 992px) {
  :global(body:has([data-follower-collection]:hover)) .preview-follower__inner {
    opacity: 1;
    transform: scale(1);
  }

  :global(body:has([data-follower-collection]:hover)) .preview-follower__label {
    opacity: 1;
    transform: translate(0, 0);
  }

  :global(body:has(.preview-item:hover)) .preview-item:not(:hover) {
    opacity: 0.5;
  }
}

@media screen and (max-width: 991px) {
  .preview-item__row {
    grid-row-gap: 0.5em;
  }

  .preview-item__row.tablet--hide {
    display: none;
  }

  .preview-item__col.is--large {
    flex: none;
    order: -1;
    width: 100%;
    max-width: none;
  }

  .preview-item__col.is--medium {
    order: -1;
    max-width: 100%;
  }

  .preview-list {
    grid-column-gap: 1em;
    grid-row-gap: 4em;
    flex-flow: wrap;
  }

  .preview-item {
    width: calc(50% - 0.5em);
  }

  .preview-item__heading {
    font-size: 2em;
  }

  .preview-item__visual {
    border-radius: 0.75em;
    order: -1;
    width: 100%;
    margin-bottom: 1em;
    display: block;
    position: relative;
  }

  .preview-item__inner {
    border: 1px #000;
    flex-flow: column;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
  }

  .preview-follower {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .preview-list {
    grid-row-gap: 3em;
  }

  .preview-item {
    width: 100%;
  }
}
</style>
