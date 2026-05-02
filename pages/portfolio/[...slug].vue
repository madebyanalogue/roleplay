<template>
  <div class="portfolio-detail">
    <div v-if="pending" class="portfolio-loading">
     
    </div>
    <div v-if="error" class="portfolio-error">
      <p>Error loading portfolio: {{ error.message }}</p>
    </div>
    <div v-else-if="project">
      <div class="portfolio-layout portfolio-fade-in underline-links">
        <aside class="portfolio-layout__sidebar rounded-portfolio white pad-30">
          <div class="portfolio-sidebar-stack">
            <div class="portfolio-sidebar-stack__middle">
              <div class="portfolio-sidebar-stack__body gap-20">
                <h1 class="portfolio-title portfolio-title-full fluid-type" style="--desktop: 54; --mobile: 40;">
                  {{ project.title }}
                </h1>

                <div
                  v-if="project.intro?.length"
                  class="portfolio-intro fluid-type" style="--desktop: 18; --mobile: 20;"
                >
                  <SanityBlocks :blocks="project.intro" />
                </div>

                <div
                  v-if="project.role?.length || project.play?.length || project.results?.length || project.resultsStats?.length"
                  class="portfolio-accordions"
                >
                  <div
                    v-if="project.role?.length"
                    class="portfolio-accordion"
                  >
                    <button
                      id="accordion-heading-role"
                      type="button"
                      class="portfolio-accordion-summary"
                      :tabindex="isMobileAccordionViewport ? -1 : 0"
                      :aria-expanded="accordionAriaExpanded('role')"
                      aria-controls="accordion-panel-role"
                      @click="onAccordionToggle('role')"
                    >
                      <span class="subtitle subtitle--circle orange-dot">Role</span>
                    </button>
                    <div
                      id="accordion-panel-role"
                      class="portfolio-accordion-panel-outer"
                      :class="{ 'portfolio-accordion-panel-outer--open': accordionSectionOpen('role') }"
                      role="region"
                      aria-labelledby="accordion-heading-role"
                    >
                      <div class="portfolio-accordion-panel-inner">
                        <div
                          class="portfolio-accordion-panel fluid-type"
                          style="--desktop: 24; --mobile: 18"
                        >
                          <SanityBlocks :blocks="project.role" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="project.play?.length"
                    class="portfolio-accordion"
                  >
                    <button
                      id="accordion-heading-play"
                      type="button"
                      class="portfolio-accordion-summary"
                      :tabindex="isMobileAccordionViewport ? -1 : 0"
                      :aria-expanded="accordionAriaExpanded('play')"
                      aria-controls="accordion-panel-play"
                      @click="onAccordionToggle('play')"
                    >
                      <span class="subtitle subtitle--square orange-dot">Play</span>
                    </button>
                    <div
                      id="accordion-panel-play"
                      class="portfolio-accordion-panel-outer"
                      :class="{ 'portfolio-accordion-panel-outer--open': accordionSectionOpen('play') }"
                      role="region"
                      aria-labelledby="accordion-heading-play"
                    >
                      <div class="portfolio-accordion-panel-inner">
                        <div
                          class="portfolio-accordion-panel fluid-type"
                          style="--desktop: 24; --mobile: 18"
                        >
                          <SanityBlocks :blocks="project.play" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="project.results?.length || project.resultsStats?.length"
                    class="portfolio-accordion"
                  >
                    <button
                      id="accordion-heading-results"
                      type="button"
                      class="portfolio-accordion-summary"
                      :tabindex="isMobileAccordionViewport ? -1 : 0"
                      :aria-expanded="accordionAriaExpanded('results')"
                      aria-controls="accordion-panel-results"
                      @click="onAccordionToggle('results')"
                    >
                      <span class="subtitle subtitle--circle orange-dot">Results</span>
                    </button>
                    <div
                      id="accordion-panel-results"
                      class="portfolio-accordion-panel-outer"
                      :class="{ 'portfolio-accordion-panel-outer--open': accordionSectionOpen('results') }"
                      role="region"
                      aria-labelledby="accordion-heading-results"
                    >
                      <div class="portfolio-accordion-panel-inner">
                        <div
                          class="portfolio-accordion-panel fluid-type"
                          style="--desktop: 24; --mobile: 18"
                        >
                          <SanityBlocks
                            v-if="project.results?.length"
                            :blocks="project.results"
                          />
                          <PortfolioStats
                            v-if="project.resultsStats?.length"
                            :stats="project.resultsStats"
                            root-class="portfolio-results-stats gap-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="hasClientVideo"
              ref="clientVideoLaunchRef"
              class="portfolio-sidebar-stack__footer"
            >
              <div class="portfolio-video-launch">
                <button
                  type="button"
                  class="portfolio-hear-btn fluid-type mono lavender"
                  style="--desktop: 18; --mobile: 14;"
                  :aria-expanded="clientVideoOpen"
                  aria-controls="portfolio-client-video-pop"
                  @click="clientVideoOpen = !clientVideoOpen"
                >
                  <span class="subtitle subtitle--circle orange-dot">Hear from the client</span>
                  <div class="orange-text pad-10 pad-left">
                    <svg
                      class="portfolio-hear-arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M0.270896 13.5043L11.9361 1.83905L2.51334 1.83905C2.38258 1.85469 2.24999 1.84216 2.12448 1.80231C1.99897 1.76246 1.88343 1.6962 1.78565 1.608C1.68787 1.51979 1.61009 1.41168 1.55756 1.29093C1.50502 1.17017 1.47894 1.03957 1.48106 0.907898C1.48319 0.776227 1.51347 0.646535 1.56987 0.527537C1.62627 0.408538 1.70749 0.30299 1.80807 0.217985C1.90865 0.132979 2.02626 0.0704848 2.15299 0.0347015C2.27973 -0.00108239 2.41265 -0.00932503 2.54283 0.0105246L14.1923 0.0105213C14.3141 0.0078327 14.4351 0.0298347 14.5482 0.0751989C14.6612 0.120563 14.7639 0.188354 14.85 0.274477C14.9361 0.3606 15.0039 0.463272 15.0493 0.576306C15.0946 0.68934 15.1166 0.81039 15.1139 0.932156L15.1139 12.5816C15.1148 12.7039 15.0913 12.825 15.0449 12.9381C14.9985 13.0512 14.9301 13.1539 14.8437 13.2404C14.7572 13.3268 14.6545 13.3952 14.5414 13.4416C14.4283 13.488 14.3072 13.5115 14.1849 13.5106C13.9397 13.5069 13.7056 13.4078 13.5322 13.2344C13.3588 13.0609 13.2597 12.8268 13.2559 12.5816L13.2486 3.15145L1.5833 14.8167C1.40861 14.9875 1.1736 15.0825 0.929272 15.0812C0.684948 15.0798 0.451024 14.9821 0.278269 14.8093C0.190835 14.7248 0.121168 14.6237 0.0733622 14.5119C0.025557 14.4002 0.000577941 14.2799 -0.000109264 14.1584C-0.000796447 14.0368 0.0228239 13.9163 0.0693633 13.804C0.115903 13.6916 0.184423 13.5898 0.270896 13.5043Z"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  v-show="clientVideoOpen"
                  id="portfolio-client-video-pop"
                  class="portfolio-video-pop"
                  role="dialog"
                  aria-label="Client video"
                >
                  <div class="portfolio-video-pop__inner portfolio-image-container">
                    <PlyrPlayer
                      v-if="clientVimeoId"
                      :key="`pop-vimeo-${clientVimeoId}`"
                      type="vimeo"
                      :vimeo-id="clientVimeoId"
                    />
                    <PlyrPlayer
                      v-else-if="project.clientVideo?.asset?.url"
                      :key="`pop-mp4-${project.clientVideo.asset.url}`"
                      type="html5"
                      :src="project.clientVideo.asset.url"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div class="portfolio-layout__main">
          <div class="portfolio-content">
        <div
          v-for="(block, index) in project.contentBlocks"
          :key="block._key || index"
          class="portfolio-content-block portfolio-fade-in"
          :style="{ transitionDelay: `${(index + 1) * 0.1}s` }"
        >
        <div v-if="block._type === 'imageBlock' && block.image?.asset" class="portfolio-image-block rounded-portfolio">
          <div
            data-click-zoom
            class="portfolio-image-container"
            :style="getImageAspectRatio(block.image.asset)"
          >
            <NuxtImg
              :src="block.image.asset.url || ''"
              :alt="project.title"
              :width="block.image.asset.metadata?.dimensions?.width"
              :height="block.image.asset.metadata?.dimensions?.height"
              class="portfolio-image"
              @load="onImageLoad"
            />
          </div>
        </div>
        
        <div v-else-if="block._type === 'videoBlock' && videoBlockHasMedia(block)" class="portfolio-video-block rounded-portfolio">
          <div class="portfolio-image-container portfolio-video-block-inner">
            <PlyrPlayer
              v-if="videoBlockVimeoId(block)"
              :key="`block-vimeo-${block._key || index}-${videoBlockVimeoId(block)}`"
              type="vimeo"
              :vimeo-id="videoBlockVimeoId(block)"
            />
            <PlyrPlayer
              v-else-if="block.video?.asset?.url"
              :key="`block-mp4-${block._key || index}-${block.video.asset.url}`"
              type="html5"
              :src="block.video.asset.url"
            />
          </div>
        </div>
        
        <div v-else-if="block._type === 'testimonialBlock'" class="portfolio-testimonial-block rounded-portfolio cream pad-30">
          <blockquote
            v-if="block.testimonial"
            class="portfolio-testimonial-quote"
          >
          “{{ block.testimonial }}”
          </blockquote>
          <footer
            v-if="block.name || block.company"
            class="portfolio-testimonial-attribution"
          >
            <span v-if="block.name">{{ block.name }}</span>
            <span v-if="block.name && block.company">, </span>
            <span v-if="block.company">{{ block.company }}</span>
          </footer>
        </div>

        <div v-else-if="block._type === 'servicesBlock' && block.body" class="portfolio-services-block rounded-portfolio cream pad-30">
          <div class="portfolio-services-columns">
            <div
              v-for="(line, li) in servicesLines(block.body)"
              :key="li"
              class="portfolio-services-line"
            >
              {{ line }}
            </div>
          </div>
        </div>

        <div v-else-if="block._type === 'textBlock' && block.text" class="portfolio-text-block rounded-portfolio cream underline-links pad-30">
          <SanityBlocks :blocks="block.text" />
        </div>
        
        <div v-else-if="block._type === 'galleryBlock' && block.images && block.images.length > 0" class="portfolio-gallery-block rounded-portfolio">
          <PortfolioGallery
            :images="block.images"
            :timing="block.timing || 1000"
            :alt="project.title"
          />
        </div>
        
        <div v-else-if="block._type === 'twoColumnBlock'" class="portfolio-two-column-block">
          <div
            class="portfolio-two-column-image rounded-portfolio"
            :class="{ 'portfolio-column-media--desktop-aspect': columnMediaUsesDesktopAspect(block) }"
            :style="columnMediaDesktopAspectStyle(block)"
          >
            <PortfolioGallery
              v-if="block.column1Type === 'gallery' && block.column1Images && block.column1Images.length > 0"
              :images="block.column1Images"
              :timing="block.column1Timing || 1000"
              :alt="project.title"
            />
            <div
              v-else-if="block.image1?.asset"
              data-click-zoom
              class="portfolio-image-container"
              :style="getImageAspectRatio(block.image1.asset)"
            >
              <NuxtImg
                :src="block.image1.asset.url || ''"
                :alt="project.title"
                :width="block.image1.asset.metadata?.dimensions?.width"
                :height="block.image1.asset.metadata?.dimensions?.height"
                class="portfolio-image"
                @load="onImageLoad"
              />
            </div>
          </div>
          <div
            class="portfolio-two-column-image rounded-portfolio"
            :class="{ 'portfolio-column-media--desktop-aspect': columnMediaUsesDesktopAspect(block) }"
            :style="columnMediaDesktopAspectStyle(block)"
          >
            <PortfolioGallery
              v-if="block.column2Type === 'gallery' && block.column2Images && block.column2Images.length > 0"
              :images="block.column2Images"
              :timing="block.column2Timing || 1000"
              :alt="project.title"
            />
            <div
              v-else-if="block.image2?.asset"
              data-click-zoom
              class="portfolio-image-container"
              :style="getImageAspectRatio(block.image2.asset)"
            >
              <NuxtImg
                :src="block.image2.asset.url || ''"
                :alt="project.title"
                :width="block.image2.asset.metadata?.dimensions?.width"
                :height="block.image2.asset.metadata?.dimensions?.height"
                class="portfolio-image"
                @load="onImageLoad"
              />
            </div>
          </div>
        </div>
        
        <div v-else-if="block._type === 'twoColumnGalleryBlock'" class="portfolio-two-column-gallery-block">
          <div
            class="portfolio-two-column-gallery-column rounded-portfolio"
            :class="{ 'portfolio-column-media--desktop-aspect': columnMediaUsesDesktopAspect(block) }"
            :style="columnMediaDesktopAspectStyle(block)"
          >
            <PortfolioGallery
              v-if="block.leftImages && block.leftImages.length > 1"
              :images="block.leftImages"
              :timing="block.leftTiming || 1000"
              :alt="project.title"
            />
            <div
              v-else-if="block.leftImages && block.leftImages.length === 1 && block.leftImages[0]?.asset"
              data-click-zoom
              class="portfolio-image-container"
              :style="getImageAspectRatio(block.leftImages[0].asset)"
            >
              <NuxtImg
                :src="block.leftImages[0].asset.url || ''"
                :alt="project.title"
                :width="block.leftImages[0].asset.metadata?.dimensions?.width"
                :height="block.leftImages[0].asset.metadata?.dimensions?.height"
                class="portfolio-image"
                @load="onImageLoad"
              />
            </div>
          </div>
          <div
            class="portfolio-two-column-gallery-column rounded-portfolio"
            :class="{ 'portfolio-column-media--desktop-aspect': columnMediaUsesDesktopAspect(block) }"
            :style="columnMediaDesktopAspectStyle(block)"
          >
            <PortfolioGallery
              v-if="block.rightImages && block.rightImages.length > 1"
              :images="block.rightImages"
              :timing="block.rightTiming || 1000"
              :alt="project.title"
            />
            <div
              v-else-if="block.rightImages && block.rightImages.length === 1 && block.rightImages[0]?.asset"
              data-click-zoom
              class="portfolio-image-container"
              :style="getImageAspectRatio(block.rightImages[0].asset)"
            >
              <NuxtImg
                :src="block.rightImages[0].asset.url || ''"
                :alt="project.title"
                :width="block.rightImages[0].asset.metadata?.dimensions?.width"
                :height="block.rightImages[0].asset.metadata?.dimensions?.height"
                class="portfolio-image"
                @load="onImageLoad"
              />
            </div>
          </div>
        </div>
          </div>
      </div>
      </div>
      </div>
    </div>
    <div v-else class="portfolio-not-found rounded-portfolio cream pad-30">
      <p>Portfolio project not found</p>
    </div>
  </div>
</template>

<script setup>
import { injectPageLoading } from '~/composables/usePageLoading'

const route = useRoute()
const { setLoading } = injectPageLoading()

/** Accept Vimeo URL or numeric ID */
function parseVimeoId(input) {
  if (!input || typeof input !== 'string') return null
  const s = input.trim()
  if (/^\d+$/.test(s)) return s
  let m = s.match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  if (m) return m[1]
  m = s.match(/player\.vimeo\.com\/video\/(\d+)/i)
  return m ? m[1] : null
}

const slug = computed(() => {
  if (route.params.slug) {
    return Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
  }
  return null
})

const { data: project, pending, error } = useAsyncData(
  () => `portfolio-${slug.value}`,
  async () => {
    if (!slug.value) return null
    
    const query = `*[_type == "portfolio" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      intro,
      role,
      play,
      results,
      resultsStats,
      clientVideoSource,
      clientVideoVimeo,
      clientVideo {
        asset->
      },
      contentBlocks[] {
        _type,
        _key,
        image {
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
        videoSource,
        videoVimeo,
        video {
          asset->
        },
        text,
        image1 {
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
        image2 {
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
        column1Type,
        column1Images[] {
          asset->
        },
        column1Timing,
        column2Type,
        column2Images[] {
          asset->
        },
        column2Timing,
        columnAspectRatio,
        timing,
        images[] {
          asset->
        },
        leftImages[] {
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
        leftTiming,
        rightImages[] {
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
        rightTiming,
        testimonial,
        name,
        company,
        body
      }
    }`
    
    if (process.server) {
      const config = useRuntimeConfig()
      const projectId = config.public.sanity?.projectId || 'go8920y3'
      const dataset = config.public.sanity?.dataset || 'production'
      
      return await $fetch(`https://${projectId}.apicdn.sanity.io/v2021-10-21/data/query/${dataset}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, params: { slug: slug.value } }),
      }).then(result => result?.result || null).catch(() => null)
    }
    return await $fetch('/api/sanity/query', {
      method: 'POST',
      body: { query, params: { slug: slug.value } },
    }).then(result => result?.result || null).catch(() => null)
  },
  { watch: [slug] }
)

const clientVimeoId = computed(() => {
  const p = project.value
  if (!p || p.clientVideoSource !== 'vimeo') return ''
  return parseVimeoId(p.clientVideoVimeo || '') || ''
})

const clientVideoOpen = ref(false)
const clientVideoLaunchRef = ref(null)

/** Sidebar accordions: one open on desktop with height animation; mobile = all open, no toggle (CSS). */
const ACCORDION_BREAKPOINT_MAX = 999

const accordionOpenId = ref(null)

function defaultAccordionSectionId(p) {
  if (!p) return null
  if (p.role?.length) return 'role'
  if (p.play?.length) return 'play'
  if (p.results?.length || p.resultsStats?.length) return 'results'
  return null
}

watch(
  () => project.value,
  (p) => {
    accordionOpenId.value = defaultAccordionSectionId(p)
  },
  { immediate: true },
)

const isMobileAccordionViewport = ref(false)

function syncAccordionViewport() {
  if (!import.meta.client) return
  isMobileAccordionViewport.value = window.matchMedia(
    `(max-width: ${ACCORDION_BREAKPOINT_MAX}px)`,
  ).matches
}

function accordionSectionOpen(id) {
  return accordionOpenId.value === id
}

function accordionAriaExpanded(id) {
  if (isMobileAccordionViewport.value) return true
  return accordionOpenId.value === id
}

function onAccordionToggle(id) {
  if (isMobileAccordionViewport.value) return
  accordionOpenId.value = accordionOpenId.value === id ? null : id
}

const hasClientVideo = computed(() => {
  if (!project.value) return false
  if (clientVimeoId.value) return true
  return !!project.value.clientVideo?.asset?.url
})

watch(slug, () => {
  clientVideoOpen.value = false
})

function onVideoPopoverDismiss(e) {
  if (!clientVideoOpen.value || !clientVideoLaunchRef.value) return
  if (!clientVideoLaunchRef.value.contains(e.target)) {
    clientVideoOpen.value = false
  }
}

function onEscClose(e) {
  if (e.key === 'Escape') {
    clientVideoOpen.value = false
  }
}

// Update global loading state
watch(pending, (isPending) => {
  setLoading(isPending)
}, { immediate: true })

// Calculate aspect ratio for any image asset
const getImageAspectRatio = (asset) => {
  if (asset?.metadata?.dimensions) {
    const { width, height, aspectRatio } = asset.metadata.dimensions
    if (aspectRatio) {
      return { aspectRatio: `${aspectRatio}` }
    } else if (width && height) {
      return { aspectRatio: `${width / height}` }
    }
  }
  // Fallback to a reasonable aspect ratio (4:3)
  return { aspectRatio: '4 / 3' }
}

// Handle image load to fade in
const onImageLoad = (event) => {
  if (process.client && event?.target) {
    event.target.classList.add('loaded')
  }
}

/** Split services textarea into non-empty lines for two-column layout */
function servicesLines(body) {
  if (!body || typeof body !== 'string') return []
  return body.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
}

function videoBlockVimeoId(block) {
  if (!block || block._type !== 'videoBlock') return ''
  if (block.videoSource !== 'vimeo') return ''
  return parseVimeoId(block.videoVimeo || '') || ''
}

function videoBlockHasMedia(block) {
  if (!block || block._type !== 'videoBlock') return false
  if (videoBlockVimeoId(block)) return true
  return !!block.video?.asset?.url
}

/** Parses "16/9" or "1 / 1" → CSS aspect-ratio value; invalid or empty → null */
function parseColumnAspectRatioString(input) {
  if (!input || typeof input !== 'string') return null
  const raw = input.trim()
  if (!raw) return null
  const parts = raw.split('/').map((s) => s.trim()).filter(Boolean)
  if (parts.length !== 2) return null
  const w = Number.parseFloat(parts[0])
  const h = Number.parseFloat(parts[1])
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null
  return `${w} / ${h}`
}

function columnMediaDesktopAspectStyle(block) {
  const v = parseColumnAspectRatioString(block?.columnAspectRatio)
  if (!v) return {}
  return { '--portfolio-col-aspect': v }
}

function columnMediaUsesDesktopAspect(block) {
  return parseColumnAspectRatioString(block?.columnAspectRatio) != null
}

function onAccordionMqChange() {
  const wasMobile = isMobileAccordionViewport.value
  syncAccordionViewport()
  if (wasMobile && !isMobileAccordionViewport.value && project.value) {
    accordionOpenId.value = defaultAccordionSectionId(project.value)
  }
}

let removeAccordionMqListener = () => {}

onMounted(() => {
  if (import.meta.client) {
    syncAccordionViewport()
    const mqAccordion = window.matchMedia(`(max-width: ${ACCORDION_BREAKPOINT_MAX}px)`)
    mqAccordion.addEventListener('change', onAccordionMqChange)
    removeAccordionMqListener = () =>
      mqAccordion.removeEventListener('change', onAccordionMqChange)

    document.addEventListener('pointerdown', onVideoPopoverDismiss, true)
    document.addEventListener('keydown', onEscClose)
    nextTick(() => {
      const images = document.querySelectorAll('.portfolio-image')
      images.forEach((img) => {
        if (img.complete && img.naturalHeight > 0) {
          img.classList.add('loaded')
        }
      })
    })
  }
})

onUnmounted(() => {
  removeAccordionMqListener()
  if (import.meta.client) {
    document.removeEventListener('pointerdown', onVideoPopoverDismiss, true)
    document.removeEventListener('keydown', onEscClose)
  }
})
</script>

<style scoped>
.portfolio-layout {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--gutter);
  margin-bottom: calc(var(--gutter) * 2);
  align-items: start;
}

.portfolio-layout__sidebar {
  grid-column: span 4;
  min-width: 0;
  height: 100%;
}

.portfolio-layout__main {
  grid-column: span 8;
  min-width: 0;
}

.portfolio-sidebar-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  min-height: min(100%, 60vh);
}

.portfolio-sidebar-stack__middle {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.portfolio-sidebar-stack__body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.portfolio-sidebar-stack__footer {
  flex-shrink: 0;
}

.portfolio-title-full {
  margin: 0;
  max-width: 20ch;
  line-height: 1.05;
}

.portfolio-accordions {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gutter) * 0.75);
}

.portfolio-accordion {
  border: 0;
}

.portfolio-accordion-summary {
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-align: inherit;
  cursor: pointer;
  user-select: none;
}

.portfolio-accordion-summary:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}

.portfolio-accordion-panel-outer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s cubic-bezier(0.33, 1, 0.68, 1);
}

.portfolio-accordion-panel-outer--open {
  grid-template-rows: 1fr;
}

.portfolio-accordion-panel-inner {
  overflow: hidden;
  min-height: 0;
}

.portfolio-accordion-panel-outer:not(.portfolio-accordion-panel-outer--open) .portfolio-accordion-panel {
  opacity: 0;
  transition: opacity 0.1s ease;
}

.portfolio-accordion-panel-outer--open .portfolio-accordion-panel {
  opacity: 1;
  transition: opacity 0.65s ease 0.38s;
}

@media (max-width: 999px) {
  .portfolio-accordion-summary {
    cursor: default;
    pointer-events: none;
  }

  .portfolio-accordion-panel-outer {
    grid-template-rows: 1fr !important;
    transition: none !important;
  }

  .portfolio-accordion-panel-outer--open {
    grid-template-rows: 1fr !important;
  }

  .portfolio-accordion-panel {
    opacity: 1 !important;
    transition: none !important;
  }
}



.portfolio-results-stats {
  margin-top: calc(var(--gutter) * 1);
}

.portfolio-video-launch {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.portfolio-hear-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0;
  border: 0;
  background: var(--lavender);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  text-transform: inherit;
  padding: 1.1em 1.5em;
  border-radius: var(--rounded-button);
}

.portfolio-hear-btn:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}

.portfolio-hear-arrow {
  flex-shrink: 0;
  display: block;
}

.portfolio-video-pop {
  position: absolute;
  left: 0;
  top: calc(100% + 0.5rem);
  z-index: 20;
  width: 20vw;
  min-width: min(200px, 100%);
  max-width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background: var(--background-color, #fff);
}

.portfolio-video-pop__inner {
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
}

.portfolio-video-block-inner {
  aspect-ratio: 16 / 9;
}

/* TEMP: design-reference PNGs for testimonial / services styling — remove when done */
.portfolio-testimonial-block {
  padding: calc(var(--gutter) * 2);
  background-color: #f2e8df;
  background-image: url('/design-refs/testimonial-ref.png');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  min-height: min(85vw, 560px);
}

.portfolio-services-block {
  padding: calc(var(--gutter) * 2);
  background-color: #f2eae4;
  background-image: url('/design-refs/services-ref.png');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  min-height: min(75vw, 520px);
}

.portfolio-testimonial-quote {
  margin: 0;
  font-size: inherit;
  font-weight: normal;
}

.portfolio-testimonial-attribution {
  margin-top: calc(var(--gutter) * 0.75);
}

.portfolio-services-columns {
  column-count: 2;
  column-gap: var(--gutter);
}

.portfolio-services-line {
  break-inside: avoid;
  margin-bottom: calc(var(--gutter) * 0.5);
}

.portfolio-fade-in {
  opacity: 0;
  animation: fadeIn 0.6s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.portfolio-content {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  padding: 0;
}

.portfolio-text-block {
  padding-bottom: calc(var(--gutter) * 4);
}

.portfolio-image-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--background-color, #ffffff);
}

.portfolio-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease-in;
  position: absolute;
  top: 0;
  left: 0;
}

.portfolio-image.loaded {
  opacity: 1;
}

.portfolio-gallery-block {
  width: 100%;
}

.portfolio-two-column-block,
.portfolio-two-column-gallery-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gutter);
}

.portfolio-two-column-gallery-column {
  width: 100%;
}

@media (min-width: 1000px) {
  .portfolio-column-media--desktop-aspect {
    position: relative;
    width: 100%;
    align-self: start;
    aspect-ratio: var(--portfolio-col-aspect);
  }

  .portfolio-column-media--desktop-aspect > .portfolio-image-container {
    height: 100%;
    min-height: 0;
    aspect-ratio: unset !important;
  }

  .portfolio-column-media--desktop-aspect > .portfolio-gallery {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  .portfolio-column-media--desktop-aspect :deep(.portfolio-gallery-image),
  .portfolio-column-media--desktop-aspect :deep(.portfolio-gallery-image-active) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .portfolio-column-media--desktop-aspect :deep(.portfolio-gallery-image-active) {
    opacity: 1;
  }

  .portfolio-column-media--desktop-aspect :deep(.portfolio-gallery-img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

@media (max-width: 999px) {
  .portfolio-layout {
    grid-template-columns: 1fr;
  }

  .portfolio-layout__sidebar,
  .portfolio-layout__main {
    grid-column: 1 / -1;
  }
}

@media (max-width: 800px) {
  .portfolio-services-columns {
    column-count: 1;
  }

  .portfolio-two-column-block,
  .portfolio-two-column-gallery-block {
    grid-template-columns: 1fr;
  }
}
</style>

