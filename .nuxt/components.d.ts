
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


export const Footer: typeof import("../components/Footer.vue").default
export const Header: typeof import("../components/Header.vue").default
export const Logo: typeof import("../components/Logo.vue").default
export const LottieAnimation: typeof import("../components/LottieAnimation.vue").default
export const PageSectionAutoscrollGallery: typeof import("../components/PageSectionAutoscrollGallery.vue").default
export const PageSectionCards: typeof import("../components/PageSectionCards.vue").default
export const PageSectionClients: typeof import("../components/PageSectionClients.vue").default
export const PageSectionContact: typeof import("../components/PageSectionContact.vue").default
export const PageSectionFeaturedProjects: typeof import("../components/PageSectionFeaturedProjects.vue").default
export const PageSectionHeroCarousel: typeof import("../components/PageSectionHeroCarousel.vue").default
export const PageSectionInfo: typeof import("../components/PageSectionInfo.vue").default
export const PageSectionKineticTypography: typeof import("../components/PageSectionKineticTypography.vue").default
export const PageSectionLogoMarquee: typeof import("../components/PageSectionLogoMarquee.vue").default
export const PageSectionLogoWall: typeof import("../components/PageSectionLogoWall.vue").default
export const PageSectionNews: typeof import("../components/PageSectionNews.vue").default
export const PageSectionPortfolio: typeof import("../components/PageSectionPortfolio.vue").default
export const PageSectionServices: typeof import("../components/PageSectionServices.vue").default
export const PageSectionSpotifyPlayer: typeof import("../components/PageSectionSpotifyPlayer.vue").default
export const PageSectionStackingCards: typeof import("../components/PageSectionStackingCards.vue").default
export const PageSectionTeam: typeof import("../components/PageSectionTeam.vue").default
export const PageSectionText: typeof import("../components/PageSectionText.vue").default
export const PlyrPlayer: typeof import("../components/PlyrPlayer.vue").default
export const PortfolioGallery: typeof import("../components/PortfolioGallery.vue").default
export const PortfolioStats: typeof import("../components/PortfolioStats.vue").default
export const PortfolioStatsProject: typeof import("../components/PortfolioStatsProject.vue").default
export const PortfolioThumbnailMedia: typeof import("../components/PortfolioThumbnailMedia.vue").default
export const PortfolioTwoColumnCell: typeof import("../components/PortfolioTwoColumnCell.vue").default
export const PortfolioVideoBlock: typeof import("../components/PortfolioVideoBlock.vue").default
export const Preloader: typeof import("../components/Preloader.vue").default
export const SanityBlock: typeof import("../components/SanityBlock.vue").default
export const SanityBlocks: typeof import("../components/SanityBlocks.vue").default
export const SectionIntroText: typeof import("../components/SectionIntroText.vue").default
export const SanityContent: typeof import("../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-content").default
export const SanityFile: typeof import("../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-file").default
export const SanityImage: typeof import("../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-image").default
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only").default
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only").default
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page").default
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components").Link
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components").Base
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components").Title
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components").Style
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components").Head
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components").Html
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components").Body
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default
export const LazyFooter: LazyComponent<typeof import("../components/Footer.vue").default>
export const LazyHeader: LazyComponent<typeof import("../components/Header.vue").default>
export const LazyLogo: LazyComponent<typeof import("../components/Logo.vue").default>
export const LazyLottieAnimation: LazyComponent<typeof import("../components/LottieAnimation.vue").default>
export const LazyPageSectionAutoscrollGallery: LazyComponent<typeof import("../components/PageSectionAutoscrollGallery.vue").default>
export const LazyPageSectionCards: LazyComponent<typeof import("../components/PageSectionCards.vue").default>
export const LazyPageSectionClients: LazyComponent<typeof import("../components/PageSectionClients.vue").default>
export const LazyPageSectionContact: LazyComponent<typeof import("../components/PageSectionContact.vue").default>
export const LazyPageSectionFeaturedProjects: LazyComponent<typeof import("../components/PageSectionFeaturedProjects.vue").default>
export const LazyPageSectionHeroCarousel: LazyComponent<typeof import("../components/PageSectionHeroCarousel.vue").default>
export const LazyPageSectionInfo: LazyComponent<typeof import("../components/PageSectionInfo.vue").default>
export const LazyPageSectionKineticTypography: LazyComponent<typeof import("../components/PageSectionKineticTypography.vue").default>
export const LazyPageSectionLogoMarquee: LazyComponent<typeof import("../components/PageSectionLogoMarquee.vue").default>
export const LazyPageSectionLogoWall: LazyComponent<typeof import("../components/PageSectionLogoWall.vue").default>
export const LazyPageSectionNews: LazyComponent<typeof import("../components/PageSectionNews.vue").default>
export const LazyPageSectionPortfolio: LazyComponent<typeof import("../components/PageSectionPortfolio.vue").default>
export const LazyPageSectionServices: LazyComponent<typeof import("../components/PageSectionServices.vue").default>
export const LazyPageSectionSpotifyPlayer: LazyComponent<typeof import("../components/PageSectionSpotifyPlayer.vue").default>
export const LazyPageSectionStackingCards: LazyComponent<typeof import("../components/PageSectionStackingCards.vue").default>
export const LazyPageSectionTeam: LazyComponent<typeof import("../components/PageSectionTeam.vue").default>
export const LazyPageSectionText: LazyComponent<typeof import("../components/PageSectionText.vue").default>
export const LazyPlyrPlayer: LazyComponent<typeof import("../components/PlyrPlayer.vue").default>
export const LazyPortfolioGallery: LazyComponent<typeof import("../components/PortfolioGallery.vue").default>
export const LazyPortfolioStats: LazyComponent<typeof import("../components/PortfolioStats.vue").default>
export const LazyPortfolioStatsProject: LazyComponent<typeof import("../components/PortfolioStatsProject.vue").default>
export const LazyPortfolioThumbnailMedia: LazyComponent<typeof import("../components/PortfolioThumbnailMedia.vue").default>
export const LazyPortfolioTwoColumnCell: LazyComponent<typeof import("../components/PortfolioTwoColumnCell.vue").default>
export const LazyPortfolioVideoBlock: LazyComponent<typeof import("../components/PortfolioVideoBlock.vue").default>
export const LazyPreloader: LazyComponent<typeof import("../components/Preloader.vue").default>
export const LazySanityBlock: LazyComponent<typeof import("../components/SanityBlock.vue").default>
export const LazySanityBlocks: LazyComponent<typeof import("../components/SanityBlocks.vue").default>
export const LazySectionIntroText: LazyComponent<typeof import("../components/SectionIntroText.vue").default>
export const LazySanityContent: LazyComponent<typeof import("../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-content").default>
export const LazySanityFile: LazyComponent<typeof import("../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-file").default>
export const LazySanityImage: LazyComponent<typeof import("../node_modules/@nuxtjs/sanity/dist/runtime/components/sanity-image").default>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only").default>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only").default>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page").default>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Link>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Base>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Title>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Style>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Head>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Html>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Body>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default>

export const componentNames: string[]
