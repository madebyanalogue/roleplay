
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'Footer': typeof import("../../components/Footer.vue").default
  'Header': typeof import("../../components/Header.vue").default
  'Logo': typeof import("../../components/Logo.vue").default
  'PageSectionAutoscrollGallery': typeof import("../../components/PageSectionAutoscrollGallery.vue").default
  'PageSectionCards': typeof import("../../components/PageSectionCards.vue").default
  'PageSectionClients': typeof import("../../components/PageSectionClients.vue").default
  'PageSectionContact': typeof import("../../components/PageSectionContact.vue").default
  'PageSectionFeaturedProjects': typeof import("../../components/PageSectionFeaturedProjects.vue").default
  'PageSectionHeroCarousel': typeof import("../../components/PageSectionHeroCarousel.vue").default
  'PageSectionInfo': typeof import("../../components/PageSectionInfo.vue").default
  'PageSectionKineticTypography': typeof import("../../components/PageSectionKineticTypography.vue").default
  'PageSectionLogoMarquee': typeof import("../../components/PageSectionLogoMarquee.vue").default
  'PageSectionLogoWall': typeof import("../../components/PageSectionLogoWall.vue").default
  'PageSectionNews': typeof import("../../components/PageSectionNews.vue").default
  'PageSectionPortfolio': typeof import("../../components/PageSectionPortfolio.vue").default
  'PageSectionServices': typeof import("../../components/PageSectionServices.vue").default
  'PageSectionSpotifyPlayer': typeof import("../../components/PageSectionSpotifyPlayer.vue").default
  'PageSectionStackingCards': typeof import("../../components/PageSectionStackingCards.vue").default
  'PageSectionTeam': typeof import("../../components/PageSectionTeam.vue").default
  'PageSectionText': typeof import("../../components/PageSectionText.vue").default
  'PlyrPlayer': typeof import("../../components/PlyrPlayer.vue").default
  'PortfolioGallery': typeof import("../../components/PortfolioGallery.vue").default
  'PortfolioStats': typeof import("../../components/PortfolioStats.vue").default
  'PortfolioStatsProject': typeof import("../../components/PortfolioStatsProject.vue").default
  'PortfolioThumbnailMedia': typeof import("../../components/PortfolioThumbnailMedia.vue").default
  'PortfolioTwoColumnCell': typeof import("../../components/PortfolioTwoColumnCell.vue").default
  'PortfolioVideoBlock': typeof import("../../components/PortfolioVideoBlock.vue").default
  'Preloader': typeof import("../../components/Preloader.vue").default
  'SanityBlock': typeof import("../../components/SanityBlock.vue").default
  'SanityBlocks': typeof import("../../components/SanityBlocks.vue").default
  'SectionIntroText': typeof import("../../components/SectionIntroText.vue").default
  'SanityContent': typeof import("../../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-content").default
  'SanityFile': typeof import("../../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-file").default
  'SanityImage': typeof import("../../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-image").default
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only").default
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
  'NuxtImg': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default
  'NuxtPicture': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default
  'LazyFooter': LazyComponent<typeof import("../../components/Footer.vue").default>
  'LazyHeader': LazyComponent<typeof import("../../components/Header.vue").default>
  'LazyLogo': LazyComponent<typeof import("../../components/Logo.vue").default>
  'LazyPageSectionAutoscrollGallery': LazyComponent<typeof import("../../components/PageSectionAutoscrollGallery.vue").default>
  'LazyPageSectionCards': LazyComponent<typeof import("../../components/PageSectionCards.vue").default>
  'LazyPageSectionClients': LazyComponent<typeof import("../../components/PageSectionClients.vue").default>
  'LazyPageSectionContact': LazyComponent<typeof import("../../components/PageSectionContact.vue").default>
  'LazyPageSectionFeaturedProjects': LazyComponent<typeof import("../../components/PageSectionFeaturedProjects.vue").default>
  'LazyPageSectionHeroCarousel': LazyComponent<typeof import("../../components/PageSectionHeroCarousel.vue").default>
  'LazyPageSectionInfo': LazyComponent<typeof import("../../components/PageSectionInfo.vue").default>
  'LazyPageSectionKineticTypography': LazyComponent<typeof import("../../components/PageSectionKineticTypography.vue").default>
  'LazyPageSectionLogoMarquee': LazyComponent<typeof import("../../components/PageSectionLogoMarquee.vue").default>
  'LazyPageSectionLogoWall': LazyComponent<typeof import("../../components/PageSectionLogoWall.vue").default>
  'LazyPageSectionNews': LazyComponent<typeof import("../../components/PageSectionNews.vue").default>
  'LazyPageSectionPortfolio': LazyComponent<typeof import("../../components/PageSectionPortfolio.vue").default>
  'LazyPageSectionServices': LazyComponent<typeof import("../../components/PageSectionServices.vue").default>
  'LazyPageSectionSpotifyPlayer': LazyComponent<typeof import("../../components/PageSectionSpotifyPlayer.vue").default>
  'LazyPageSectionStackingCards': LazyComponent<typeof import("../../components/PageSectionStackingCards.vue").default>
  'LazyPageSectionTeam': LazyComponent<typeof import("../../components/PageSectionTeam.vue").default>
  'LazyPageSectionText': LazyComponent<typeof import("../../components/PageSectionText.vue").default>
  'LazyPlyrPlayer': LazyComponent<typeof import("../../components/PlyrPlayer.vue").default>
  'LazyPortfolioGallery': LazyComponent<typeof import("../../components/PortfolioGallery.vue").default>
  'LazyPortfolioStats': LazyComponent<typeof import("../../components/PortfolioStats.vue").default>
  'LazyPortfolioStatsProject': LazyComponent<typeof import("../../components/PortfolioStatsProject.vue").default>
  'LazyPortfolioThumbnailMedia': LazyComponent<typeof import("../../components/PortfolioThumbnailMedia.vue").default>
  'LazyPortfolioTwoColumnCell': LazyComponent<typeof import("../../components/PortfolioTwoColumnCell.vue").default>
  'LazyPortfolioVideoBlock': LazyComponent<typeof import("../../components/PortfolioVideoBlock.vue").default>
  'LazyPreloader': LazyComponent<typeof import("../../components/Preloader.vue").default>
  'LazySanityBlock': LazyComponent<typeof import("../../components/SanityBlock.vue").default>
  'LazySanityBlocks': LazyComponent<typeof import("../../components/SanityBlocks.vue").default>
  'LazySectionIntroText': LazyComponent<typeof import("../../components/SectionIntroText.vue").default>
  'LazySanityContent': LazyComponent<typeof import("../../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-content").default>
  'LazySanityFile': LazyComponent<typeof import("../../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-file").default>
  'LazySanityImage': LazyComponent<typeof import("../../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-image").default>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only").default>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
