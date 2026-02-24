<template>
  <section class="reviews-section">
    <p v-if="section.reviewsTitle" class="reviews-section__title">
      {{ section.reviewsTitle }}
    </p>
    <p v-else-if="reviews.length === 0" class="reviews-section__empty">
      Add a title and reviews in Sanity.
    </p>
    <div v-if="reviews.length > 0" ref="containerRef" class="reviews-section__container">
      <div
        v-for="(review, index) in reviews"
        :key="review._key || index"
        class="reviews-section__card"
        :data-index="index"
      >
        <div class="reviews-section__content">
          <p class="reviews-section__quote">“{{ review.quote }}”</p>
          <div class="reviews-section__bottom">
            <div class="reviews-section__bubble">
              <NuxtImg
                v-if="review.image?.asset"
                :src="getImageSrc(review.image.asset)"
                alt=""
                class="reviews-section__avatar reviews-section__avatar--photo"
              />
              <img
                v-else
                :src="`/demos/mwg_025/assets/medias/${(index % 4) + 1}.svg`"
                alt=""
                class="reviews-section__avatar"
              />
            </div>
            <div>
              <p class="reviews-section__name">{{ review.name }}</p>
              <p v-if="review.job" class="reviews-section__job">{{ review.job }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const { getImageSrc } = useSanityImage()
const reviews = computed(() => props.section?.reviews || [])
const containerRef = ref(null)

let cleanup = null

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  const cards = container.querySelectorAll('.reviews-section__card')
  const cardContent = container.querySelectorAll('.reviews-section__content')
  const cardsLength = cards.length
  if (cardsLength === 0) return

  let currentPortion = 0

  gsap.set(cards, {
    xPercent: () => (Math.random() - 0.5) * 10,
    yPercent: () => (Math.random() - 0.5) * 10,
    rotation: () => (Math.random() - 0.5) * 20,
  })

  function resetPortion(index) {
    gsap.to(cards[index], {
      xPercent: (Math.random() - 0.5) * 10,
      yPercent: (Math.random() - 0.5) * 10,
      rotation: (Math.random() - 0.5) * 20,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.75)',
    })
  }

  function newPortion(i) {
    gsap.to(cards[i], {
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      duration: 0.8,
      scale: 1.1,
      ease: 'elastic.out(1, 0.75)',
    })

    cardContent.forEach((content, index) => {
      if (index !== i) {
        gsap.to(content, {
          xPercent: 80 / (index - i),
          ease: 'elastic.out(1, 0.75)',
          duration: 0.8,
        })
      } else {
        gsap.to(content, {
          xPercent: 0,
          ease: 'elastic.out(1, 0.75)',
          duration: 0.8,
        })
      }
    })
  }

  function onMousemove(e) {
    const rect = container.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const containerW = rect.width
    const percentage = mouseX / containerW
    const activePortion = Math.ceil(percentage * cardsLength)

    if (
      currentPortion !== activePortion &&
      activePortion > 0 &&
      activePortion <= cardsLength
    ) {
      if (currentPortion !== 0) resetPortion(currentPortion - 1)
      currentPortion = activePortion
      newPortion(currentPortion - 1)
    }
  }

  function onMouseleave() {
    if (currentPortion !== 0) resetPortion(currentPortion - 1)
    currentPortion = 0
    gsap.to(cardContent, {
      xPercent: 0,
      ease: 'elastic.out(1, 0.75)',
      duration: 0.8,
    })
  }

  container.addEventListener('mousemove', onMousemove)
  container.addEventListener('mouseleave', onMouseleave)

  cleanup = () => {
    container.removeEventListener('mousemove', onMousemove)
    container.removeEventListener('mouseleave', onMouseleave)
  }
})

onUnmounted(() => {
  cleanup?.()
})
</script>

<style scoped>
.reviews-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #121212;
  color: #f1f1f1;
  position: relative;
}

.reviews-section__title,
.reviews-section__empty {
  position: absolute;
  top: 25px;
  left: 25px;
  font-weight: 500;
  font-size: 4vw;
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin: 0;
}

.reviews-section__empty {
  opacity: 0.6;
}

.reviews-section__container {
  display: flex;
}

.reviews-section__card {
  width: 20vw;
  aspect-ratio: 0.8;
}

.reviews-section__card:not(:first-child) {
  margin-left: -10vw;
}

.reviews-section__content {
  width: 100%;
  height: 100%;
  border-radius: 0.6em;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
}

.reviews-section__quote {
  font-weight: 500;
  font-size: 1.9vw;
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin: 0;
}

.reviews-section__bottom {
  display: flex;
  align-items: center;
  column-gap: 15px;
  font-weight: 500;
  font-size: 1.1vw;
  line-height: 0.9;
  letter-spacing: -0.03em;
  border-top: 1px dashed #000;
  padding-top: 25px;
}

.reviews-section__bubble {
  width: 3.3vw;
  aspect-ratio: 1;
  border-radius: 100%;
  background-color: #fff;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.reviews-section__avatar {
  width: 40%;
  height: 40%;
  object-fit: contain;
}

.reviews-section__avatar--photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reviews-section__name,
.reviews-section__job {
  margin: 0;
}

.reviews-section__job {
  font-weight: 500;
  font-size: 0.9vw;
  text-transform: uppercase;
}

.reviews-section__card:nth-child(1) {
  z-index: 3;
}
.reviews-section__card:nth-child(1) .reviews-section__content {
  background-color: #f14a3a;
}
.reviews-section__card:nth-child(2) {
  z-index: 2;
}
.reviews-section__card:nth-child(2) .reviews-section__content {
  background-color: #fb7350;
}
.reviews-section__card:nth-child(3) {
  z-index: 7;
}
.reviews-section__card:nth-child(3) .reviews-section__content {
  background-color: #f79c42;
}
.reviews-section__card:nth-child(4) {
  z-index: 1;
}
.reviews-section__card:nth-child(4) .reviews-section__content {
  background-color: #ffdf40;
}
.reviews-section__card:nth-child(5) {
  z-index: 4;
}
.reviews-section__card:nth-child(5) .reviews-section__content {
  background-color: #deda8d;
}
.reviews-section__card:nth-child(6) {
  z-index: 5;
}
.reviews-section__card:nth-child(6) .reviews-section__content {
  background-color: #71cfa3;
}
.reviews-section__card:nth-child(7) {
  z-index: 8;
}
.reviews-section__card:nth-child(7) .reviews-section__content {
  background-color: #c4ef7a;
}
.reviews-section__card:nth-child(8) {
  z-index: 6;
}
.reviews-section__card:nth-child(8) .reviews-section__content {
  background-color: #bcefff;
}

.reviews-section__card:nth-child(n + 9) .reviews-section__content {
  background-color: #f14a3a;
}

@media (max-width: 768px) {
  .reviews-section__title {
    font-size: 45px;
  }
  .reviews-section__quote,
  .reviews-section__bottom {
    opacity: 0;
  }
}
</style>
