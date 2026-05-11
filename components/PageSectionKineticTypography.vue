<template>
  <section class="kinetic-typography">
    <div
      v-if="section.kineticTypographyText?.length"
      class="kinetic-typography__text fluid-type"
      style="--desktop: 108; --mobile: 40;"
    >
      <SanityBlocks :blocks="section.kineticTypographyText" />
    </div>
  </section>
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
.kinetic-typography {
  background: transparent;
  padding: calc(var(--unit) * 310) calc(var(--unit) * 200) calc(var(--unit) * 200);
  letter-spacing: -0.15em;
  color: #555;
}
.kinetic-typography:deep(strong),
.kinetic-typography b {
  color: var(--orange);
  font-weight: normal;
}

.kinetic-typography__text {
  text-align: center;
  line-height: 1.1;
}
</style>
