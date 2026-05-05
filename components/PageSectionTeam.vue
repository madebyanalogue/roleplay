<template>
  <section class="team-section" data-directional-hover data-type="y">
    <div class="team-section__layout">
      <div class="team-section__list-wrap">
        <div class="team-section__header-row" aria-hidden="true">
          <div class="team-section__col-name">Name</div>
          <div class="team-section__col-role">Role</div>
        </div>

        <div class="team-section__list">
          <button
            v-for="(member, index) in members"
            :key="member._key || index"
            type="button"
            class="team-section__item"
            data-directional-hover-item
            @mouseenter="onItemEnter($event, index)"
            @mouseleave="onItemLeave($event, index)"
            @focus="activeIndex = index"
          >
            <span class="team-section__hover-tile" :ref="(el) => setTileRef(el, index)" data-directional-hover-tile></span>
            <span class="team-section__border team-section__border--item"></span>
            <span class="team-section__cell team-section__col-name">{{ member.name }}</span>
            <span class="team-section__cell team-section__col-role">{{ member.role }}</span>
          </button>
        </div>
        <div class="team-section__border"></div>
      </div>

      <div class="team-section__image-wrap">
        <NuxtImg
          v-if="activeMember?.image?.asset"
          :src="getImageSrc(activeMember.image.asset)"
          :alt="activeMember.name || ''"
          class="team-section__image"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { getImageSrc } = useSanityImage()

const directionMap = {
  top: 'translateY(-100%)',
  bottom: 'translateY(100%)',
  left: 'translateX(-100%)',
  right: 'translateX(100%)',
}

const members = computed(() => props.section?.teamMembers || [])
const activeIndex = ref(0)
const tileRefs = ref([])

const activeMember = computed(() => {
  if (!members.value.length) return null
  return members.value[activeIndex.value] || members.value[0]
})

watch(
  () => members.value.length,
  (length) => {
    if (!length) {
      activeIndex.value = 0
      tileRefs.value = []
      return
    }
    if (activeIndex.value > length - 1) {
      activeIndex.value = 0
    }
  },
  { immediate: true },
)

function setTileRef(el, index) {
  if (!el) return
  tileRefs.value[index] = el
}

function getDirection(event, el, type = 'all') {
  const { left, top, width, height } = el.getBoundingClientRect()
  const x = event.clientX - left
  const y = event.clientY - top

  if (type === 'y') return y < height / 2 ? 'top' : 'bottom'
  if (type === 'x') return x < width / 2 ? 'left' : 'right'

  const distances = {
    top: y,
    right: width - x,
    bottom: height - y,
    left: x,
  }

  return Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0]
}

function onItemEnter(event, index) {
  const item = event.currentTarget
  const tile = tileRefs.value[index]
  if (!item || !tile) return

  const dir = getDirection(event, item, 'y')
  tile.style.transition = 'none'
  tile.style.transform = directionMap[dir] || 'translate(0, 0)'
  void tile.offsetHeight
  tile.style.transition = ''
  tile.style.transform = 'translate(0%, 0%)'
  activeIndex.value = index
}

function onItemLeave(event, index) {
  const item = event.currentTarget
  const tile = tileRefs.value[index]
  if (!item || !tile) return

  const dir = getDirection(event, item, 'y')
  tile.style.transform = directionMap[dir] || 'translate(0, 0)'
}
</script>

<style scoped>
.team-section {
  width: 100%;
}

.team-section__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, auto);
  align-items: stretch;
  gap: var(--gutter);
}

.team-section__list-wrap {
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
}

.team-section__header-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1em;
}

.team-section__list {
  display: flex;
  flex-direction: column;
}

.team-section__item {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: 1em;
  width: 100%;
  margin-top: -1px;
  color: inherit;
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
}

.team-section__cell {
  position: relative;
  z-index: 1;
}

.team-section__border {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  opacity: 0.3;
}

.team-section__border--item {
  top: 0;
}

.team-section__list-wrap > .team-section__border {
  bottom: 0;
}

.team-section__hover-tile {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--team-hover-bg, var(--orange));
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(-100%);
  will-change: transform;
}

.team-section__image-wrap {
  height: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.team-section__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 999px) {
  .team-section__layout {
    grid-template-columns: 1fr;
  }

  .team-section__image-wrap {
    aspect-ratio: 3 / 4;
  }
}
</style>
