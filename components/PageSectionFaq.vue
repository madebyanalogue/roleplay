<template>
  <section class="faq-section">
    <div>
      <div class="grid-1 gap-3">
        <div v-if="section.faqTitle" class="faq-section__title h4">
          {{ section.faqTitle }}
        </div>
        <p v-if="linkUrl && section.faqLinkText" class="faq-section__link-wrap">
          <Button :to="linkUrl" class="faq-section__link faq-section__link--text">
            {{ section.faqLinkText }}
          </Button>
        </p>
      </div>
    </div>
    <div v-if="faqItems.length > 0" class="faq-section__list">
      <div
        v-for="(item, index) in faqItems"
        :key="item._key || index"
        class="faq-section__item"
        :class="{ 'is--open': openIndex === index }"
      >
        <button
          type="button"
          class="faq-section__trigger h5"
          :aria-expanded="openIndex === index"
          :aria-controls="`faq-${index}`"
          :id="`faq-trigger-${index}`"
          @click="toggle(index)"
        >
          <span class="faq-section__question">{{ item.question }}</span>
          <span class="faq-section__icon" aria-hidden="true"></span>
        </button>
        <div
          :id="`faq-${index}`"
          ref="(el) => setPanelRef(el, index)"
          class="faq-section__panel"
          role="region"
          :aria-labelledby="`faq-trigger-${index}`"
          :aria-hidden="openIndex !== index"
        >
          <div class="faq-section__panel-inner">
            <div v-if="item.answer" class="faq-section__answer">
              <SanityBlocks :blocks="item.answer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const faqItems = computed(() => props.section?.faqItems || [])

const linkUrl = computed(() => {
  const link = props.section?.faqLink
  if (!link?.slug) return null
  return link.slug === 'home' ? '/' : `/${link.slug}`
})
const openIndex = ref(null)
const panelRefs = ref([])

function setPanelRef(el, index) {
  if (el) {
    panelRefs.value[index] = el
  }
}

const DURATION = 0.35
const EASE = 'power2.inOut'

async function toggle(index) {
  const wasOpen = openIndex.value === index
  const panelEl = panelRefs.value[index]
  const innerEl = panelEl?.querySelector('.faq-section__panel-inner')

  if (wasOpen) {
    openIndex.value = null
    if (panelEl && innerEl) {
      gsap.to(panelEl, {
        height: 0,
        duration: DURATION,
        ease: EASE,
        overflow: 'hidden',
      })
      gsap.to(innerEl, {
        opacity: 0,
        y: -8,
        duration: DURATION * 0.6,
        ease: EASE,
      })
    }
  } else {
    const prevIndex = openIndex.value
    const prevPanel = prevIndex != null ? panelRefs.value[prevIndex] : null

    if (prevPanel) {
      gsap.to(prevPanel, {
        height: 0,
        duration: DURATION,
        ease: EASE,
        overflow: 'hidden',
      })
      const prevInner = prevPanel?.querySelector('.faq-section__panel-inner')
      if (prevInner) {
        gsap.to(prevInner, {
          opacity: 0,
          y: -8,
          duration: DURATION * 0.6,
          ease: EASE,
        })
      }
    }

    openIndex.value = index
    await nextTick()
    await new Promise((resolve) => requestAnimationFrame(resolve))

    if (panelEl && innerEl) {
      const startHeight = panelEl.scrollHeight
      gsap.set(panelEl, { height: 0, overflow: 'hidden' })
      gsap.set(innerEl, { opacity: 0, y: -8 })

      gsap.to(panelEl, {
        height: startHeight,
        duration: DURATION,
        ease: EASE,
        overflow: 'hidden',
        onComplete: () => {
          gsap.set(panelEl, { height: 'auto', overflow: 'visible' })
        },
      })
      gsap.to(innerEl, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: EASE,
        delay: DURATION * 0.2,
      })
    }
  }
}
</script>

<style scoped>
.faq-section {
  min-height: calc(var(--unit-grid) * 13);
  /* background:#ededed; */
}

.faq-section {
  padding: var(--unit-grid);
  display: grid;
  gap: var(--unit-grid);
  grid-template-columns: 4fr 8fr;
}
.faq-section__icon {
  display: block;
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  position: relative;
  transition: transform 0.35s ease;
}

.faq-section__icon::before,
.faq-section__icon::after {
  content: '';
  position: absolute;
  background: currentColor;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.faq-section__icon::before {
  width: 100%;
  height: 1px;
}

.faq-section__icon::after {
  width: 1px;
  height: 100%;
}

.faq-section__trigger {
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  padding:calc(var(--unit-grid) * 0.3) 0;
  font-weight: 500;
  position: relative;
}
.faq-section__trigger:before, .faq-section__trigger:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  opacity: 0.2;
  background: currentColor;
  transition: transform 0.35s ease;
  left:0;
  position: absolute;
}
.faq-section__trigger:before {
  top:0;
}
.faq-section__trigger:after {
  bottom:0;
}
.faq-section__list >*:not(:first-child) .faq-section__trigger:before {
  display: none;
}
.faq-section__item.is--open .faq-section__icon {
  transform: rotate(180deg);
}

.faq-section__panel {
  overflow: hidden;
  height: 0;
}

.faq-section__panel-inner {
  padding-top: 0.5em;
}

/* Text button variant – no background, minimal padding, keeps character hover effect */
.faq-section__link--text {
  padding: 0;
  background: none;
}

.faq-section__link--text :deep(.btn-animate-chars__bg) {
  display: none;
}
</style>
