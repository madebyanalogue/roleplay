<template>
  <div class="page bg-grid" :class="{ 'page-loading': pending }">
    <template v-if="!pending">
      <div v-if="error">
        <p>Error loading page: {{ error.message }}</p>
      </div>
      <template v-else-if="page">
        <div v-if="sections.length === 0" style="padding: var(--gutter);">
          <p>No sections found for this page. In Sanity: edit the Page document, then add section references to the &quot;Page Sections&quot; field. Sections are created separately under &quot;Page Sections&quot; in the sidebar.</p>
        </div>
        <div v-for="section in sections" :key="section._id" class="page-section">
          <PageSectionHero
            v-if="section.sectionType === 'hero'"
            :section="section"
          />
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
          <PageSectionPressAwards
            v-else-if="section.sectionType === 'pressAwards'"
            :section="section"
          />
          <PageSectionPortfolio
            v-else-if="section.sectionType === 'portfolio'"
            :section="section"
          />
          <PageSectionTypography
            v-else-if="section.sectionType === 'typography'"
            :section="section"
          />
          <PageSectionTestimonials
            v-else-if="section.sectionType === 'testimonials'"
            :section="section"
          />
          <PageSectionLogoGrid
            v-else-if="section.sectionType === 'logoGrid'"
            :section="section"
          />
          <PageSectionCTA
            v-else-if="section.sectionType === 'cta'"
            :section="section"
          />
          <PageSectionHeroSplit
            v-else-if="section.sectionType === 'heroSplit'"
            :section="section"
          />
          <PageSectionScalingReveal
            v-else-if="section.sectionType === 'scalingReveal'"
            :section="section"
          />
          <PageSectionNews
            v-else-if="section.sectionType === 'news'"
            :section="section"
          />
        </div>
      </template>
      <div v-else class="pad-1">
        <p>Page not found</p>
      </div>
    </template>
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
  return null
})

const { data: page, pending, error } = useAsyncData(
  () => `page-${slug.value}`,
  async () => {
    if (!slug.value) {
      return null
    }
    
    const query = `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
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
        typographyContent[] {
          _type,
          _key,
          text
        },
        testimonials[] {
          _key,
          quote,
          name,
          company,
          image {
            asset-> {
              _id,
              url,
              metadata { dimensions { width, height } }
            }
          },
          largeImage {
            asset-> {
              _id,
              url,
              metadata { dimensions { width, height } }
            }
          }
        },
        testimonialsAutoplay,
        testimonialsAutoplayDuration,
        logoGridTitle,
        logoGridLogos[] {
          _key,
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        logoGridShuffle,
        heroTitle,
        heroSubtitle,
        heroImage {
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        ctaTitle,
        ctaSubtitle,
        "ctaLink": ctaLink-> {
          slug
        },
        ctaButtonText,
        heroLeft {
          title,
          subtitle,
          backgroundImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaType,
          backgroundMediaImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaVideo { asset-> { _id, url } },
          categories,
          link
        },
        heroRight {
          title,
          subtitle,
          backgroundImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaType,
          backgroundMediaImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaVideo { asset-> { _id, url } },
          categories,
          link
        },
        eyebrow,
        heading,
        highlightScrollStart,
        highlightScrollEnd,
        highlightFade,
        highlightStagger,
        scalingRevealSlides[] {
          _key,
          mediaType,
          image { asset-> { _id, url, metadata { dimensions { width, height } } } },
          video { asset-> { _id, url } },
          text
        },
        footerHeading,
        newsTitle,
        newsItems[] {
          _key,
          _type,
          ratio,
          news-> {
            _id,
            title,
            link
          },
          testimonial-> {
            _id,
            quote,
            name,
            company
          },
          image {
            asset-> {
              _id,
              url,
              metadata { dimensions { width, height } }
            }
          }
        }
      }
    }`
    
    if (import.meta.server) {
      const event = useRequestEvent()
      const sanity = useSanity(event)
      const pageData = await sanity.fetch(query, { slug: slug.value })
      return pageData && pageData._id ? pageData : null
    }
    const result = await $fetch('/api/sanity/query', {
      method: 'POST',
      body: {
        query,
        params: { slug: slug.value },
        ...(import.meta.dev && { perspective: 'previewDrafts', useCdn: false }),
      },
      timeout: 30000,
    })
    const pageData = result?.result
    return pageData && pageData._id ? pageData : null
  },
  { watch: [slug] }
)

const sections = computed(() => {
  const raw = page.value?.sections || []
  return raw.filter(Boolean)
})

const pageTitle = useState('pageTitle', () => '')
watch(() => page.value?.title, (t) => { pageTitle.value = t || '' }, { immediate: true })


// Update global loading state
watch(pending, (isPending) => {
  setLoading(isPending)
}, { immediate: true })
</script>

<style scoped>
.page {
  min-height: 100svh;
  position: relative;
  z-index: 1;
  background-color: var(--background-color);
}
</style>

