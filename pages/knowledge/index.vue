<template>
  <div class="knowledge-page background-color" :class="{ 'page-loading': pending }">
    <template v-if="!pending">
      <main>
        <section
          role="region"
          aria-labelledby="knowledge-heading"
          class="knowledge-landing wrapper-padding"
        >
          <h1 id="knowledge-heading" class="knowledge-landing__title">
            {{ landing?.title || 'How Reverse Logistics Works' }}
          </h1>
          <p v-if="landing?.intro || fallbackIntro" class="knowledge-landing__intro">
            {{ landing?.intro || fallbackIntro }}
          </p>
          <nav
            v-if="articles?.length"
            aria-label="Core reverse logistics topics"
            class="knowledge-landing__nav"
          >
            <ul class="knowledge-landing__list">
              <li
                v-for="(article, index) in articles"
                :key="article._id || index"
                class="knowledge-landing__item"
              >
                <NuxtLink
                  :to="`/knowledge/${article.slug}`"
                  class="knowledge-landing__link"
                >
                  {{ article.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <footer v-if="landing?.footerNote" class="knowledge-landing__footer">
            <p class="knowledge-landing__footer-note">{{ landing.footerNote }}</p>
          </footer>
        </section>
      </main>
    </template>
  </div>
</template>

<script setup>
import { useKnowledgeLanding, useKnowledgeArticles } from '~/composables/useKnowledge'
import { injectPageLoading } from '~/composables/usePageLoading'

const { setLoading } = injectPageLoading()

const { data: landing } = useKnowledgeLanding()
const { data: articles, pending } = useKnowledgeArticles()

const fallbackIntro = 'Reverse logistics handles the flow of goods from the end customer back to the seller or manufacturer. This reference covers how it works in home improvement, appliances, and liquidation.'

const pageTitle = useState('pageTitle', () => '')
watch(() => landing.value?.title, (t) => { pageTitle.value = t || 'How Reverse Logistics Works' }, { immediate: true })

// SEO
useSeoMeta({
  description: landing.value?.intro?.slice(0, 155) || fallbackIntro.slice(0, 155),
})
const requestURL = useRequestURL()
useHead({
  link: [{ rel: 'canonical', href: `${requestURL.origin}/knowledge` }],
})

// Loading state
watch(pending, (isPending) => {
  setLoading(isPending)
}, { immediate: true })
</script>

<style scoped>
.knowledge-landing {
  max-width: 720px;
  margin: 0 auto;
  padding-top: calc(var(--gutter) * 3);
  padding-bottom: calc(var(--gutter) * 4);
}

.knowledge-landing__title {
  margin: 0 0 calc(var(--gutter) * 1.5);
  font-family: var(--heading-font-family);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
}

.knowledge-landing__intro {
  margin: 0 0 calc(var(--gutter) * 2);
  font-size: var(--font-size-body);
  line-height: 1.5;
}

.knowledge-landing__nav {
  margin: 0 0 calc(var(--gutter) * 2);
}

.knowledge-landing__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.knowledge-landing__item {
  margin-bottom: calc(var(--gutter) / 2);
}

.knowledge-landing__link {
  color: inherit;
  text-decoration: none;
  font-size: var(--font-size-body);
  border-bottom: 1px solid transparent;
  transition: border-color var(--animation-default);
}

.knowledge-landing__link:hover,
.knowledge-landing__link:focus {
  border-bottom-color: currentColor;
  outline: none;
}

.knowledge-landing__link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.knowledge-landing__footer {
  margin-top: calc(var(--gutter) * 2);
  padding-top: calc(var(--gutter));
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.knowledge-landing__footer-note {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
