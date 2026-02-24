<template>
  <div ref="rootRef" class="matrix-grid" :style="gridStyle" aria-hidden="true">
    <div class="matrix-grid__containers">
      <div class="matrix-grid__base" />
      <div
        ref="duplicateRef"
        class="matrix-grid__duplicate"
        aria-hidden="true"
      />
    </div>
    <div class="matrix-grid__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'

const props = defineProps({
  /** Dot color: 'white' | 'dark' */
  color: {
    type: String,
    default: 'white',
    validator: (v) => ['white', 'dark'].includes(v),
  },
  /** Gap between dots in px */
  gap: {
    type: Number,
    default: 20,
  },
  /** Dot size in px */
  dotSize: {
    type: Number,
    default: 1,
  },
  /** Dot opacity 0–1 */
  opacity: {
    type: Number,
    default: 0.08,
  },
  /** Spotlight opacity (inside cursor circle) 0–1 */
  spotlightOpacity: {
    type: Number,
    default: 0.15,
  },
})

const rootRef = ref(null)
const duplicateRef = ref(null)

const gridStyle = computed(() => {
  const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0'
  return {
    '--matrix-base': `rgba(${rgb}, ${props.opacity})`,
    '--matrix-spotlight': `rgba(${rgb}, ${props.spotlightOpacity})`,
    '--matrix-gap': `${props.gap}px`,
    '--matrix-dot-size': `${props.dotSize}px`,
  }
})

let xTo = null
let yTo = null

function onMouseMove(e) {
  if (!rootRef.value || !duplicateRef.value) return
  const bound = rootRef.value.getBoundingClientRect()
  const mRangeX = gsap.utils.mapRange(bound.left, bound.left + bound.width, 0, 100, e.clientX)
  const mRangeY = gsap.utils.mapRange(bound.top, bound.top + bound.height, 0, 100, e.clientY)
  const clampedX = gsap.utils.clamp(0, 100, mRangeX)
  const clampedY = gsap.utils.clamp(0, 100, mRangeY)
  xTo?.(clampedX)
  yTo?.(clampedY)
}

onMounted(() => {
  if (!import.meta.client || !duplicateRef.value) return
  xTo = gsap.quickTo(duplicateRef.value, '--xpercent', {
    duration: 0.4,
    ease: 'power2.out',
  })
  yTo = gsap.quickTo(duplicateRef.value, '--ypercent', {
    duration: 0.4,
    ease: 'power2.out',
  })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.matrix-grid {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.matrix-grid__content {
  position: relative;
  z-index: 1;
}

.matrix-grid__containers {
  position: absolute;
  inset: 0;
}

.matrix-grid__base,
.matrix-grid__duplicate {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    var(--matrix-base) var(--matrix-dot-size),
    transparent var(--matrix-dot-size)
  );
  background-size: var(--matrix-gap) var(--matrix-gap);
  background-position: center 0;
}

.matrix-grid__duplicate {
  --xpercent: 50%;
  --ypercent: 50%;
  background-image: radial-gradient(
    circle,
    var(--matrix-spotlight) var(--matrix-dot-size),
    transparent var(--matrix-dot-size)
  );
  mask-image: radial-gradient(
    circle at var(--xpercent) var(--ypercent),
    #000 15%,
    transparent 25%
  );
  -webkit-mask-image: radial-gradient(
    circle at var(--xpercent) var(--ypercent),
    #000 15%,
    transparent 25%
  );
}
</style>
