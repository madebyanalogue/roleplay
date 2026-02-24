<template>
  <div class="typography-section container">
    <div class="h1">Welcome</div>
    <div class="h2">Our Story</div>
    <div class="h3">Key Features</div>
    <div class="h4">Get Started</div>
    <div class="h5">Quick Links</div>
    <div class="h6">Contact</div>
    <div>“We used to drown in returns and aged stock. Registix turned it into cash within days. They don’t just move inventory — they move fast, and that speed protects our bottom line.”</div>
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
.typography-section {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  padding: 0 var(--gutter);
}

.typography-paragraph :deep(p) {
  margin-bottom: calc(var(--gutter) / 2);
}

.typography-paragraph :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
