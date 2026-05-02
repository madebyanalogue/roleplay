<template>
  <div class="page">
    <div v-if="error">
    <p>Error loading page: {{ error.message }}</p>
  </div>
    <div v-else-if="page">
    <div v-if="sections.length === 0" style="padding: var(--gutter);">
      <p>No sections found for this page. Add sections in Sanity.</p>
    </div>
    <div v-for="section in sections" :key="section._id" class="page-section">
      <PageSectionFeaturedProjects
        v-if="section.sectionType === 'featuredProjects'"
        :section="section"
      />
      <PageSectionInfo
        v-else-if="section.sectionType === 'info'"
        :section="section"
      />
      <PageSectionServices
        v-else-if="section.sectionType === 'services'"
        :section="section"
      />
      <PageSectionNews
        v-else-if="section.sectionType === 'news' || section.sectionType === 'pressAwards'"
        :section="section"
      />
      <PageSectionPortfolio
        v-else-if="section.sectionType === 'portfolio'"
        :section="section"
        :projects="portfolioProjects"
      />
    </div>
  </div>
    <div v-else>
    <p>Page not found</p>
    </div>
  </div>
</template>

<script setup>
import { injectPageLoading } from '~/composables/usePageLoading'

const route = useRoute()
const { setLoading } = injectPageLoading()

const slug = computed(() => {
  if (route.path === '/') return 'home'
  if (route.params.slug) {
    return Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
  }
  // Params can be unset for one tick during client hydration; derive from path so GROQ + useAsyncData key stay in sync with SSR.
  const fromPath = route.path.replace(/^\//, '')
  return fromPath || null
})

const { data: page, pending, error } = useAsyncData(
  () => `page-${route.path}`,
  async () => {
    if (!slug.value) {
      return null
    }

    const query = `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      devBackgroundImage {
        asset-> {
          url
        }
      },
      sections[]-> {
        _id,
        _type,
        title,
        sectionType,
        featuredProjects[] {
          project-> {
            _id,
            title,
            slug,
            featuredImage {
              asset->
            },
            featuredImageMobile {
              asset->
            }
          },
          format
        },
        infoImage {
          asset-> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          }
        },
        infoContent[] {
          _type,
          _key,
          title,
          text,
          largeText,
          links[] {
            linkTitle,
            subtitle,
            link,
            openInNewTab
          },
          content,
          image {
            asset->
          },
          spanTwoColumns,
          showOnDesktop,
          showOnMobile
        },
        servicesTitle,
        servicesClassName,
        servicesContent,
        thumbnailAspectRatio
      },
      "portfolioProjects": *[_type == "portfolio"] | order(orderRank) {
        _id,
        title,
        slug,
        thumbnailDescription,
        thumbnailStats[] {
          _key,
          label,
          value,
          icon
        },
        featuredImage {
          asset->
        },
        featuredImageMobile {
          asset->
        }
      }
    }`

    try {
      const result = await $fetch('/api/sanity/query', {
        method: 'POST',
        body: { query, params: { slug: slug.value } },
      })
      const pageData = result?.result
      if (pageData && pageData._id) {
        return pageData
      }
      return null
    } catch (err) {
      throw err
    }
  },
  { watch: [slug] }
)

const sections = computed(() => page.value?.sections || [])

const portfolioProjects = computed(() => page.value?.portfolioProjects || [])

// TODO(dev): remove with Sanity field devBackgroundImage before launch — body bg via useHead + main.css
useHead(() => {
  const url = page.value?.devBackgroundImage?.asset?.url
  if (!url) {
    return {
      bodyAttrs: {
        'data-page-dev-bg': undefined,
        style: undefined,
      },
    }
  }
  return {
    bodyAttrs: {
      'data-page-dev-bg': 'true',
      style: [
        `background-image:url("${url}")`,
        'background-size:100%',
        'background-position:center 3px',
        'background-repeat:no-repeat',
      ].join(';'),
    },
  }
})

// Update global loading state
watch(pending, (isPending) => {
  setLoading(isPending)
}, { immediate: true })
</script>

<style scoped>
/* .page {
  padding: var(--gutter) 0;
}

.page-section:not(:last-child) {
  margin-bottom: var(--gutter);
} */
</style>

