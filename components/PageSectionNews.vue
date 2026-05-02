<template>
  <div class="news-section">
    <div
      v-for="(item, index) in newsItems"
      :key="item._id || index"
      class="news-item"
    >
      <h3 v-if="item.title" class="news-title">{{ item.title }}</h3>
      <p v-if="item.details" class="news-details">{{ item.details }}</p>
    </div>
  </div>
</template>

<script setup>
// Query both types until existing documents are migrated (see roleplay-studio/scripts/migrate-press-to-news.mjs)
const { data: newsItems } = useAsyncData('news-items', async () => {
  const query = `*[_type in ["news", "pressAward"]] | order(orderRank) {
    _id,
    title,
    details
  }`

  if (process.server) {
    const config = useRuntimeConfig()
    const projectId = config.public.sanity?.projectId || 'go8920y3'
    const dataset = config.public.sanity?.dataset || 'production'

    try {
      const result = await $fetch(`https://${projectId}.apicdn.sanity.io/v2021-10-21/data/query/${dataset}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      return result?.result || []
    } catch (err) {
      console.error('[News] Error fetching:', err)
      return []
    }
  }

  try {
    const result = await $fetch('/api/sanity/query', {
      method: 'POST',
      body: { query },
    })
    return result?.result || []
  } catch (err) {
    console.error('[News] Error fetching:', err)
    return []
  }
}, { server: true })
</script>

<style scoped>
.news-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--gutter);
}

.news-item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gutter) / 2);
}

.news-title {
  font-size: var(--font-size-body);
  font-weight: normal;
  margin-bottom: 0;
}

.news-details {
  font-size: var(--font-size-body);
  opacity: 0.7;
  margin: 0;
  white-space: pre-line;
}
</style>
