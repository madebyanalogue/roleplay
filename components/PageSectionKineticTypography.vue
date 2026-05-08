<template>
  <section class="kinetic-typography pad-top-bottom">
    <div
      v-if="section.kineticTypographyText?.length"
      class="kinetic-typography__text fluid-type"
      style="--desktop: 72; --mobile: 28;"
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
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

.kinetic-typography__text {
  text-align: center;
  line-height: 1.1;
}
</style>
