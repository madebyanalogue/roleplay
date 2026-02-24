<template>
  <div
    ref="containerRef"
    class="background-matrix-wrap"
    :class="{
      'background-matrix-wrap--dark': mode === 'dark',
      'background-matrix-wrap--fixed': fixed,
    }"
  >
    <ClientOnly>
      <div
        ref="gridRef"
        data-dots-container-init
        class="background-matrix-grid"
        :style="{
          '--dot-size': `${props.dotSize}px`,
          '--gap-size': `${props.gap}px`,
        }"
      >
        <div class="background-matrix-dot" />
      </div>
      <template #fallback>
        <div class="background-matrix-grid" />
      </template>
    </ClientOnly>
    <div class="background-matrix-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import InertiaPlugin from 'gsap/InertiaPlugin'

gsap.registerPlugin(InertiaPlugin)

const props = defineProps({
  /** 'light' | 'dark' - dark uses inverted colors for dark backgrounds */
  mode: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'dark'].includes(v),
  },
  /** Gap between dots in px */
  gap: {
    type: Number,
    default: 8,
  },
  /** Dot size in px */
  dotSize: {
    type: Number,
    default: 4,
  },
  /** Enable center hole (for logo/icon) */
  centerHole: {
    type: Boolean,
    default: false,
  },
  /** Use as fixed viewport background (no min-height, fills viewport) */
  fixed: {
    type: Boolean,
    default: false,
  },
})

const containerRef = ref(null)
const gridRef = ref(null)

const colors = {
  base: 'rgba(128, 128, 128, 0.12)',
  active: 'rgba(128, 128, 128, 0.45)',
}

const threshold = 200
const speedThreshold = 100
const shockRadius = 325
const shockPower = 5
const maxSpeed = 5000

let dots = []
let dotCenters = []
let resizeObserver = null

function buildGrid() {
  if (!gridRef.value || !containerRef.value || !import.meta.client) return

  const container = gridRef.value
  container.innerHTML = ''
  dots = []
  dotCenters = []

  const dotPx = props.dotSize
  const gapPx = props.gap
  const contW = containerRef.value.clientWidth
  const contH = containerRef.value.clientHeight

  const cols = Math.floor((contW + gapPx) / (dotPx + gapPx))
  const rows = Math.floor((contH + gapPx) / (dotPx + gapPx))
  const total = cols * rows

  const holeCols = props.centerHole ? (cols % 2 === 0 ? 4 : 5) : 0
  const holeRows = props.centerHole ? (rows % 2 === 0 ? 4 : 5) : 0
  const startCol = (cols - holeCols) / 2
  const startRow = (rows - holeRows) / 2

  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / cols)
    const col = i % cols
    const isHole =
      props.centerHole &&
      row >= startRow &&
      row < startRow + holeRows &&
      col >= startCol &&
      col < startCol + holeCols

    const d = document.createElement('div')
    d.classList.add('background-matrix-dot')
    d.style.width = 'var(--dot-size)'
    d.style.height = 'var(--dot-size)'

    if (isHole) {
      d.style.visibility = 'hidden'
      d._isHole = true
    } else {
      gsap.set(d, { x: 0, y: 0, backgroundColor: colors.base })
      d._inertiaApplied = false
    }

    container.appendChild(d)
    dots.push(d)
  }

  requestAnimationFrame(() => {
    dotCenters = dots
      .filter((d) => !d._isHole)
      .map((d) => {
        const r = d.getBoundingClientRect()
        return {
          el: d,
          x: r.left + window.scrollX + r.width / 2,
          y: r.top + window.scrollY + r.height / 2,
        }
      })
  })
}

function setupMouseHandlers() {
  if (!import.meta.client) return

  let lastTime = 0
  let lastX = 0
  let lastY = 0

  const handleMouseMove = (e) => {
    const now = performance.now()
    const dt = now - lastTime || 16
    let dx = e.pageX - lastX
    let dy = e.pageY - lastY
    let vx = (dx / dt) * 1000
    let vy = (dy / dt) * 1000
    let speed = Math.hypot(vx, vy)

    if (speed > maxSpeed) {
      const scale = maxSpeed / speed
      vx *= scale
      vy *= scale
      speed = maxSpeed
    }

    lastTime = now
    lastX = e.pageX
    lastY = e.pageY

    requestAnimationFrame(() => {
      dotCenters.forEach(({ el, x, y }) => {
        const dist = Math.hypot(x - e.pageX, y - e.pageY)
        const t = Math.max(0, 1 - dist / threshold)
        const col = gsap.utils.interpolate(colors.base, colors.active, t)
        gsap.set(el, { backgroundColor: col })

        if (
          speed > speedThreshold &&
          dist < threshold &&
          !el._inertiaApplied
        ) {
          el._inertiaApplied = true
          const pushX = x - e.pageX + vx * 0.005
          const pushY = y - e.pageY + vy * 0.005

          gsap.to(el, {
            inertia: { x: pushX, y: pushY, resistance: 750 },
            onComplete() {
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: 'elastic.out(1,0.75)',
              })
              el._inertiaApplied = false
            },
          })
        }
      })
    })
  }

  const handleClick = (e) => {
    dotCenters.forEach(({ el, x, y }) => {
      const dist = Math.hypot(x - e.pageX, y - e.pageY)
      if (dist < shockRadius && !el._inertiaApplied) {
        el._inertiaApplied = true
        const falloff = Math.max(0, 1 - dist / shockRadius)
        const pushX = (x - e.pageX) * shockPower * falloff
        const pushY = (y - e.pageY) * shockPower * falloff

        gsap.to(el, {
          inertia: { x: pushX, y: pushY, resistance: 750 },
          onComplete() {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 1.5,
              ease: 'elastic.out(1,0.75)',
            })
            el._inertiaApplied = false
          },
        })
      }
    })
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('click', handleClick)

  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('click', handleClick)
  }
}

let cleanupMouseHandlers = null

onMounted(() => {
  if (!import.meta.client) return

  buildGrid()
  cleanupMouseHandlers = setupMouseHandlers()

  resizeObserver = new ResizeObserver(() => {
    buildGrid()
  })
  resizeObserver.observe(containerRef.value)
})

onUnmounted(() => {
  if (cleanupMouseHandlers) cleanupMouseHandlers()
  if (resizeObserver && containerRef.value) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.background-matrix-wrap {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
}

.background-matrix-wrap--fixed {
  position: fixed;
  inset: 0;
  min-height: 0;
  pointer-events: none;
}

.background-matrix-wrap--fixed .background-matrix-content {
  pointer-events: auto;
}

.background-matrix-grid {
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-size, 32px);
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 0;
  --dot-size: 4px;
}

.background-matrix-dot {
  will-change: transform, background-color;
  transform-origin: center;
  border-radius: 50%;
  position: relative;
  transform: translate(0);
}

.background-matrix-wrap--dark .background-matrix-dot {
  --dot-base: rgba(255, 255, 255, 0.08);
  --dot-active: rgba(255, 255, 255, 0.35);
}

.background-matrix-content {
  position: relative;
  z-index: 1;
  min-height: inherit;
}
</style>
