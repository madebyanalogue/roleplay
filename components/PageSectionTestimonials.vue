<template>
  <section class="testimonials-section">
    <div class="testimonials-section__inner">
      <div
        v-if="testimonials.length > 0"
        data-testimonial-wrap
        :data-autoplay="section.testimonialsAutoplay !== false ? 'true' : 'false'"
        :data-autoplay-duration="section.testimonialsAutoplayDuration || 5000"
        class="testimonial-lines"
      >




        <div class="testimonial-lines__main border-radius">

          <!-- <div class="testimonial-lines__main-details">
            <p class="testimonial-lines__p is--faded">
              <span data-current class="testimonial-lines__count">1</span> / <span data-total>{{ testimonials.length }}</span>
            </p>
            <p class="testimonial-lines__p">What our clients say:</p>
          </div> -->

          <div class="testimonial-lines__collection">

            <div role="list" data-testimonial-list class="testimonial-lines__list">
              <div
                v-for="(testimonial, index) in testimonials"
                :key="testimonial._key || index"
                :aria-hidden="index !== 0"
                data-testimonial-item
                role="listitem"
                class="testimonial-lines__item"
                :class="{ 'is--active': index === 0 }"
              >

                

                <div class="testimonial-lines__item-details">

                  <h3 data-testimonial-text class="testimonial-lines__h h4">“{{ testimonial.quote }}”</h3>

                  <div v-if="testimonial.image?.asset" data-testimonial-img class="testimonial-lines__item-visual">
                    <NuxtImg
                      :src="getImageSrc(testimonial.image.asset)"
                      alt=""
                      class="testimonial-lines__item-img"
                    />
                  </div>

                  <div class="testimonial-lines__item-details-text">
                    <div class="arrows--spacer"></div>
                    <div>
                      <p data-testimonial-split class="testimonial-lines__p">{{ testimonial.name }}</p>
                      <p v-if="testimonial.company" data-testimonial-split class="testimonial-lines__p is--faded">{{ testimonial.company }}</p>
                    </div>
                  </div>

                </div>

                <div v-if="testimonial.largeImage?.asset" class="testimonial-lines__large-image">
                  <NuxtImg
                    :src="getImageSrc(testimonial.largeImage.asset)"
                    alt=""
                    class="testimonial-lines__large-img"
                  />
                </div>

              </div>
            </div>

            <div class="testimonial-lines__controls">
              <button data-prev aria-label="previous testimonial" class="testimonial-lines__button previous"></button>
              <button data-next aria-label="next testimonial" class="testimonial-lines__button next"></button>
            </div>

          </div>
        </div>



      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useSanityImage } from '~/composables/useSanityImage'
import { useNuxtApp } from '#app'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { getImageSrc } = useSanityImage()
const testimonials = computed(() => props.section?.testimonials || [])

onMounted(() => {
  const initTestimonials = useNuxtApp().$initTestimonials
  if (initTestimonials) {
    nextTick(() => initTestimonials())
  }
})
</script>

<style scoped>

.testimonials-section {
  /* background:url('/images/testimonials.png') no-repeat center top / 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: calc(var(--unit-grid) * 0) calc(var(--unit-grid) * 2) calc(var(--unit-grid) * 1);
  height: calc(var(--unit-grid) * 14);
}
.testimonials-section__inner {
}

.testimonials-section .h4 {
  font-size: 1.5em;
}

.testimonial-lines {
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  position: relative;
  height: 100%;
}

.testimonial-lines__controls {
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  position: absolute;
  bottom: var(--unit-grid);
  left: var(--unit-grid);
}

.testimonial-lines__main {
  flex-flow: column;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  width: 100%;
  border: 1px solid var(--border-color);
}

.testimonial-lines__button {
  background-color: #0000;
  border: 1px solid #0003;
  border-radius: 0px;
  justify-content: center;
  align-items: center;
  width: var(--unit-grid);
  height: var(--unit-grid);
  padding: 0;
  display: flex;
  position: relative;
  aspect-ratio: 1/1;
  cursor: pointer;
}
.testimonial-lines__button:after, .testimonial-lines__button:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
}
.testimonial-lines__button:after {
  border-top: 1px solid #000;
  width: 50%;
  transform: translate(-50%, -50%);
}

.testimonial-lines__button:before {
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  width: 24%;
  aspect-ratio: 1/1;
  transform: translate(-20%, -50%) rotate(45deg);
}

.testimonial-lines__button.previous {
  transform: rotate(180deg);
  border-left: none;
}

.testimonial-lines__main-details {
  grid-column-gap: 1.5em;
  grid-row-gap: 1.5em;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.testimonial-lines__item-details-text {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: calc(var(--unit-grid) * 0.5);
}
.testimonial-lines__item-details-text:last-child {
  flex:1;
}


.testimonial-lines__count {
  width: 1ch;
  display: inline-block;
}

.testimonial-lines__p {
  margin-bottom: 0;
}

.testimonial-lines__p.is--faded {
  opacity: .5;
}

.testimonial-lines__collection {
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.testimonial-lines__list {
  width: 100%;
  flex: 1;
  position: relative;
  min-height: 200px;
}

.testimonial-lines__item {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
}

.testimonial-lines__item:first-child {
  position: relative;
}

.testimonial-lines__item.is--active {
  opacity: 100;
  visibility: visible;
}

.testimonial-lines__h {
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.2;
}

/* Line mask wraps each .text-line for proper crop during yPercent animation (like GSAP SplitText mask: "lines") */
:deep([data-testimonial-text] .text-line-mask),
:deep([data-testimonial-split] .text-line-mask) {
  overflow: hidden;
  padding-bottom: 0.2em;
  margin-bottom: -0.2em;
}

.testimonial-lines__item-details {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
gap: var(--unit-grid);
  padding: var(--unit-grid);
  aspect-ratio: 1/1;
}

.testimonial-lines__item-visual {
  aspect-ratio: 1;
  border-radius: 100em;
  width: 5em;
  overflow: hidden;
}

.testimonial-lines__item-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.testimonial-lines__large-image {
  width: 100%;
  overflow: hidden;
}

.testimonial-lines__large-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.arrows--spacer {
  width: calc(var(--unit-grid) * 2);
  height: calc(var(--unit-grid) * 1);
  background:yellow;
}

@media screen and (max-width: 767px) {
  .testimonial-lines {
    grid-column-gap: 3em;
    grid-row-gap: 3em;
  }

  .testimonial-lines__controls {
    order: 9999;
    width: 100%;
  }

  .testimonial-lines__large-image {
    max-width: 100%;
    aspect-ratio: 1/1;
  }
}

</style>
