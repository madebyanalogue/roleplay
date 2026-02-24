<template>
  <div class="btn-group">
    <slot />
  </div>
</template>

<style scoped>
.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3em;
}
</style>
