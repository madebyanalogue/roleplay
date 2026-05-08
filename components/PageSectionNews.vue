<template>
  <section class="news-section">
    <h2 v-if="section.newsTitle || section.title" class="subtitle subtitle--circle yellow-dot">
      {{ section.newsTitle || section.title }}
    </h2>

    <div v-if="newsItems.length > 0" class="news-list">
      <article
        v-for="(item, index) in newsItems"
        :key="item._id || item._key || index"
        class="news-item flex gap-40"
      >
        <div class="news-thumbnail yellow pad-10">
          <NuxtImg
            v-if="item.featuredImage?.asset?.url"
            :src="item.featuredImage.asset.url"
            :width="item.featuredImage.asset.metadata?.dimensions?.width"
            :height="item.featuredImage.asset.metadata?.dimensions?.height"
            alt=""
            class="news-image"
          />
        </div>
        <SanityBlocks v-if="item.content" :blocks="item.content" class="news-content" />
      </article>
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

const newsItems = computed(() =>
  (props.section?.newsItems || [])
    .map((item) => item?.newsPost)
    .filter(Boolean),
)
</script>

<style scoped>
.news-section {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
}

.news-item {
  align-items: flex-start;
}

.news-thumbnail {
  flex: 0 0 auto;
  border-radius: var(--rounded-small);
}

.news-image {
  width: 4vw;
  height: 4vw;
  min-width: 52px;
  min-height: 52px;
  object-fit: cover;
  display: block;
}

.news-content {
  flex: 1;
  min-width: 0;
  font-size: var(--font-size-body);
}

.news-content :deep(.sanity-block) {
  margin-bottom: 0;
}

@media (max-width: 799px) {
  .news-item {
    gap: var(--gutter);
  }

  .news-image {
    width: 64px;
    height: 64px;
  }
}

@media (min-width: 1000px) {
  .news-section {
    max-width: 1200px;
  }
}

/* Keep compatibility with legacy markup classes if referenced elsewhere */
.news-item {
  display: flex;
}
</style>
