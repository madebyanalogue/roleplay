<template>
  <div
    v-if="visible"
    class="grid-overlay"
    aria-hidden="true"
  >
    <div class="grid-overlay__inner">
      <div
        v-for="i in 12"
        :key="i"
        class="grid-overlay__col"
      />
    </div>
  </div>
</template>

<script setup>
const visible = ref(false)

function toggle() {
  visible.value = !visible.value
}

function onKeydown(e) {
  if (e.key === 'g' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    toggle()
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<style scoped>
.grid-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.grid-overlay__inner {
  max-width: var(--max-width, 1800px);
  margin: 0 auto;
  padding: 0 var(--wrapper-padding);
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter);
}

.grid-overlay__col {
  background: rgba(255, 0, 0, 0.08);
  min-height: 100%;
}
</style>
