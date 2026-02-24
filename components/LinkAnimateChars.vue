<template>
  <component
    :is="tag"
    v-bind="linkProps"
    class="link-animate-chars"
    :aria-label="ariaLabel"
  >
    <span ref="textRef" data-link-animate-chars class="link-animate-chars__text">
      <slot />
    </span>
  </component>
</template>

<script setup>
const props = defineProps({
  /** Internal route (uses NuxtLink) */
  to: {
    type: [String, Object],
    default: undefined,
  },
  /** External URL (uses <a>) */
  href: {
    type: String,
    default: undefined,
  },
  /** Accessible label for the link */
  ariaLabel: {
    type: String,
    default: undefined,
  },
})

const textRef = ref(null)
const offsetIncrement = 0.01

function initCharacterStagger() {
  const el = textRef.value
  if (!el) return

  const text = el.textContent
  el.innerHTML = ''

  ;[...text].forEach((char, index) => {
    const span = document.createElement('span')
    span.textContent = char
    span.style.transitionDelay = `${index * offsetIncrement}s`

    if (char === ' ') {
      span.style.whiteSpace = 'pre'
    }

    el.appendChild(span)
  })
}

onMounted(() => {
  nextTick(() => {
    initCharacterStagger()
  })
})

const tag = computed(() => (props.to ? 'NuxtLink' : 'a'))

const linkProps = computed(() => {
  if (props.to) {
    return { to: props.to }
  }
  const attrs = { href: props.href || '#' }
  if (props.href?.startsWith('http')) {
    attrs.target = '_blank'
    attrs.rel = 'noopener noreferrer'
  }
  return attrs
})
</script>

<style scoped>
.link-animate-chars {
  color: inherit;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  position: relative;
}

.link-animate-chars__text {
  white-space: nowrap;
  line-height: 1.3;
}

/* Characters */
.link-animate-chars :deep([data-link-animate-chars]) {
  overflow: hidden;
  position: relative;
  display: inline-block;
}

.link-animate-chars :deep([data-link-animate-chars] span) {
  display: inline-block;
  position: relative;
  text-shadow: 0px 1.3em currentColor;
  transform: translateY(0em) rotate(0.001deg);
  transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}

.link-animate-chars:hover :deep([data-link-animate-chars] span) {
  transform: translateY(-1.3em) rotate(0.001deg);
}
</style>
