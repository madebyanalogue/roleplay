<template>
  <div class="news-section">
    <div
      v-for="(item, index) in newsItems"
      :key="item._id || index"
      class="news-item"
    >
      <NuxtImg
        v-if="item.featuredImage?.asset?.url"
        :src="item.featuredImage.asset.url"
        :width="item.featuredImage.asset.metadata?.dimensions?.width"
        :height="item.featuredImage.asset.metadata?.dimensions?.height"
        alt=""
        class="news-image"
      />
      <SanityBlocks v-if="item.content" :blocks="item.content" class="news-content" />
    </div>
  </div>
</template>

<script setup>
// Query both types until existing documents are migrated (see roleplay-studio/scripts/migrate-press-to-news.mjs)
const { data: newsItems } = useAsyncData('news-items', async () => {
  const query = `*[_type in ["news", "pressAward"]] | order(orderRank) {
    _id,
    content,
    featuredImage{
      asset->{
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      }
    }
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

.news-image {
  width: 100%;
  height: auto;
  display: block;
}

.news-content {
  font-size: var(--font-size-body);
}
</style>
