<template>
  <div class="text-section underline-links">
    <SanityBlocks
      v-if="section.textContent?.length"
      :blocks="section.textContent"
    />
  </div>
</template>

<script setup>
defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.text-section {
  padding: 0 var(--gutter);
}
</style>
