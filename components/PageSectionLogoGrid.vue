<template>
  <div v-if="logos.length > 0" class="logo-grid-section pad-1">
    <div class="logo-grid-section__inner gap-3">
      <div v-if="section.logoGridTitle" class="logo-grid-section__title h4">
        {{ section.logoGridTitle }}
      </div>
      <div class="logo-wall">
        <div class="logo-wall__collection">
          <div class="logo-wall__list">
            <div
              v-for="cellIndex in cellIndices"
              :key="cellIndex"
              class="logo-wall__item"
              :class="{ 'logo-wall__item--animating': animatingCells.has(cellIndex) }"
              @mouseenter="onItemHover(cellIndex)"
              @transitionend="(e) => onTransitionEnd(cellIndex, e)"
            >
              <div class="logo-wall__slot">
                <div class="logo-wall__slot-current">
                  <NuxtImg
                    v-if="getLogoSrc(cellCurrentLogo[cellIndex])"
                    :src="getLogoSrc(cellCurrentLogo[cellIndex])"
                    loading="lazy"
                    width="100"
                    alt=""
                    class="logo-wall__logo-img"
                  />
                </div>
                <div class="logo-wall__slot-next">
                  <NuxtImg
                    v-if="cellNextLogo[cellIndex] !== null && getLogoSrc(cellNextLogo[cellIndex])"
                    :src="getLogoSrc(cellNextLogo[cellIndex])"
                    loading="lazy"
                    width="100"
                    alt=""
                    class="logo-wall__logo-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { getImageSrc: getSanityImageSrc } = useSanityImage()

const logos = computed(() => props.section?.logoGridLogos || [])

// Reserve 1 logo for queue when we have 2+ logos (so we can rotate)
const cellIndices = computed(() => {
  const n = logos.value.length
  return n > 1 ? Array.from({ length: n - 1 }, (_, i) => i) : n ? [0] : []
})

// Per-cell state: which logo index is currently displayed
const cellCurrentLogo = ref([])
// Per-cell: which logo is animating in (null when not animating)
const cellNextLogo = ref([])
// Queue of logo indices that have rotated out - available to show (FIFO)
const logoQueue = ref([])
const animatingCells = ref(new Set())

const getLogoSrc = (logoIndex) => {
  const list = logos.value
  if (logoIndex == null || logoIndex < 0 || logoIndex >= list.length) return ''
  const logo = list[logoIndex]
  const asset = logo?.asset || logo
  return getSanityImageSrc(asset)
}

const initState = () => {
  const list = logos.value
  const n = list.length
  const cellCount = cellIndices.value.length
  if (!cellCount) return

  // Each cell starts with its own logo (unique assignment)
  cellCurrentLogo.value = [...Array(cellCount).keys()]
  cellNextLogo.value = Array(cellCount).fill(null)
  // Queue gets logos not displayed (reserve 1+ for rotation)
  logoQueue.value = []
  for (let i = cellCount; i < n; i++) {
    logoQueue.value.push(i)
  }
  animatingCells.value = new Set()
}

watch(logos, initState, { immediate: true })

const onItemHover = (cellIndex) => {
  const current = cellCurrentLogo.value[cellIndex]
  let next

  // Build visible set: for animating cells use their next logo (they're transitioning out of current)
  const visible = new Set()
  for (let i = 0; i < cellCurrentLogo.value.length; i++) {
    const logo = animatingCells.value.has(i)
      ? cellNextLogo.value[i]
      : cellCurrentLogo.value[i]
    if (logo != null) visible.add(logo)
  }
  const queue = logoQueue.value
  let found = -1
  for (let i = 0; i < queue.length; i++) {
    const candidate = queue[i]
    if (!visible.has(candidate)) {
      next = candidate
      found = i
      break
    }
  }

  // Only rotate if we have a logo in the queue - no shifting other cells
  if (next == null) return

  logoQueue.value = queue.filter((_, i) => i !== found)
  logoQueue.value = [...logoQueue.value]

  // Enqueue current so it becomes available for other cells
  logoQueue.value.push(current)
  logoQueue.value = [...logoQueue.value]

  cellNextLogo.value[cellIndex] = next
  cellNextLogo.value = [...cellNextLogo.value]
  animatingCells.value.add(cellIndex)
  animatingCells.value = new Set(animatingCells.value)
}

const onTransitionEnd = (cellIndex, event) => {
  if (event.propertyName !== 'transform') return
  if (!animatingCells.value.has(cellIndex)) return

  const next = cellNextLogo.value[cellIndex]
  cellCurrentLogo.value[cellIndex] = next
  cellCurrentLogo.value = [...cellCurrentLogo.value]
  cellNextLogo.value[cellIndex] = null
  cellNextLogo.value = [...cellNextLogo.value]
  animatingCells.value.delete(cellIndex)
  animatingCells.value = new Set(animatingCells.value)
}
</script>

<style scoped>

.logo-grid-section {
  height: calc(var(--unit-grid) * 12);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
}
.logo-wall {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo-grid-section__inner {
  width: 85%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
.logo-wall__collection {
  width: 100%;
}

.logo-wall__list {
  display: flex;
  flex-flow: wrap;
}

.logo-wall__item {
  width: 50%;
  position: relative;
  aspect-ratio: 4/3;
}

/* 2x3 up to 600px */
.logo-wall__list .logo-wall__item:nth-child(n+7) {
  display: none;
}

.logo-wall__slot {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wall__slot-current,
.logo-wall__slot-next {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wall__item--animating .logo-wall__slot-current,
.logo-wall__item--animating .logo-wall__slot-next {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-wall__slot-current {
  transform: translateY(0);
}

.logo-wall__slot-next {
  transform: translateY(100%);
}

.logo-wall__item--animating .logo-wall__slot-current {
  transform: translateY(-100%);
}

.logo-wall__item--animating .logo-wall__slot-next {
  transform: translateY(0);
}

.logo-wall__logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 3x2 from 601px to 800px */
@media screen and (min-width: 601px) {
  .logo-wall__item {
    width: 33.333%;
  }
}

/* 3x3 from 801px to 1000px */
@media screen and (min-width: 801px) {
  .logo-wall__item {
    width: 33.333%;
  }

  .logo-wall__list .logo-wall__item:nth-child(n+7) {
    display: revert;
  }

  .logo-wall__list .logo-wall__item:nth-child(n+10) {
    display: none;
  }
}

/* 4x2 from 1001px to 1200px */
@media screen and (min-width: 1001px) {
  .logo-wall__item {
    width: 25%;
  }

  .logo-wall__list .logo-wall__item:nth-child(n+9) {
    display: none;
  }
}

/* 5x2 from 1201px */
@media screen and (min-width: 1201px) {
  .logo-wall__item {
    width: 20%;
  }

  .logo-wall__list .logo-wall__item:nth-child(n+9) {
    display: revert;
  }

  .logo-wall__list .logo-wall__item:nth-child(n+11) {
    display: none;
  }
}
</style>
