<template>
  <component
    :is="tag"
    v-bind="linkProps"
    class="btn-animate-chars"
    :aria-label="ariaLabel"
  >
    <div class="btn-animate-chars__bg" />
    <span ref="textRef" data-button-animate-chars class="btn-animate-chars__text">
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
  /** Accessible label for the button */
  ariaLabel: {
    type: String,
    default: undefined,
  },
})

const textRef = ref(null)
const offsetIncrement = 0.01

function initButtonCharacterStagger() {
  const button = textRef.value
  if (!button) return

  const text = button.textContent
  button.innerHTML = ''

  ;[...text].forEach((char, index) => {
    const span = document.createElement('span')
    span.textContent = char
    span.style.transitionDelay = `${index * offsetIncrement}s`

    if (char === ' ') {
      span.style.whiteSpace = 'pre'
    }

    button.appendChild(span)
  })
}

onMounted(() => {
  nextTick(() => {
    initButtonCharacterStagger()
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
.btn-animate-chars {
  color: #131313;
  cursor: pointer;
  border-radius: 0.2em;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: .7em 1.25em .6em;
  line-height: 1;
  text-decoration: none;
  display: flex;
  position: relative;
  display:inline-block;
}

.btn-animate-chars__text {
  white-space: nowrap;
  line-height: 1.3;
}

/* Characters */
.btn-animate-chars :deep([data-button-animate-chars]) {
  overflow: hidden;
  position: relative;
  display: inline-block;
}

.btn-animate-chars :deep([data-button-animate-chars] span) {
  display: inline-block;
  position: relative;
  text-shadow: 0px 1.3em currentColor;
  transform: translateY(0em) rotate(0.001deg);
  transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}

.btn-animate-chars:hover :deep([data-button-animate-chars] span) {
  transform: translateY(-1.3em) rotate(0.001deg);
}

/* Background */
.btn-animate-chars__bg {
  background-color: #efeeec;
  border-radius: 0.25em;
  position: absolute;
  inset: 0;
  transition: inset 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}

.btn-animate-chars:hover .btn-animate-chars__bg {
  inset: 0.125em;
}
</style>
