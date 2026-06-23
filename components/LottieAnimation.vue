<template>
  <div
    ref="containerRef"
    class="lottie-animation"
    :class="className"
    :style="containerStyle"
    :aria-hidden="ariaHidden ? 'true' : undefined"
    :aria-label="ariaLabel || undefined"
    role="img"
  />
</template>

<script setup>
const props = defineProps({
  animationData: {
    type: Object,
    default: null,
  },
  path: {
    type: String,
    default: '',
  },
  dotLottieSrc: {
    type: String,
    default: '',
  },
  loop: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  speed: {
    type: Number,
    default: 1,
  },
  width: {
    type: [Number, String],
    default: null,
  },
  height: {
    type: [Number, String],
    default: null,
  },
  renderer: {
    type: String,
    default: 'svg',
  },
  className: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  ariaHidden: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['ready', 'complete'])

const containerRef = ref(null)
let animation = null
let canvasEl = null
let dotLottieMode = false
let wasmConfigured = false

const dotLottieSource = computed(
  () => props.dotLottieSrc || (props.path.endsWith('.lottie') ? props.path : ''),
)

const containerStyle = computed(() => {
  const style = {}
  if (props.width != null) style.width = formatSize(props.width)
  if (props.height != null) style.height = formatSize(props.height)
  return style
})

function formatSize(value) {
  return typeof value === 'number' ? `${value}px` : value
}

function clearContainer() {
  if (!containerRef.value) return
  containerRef.value.replaceChildren()
  canvasEl = null
}

async function configureDotLottieWasm(DotLottie) {
  if (wasmConfigured) return

  const { default: wasmUrl } = await import(
    '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url'
  )
  DotLottie.setWasmUrl(wasmUrl)
  wasmConfigured = true
}

async function loadDotLottieAnimation() {
  const { DotLottie } = await import('@lottiefiles/dotlottie-web')
  await configureDotLottieWasm(DotLottie)

  animation?.destroy()
  clearContainer()

  canvasEl = document.createElement('canvas')
  canvasEl.className = 'lottie-animation__canvas'
  containerRef.value.appendChild(canvasEl)

  animation = new DotLottie({
    canvas: canvasEl,
    src: dotLottieSource.value,
    loop: props.loop,
    autoplay: props.autoplay,
    speed: props.speed,
    layout: {
      fit: 'contain',
      align: [0.5, 0.5],
    },
    renderConfig: {
      autoResize: true,
    },
  })

  animation.addEventListener('load', () => {
    emit('ready', animation)
  })

  animation.addEventListener('complete', () => {
    emit('complete', animation)
  })
}

async function loadLottieWebAnimation() {
  const { default: lottie } = await import('lottie-web')

  animation?.destroy()
  clearContainer()

  animation = lottie.loadAnimation({
    container: containerRef.value,
    renderer: props.renderer,
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData || undefined,
    path: props.path || undefined,
  })

  animation.setSpeed(props.speed)

  animation.addEventListener('DOMLoaded', () => {
    emit('ready', animation)
  })

  animation.addEventListener('complete', () => {
    emit('complete', animation)
  })
}

async function loadAnimation() {
  if (!import.meta.client || !containerRef.value) return

  const useDotLottie = Boolean(dotLottieSource.value)
  const useLottieWeb = Boolean(props.animationData || (props.path && !useDotLottie))

  if (!useDotLottie && !useLottieWeb) return

  dotLottieMode = useDotLottie

  if (useDotLottie) {
    await loadDotLottieAnimation()
    return
  }

  await loadLottieWebAnimation()
}

function play() {
  animation?.play()
}

function pause() {
  animation?.pause()
}

function stop() {
  animation?.stop()
}

function goToAndPlay(value, isFrame = false) {
  if (!animation) return

  if (dotLottieMode) {
    if (isFrame) {
      animation.setFrame(value)
    } else {
      animation.setFrame(value * animation.totalFrames)
    }
    animation.play()
    return
  }

  animation.goToAndPlay(value, isFrame)
}

function getDuration() {
  if (!animation) return 0

  if (dotLottieMode) {
    return animation.totalFrames ?? 0
  }

  return animation.getDuration(true) ?? 0
}

defineExpose({
  play,
  pause,
  stop,
  goToAndPlay,
  getDuration,
  getAnimation: () => animation,
})

watch(
  () => [
    props.animationData,
    props.path,
    props.dotLottieSrc,
    props.loop,
    props.autoplay,
    props.speed,
  ],
  async () => {
    await nextTick()
    await loadAnimation()
  },
)

onMounted(async () => {
  await nextTick()
  await loadAnimation()
})

onBeforeUnmount(() => {
  animation?.destroy()
  animation = null
  clearContainer()
})
</script>

<style scoped>
.lottie-animation {
  display: block;
  line-height: 0;
}

.lottie-animation :deep(svg),
.lottie-animation :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
