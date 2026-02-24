<template>
  <div
    class="scaling-reveal"
    data-scaling-reveal-init
  >
    <section class="scaling-reveal__header">
      <span
        v-if="section?.eyebrow"
        class="scaling-reveal__eyebrow"
      >
        {{ section.eyebrow }}
      </span>
      <h1
        v-if="section?.heading"
        class="scaling-reveal__heading"
        data-highlight-text
        :data-highlight-scroll-start="section.highlightScrollStart || 'top 90%'"
        :data-highlight-scroll-end="section.highlightScrollEnd || 'center 40%'"
        :data-highlight-fade="section.highlightFade ?? 0.2"
        :data-highlight-stagger="section.highlightStagger ?? 0.01"
      >
        {{ section.heading }}
      </h1>
      <div
        v-if="firstSlide"
        class="scaling-reveal__small-box"
      >
        <div class="scaling-reveal__spacer" />
        <div data-flip-element="wrapper" class="scaling-reveal__wrapper">
          <div data-flip-element="target" class="scaling-reveal__slide scaling-reveal__slide--first">
            <div class="scaling-reveal__slide-media">
              <video
                v-if="getSlideMediaType(firstSlide) === 'video' && getSlideVideoUrl(firstSlide)"
                autoplay
                muted
                playsinline
                loop
                class="scaling-reveal__video"
              >
                <source :src="getSlideVideoUrl(firstSlide)" type="video/mp4">
              </video>
              <img
                v-else-if="getSlideImageUrl(firstSlide)"
                :src="getSlideImageUrl(firstSlide)"
                alt=""
                class="scaling-reveal__img"
              >
            </div>
            <div
              v-if="firstSlide.text?.length"
              class="scaling-reveal__slide-text"
              data-slide-text
            >
              <SanityBlocks :blocks="firstSlide.text" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="firstSlide"
      class="scaling-reveal__flip-destination"
      data-flip-destination
    >
      <div data-flip-element="wrapper" class="scaling-reveal__slot" />
    </section>
    <section
      v-if="slides.length >= 2"
      class="scaling-reveal__horizontal-wrap"
      data-horizontal-scroll-wrap
      data-horizontal-scroll-disable="mobileLandscape"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="scaling-reveal__panel"
        data-horizontal-scroll-panel
      >
        <div class="scaling-reveal__panel-inner">
          <div class="scaling-reveal__card">
            <div class="scaling-reveal__card-bg">
              <div class="scaling-reveal__slide-media">
                <video
                  v-if="getSlideMediaType(slide) === 'video' && getSlideVideoUrl(slide)"
                  autoplay
                  muted
                  playsinline
                  loop
                  class="scaling-reveal__video"
                >
                  <source :src="getSlideVideoUrl(slide)" type="video/mp4">
                </video>
                <img
                  v-else-if="getSlideImageUrl(slide)"
                  :src="getSlideImageUrl(slide)"
                  alt=""
                  class="scaling-reveal__img"
                >
              </div>
            </div>
            <div
              v-if="slide.text?.length"
              class="scaling-reveal__card-inner"
              data-slide-text
            >
              <SanityBlocks :blocks="slide.text" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="section?.footerHeading" class="scaling-reveal__footer">
      <h2 class="scaling-reveal__footer-heading">
        {{ section.footerHeading }}
      </h2>
    </section>
  </div>
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

const slides = computed(() => props.section?.scalingRevealSlides || [])

const firstSlide = computed(() => slides.value[0] || null)

const additionalSlides = computed(() => slides.value.slice(1) || [])

function getSlideMediaType(slide) {
  return slide?.mediaType || 'image'
}

function getSlideVideoUrl(slide) {
  return slide?.video?.asset?.url || ''
}

function getSlideImageUrl(slide) {
  const asset = slide?.image?.asset
  return asset ? getImageSrc(asset) : ''
}
</script>

<style scoped>
.scaling-reveal {
  position: relative;
}

.scaling-reveal__header,
.scaling-reveal__small-box {
  overflow: hidden;
}

.scaling-reveal__header {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
}

.scaling-reveal__eyebrow {
  text-transform: uppercase;
  font-size: 1.25em;
  font-weight: 400;
}

.scaling-reveal__heading {
  text-align: center;
  margin: 0;
  font-size: clamp(3rem, 5vw, 48px);
  line-height: 1;
  font-kerning: none;
  letter-spacing: -0.04em;
}

.scaling-reveal__small-box {
  border-radius: 1em;
  width: 20em;
  max-width: 90vw;
  position: relative;
}

.scaling-reveal__wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.scaling-reveal__spacer {
  padding-top: 56.25%;
}

.scaling-reveal__slide--first {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}


.scaling-reveal__slide-media {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.scaling-reveal__slide-media :deep(video),
.scaling-reveal__slide-media :deep(img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scaling-reveal__slide-text {
  z-index: 1;
  position: relative;
  padding: var(--gutter);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.scaling-reveal__slide-text.is--visible {
  opacity: 1;
}

.scaling-reveal__video,
.scaling-reveal__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

/* Flip destination – independent full-viewport section where first slide lands */
.scaling-reveal__flip-destination {
  width: 100vw;
  height: 100vh;
  min-height: 100dvh;
  position: relative;
  margin-left: calc(50% - 50vw);
}

.scaling-reveal__flip-destination .scaling-reveal__slot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Horizontal scroll – demo structure: flex wrap, panels as direct children */
.scaling-reveal__horizontal-wrap {
  display: flex;
  flex-flow: row;
  width: 100vw;
  min-height: 100dvh;
  overflow: hidden;
  margin-left: calc(50% - 50vw);
}

.scaling-reveal__panel {
  flex: none;
  width: 100%;
  min-width: 100vw;
}

.scaling-reveal__panel-inner {
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 1.25em;
}

.scaling-reveal__card {
  border-radius: 1.25em;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 3em;
  position: relative;
  overflow: hidden;
}

.scaling-reveal__card-bg {
  z-index: 0;
  position: absolute;
  inset: 0;
}

.scaling-reveal__card-inner {
  z-index: 1;
  position: relative;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.scaling-reveal__card-inner.is--visible {
  opacity: 1;
}

.scaling-reveal__card-inner :deep(h1),
.scaling-reveal__card-inner :deep(h2),
.scaling-reveal__card-inner :deep(.h1),
.scaling-reveal__card-inner :deep(.h2) {
  letter-spacing: -0.04em;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 4em;
  font-weight: 500;
  line-height: 0.95;
}

.scaling-reveal__card .scaling-reveal__slide-media {
  position: absolute;
  inset: 0;
}

.scaling-reveal__footer {
  padding: 25vh 5vw;
}

.scaling-reveal__footer-heading {
  text-align: center;
  margin: 0;
  font-size: clamp(2rem, 4vw, 4em);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

@media screen and (max-width: 767px) {
  .scaling-reveal__heading {
    font-size: 13.5vw;
  }

  .scaling-reveal__small-box {
    width: 15em;
  }

  .scaling-reveal__horizontal-wrap {
    flex-flow: column;
  }

  .scaling-reveal__panel {
    height: 30em;
  }

  .scaling-reveal__card {
    padding: 1.25em;
  }

  .scaling-reveal__card-inner :deep(h1),
  .scaling-reveal__card-inner :deep(h2) {
    font-size: 2.5em;
  }
}
</style>
