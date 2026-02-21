<template>
  <div class="knowledge-article-page background-color" :class="{ 'page-loading': pending }">
    <template v-if="!pending">
      <div v-if="!article" class="knowledge-article-page__not-found pad-1">
        <p>Article not found</p>
        <NuxtLink to="/knowledge" class="knowledge-article-page__back">
          ← Back to all topics
        </NuxtLink>
      </div>
      <main v-else>
        <article
          aria-labelledby="article-title"
          class="knowledge-article wrapper-padding"
        >
          <NuxtLink
            to="/knowledge"
            class="knowledge-article__back-link"
          >
            ← Back to all topics
          </NuxtLink>

          <h1 id="article-title" class="knowledge-article__title">
            {{ article.title }}
          </h1>

          <p class="knowledge-article__summary">
            {{ article.summary }}
          </p>

          <div
            v-for="(section, index) in article.sections"
            :key="index"
            class="knowledge-article__section"
          >
            <h2 class="knowledge-article__section-title">
              {{ section.question }}
            </h2>
            <p class="knowledge-article__section-answer">
              {{ section.directAnswer }}
            </p>
            <template v-if="section.body">
              <p
                v-for="(para, pIndex) in section.body.split(/\n\n+/).filter(Boolean)"
                :key="pIndex"
                class="knowledge-article__section-body"
              >
                {{ para }}
              </p>
            </template>
          </div>

          <section
            v-if="article.scaleSection?.body"
            class="knowledge-article__section"
          >
            <h2 class="knowledge-article__section-title">
              How this works at scale
            </h2>
            <p class="knowledge-article__section-body">
              {{ article.scaleSection.body }}
            </p>
          </section>

          <footer
            v-if="article.relatedLinks?.length"
            aria-labelledby="related-topics-heading"
            class="knowledge-article__footer"
          >
            <h2 id="related-topics-heading" class="knowledge-article__related-title">
              Related topics
            </h2>
            <ul class="knowledge-article__related-list">
              <li
                v-for="(link, linkIndex) in article.relatedLinks"
                :key="link._id || linkIndex"
                class="knowledge-article__related-item"
              >
                <NuxtLink
                  v-if="link?.slug"
                  :to="`/knowledge/${link.slug}`"
                  class="knowledge-article__related-link"
                >
                  {{ link.title }}
                </NuxtLink>
              </li>
            </ul>
          </footer>
        </article>

      </main>
    </template>
  </div>
</template>

<script setup>
import { useKnowledgeArticle } from '~/composables/useKnowledge'
import { injectPageLoading } from '~/composables/usePageLoading'

const route = useRoute()
const slug = computed(() => route.params.slug)

const { data: article, pending } = useKnowledgeArticle(slug)
const { setLoading } = injectPageLoading()

// FAQ JSON-LD (max 3) - auto-generated from H1 + sections
const faqJsonLd = computed(() => {
  const art = article.value
  if (!art) return ''

  const faqs = []
  // H1 + summary as first FAQ
  if (art.title && art.summary) {
    faqs.push({ question: art.title, answer: art.summary })
  }
  // Up to 2 more from sections (question + directAnswer)
  const sections = art.sections?.slice(0, 2) || []
  sections.forEach((s) => {
    if (s?.question && s?.directAnswer) {
      faqs.push({ question: s.question, answer: s.directAnswer })
    }
  })

  if (faqs.length === 0) return ''

  const mainEntity = faqs.slice(0, 3).map((item) => ({
    '@type': 'Question',
    name: escapeJsonString(item.question),
    acceptedAnswer: {
      '@type': 'Answer',
      text: escapeJsonString(item.answer),
    },
  }))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
  return JSON.stringify(schema)
})

function escapeJsonString(str) {
  if (!str) return ''
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
}

// SEO
const metaDescription = computed(() => {
  const desc = article.value?.metaDescription
  if (desc) return desc
  return article.value?.summary?.slice(0, 155) || ''
})

const pageTitle = useState('pageTitle', () => '')
watch(() => article.value?.title, (t) => { pageTitle.value = t || 'Knowledge' }, { immediate: true })

useSeoMeta({
  description: () => metaDescription.value,
})

const requestURL = useRequestURL()
useHead({
  link: () => [
    {
      rel: 'canonical',
      href: `${requestURL.origin}/knowledge/${article.value?.slug}`,
    },
  ],
  script: computed(() =>
    faqJsonLd.value
      ? [
          {
            type: 'application/ld+json',
            key: 'knowledge-faq-schema',
            textContent: faqJsonLd.value,
          },
        ]
      : []
  ),
})

// Loading state
watch(pending, (isPending) => {
  setLoading(isPending)
}, { immediate: true })
</script>

<style scoped>
.knowledge-article {
  max-width: 720px;
  margin: 0 auto;
  padding-top: calc(var(--gutter) * 3);
  padding-bottom: calc(var(--gutter) * 4);
}

.knowledge-article__back-link {
  display: inline-block;
  margin-bottom: calc(var(--gutter) * 1.5);
  color: inherit;
  text-decoration: none;
  font-size: 0.95em;
  border-bottom: 1px solid transparent;
  transition: border-color var(--animation-default);
}

.knowledge-article__back-link:hover,
.knowledge-article__back-link:focus {
  border-bottom-color: currentColor;
  outline: none;
}

.knowledge-article__back-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.knowledge-article__title {
  margin: 0 0 calc(var(--gutter) * 1.5);
  font-family: var(--heading-font-family);
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 600;
  line-height: 1.2;
}

.knowledge-article__summary {
  margin: 0 0 calc(var(--gutter) * 2);
  font-size: var(--font-size-body);
  line-height: 1.5;
}

.knowledge-article__section {
  margin-bottom: calc(var(--gutter) * 2);
}

.knowledge-article__section-title {
  margin: 0 0 calc(var(--gutter) / 2);
  font-family: var(--heading-font-family);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.knowledge-article__section-answer {
  margin: 0 0 calc(var(--gutter) / 2);
  font-size: var(--font-size-body);
  line-height: 1.5;
}

.knowledge-article__section-body {
  margin: 0;
  font-size: var(--font-size-body);
  line-height: 1.5;
  opacity: 0.95;
}

.knowledge-article__footer {
  margin-top: calc(var(--gutter) * 3);
  padding-top: calc(var(--gutter) * 1.5);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.knowledge-article__related-title {
  margin: 0 0 calc(var(--gutter));
  font-family: var(--heading-font-family);
  font-size: 1.125rem;
  font-weight: 600;
}

.knowledge-article__related-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.knowledge-article__related-item {
  margin-bottom: calc(var(--gutter) / 2);
}

.knowledge-article__related-link {
  color: inherit;
  text-decoration: none;
  font-size: var(--font-size-body);
  border-bottom: 1px solid transparent;
  transition: border-color var(--animation-default);
}

.knowledge-article__related-link:hover,
.knowledge-article__related-link:focus {
  border-bottom-color: currentColor;
  outline: none;
}

.knowledge-article__related-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.knowledge-article-page__not-found {
  max-width: 720px;
  margin: 0 auto;
  padding-top: calc(var(--gutter) * 3);
}

.knowledge-article-page__back {
  display: inline-block;
  margin-top: calc(var(--gutter));
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
</style>
