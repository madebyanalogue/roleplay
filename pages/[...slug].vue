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
          <PageSectionInfo
            v-else-if="section.sectionType === 'info'"
            :section="section"
          />
          <PageSectionServices
            v-else-if="section.sectionType === 'services'"
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
          <PageSectionFeatures
            v-else-if="section.sectionType === 'features'"
            :section="section"
          />
          <PageSectionLogoGrid
            v-else-if="section.sectionType === 'logoGrid'"
            :section="section"
          />
          <PageSectionLogoMarquee
            v-else-if="section.sectionType === 'logoMarquee'"
            :section="section"
          />
          <PageSectionMap
            v-else-if="section.sectionType === 'map'"
            :section="section"
          />
          <ClientOnly v-else-if="section.sectionType === 'cta'">
            <PageSectionCTA :section="section" />
            <template #fallback>
              <section class="cta-section" aria-hidden="true">
                <div class="cta-section__inner gap-3" />
              </section>
            </template>
          </ClientOnly>
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
          <PageSectionTwoColumns
            v-else-if="section.sectionType === 'twoColumns'"
            :section="section"
          />
          <ClientOnly v-else-if="section.sectionType === 'faq'">
            <PageSectionFaq :section="section" />
            <template #fallback>
              <section class="faq-section" aria-hidden="true">
                <div class="grid-1 gap-3" />
              </section>
            </template>
          </ClientOnly>
          <ClientOnly v-else-if="section.sectionType === 'reviews'">
            <PageSectionReviews :section="section" />
            <template #fallback>
              <section class="reviews-section" aria-hidden="true">
                <div />
              </section>
            </template>
          </ClientOnly>
          <ClientOnly v-else-if="section.sectionType === 'productCategories'">
            <PageSectionProductCategories :section="section" />
            <template #fallback>
              <section class="product-categories" aria-hidden="true">
                <div class="product-categories__grid" />
              </section>
            </template>
          </ClientOnly>
          <ClientOnly v-else-if="section.sectionType === 'scrollSlider'">
            <PageSectionScrollSlider :section="section" />
            <template #fallback>
              <section class="scroll-slider" aria-hidden="true">
                <div class="scroll-slider__slider" />
              </section>
            </template>
          </ClientOnly>
          <ClientOnly v-else-if="section.sectionType === 'zoomScroller'">
            <PageSectionZoomScroller :section="section" />
            <template #fallback>
              <section class="zoom-scroller" aria-hidden="true">
                <div class="zoom-scroller__section" />
              </section>
            </template>
          </ClientOnly>
          <ClientOnly v-else-if="section.sectionType === 'spiralGallery'">
            <PageSectionSpiralGallery :section="section" />
            <template #fallback>
              <section class="spiral-gallery" aria-hidden="true">
                <div class="spiral-gallery__pin-height" />
              </section>
            </template>
          </ClientOnly>
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
        features[] {
          _key,
          heading,
          description,
          linkText,
          image { asset-> { _id, url, metadata { dimensions { width, height } } } },
          link-> { "slug": slug.current }
        },
        logoGridTitle,
        logoGridLogos[] {
          _key,
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        logoMarqueeLogos[] {
          _key,
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        mapTitle,
        mapDescription,
        mapLayout,
        mapAddress,
        mapEmbedUrl,
        mapContactItems[] {
          _key,
          icon,
          title,
          linkText,
          url
        },
        logoGridShuffle,
        heroTitle,
        heroSubtitle,
        "heroButtonLink": heroButtonLink-> {
          slug
        },
        heroButtonText,
        heroTextAlignment,
        heroImage {
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        ctaBackgroundVideo { asset-> { _id, url } },
        ctaTitle,
        ctaSubtitle,
        "ctaLink": ctaLink-> {
          slug
        },
        ctaButtonText,
        heroSplitLayout,
        heroSplitContentFadeOnScroll,
        heroLeft {
          title,
          subtitle,
          backgroundImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaType,
          backgroundMediaImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaVideo { asset-> { _id, url } },
          categories,
          "buttonLink": buttonLink-> { slug },
          buttonText,
          parallaxLayers[] {
            _key,
            layerType,
            image { asset-> { _id, url, metadata { dimensions { width, height } } } },
            heading,
            parallaxDepth
          }
        },
        heroRight {
          title,
          subtitle,
          backgroundImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaType,
          backgroundMediaImage { asset-> { _id, url, metadata { dimensions { width, height } } } },
          backgroundMediaVideo { asset-> { _id, url } },
          categories,
          "buttonLink": buttonLink-> { slug },
          buttonText,
          parallaxLayers[] {
            _key,
            layerType,
            image { asset-> { _id, url, metadata { dimensions { width, height } } } },
            heading,
            parallaxDepth
          }
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
        faqTitle,
        faqLinkText,
        "faqLink": faqLink-> { "slug": slug.current },
        faqItems[] {
          _key,
          question,
          answer
        },
        reviewsTitle,
        reviews[] {
          _key,
          quote,
          name,
          job,
          image {
            asset-> {
              _id,
              url,
              metadata { dimensions { width, height } }
            }
          }
        },
        productCategories[] {
          _key,
          title,
          description,
          model-> {
            _id,
            title,
            videoNumber
          }
        },
        "productCategoriesLink": productCategoriesLink-> { "slug": slug.current },
        productCategoriesButtonText,
        scrollSliderShowTextBefore,
        scrollSliderTextBefore,
        scrollSliderIntroAnimation,
        scrollSliderSlides[] {
          _key,
          title,
          image {
            asset-> {
              _id,
              url,
              metadata { dimensions { width, height } }
            }
          }
        },
        zoomScrollerDark,
        zoomScrollerGalleryEdgeToEdge,
        zoomScrollerMatrixGrid,
        zoomScrollerShowContent,
        zoomScrollerSubtitle,
        zoomScrollerDescription,
        "zoomScrollerLink": zoomScrollerLink-> { "slug": slug.current },
        zoomScrollerButtonText,
        zoomScrollerImages[] {
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        spiralGalleryDark,
        spiralGalleryShowTextBefore,
        spiralGalleryTextBefore,
        spiralGalleryIntroAnimation,
        spiralGalleryImages[] {
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
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
        },
        twoColumnsSubtitle,
        twoColumnsTitle,
        twoColumnsDescription,
        twoColumnsMediaType,
        twoColumnsImage {
          asset-> {
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        twoColumnsVideo {
          asset-> {
            _id,
            url
          }
        }
      }
    }`
    
    const result = await $fetch('/api/sanity/query', {
      method: 'POST',
      body: {
        query,
        params: { slug: slug.value },
        useCdn: false,
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

