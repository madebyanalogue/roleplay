<template>
  <div class="text-section underline-links  pad-top-bottom pad-20 pad-sm-40">
    <div class="text-section__inner fluid-type pad-md-20" style="--desktop: 73; --mobile: 30;">
      <SanityBlocks
        v-if="section.textContent?.length"
        :blocks="section.textContent"
      >
      </SanityBlocks>
    </div>
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
  line-height: 1.15;
}
</style>
