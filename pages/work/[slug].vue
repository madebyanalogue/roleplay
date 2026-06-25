<template>
  <div class="portfolio-detail">
    <div v-if="pending" class="portfolio-loading">
     
    </div>
    <div v-else-if="error" class="portfolio-error">
      <p>Error loading portfolio: {{ error.message }}</p>
    </div>
    <div v-else-if="project">
      <div class="sticky-corner-portfolio-strip" />
      <div class="portfolio-layout portfolio-fade-in">



        <div class="hide-md pad-30 pad-top">
          <div class="grid gap-50">
            <h1 class="portfolio-title portfolio-title-full fluid-type" style="--desktop: 54; --mobile: 40;">
              {{ project.title }}
            </h1>
          </div>
        </div>

        <aside class="portfolio-layout__sidebar rounded-portfolio white pad-30">

          <div class="sticky-corner" />
          <div class="portfolio-sidebar-stack">
            <div class="portfolio-sidebar-stack__middle">
              <div class="portfolio-sidebar-stack__body gap-30">
                <h1 class="portfolio-title portfolio-title-full fluid-type show-md" style="--desktop: 54; --mobile: 40;">
                  {{ project.title }}
                </h1>

                <div
                  v-if="project.role?.length || project.play?.length || project.results?.length || project.resultsStats?.length"
                  class="portfolio-accordions"
                  :class="{ 'portfolio-accordions--no-transition': disableAccordionTransition }"
                >
                  <div
                    v-if="project.role?.length"
                    class="portfolio-accordion"
                    :class="{ 'portfolio-accordion--open': accordionSectionOpen('role') }"
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
                          class="portfolio-accordion-panel  fluid-type"
                          style="--desktop: 26; --mobile: 18"
                        >
                          <SanityBlocks :blocks="project.role" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="project.play?.length"
                    class="portfolio-accordion"
                    :class="{ 'portfolio-accordion--open': accordionSectionOpen('play') }"
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
                      <span class="subtitle subtitle--square twisted orange-dot">Play</span>
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
                          class="portfolio-accordion-panel  fluid-type"
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
                    :class="{ 'portfolio-accordion--open': accordionSectionOpen('results') }"
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
                          class="portfolio-accordion-panel pad-top fluid-type"
                          style="--desktop: 24; --mobile: 18"
                        >
                          <SanityBlocks
                            v-if="project.results?.length"
                            :blocks="project.results"
                          />
                          <PortfolioStatsProject
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
              <div
                class="portfolio-video-launch"
                :class="{ 'portfolio-video-launch--expanded': clientVideoExpanded }"
              >
                <div
                  ref="clientVideoBtnRef"
                  class="portfolio-hear-btn portfolio-hear-btn--launch fluid-type mono lavender"
                  :class="{
                    'portfolio-hear-btn--expanded': clientVideoExpanded,
                    'portfolio-hear-btn--video-visible': clientVideoVisible,
                  }"
                  :style="{
                    '--desktop': '18',
                    '--mobile': '14',
                    '--client-video-aspect': clientVideoAspect,
                  }"
                  @transitionend="onClientVideoWidthTransitionEnd"
                >
                  <div
                    v-if="clientVideoMounted"
                    id="portfolio-client-video-panel"
                    class="portfolio-hear-btn__video-panel"
                    role="region"
                    aria-label="Client video"
                    @click.stop
                    @pointerdown.stop
                    @transitionend="onClientVideoPanelTransitionEnd"
                  >
                    <div class="portfolio-hear-btn__video-inner">
                      <div
                        class="portfolio-hear-btn__video-media"
                        @transitionend="onClientVideoFadeTransitionEnd"
                      >
                        <PlyrPlayer
                          v-if="clientVimeoId"
                          :key="`client-vimeo-${clientVimeoId}`"
                          type="vimeo"
                          :vimeo-id="clientVimeoId"
                          variant="client"
                          fill
                        />
                        <PlyrPlayer
                          v-else-if="project.clientVideo?.asset?.url"
                          :key="`client-mp4-${project.clientVideo.asset.url}`"
                          type="html5"
                          :src="project.clientVideo.asset.url"
                          variant="client"
                          fill
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    class="portfolio-hear-btn__toggle"
                    :aria-expanded="clientVideoOpen"
                    aria-controls="portfolio-client-video-panel"
                    @click="toggleClientVideo"
                  >
                    <span class="portfolio-hear-btn__row gap-bounce-hover">
                      <span class="subtitle subtitle--circle orange-dot">Client says</span>
                      <div class="orange-text pad-20 pad-left">
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
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div class="portfolio-layout__main">
          <div class="portfolio-layout__main-mask"></div>
          <div class="portfolio-content">
        <div
          v-for="(block, index) in mainContentBlocks"
          :key="block._key || index"
          class="portfolio-content-block"
          :class="{ 'portfolio-fade-in': shouldFadeMainBlock(index) }"
          :style="{ transitionDelay: `${(index + 1) * 0.1}s` }"
        >
        <div v-if="block._type === 'imageBlock' && block.image?.asset" class="portfolio-image-block rounded-portfolio">
          <div
            v-bind="portfolioImageClickZoom ? { 'data-click-zoom': '' } : {}"
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
          <PortfolioVideoBlock
            :block="block"
            :alt="project.title"
            @image-load="onImageLoad"
          />
        </div>
        
        <div v-else-if="block._type === 'testimonialBlock'" class="portfolio-testimonial-block rounded-portfolio beige grid gap-50 pad-30 pad-md-50">
          <div class="subtitle subtitle--square white-dot portfolio-testimonial-subtitle">
            {{ block.subtitle || 'Testimonial' }}
          </div>
          <blockquote
            v-if="block.testimonial"
            class="portfolio-testimonial-quote  fluid-type pad-md-60 pad-right"
            style="--desktop: 60; --mobile: 30;"
          >
          “{{ block.testimonial }}”
          </blockquote>
          <footer
            v-if="block.name || block.company"
            class="portfolio-testimonial-attribution fluid-type"
            style="--desktop: 24; --mobile: 18;"
          >
            <div v-if="block.name">{{ block.name }}</div>
            <div v-if="block.company">{{ block.company }}</div>
          </footer>
        </div>

        <div v-else-if="block._type === 'servicesBlock' && block.body" class="portfolio-services-block rounded-portfolio beige grid gap-60  pad-30">
          <div class="subtitle subtitle--circle orange-dot portfolio-services-subtitle">
            {{ block.title || 'Services' }}
          </div>
          <div class="portfolio-services-columns fluid-type pad-40 pad-bottom" style="--desktop: 50; --mobile: 24;">
            <div
              v-for="(line, li) in servicesLines(block.body)"
              :key="li"
              class="portfolio-services-line"
            >
              {{ line }}
            </div>
          </div>
        </div>

        <div v-else-if="block._type === 'cardsBlock' && block.cards?.length" class="portfolio-cards-block">
          <article
            v-for="(card, cardIndex) in block.cards"
            :key="card._key || cardIndex"
            class="portfolio-cards-item rounded-portfolio"
          >
            <div class="portfolio-cards-item__grid">
              <div class="portfolio-cards-item__text underline-links">
                <h3 v-if="card.title" class="portfolio-cards-item__title">
                  {{ card.title }}
                </h3>
                <SanityBlocks
                  v-if="card.description?.length"
                  :blocks="card.description"
                />
              </div>

              <div class="portfolio-cards-item__media">
                <video
                  v-if="card.mediaType === 'video' && card.video?.asset?.url"
                  autoplay
                  muted
                  loop
                  playsinline
                  class="portfolio-cards-item__video"
                >
                  <source
                    :src="card.video.asset.url"
                    :type="videoMimeTypeFromUrl(card.video.asset.url)"
                  >
                </video>
                <NuxtImg
                  v-else-if="card.image?.asset?.url"
                  :src="card.image.asset.url"
                  :alt="card.title || project.title"
                  :width="card.image.asset.metadata?.dimensions?.width"
                  :height="card.image.asset.metadata?.dimensions?.height"
                  class="portfolio-cards-item__image"
                  @load="onImageLoad"
                />
              </div>
            </div>
          </article>
        </div>

        <div v-else-if="block._type === 'textBlock' && block.text" class="portfolio-text-block rounded-portfolio beige underline-links pad-30">
          <SanityBlocks :blocks="block.text" />
        </div>
        
        <div v-else-if="block._type === 'galleryBlock' && block.images && block.images.length > 0" class="portfolio-gallery-block rounded-portfolio">
          <PortfolioGallery
            :images="block.images"
            :timing="block.timing || 1000"
            :alt="project.title"
            :click-zoom="portfolioImageClickZoom"
          />
        </div>
        
        <div v-else-if="block._type === 'twoColumnBlock'" class="">
          <div class="sticky-corner-two-columns" />
          <div class="portfolio-two-column-block">
            <div
              class="portfolio-two-column-image rounded-portfolio"
              :class="{ 'portfolio-column-media--desktop-aspect': columnMediaUsesDesktopAspect(block) }"
              :style="columnMediaDesktopAspectStyle(block)"
            >
              <PortfolioTwoColumnCell
                :column-type="block.column1Type"
                :image="block.image1"
                :images="block.column1Images"
                :timing="block.column1Timing"
                :video-source="block.column1VideoSource"
                :video="block.column1Video"
                :video-vimeo="block.column1VideoVimeo"
                :alt="project.title"
                :click-zoom="portfolioImageClickZoom"
                :get-image-aspect-ratio="getImageAspectRatio"
                @image-load="onImageLoad"
              />
            </div>
            <div
              class="portfolio-two-column-image rounded-portfolio"
              :class="{ 'portfolio-column-media--desktop-aspect': columnMediaUsesDesktopAspect(block) }"
              :style="columnMediaDesktopAspectStyle(block)"
            >
              <PortfolioTwoColumnCell
                :column-type="block.column2Type"
                :image="block.image2"
                :images="block.column2Images"
                :timing="block.column2Timing"
                :video-source="block.column2VideoSource"
                :video="block.column2Video"
                :video-vimeo="block.column2VideoVimeo"
                :alt="project.title"
                :click-zoom="portfolioImageClickZoom"
                :get-image-aspect-ratio="getImageAspectRatio"
                @image-load="onImageLoad"
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
              :click-zoom="portfolioImageClickZoom"
            />
            <div
              v-else-if="block.leftImages && block.leftImages.length === 1 && block.leftImages[0]?.asset"
              v-bind="portfolioImageClickZoom ? { 'data-click-zoom': '' } : {}"
              class="portfolio-image-container"
              :style="getImageAspectRatio(block.leftImages[0].asset)"
            >
              <NuxtImg
                :src="block.leftImages[0].asset.url || ''"
                :alt="project.title"
                fit="cover"
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
              :click-zoom="portfolioImageClickZoom"
            />
            <div
              v-else-if="block.rightImages && block.rightImages.length === 1 && block.rightImages[0]?.asset"
              v-bind="portfolioImageClickZoom ? { 'data-click-zoom': '' } : {}"
              class="portfolio-image-container"
              :style="getImageAspectRatio(block.rightImages[0].asset)"
            >
              <NuxtImg
                :src="block.rightImages[0].asset.url || ''"
                :alt="project.title"
                fit="cover"
                :width="block.rightImages[0].asset.metadata?.dimensions?.width"
                :height="block.rightImages[0].asset.metadata?.dimensions?.height"
                class="portfolio-image"
                @load="onImageLoad"
              />
            </div>
          </div>
        </div>
        </div>
        <div
          v-if="showNextProjectSection"
          class="portfolio-next-project rounded-portfolio yellow pad-30 portfolio-fade-in"
        >
          <div class="portfolio-next-project__info">
            <div class="subtitle">{{ singlePortfolioNextProjectSettings.nextUpSubtitle }}</div>
            <NuxtLink
              :to="portfolioProjectPath(nextProject.slug)"
              class="portfolio-next-project__title fluid-type"
              style="--desktop: 72; --mobile: 40;"
            >
              {{ nextProject.title }}
            </NuxtLink>
          </div>
          <div class="portfolio-next-project__actions">
            <NuxtLink
              :to="portfolioProjectPath(nextProject.slug)"
              class="next--button fluid-type"
              style="--desktop: 24; --mobile: 18;"
            >
              {{ singlePortfolioNextProjectSettings.viewProjectButtonTitle }}
            </NuxtLink>
            <NuxtLink
              v-if="singlePortfolioNextProjectSettings.backLink"
              :to="singlePortfolioNextProjectSettings.backLink.path"
              class="next--button fluid-type"
              style="--desktop: 24; --mobile: 18;"
            >
              {{ singlePortfolioNextProjectSettings.backLink.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    <div v-else class="portfolio-not-found rounded-portfolio beige pad-30">
      <p>Portfolio project not found</p>
    </div>
  </div>
</template>

<script setup>
import { injectPageLoading } from '~/composables/usePageLoading'

const route = useRoute()
const { setLoading } = injectPageLoading()
const {
  singlePortfolioNextProjectSettings,
  singlePortfolioImageSettings,
  singlePortfolioClientVideoSettings,
  portfolioProjectPath,
} = useSiteSettings()

const portfolioImageClickZoom = computed(
  () => !singlePortfolioImageSettings.value.disableClickZoom,
)

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
  const param = route.params.slug
  if (!param) {
    const fromPath = route.path.replace(/^\/work\/?/, '')
    return fromPath || null
  }
  return Array.isArray(param) ? param[0] : param
})

const { data: project, pending, error } = useAsyncData(
  () => `portfolio-${route.path}`,
  async () => {
    if (!slug.value) return null
    
    const query = `*[_type == "portfolio" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      role,
      play,
      results,
      resultsStats,
      clientVideoSource,
      clientVideoVimeo,
      clientVideo {
        asset-> {
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
        playbackMode,
        videoVimeo,
        poster {
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
        column1VideoSource,
        column1VideoVimeo,
        column1Video {
          asset->
        },
        column2Type,
        column2Images[] {
          asset->
        },
        column2Timing,
        column2VideoSource,
        column2VideoVimeo,
        column2Video {
          asset->
        },
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
        subtitle,
        testimonial,
        name,
        company,
        title,
        body,
        cards[] {
          _key,
          title,
          description,
          mediaType,
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
          video {
            asset->
          }
        }
      }
    }`
    
    if (process.server) {
      const config = useRuntimeConfig()
      const projectId = config.public.sanity?.projectId || 'go8920y3'
      const dataset = config.public.sanity?.dataset || 'production'
      
      return await $fetch(`https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}`, {
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

const { data: allProjects } = useAsyncData(
  'portfolio-next-projects',
  async () => {
    const query = `*[_type == "portfolio"] | order(orderRank) {
      _id,
      title,
      slug
    }`

    if (process.server) {
      const config = useRuntimeConfig()
      const projectId = config.public.sanity?.projectId || 'go8920y3'
      const dataset = config.public.sanity?.dataset || 'production'

      return await $fetch(`https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }).then(result => result?.result || []).catch(() => [])
    }

    return await $fetch('/api/sanity/query', {
      method: 'POST',
      body: { query },
    }).then(result => result?.result || []).catch(() => [])
  },
  { watch: [] },
)

const nextProject = computed(() => {
  const current = project.value
  const orderedProjects = allProjects.value

  if (!current?.slug?.current || !Array.isArray(orderedProjects) || orderedProjects.length === 0) {
    return null
  }

  const currentIndex = orderedProjects.findIndex(
    (item) => item?.slug?.current === current.slug.current,
  )

  if (currentIndex === -1) {
    return orderedProjects[0] || null
  }

  const nextIndex = (currentIndex + 1) % orderedProjects.length
  return orderedProjects[nextIndex] || null
})

const showNextProjectSection = computed(() => {
  return !!nextProject.value && singlePortfolioNextProjectSettings.value?.enabled !== false
})

const clientVimeoId = computed(() => {
  const p = project.value
  if (!p || p.clientVideoSource !== 'vimeo') return ''
  return parseVimeoId(p.clientVideoVimeo || '') || ''
})

const clientVideoOpen = ref(false)
const clientVideoExpanded = ref(false)
const clientVideoVisible = ref(false)
const clientVideoMounted = ref(false)
const clientVideoAnimating = ref(false)
const clientVideoLaunchRef = ref(null)
const clientVideoBtnRef = ref(null)
const prefersReducedMotion = ref(false)
const collapsedClientVideoWidth = ref(0)

const CLIENT_VIDEO_EXPAND_MS = 700
const CLIENT_VIDEO_FADE_MS = 400

let clientVideoExpandTimer = null
let clientVideoFadeTimer = null

function clearClientVideoTimers() {
  if (clientVideoExpandTimer) {
    clearTimeout(clientVideoExpandTimer)
    clientVideoExpandTimer = null
  }
  if (clientVideoFadeTimer) {
    clearTimeout(clientVideoFadeTimer)
    clientVideoFadeTimer = null
  }
}

function scheduleClientVideoExpandComplete() {
  clearClientVideoTimers()
  clientVideoExpandTimer = setTimeout(() => {
    clientVideoExpandTimer = null
    if (
      clientVideoExpanded.value
      && clientVideoMounted.value
      && !clientVideoVisible.value
      && clientVideoOpen.value
    ) {
      clientVideoVisible.value = true
      clientVideoAnimating.value = false
    }
    if (!clientVideoExpanded.value && !clientVideoVisible.value && clientVideoMounted.value) {
      applyClientVideoCollapsedSize()
      setTimeout(() => {
        if (!clientVideoExpanded.value && clientVideoMounted.value) {
          clearClientVideoButtonStyles()
          collapsedClientVideoWidth.value = 0
          clientVideoMounted.value = false
          clientVideoOpen.value = false
          clientVideoAnimating.value = false
        }
      }, CLIENT_VIDEO_EXPAND_MS + 50)
    }
  }, CLIENT_VIDEO_EXPAND_MS + 50)
}

function scheduleClientVideoFadeComplete() {
  if (clientVideoFadeTimer) clearTimeout(clientVideoFadeTimer)
  clientVideoFadeTimer = setTimeout(() => {
    clientVideoFadeTimer = null
    if (!clientVideoVisible.value && clientVideoMounted.value && clientVideoExpanded.value) {
      clientVideoExpanded.value = false
      clientVideoOpen.value = false
      scheduleClientVideoExpandComplete()
    }
  }, CLIENT_VIDEO_FADE_MS + 50)
}

const clientVideoAspect = computed(() => {
  const p = project.value
  if (!p) return 16 / 9

  const dims = p.clientVideo?.asset?.metadata?.dimensions
  if (dims?.aspectRatio) return dims.aspectRatio
  if (dims?.width && dims?.height) return dims.width / dims.height

  return 16 / 9
})

function getClientVideoLaunchEl() {
  return clientVideoBtnRef.value?.closest('.portfolio-video-launch') ?? null
}

function clearClientVideoButtonStyles() {
  const btn = clientVideoBtnRef.value
  if (!btn) return
  btn.style.width = ''
  btn.style.removeProperty('--client-video-expanded-height')
}

function prepareClientVideoExpand() {
  const btn = clientVideoBtnRef.value
  if (!btn) return

  collapsedClientVideoWidth.value = btn.offsetWidth
  btn.style.width = `${collapsedClientVideoWidth.value}px`
}

function applyClientVideoExpandedSize() {
  const btn = clientVideoBtnRef.value
  const launch = getClientVideoLaunchEl()
  if (!btn || !launch) return

  const targetWidth = launch.clientWidth
  const videoHeight = targetWidth / clientVideoAspect.value
  btn.style.width = `${targetWidth}px`
  btn.style.setProperty('--client-video-expanded-height', `${videoHeight}px`)
}

function applyClientVideoCollapsedSize() {
  const btn = clientVideoBtnRef.value
  if (!btn || !collapsedClientVideoWidth.value) return

  btn.style.width = `${collapsedClientVideoWidth.value}px`
  btn.style.removeProperty('--client-video-expanded-height')
}

function resetClientVideoState() {
  clearClientVideoTimers()
  clearClientVideoButtonStyles()
  collapsedClientVideoWidth.value = 0
  clientVideoOpen.value = false
  clientVideoExpanded.value = false
  clientVideoVisible.value = false
  clientVideoMounted.value = false
  clientVideoAnimating.value = false
}

function openClientVideo() {
  if (clientVideoMounted.value || clientVideoAnimating.value) return

  if (prefersReducedMotion.value) {
    clientVideoMounted.value = true
    clientVideoOpen.value = true
    clientVideoExpanded.value = true
    clientVideoVisible.value = true
    nextTick(() => applyClientVideoExpandedSize())
    return
  }

  clientVideoAnimating.value = true
  clientVideoMounted.value = true
  clientVideoOpen.value = true

  nextTick(() => {
    prepareClientVideoExpand()
    requestAnimationFrame(() => {
      clientVideoExpanded.value = true
      applyClientVideoExpandedSize()
      scheduleClientVideoExpandComplete()
    })
  })
}

function closeClientVideo() {
  if (!clientVideoMounted.value || clientVideoAnimating.value) return

  if (prefersReducedMotion.value) {
    resetClientVideoState()
    return
  }

  clientVideoAnimating.value = true

  if (clientVideoVisible.value) {
    clientVideoVisible.value = false
    scheduleClientVideoFadeComplete()
    return
  }

  clientVideoExpanded.value = false
  clientVideoOpen.value = false
  scheduleClientVideoExpandComplete()
}

function toggleClientVideo() {
  if (clientVideoMounted.value) {
    closeClientVideo()
    return
  }

  openClientVideo()
}

function onClientVideoPanelTransitionEnd(e) {
  if (e.target !== e.currentTarget || e.propertyName !== 'max-height') return

  if (
    clientVideoExpanded.value
    && clientVideoMounted.value
    && !clientVideoVisible.value
    && clientVideoOpen.value
  ) {
    clearClientVideoTimers()
    clientVideoVisible.value = true
    clientVideoAnimating.value = false
    return
  }

  if (!clientVideoExpanded.value && !clientVideoVisible.value) {
    applyClientVideoCollapsedSize()
    scheduleClientVideoExpandComplete()
  }
}

function onClientVideoWidthTransitionEnd(e) {
  const btn = clientVideoBtnRef.value
  if (!btn || e.target !== btn || e.propertyName !== 'width') return

  if (!clientVideoExpanded.value && !clientVideoVisible.value && clientVideoMounted.value) {
    clearClientVideoTimers()
    clearClientVideoButtonStyles()
    collapsedClientVideoWidth.value = 0
    clientVideoMounted.value = false
    clientVideoOpen.value = false
    clientVideoAnimating.value = false
  }
}

function onClientVideoFadeTransitionEnd(e) {
  if (e.target !== e.currentTarget || e.propertyName !== 'opacity') return

  if (!clientVideoVisible.value && clientVideoMounted.value && clientVideoExpanded.value) {
    clearClientVideoTimers()
    clientVideoExpanded.value = false
    clientVideoOpen.value = false
    scheduleClientVideoExpandComplete()
  }
}

watch(slug, () => {
  resetClientVideoState()
})

/** Sidebar accordions: one open on desktop with height animation; mobile = all open, no toggle (CSS). */
const ACCORDION_BREAKPOINT_MAX = 999

function accordionHasBlocks(arr) {
  return Array.isArray(arr) && arr.length > 0
}

/** First section in DOM order (Role → Play → Results) that has CMS content — stays open by default. */
function defaultAccordionSectionId(p) {
  if (!p) return null
  if (accordionHasBlocks(p.role)) return 'role'
  if (accordionHasBlocks(p.play)) return 'play'
  if (accordionHasBlocks(p.results) || accordionHasBlocks(p.resultsStats)) return 'results'
  return null
}

/**
 * Keep SSR and client hydration deterministic:
 * - default open section always derives from project data
 * - local state is only used after explicit user interaction
 */
const accordionOpenId = ref(null)

const effectiveAccordionOpenId = computed(() => {
  return accordionOpenId.value ?? defaultAccordionSectionId(project.value ?? null)
})

watch(
  () => project.value?._id,
  () => {
    accordionOpenId.value = null
  },
)

const isMobileAccordionViewport = ref(false)
const disableAccordionTransition = ref(false)

function syncAccordionViewport() {
  if (!import.meta.client) return
  isMobileAccordionViewport.value = window.matchMedia(
    `(max-width: ${ACCORDION_BREAKPOINT_MAX}px)`,
  ).matches
}

function accordionSectionOpen(id) {
  return effectiveAccordionOpenId.value === id
}

function accordionAriaExpanded(id) {
  if (isMobileAccordionViewport.value) return true
  return effectiveAccordionOpenId.value === id
}

function onAccordionToggle(id) {
  if (isMobileAccordionViewport.value) return
  const first = defaultAccordionSectionId(project.value ?? null)
  const openId = effectiveAccordionOpenId.value
  if (openId === id) {
    /** Keep at least one panel open on desktop — snap back to first section instead of closing all. */
    accordionOpenId.value = first ?? null
    return
  }
  accordionOpenId.value = id
}

const hasClientVideo = computed(() => {
  if (singlePortfolioClientVideoSettings.value.disableClientVideos) return false
  if (!project.value) return false
  if (clientVimeoId.value) return true
  return !!project.value.clientVideo?.asset?.url
})

const mainContentBlocks = computed(() => {
  return Array.isArray(project.value?.contentBlocks) ? project.value.contentBlocks : []
})

function shouldFadeMainBlock(index) {
  return index !== 0
}

function onVideoPopoverDismiss(e) {
  if (!clientVideoMounted.value || !clientVideoLaunchRef.value) return
  if (clientVideoLaunchRef.value.contains(e.target)) return
  closeClientVideo()
}

function onEscClose(e) {
  if (e.key === 'Escape' && clientVideoMounted.value) {
    closeClientVideo()
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

function videoMimeTypeFromUrl(url) {
  if (!url || typeof url !== 'string') return 'video/mp4'
  const lower = url.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
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
  if (wasMobile && !isMobileAccordionViewport.value) {
    disableAccordionTransition.value = true
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        disableAccordionTransition.value = false
      })
    })
  }
}

let removeAccordionMqListener = () => {}

onMounted(() => {
  if (import.meta.client) {
    prefersReducedMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
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
  clearClientVideoTimers()
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
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: var(--gutter);
  align-items: start;
  position: relative;
}

.portfolio-layout__sidebar {
  grid-column: span 2;
  min-width: 0;
  background-size: 100%;
}

.portfolio-sidebar-stack__body .sanity-blocks p {
  margin-bottom: calc(var(--gutter) / 1);
}

.portfolio-layout__main {
  grid-column: span 8;
  min-width: 0;
}


@media all and (min-width: 1000px) {
  .portfolio-layout__sidebar {
    /* rounded-portfolio sets overflow:hidden — that breaks position:sticky */
    overflow: visible;
    min-height: calc(100dvh - var(--header-height, 49px) - (var(--gutter) * 3));
    display: flex;
    flex-direction: column;
    position: sticky;
    top: calc(var(--header-height, 49px) + (var(--gutter) * 2));
  }

  .portfolio-layout__main {
    grid-column: span 6;
    min-width: 0;
  }
}


.portfolio-layout__main-mask {
  bottom:100%;
  width:100%;
  position:fixed;
  left:0;
  background:red;
  height:400px;
}


.portfolio-sidebar-stack {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gutter) * 2);
  min-height: 100%;
  flex:1;
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
  gap: calc(var(--gutter) * 1);
}

.portfolio-accordion {
  border: 0;
  display: grid;
}
@media all and (min-width: 1000px) {
  .portfolio-accordion {
    margin-top: calc(var(--gutter) / 2);
    opacity: 0.5;
    transition: opacity 0.38s cubic-bezier(0.33, 1, 0.68, 1);
  }

  .portfolio-accordion--open {
    opacity: 1;
  }
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
.portfolio-accordion-panel{
  padding-top: calc(var(--gutter) / 1.5);

  padding-bottom: calc(var(--gutter) / 1.5);
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

.portfolio-accordions--no-transition .portfolio-accordion-panel-outer,
.portfolio-accordions--no-transition .portfolio-accordion-panel,
.portfolio-accordions--no-transition .portfolio-accordion-panel-outer--open .portfolio-accordion-panel {
  transition: none !important;
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




.portfolio-video-launch {
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
}

.portfolio-hear-btn--launch {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  transition: width var(--client-video-expand-duration, 0.7s) cubic-bezier(0.34, 1.4, 0.64, 1);
}

.portfolio-hear-btn__toggle {
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  text-transform: inherit;
  transition: width var(--client-video-expand-duration, 0.7s) cubic-bezier(0.34, 1.4, 0.64, 1);
}

.portfolio-hear-btn__toggle:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
  border-radius: 4px;
}

.portfolio-hear-btn__row {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
  width: 100%;
}

.portfolio-hear-btn__row .orange-text {
  margin-left: auto;
}

.portfolio-hear-btn__video-panel {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  padding-bottom: 0;
  transition:
    max-height var(--client-video-expand-duration, 0.7s) cubic-bezier(0.34, 1.4, 0.64, 1),
    padding-bottom var(--client-video-expand-duration, 0.7s) cubic-bezier(0.34, 1.4, 0.64, 1);
}

.portfolio-hear-btn--expanded .portfolio-hear-btn__video-panel {
  max-height: var(--client-video-expanded-height, 60vh);
  padding-bottom: 2.1em;
  margin: 0 -4px;
  width: calc(100% + 8px);

}

.portfolio-hear-btn__video-inner {
  overflow: hidden;
  background: transparent;
}

.portfolio-hear-btn__video-media {
  position: relative;
  width: 100%;
  aspect-ratio: var(--client-video-aspect, 16 / 9);
  border-radius: 6px;
  overflow: hidden;
  opacity: 0;
  background: transparent;
  transition: opacity var(--client-video-fade-duration, 0.4s) ease;
}

.portfolio-hear-btn__video-media :deep(.plyr-player-wrap) {
  opacity: 1;
  transition: none;
}

.portfolio-hear-btn__video-media :deep(.plyr),
.portfolio-hear-btn__video-media :deep(.plyr__video-wrapper),
.portfolio-hear-btn__video-media :deep(video),
.portfolio-hear-btn__video-media :deep(iframe) {
  border-radius: 6px;
  background: transparent;
}

.portfolio-hear-btn--video-visible .portfolio-hear-btn__video-media {
  opacity: 1;
}

.portfolio-hear-btn--launch .portfolio-hear-arrow {
  transition: transform var(--client-video-expand-duration, 0.7s) cubic-bezier(0.34, 1.4, 0.64, 1);
}

.portfolio-hear-btn--expanded .portfolio-hear-arrow {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-hear-btn--launch,
  .portfolio-hear-btn__video-panel,
  .portfolio-hear-btn__video-media,
  .portfolio-hear-btn--launch .portfolio-hear-arrow {
    transition: none;
  }
}

@media all and (max-width: 999px) {
  .portfolio-sidebar-stack__footer {
    position: fixed;
    bottom: var(--gutter);
    right: var(--gutter);
    z-index: 100;
    left: var(--gutter);
    width: auto;
  }

  .portfolio-video-launch--expanded {
    width: 100%;
  }

  .portfolio-video-launch .subtitle--circle::before {
    display: none;
  }
}

.portfolio-video-block {
  width: 100%;
  min-width: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.portfolio-testimonial-quote {
  margin: 0;
  font-weight: normal;
}

@media (min-width: 1000px) {
  /* .portfolio-testimonial-block .subtitle {
    font-size: 200%;
  } */
}

.portfolio-services-columns {
  column-count: 2;
  column-gap: var(--gutter);
}


.portfolio-services-line {
  break-inside: avoid;
}

.portfolio-cards-block {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
}

.portfolio-cards-item {
  width: 100%;
}

.portfolio-cards-item__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--gutter);
  align-items: start;
}

.portfolio-cards-item__text {
  grid-column: span 4;
  min-width: 0;
}

.portfolio-cards-item__title {
  margin-top: 0;
}

.portfolio-cards-item__media {
  grid-column: span 8;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  position: relative;
}

.portfolio-cards-item__image,
.portfolio-cards-item__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

.portfolio-testimonial-attribution {
  display: flex;
  flex-direction: row;
  row-gap: calc(var(--gutter) * 0.5);
  column-gap: -1px;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  padding-top: 1rem;
}
.portfolio-testimonial-attribution > * {
  border: 1px solid currentColor;
  padding: .9rem 2.6rem;
  border-radius: 0.35rem;
  color: currentColor;
  background-color: transparent;
  transition: background-color 0.3s ease;
}
.portfolio-testimonial-attribution > *:first-child {
  border-radius:200px;
}
@media (min-width: 1000px) {
  .portfolio-testimonial-attribution {
    column-gap: -0.06em;
  }
  .portfolio-testimonial-attribution > * {
    border-width:0.06em;
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

.portfolio-next-project {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--gutter);
  flex-wrap: wrap;
}

.portfolio-next-project__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.portfolio-next-project__title {
  color: inherit;
  text-decoration: none;
  line-height: 1.05;
}
@media (max-width: 999px) {
  .portfolio-next-project {
    flex-direction: column;
    align-items: start;
  }
}

@media (max-width: 699px) {
  .portfolio-next-project__title {
    min-height: 2.1em;
  }
}

.portfolio-next-project__actions {
  display: flex;
  align-items: center;
  gap: calc(var(--gutter) * 0.5);
  flex-wrap: wrap;
}

.portfolio-next-project__actions .next--button {
  background-color: transparent;
  color: var(--black);
  border: 1px solid var(--black);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.portfolio-next-project__actions .next--button:hover,
.portfolio-next-project__actions .next--button:focus-visible {
  background-color: var(--white);
  border-color: var(--white);
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

.portfolio-two-column-image {
  height: 100%;
}

.portfolio-two-column-image > .portfolio-image-container {
  min-height: 100%;
  height: 100%;
}

@media (min-width: 1000px) {
  .portfolio-layout__sidebar {
    z-index: 1;
  }
  .portfolio-layout__sidebar .sticky-corner {
    width: var(--rounded-medium);
    height: var(--rounded-medium);
    background: var(--background-color);
    position: absolute;
    top: 0;
    left: calc(100% + var(--gutter));
    z-index: 1;
    -webkit-mask-image: radial-gradient(
      circle at 100% 100%,
      transparent calc(var(--rounded-medium) - 0.5px),
      #000 calc(var(--rounded-medium) - 0.5px)
    );
    mask-image: radial-gradient(
      circle at 100% 100%,
      transparent calc(var(--rounded-medium) - 0.5px),
      #000 calc(var(--rounded-medium) - 0.5px)
    );
  }

  .sticky-corner-portfolio-strip {
    width:100%;
    display:grid;
    gap: var(--gutter);
    grid-template-columns: repeat(8, minmax(0, 1fr));
    position: sticky;
    top: calc(var(--header-height) + calc(var(--gutter) * 2));
    left: 0;
    z-index: 1;
    height:1px;
  }
  .sticky-corner-portfolio-strip:after,
  .sticky-corner-portfolio-strip:before {
    content: '';
    display: block;
    width: var(--rounded-medium);
    height: var(--rounded-medium);
    background: var(--background-color);
    position: absolute;
    z-index: 1;
    top:0;
  }
  .sticky-corner-portfolio-strip:after {
    left:calc(calc(calc(100% / 8) * 2) - var(--gutter) - 10px);
  -webkit-mask-image: radial-gradient(
    circle at 0 100%,
    transparent calc(var(--rounded-medium) - 0.5px),
    #000 calc(var(--rounded-medium) - 0.5px)
  );
  mask-image: radial-gradient(
    circle at 0 100%,
    transparent calc(var(--rounded-medium) - 0.5px),
    #000 calc(var(--rounded-medium) - 0.5px)
  );
    
  }
  .sticky-corner-portfolio-strip:before {
    left:calc(calc(calc(100% / 8) * 2) + 5px);
    -webkit-mask-image: radial-gradient(
      circle at 100% 100%,
      transparent calc(var(--rounded-medium) - 0.5px),
      #000 calc(var(--rounded-medium) - 0.5px)
    );
    mask-image: radial-gradient(
      circle at 100% 100%,
      transparent calc(var(--rounded-medium) - 0.5px),
      #000 calc(var(--rounded-medium) - 0.5px)
    );
  }
  .portfolio-column-media--desktop-aspect {
    position: relative;
    width: 100%;
    align-self: start;
    aspect-ratio: var(--portfolio-col-aspect);
  }

  .portfolio-column-media--desktop-aspect > .portfolio-image-container,
  .portfolio-column-media--desktop-aspect > .portfolio-two-column-video-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    min-height: 100%;
    aspect-ratio: unset !important;
  }

  .portfolio-column-media--desktop-aspect .portfolio-image,
  .portfolio-column-media--desktop-aspect :deep(.portfolio-image),
  .portfolio-column-media--desktop-aspect :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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

  .portfolio-two-column-block,
  .portfolio-two-column-gallery-block {
    grid-template-columns: 1fr;
  }

  .portfolio-two-column-image,
  .portfolio-two-column-gallery-column {
    width: 100%;
    min-width: 0;
    height: auto;
  }

  .portfolio-two-column-image > .portfolio-image-container {
    width: 100%;
    height: auto;
    min-height: 0;
  }

  .portfolio-two-column-image :deep(.portfolio-two-column-video) {
    position: relative !important;
    inset: auto !important;
    top: auto !important;
    left: auto !important;
    display: block;
    width: 100% !important;
    max-width: 100%;
    height: auto !important;
    object-fit: unset;
  }
}

@media (max-width: 800px) {
  .portfolio-services-columns {
    column-count: 1;
  }

  .portfolio-cards-item__grid {
    grid-template-columns: 1fr;
  }

  .portfolio-cards-item__text,
  .portfolio-cards-item__media {
    grid-column: 1 / -1;
  }
}
</style>

