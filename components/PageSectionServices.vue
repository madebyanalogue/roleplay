<template>
  <section class="services-section">
    <h2 v-if="section.servicesTitle || section.title" class="subtitle subtitle--square orange-dot">
      {{ section.servicesTitle || section.title }}
    </h2>

    <div class="services-section__desktop-grid">
      <div
        v-for="(line, index) in serviceLines"
        :key="`service-desktop-${index}`"
        class="services-section__item"
      >
        {{ line }}
      </div>
    </div>

    <div ref="carouselRef" class="services-section__mobile-carousel">
      <div
        v-for="(group, groupIndex) in mobileGroups"
        :key="`service-group-${groupIndex}`"
        class="services-section__slide"
      >
        <div
          v-for="(line, index) in group"
          :key="`service-mobile-${groupIndex}-${index}`"
          class="services-section__item"
        >
          {{ line }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import 'flickity/css/flickity.css'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const MOBILE_MAX = 999
const carouselRef = ref(null)
const flickityRef = ref(null)
let removeResizeListener = () => {}

const serviceLines = computed(() => {
  return (props.section?.servicesTextarea || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
})

const mobileGroups = computed(() => {
  const out = []
  for (let i = 0; i < serviceLines.value.length; i += 7) {
    out.push(serviceLines.value.slice(i, i + 7))
  }
  return out
})

async function initMobileCarousel() {
  if (!import.meta.client) return
  if (!carouselRef.value) return
  if (window.innerWidth > MOBILE_MAX) return
  if (flickityRef.value) return
  if (mobileGroups.value.length <= 1) return

  const Flickity = (await import('flickity')).default
  flickityRef.value = new Flickity(carouselRef.value, {
    prevNextButtons: false,
    pageDots: true,
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'left',
    contain: true,
    draggable: true,
  })
}

function destroyMobileCarousel() {
  if (!flickityRef.value) return
  flickityRef.value.destroy()
  flickityRef.value = null
}

function handleViewportChange() {
  if (!import.meta.client) return
  if (window.innerWidth <= MOBILE_MAX) {
    initMobileCarousel()
    return
  }
  destroyMobileCarousel()
}

watch(
  () => mobileGroups.value.length,
  async () => {
    await nextTick()
    destroyMobileCarousel()
    initMobileCarousel()
  },
)

onMounted(async () => {
  await nextTick()
  await initMobileCarousel()
  window.addEventListener('resize', handleViewportChange)
  removeResizeListener = () => window.removeEventListener('resize', handleViewportChange)
})

onUnmounted(() => {
  removeResizeListener()
  destroyMobileCarousel()
})
</script>

<style scoped>
.services-section {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  padding: 0 var(--gutter);
}

.services-section__desktop-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--gutter);
  row-gap: calc(var(--gutter) * 0.4);
}

.services-section__item {
  line-height: 1.1;
}

.services-section__mobile-carousel {
  display: none;
}

@media (max-width: 999px) {
  .services-section__desktop-grid {
    display: none;
  }

  .services-section__mobile-carousel {
    display: block;
  }

  .services-section__slide {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gutter) * 0.4);
  }
}

.services-section__mobile-carousel :deep(.flickity-page-dots) {
  position: static;
  margin-top: calc(var(--gutter) * 0.7);
  display: flex;
  justify-content: center;
  gap: 0.55rem;
}

.services-section__mobile-carousel :deep(.flickity-page-dots .dot) {
  margin: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.35;
}

.services-section__mobile-carousel :deep(.flickity-page-dots .dot.is-selected) {
  opacity: 1;
}
</style>

