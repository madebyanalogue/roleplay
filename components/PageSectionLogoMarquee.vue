<template>
  <section v-if="logos.length > 0" ref="sectionRef" class="logo-marquee-section">
    <div
      v-for="(marqueeLogos, marqueeIndex) in [marquee1Logos, marquee2Logos]"
      :key="marqueeIndex"
      :data-marquee-duplicate="2"
      data-marquee-scroll-direction-target
      :data-marquee-direction="marqueeIndex === 0 ? 'left' : 'right'"
      data-marquee-status="normal"
      data-marquee-speed="15"
      data-marquee-scroll-speed="10"
      class="logo-marquee"
    >
      <div data-marquee-scroll-target class="logo-marquee__scroll">
        <div data-marquee-collection-target class="logo-marquee__collection">
          <div
            v-for="(logo, index) in (marqueeIndex === 0 ? display1 : display2)"
            :key="`${marqueeIndex}-${logo._key || index}`"
            class="logo-marquee__item"
          >
            <img
              :src="getImageSrc(logo?.asset || logo)"
              alt=""
              class="logo-marquee__img"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSanityImage } from '~/composables/useSanityImage'
import { initLogoMarquee } from '~/composables/useLogoMarquee'

const sectionRef = ref(null)

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { getImageSrc: getSanityImageSrc } = useSanityImage()

function shuffleArray(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const logos = computed(() => props.section?.logoMarqueeLogos || props.section?.logoGridLogos || [])

// Use stable order for SSR/hydration; shuffle only after mount to avoid hydration mismatch
const marquee1Logos = ref([])
const marquee2Logos = ref([])
const display1 = computed(() => (marquee1Logos.value.length > 0 ? marquee1Logos.value : logos.value))
const display2 = computed(() => (marquee2Logos.value.length > 0 ? marquee2Logos.value : logos.value))

const getImageSrc = (asset) => {
  if (!asset) return ''
  return getSanityImageSrc(asset)
}

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    marquee1Logos.value = shuffleArray([...logos.value])
    marquee2Logos.value = shuffleArray([...logos.value])
    nextTick(() => {
      initLogoMarquee(sectionRef.value)
      setTimeout(() => initLogoMarquee(sectionRef.value), 500)
    })
  }
})
</script>

<style scoped>
.logo-marquee-section {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.logo-marquee {
  width: 110vw;
  position: relative;
  overflow: hidden;
  margin-left: -5vw;
}

.logo-marquee__scroll {
  will-change: transform;
  width: 100%;
  display: flex;
  position: relative;
}

.logo-marquee__collection {
  will-change: transform;
  display: flex;
  position: relative;
  flex-shrink: 0;
}

.logo-marquee__item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw / 7);
  height: calc(100vw / 12);
  padding: 0px;
}

.logo-marquee__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
