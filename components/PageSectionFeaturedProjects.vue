<template>
  <section class="featured-projects grid gap-30">
    <h2 v-if="props.section.featuredProjectsTitle || props.section.title" class="subtitle subtitle--circle orange-dot">
      {{ props.section.featuredProjectsTitle || props.section.title }}
    </h2>

    <div ref="carouselRef" class="featured-projects__carousel">
      <article
        v-for="item in props.section.featuredProjects || []"
        :key="item.project?._id || item._key"
        class="featured-project"
      >
        <NuxtLink
          v-if="item.project?.slug?.current"
          :to="`/portfolio/${item.project.slug.current}`"
          class="featured-project-link"
        >
          <div class="featured-project-image-container rounded-medium">
            <div class="featured-project-image-wrapper">
              <NuxtImg
                v-if="item.project?.featuredImage?.asset"
                :src="item.project.featuredImage.asset.url || ''"
                alt=""
                :class="[
                  'featured-project-image',
                  item.project.featuredImageMobile?.asset ? 'is-desktop-archive-img' : '',
                ]"
                width="3200"
                :height="item.project.featuredImage.asset.metadata?.dimensions?.height"
              />
              <NuxtImg
                v-if="item.project?.featuredImageMobile?.asset"
                :src="item.project.featuredImageMobile.asset.url || ''"
                alt=""
                class="featured-project-image is-mobile-archive-img"
                width="3200"
                :height="item.project.featuredImageMobile.asset.metadata?.dimensions?.height"
              />
            </div>
          </div>
          <h3 class="featured-project-title"><span>{{ item.project.title }}</span></h3>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup>
import 'flickity/css/flickity.css'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const carouselRef = ref(null)
const flickityRef = ref(null)

const projects = computed(() => props.section?.featuredProjects || [])

async function initCarousel() {
  if (!import.meta.client) return
  if (!carouselRef.value) return
  if (flickityRef.value) return
  if (projects.value.length <= 1) return

  const Flickity = (await import('flickity')).default
  flickityRef.value = new Flickity(carouselRef.value, {
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'left',
    contain: true,
    draggable: true,
    imagesLoaded: true,
  })
}

function destroyCarousel() {
  if (!flickityRef.value) return
  flickityRef.value.destroy()
  flickityRef.value = null
}

watch(
  () => projects.value.length,
  async () => {
    await nextTick()
    destroyCarousel()
    initCarousel()
  },
)

onMounted(async () => {
  await nextTick()
  await initCarousel()
})

onUnmounted(() => {
  destroyCarousel()
})
</script>

<style scoped>
.featured-projects {
  overflow: hidden;
  padding: 0 var(--gutter);
}

.featured-projects__carousel {
  width: calc(100% + calc(var(--unit) * 50));
}

.featured-projects__carousel :deep(.flickity-viewport),
.featured-projects__carousel :deep(.flickity-slider) {
  overflow: visible;
}

.featured-project {
  width: min(72vw, 460px);
  margin-right: var(--gutter);
}

@media (min-width: 1000px) {
  .featured-project-image-container {
    min-height: 40vw;
  }

  .featured-project {
    width: min(32vw, 560px);
  }
}

.featured-project-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.featured-project-image-container {
  aspect-ratio: 3 / 5;
  position: relative;
  overflow: hidden;
}
.featured-project-image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.featured-project-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 999px) {
  .featured-project-image.is-desktop-archive-img {
    display: none;
  }
}

@media (min-width: 1000px) {
  .featured-project-image.is-mobile-archive-img {
    display: none;
  }
}

.featured-project-title {
  margin-top: calc(var(--gutter) / 1.5);
  margin-bottom: calc(var(--gutter) / 2);
  font-size: var(--font-size-body);
  font-weight: normal;
}

.featured-project-title span {
  display: inline-block;
  position: relative;
}
.featured-project-title span:after {
  content: '';
  position: absolute;
  bottom: var(--underline-offset);
  left: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.32s ease;
  background: currentColor;
}
.featured-project-link:hover .featured-project-title span:after {
  transform: scaleX(1);
}
</style>

