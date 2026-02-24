<template>
  <section class="news-section">
    <div class="news-section__header">
      <h2 v-if="section.newsTitle" class="news-section__title">
        {{ section.newsTitle }}
      </h2>
    </div>
    <div
      v-if="items.length > 0"
      class="news-section__wrap"
      data-horizontal-scroll-wrap
    >
      <div
        v-for="(item, index) in items"
        :key="item._key || index"
        class="news-section__panel"
        :class="[`news-section__panel--${getItemRatio(item)}`]"
        data-horizontal-scroll-panel
      >
        <div
            class="news-section__card"
            :class="{ 'news-section__card--image': getItemType(item) === 'image' }"
          >
            <!-- News item -->
            <a
              v-if="getItemType(item) === 'news' && item.news"
              :href="item.news.link"
              class="news-section__link"
              :target="isExternalUrl(item.news.link) ? '_blank' : undefined"
              :rel="isExternalUrl(item.news.link) ? 'noopener' : undefined"
            >
              <h3 class="news-section__item-title">{{ item.news.title }}</h3>
            </a>
            <!-- Testimonial -->
            <div v-else-if="getItemType(item) === 'testimonial' && item.testimonial" class="news-section__testimonial">
              <p class="news-section__quote">"{{ item.testimonial.quote }}"</p>
              <p class="news-section__name">{{ item.testimonial.name }}</p>
              <p v-if="item.testimonial.company" class="news-section__company">{{ item.testimonial.company }}</p>
            </div>
            <!-- Image -->
            <div v-else-if="getItemType(item) === 'image' && item.image?.asset" class="news-section__image">
              <img
                :src="getImageSrc(item.image.asset)"
                alt=""
                class="news-section__img"
              >
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { getImageSrc } = useSanityImage()

const items = computed(() => props.section?.newsItems || [])

function getItemType(item) {
  if (!item) return null
  if (item.news) return 'news'
  if (item.testimonial) return 'testimonial'
  if (item.image) return 'image'
  return null
}

function getItemRatio(item) {
  const ratio = item?.ratio || '12-12'
  return ratio
}

function isExternalUrl(url) {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}
</script>

<style scoped>
.news-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
}

.news-section__header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  padding: var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-color);
}

.news-section__title {
  margin: 0;
  font-family: var(--heading-font-family);
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-color);
}

.news-section__wrap {
  display: flex;
  width: max-content;
  align-items: flex-end;
  flex: 1;
  min-height: 70vh;
  overflow: hidden;
}

.news-section__panel {
  flex-shrink: 0;
  position: relative;
}

.news-section__panel--12-12 {
  aspect-ratio: 12 / 12;
  width: 25vw;
  min-width: 200px;
}

.news-section__panel--7-12 {
  aspect-ratio: 7 / 12;
  width: 18vw;
  min-width: 140px;
}

.news-section__panel--8-12 {
  aspect-ratio: 8 / 12;
  width: 20vw;
  min-width: 160px;
}

.news-section__panel--9-12 {
  aspect-ratio: 9 / 12;
  width: 22vw;
  min-width: 180px;
}

.news-section__panel--10-12 {
  aspect-ratio: 10 / 12;
  width: 24vw;
  min-width: 190px;
}

.news-section__panel--11-12 {
  aspect-ratio: 11 / 12;
  width: 26vw;
  min-width: 200px;
}

.news-section__card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--gutter);
  background-color: var(--background-color);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.news-section__card--image {
  padding: 0;
  border-right: none;
}

.news-section__link {
  text-decoration: none;
  color: var(--text-color);
  transition: color var(--animation-default);
}

.news-section__link:hover {
  color: var(--red);
}

.news-section__item-title {
  margin: 0;
  font-family: var(--heading-font-family);
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 600;
  line-height: 1.2;
}

.news-section__testimonial {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.news-section__quote {
  margin: 0;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.4;
  color: var(--text-color);
}

.news-section__name {
  margin: 0;
  font-weight: 600;
  font-size: clamp(0.85rem, 1.8vw, 1rem);
  color: var(--text-color);
}

.news-section__company {
  margin: 0;
  font-size: clamp(0.8rem, 1.6vw, 0.95rem);
  opacity: 0.7;
  color: var(--text-color);
}

.news-section__image {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.news-section__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 767px) {
  .news-section__panel {
    width: 70vw !important;
    min-width: 250px;
  }
}
</style>
