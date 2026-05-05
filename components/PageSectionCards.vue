<template>
  <section
    class="cards-section"
    :class="{ 'cards-section--grid-mode': useGridMode }"
  >
    <article
      v-for="(card, index) in section.cards || []"
      :key="card._key || index"
      class="cards-section__item"
    >
      <div class="cards-section__grid">
        <div class="cards-section__text">
          <h3 v-if="card.title" class="cards-section__title">{{ card.title }}</h3>
          <SanityBlocks
            v-if="card.description?.length"
            :blocks="card.description"
          />
        </div>

        <div class="cards-section__media">
          <video
            v-if="card.mediaType === 'video' && card.video?.asset?.url"
            autoplay
            muted
            loop
            playsinline
            class="cards-section__video"
          >
            <source
              :src="card.video.asset.url"
              :type="videoMimeTypeFromUrl(card.video.asset.url)"
            >
          </video>

          <NuxtImg
            v-else-if="card.image?.asset?.url"
            :src="card.image.asset.url"
            :alt="card.title || ''"
            :width="card.image.asset.metadata?.dimensions?.width"
            :height="card.image.asset.metadata?.dimensions?.height"
            class="cards-section__image"
          />
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const useGridMode = computed(() => props.section?.cardsDisableScrollDemo === true)

function videoMimeTypeFromUrl(url) {
  if (!url || typeof url !== 'string') return 'video/mp4'
  const lower = url.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}
</script>

<style scoped>
.cards-section {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  padding: 0 var(--gutter);
}

.cards-section__item {
  background-color: var(--purple);
}
.cards-section__item:nth-child(2) {
  background-color: var(--purple-tint-1);
}
.cards-section__item:nth-child(3) {
  background-color: var(--purple-tint-2);
}
.cards-section__item:nth-child(4) {
  background-color: var(--purple-tint-3);
}
.cards-section__item:nth-child(5) {
  background-color: var(--purple-tint-4);
}


.cards-section--grid-mode {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cards-section__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--gutter);
  align-items: start;
}

.cards-section__text {
  grid-column: span 4;
  min-width: 0;
}

.cards-section__title {
  margin-top: 0;
}

.cards-section__media {
  grid-column: span 8;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.cards-section__image,
.cards-section__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cards-section--grid-mode .cards-section__item {
  width: 100%;
}

.cards-section--grid-mode .cards-section__grid {
  grid-template-columns: 1fr;
}

.cards-section--grid-mode .cards-section__text,
.cards-section--grid-mode .cards-section__media {
  grid-column: 1 / -1;
}

@media (max-width: 999px) {
  .cards-section--grid-mode {
    grid-template-columns: 1fr;
  }

  .cards-section__grid {
    grid-template-columns: 1fr;
  }

  .cards-section__text,
  .cards-section__media {
    grid-column: 1 / -1;
  }
}
</style>
