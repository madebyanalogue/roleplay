<template>
  <section class="services-section grid gap-30">
    <h2
      v-if="section.servicesTitle || section.title"
      class="subtitle subtitle--circle twisted orange-dot"
    >
      {{ section.servicesTitle || section.title }}
    </h2>

    <div
      class="services-section__grid fluid-type"
      style="--desktop: 54; --mobile: 24;"
    >
      <div
        v-for="(line, index) in serviceLines"
        :key="`service-${index}`"
        class="services-section__item"
      >
        {{ line }}
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const serviceLines = computed(() => {
  return (props.section?.servicesTextarea || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
})
</script>

<style scoped>
.services-section__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 calc(var(--gutter) * 2);
}

@media (min-width: 700px) {
  .services-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0 var(--gutter);
  }
}

.services-section__item {
  line-height: 1.15;
  border-bottom: 1px solid currentColor;
  padding-block: calc(var(--gutter) * 0.75);
}
</style>
