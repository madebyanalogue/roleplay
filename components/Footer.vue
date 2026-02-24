<template>
  <div data-footer-parallax class="footer__wrap">
    <footer data-footer-parallax-inner class="footer wrapper-padding">
      <MatrixGrid color="white" :gap="20" :opacity="0.06" :spotlight-opacity="0.2" class="footer-matrix" />
      <div class="footer-content subdued-link inverted">
        
        <div class="flex-1 grid-1 grid-md-2 gap-1">
          <div class="footer-icon-svg">
            <svg id="b" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" width="1290" height="1340" viewBox="0 0 129 134">
              <polygon points="74.61 24.78 76.83 15.92 86.08 12.72 76.27 10.34 73.06 .09 70.68 10.77 61.39 14.26 71.36 16.42 74.61 24.78"/>
              <path d="M112.99,62.68l4.92,3.99,2.99,2.99,1.73,5.38,1.87,1.14,3.45-2.34-1.92-9.28-1.65-7.99-.88-4.28.64-1.56,4.36-.67-9.42-6.05-16.42-4.18-8.68,1.94,6.91-3.18-1.68-2.69-3.62-7.17,5.27,2.52,6.38-2.49,5.45-4.35,7.32-1.1,1.43-3.61-1.6-3.86h-21.74l-1.42-.77-.22-4.24-7.62,7.69-8.84,20.77,3.35,5.56-3.64-4.07-10.98-6.7-10.13-4.65,1.41,4.21-1.48,3.04-16.54,10.31.56,3.95,2.44,1.06,8.43-1.24,6.84,1.34,6.23-2.02,1.69-4.33,2.88,17.33,8.5-.29-23.84,3.5,1.18.03-19.76.18-5.68.47-4.75,2.43-10.89-17.24L.5,58.12l5.63,21.29,9.67,4.22,5.54,4.04.29-2.02-8.53-9.98-.08-8.46,4.06-2.1,7.88,7.93-3.84,21.43-4.31,6.02-7.44,13.99-3.39,6.85-1.73,4.52s2.95,1.37,3.14,1.42c0,0,0,0,0,0-.64,1.49-1.74,4.4-1.74,4.4l-.5,2.27h12.11l-.05-3.92-.95-2.63-2.8-2.78-.03-3.96,6.2-9.51,14.53-5.57-8.84,5.68-4.66,9.88-1.06,3.85,3.13,1.72-.69,1.25-.97,3.98h0s-.13,2.01-.13,2.01h12.39l-.28-3.27-1.36-3.11-4.11-3.75.02-3.84,5.77-7.73,14.26-4.64,9.32-7.34-11.36,1.86,11.53-3.29,29.06,2.76,2.16,2.01-10.12,21.6,2.82,2.02-1.4,6.14s.52.51.52.55h12.26l-1.83-7.21s-2.95-3.02-4.16-4.41c-.05,0,4.52-8.39,4.52-8.39l7.71-12.53,13.64-8.22,5.37,3.49-.82,2.99-.8,2.92s-4.17.57-4.57.72v9.75h.01c.51-.24,6.33-2.08,7.15-2.37.13-.29.88-2.41,1.01-3.09.01-.05,3.01-4.69,3.01-4.69l2.14-9.7-7.15-6.33-8.61-.41-6.47,5.59,5.21-5.61,2.21-6.15-1.93-12.89h.06s-.15-.6-.15-.6l-.14-.93h-.09l-.97-3.89,1.32-5.52,2.75-4.48-1.43,4.96,3.58,5.75Z"/>
            </svg>
          </div>
          <div v-if="footerMenus && footerMenus.length > 0" class="footer-menus">
            <div class="grid-1 grid-md-2 gap-1" style="row-gap:80px;">
              <div
                v-for="(item, index) in footerMenus"
                :key="item._key || index"
                class="footer-menu-item flex flex-col gap-1"
              >
                <h3 v-if="item.title" class="footer-menu-title h6 subdued">{{ item.title }}</h3>
                <nav v-if="item.sourceType === 'menu' && item.menu" class="footer-menu-nav h5 line-height-13">
                  <div>
                  <template v-for="(link, i) in (item.menu.items || [])" :key="i">
                    <div><NuxtLink
                      v-if="getMenuItemUrl(link)"
                      :to="getMenuItemUrl(link)"
                      :target="isExternalUrl(getMenuItemUrl(link)) ? '_blank' : undefined"
                      :rel="isExternalUrl(getMenuItemUrl(link)) ? 'noopener' : undefined"
                      class="footer-menu-link"
                    >
                      {{ link.text }}
                    </NuxtLink>
                    </div>
                  </template>
                  </div>
                  <template v-for="(link, i) in (item.menu.smallItems || [])" :key="`small-${i}`">
                    <div class="h4 line-height-135">
                      <NuxtLink
                        v-if="getMenuItemUrl(link)"
                        :to="getMenuItemUrl(link)"
                        :target="isExternalUrl(getMenuItemUrl(link)) ? '_blank' : undefined"
                        :rel="isExternalUrl(getMenuItemUrl(link)) ? 'noopener' : undefined"
                        class="footer-menu-link footer-menu-link--small"
                      >
                        {{ link.text }}
                      </NuxtLink>
                    </div>
                  </template>
                </nav>
                <div v-else-if="(item.sourceType === 'richText' || !item.sourceType) && item.content && item.content.length > 0" class="footer-menu-content h5 line-height-13">
                  <NuxtLink
                    v-if="getContentLinkUrl(item.link)"
                    :to="getContentLinkUrl(item.link)"
                    :target="isExternalUrl(getContentLinkUrl(item.link)) ? '_blank' : undefined"
                    :rel="isExternalUrl(getContentLinkUrl(item.link)) ? 'noopener' : undefined"
                    class="footer-menu-content-link"
                  >
                    <SanityBlocks :blocks="item.content" />
                  </NuxtLink>
                  <SanityBlocks v-else :blocks="item.content" class="subdued"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- <div class="footer-copyright h7 subdued">
          {{ copyright }}
        </div> -->
        <div class="footer-copyright h7 subdued" style="border-top:1px solid #444;padding-top:60px;">
        </div>


        <!-- <div class="footer-brand">
          <Logo class="footer-logo" />
        </div> -->
        
      </div>
      <div class="top-right"><div class="triangle triangle--top-left"></div></div>
    </footer>
    <div data-footer-parallax-dark class="footer__dark" aria-hidden="true" />
  </div>
</template>

<script setup>
import { useSiteSettings } from '~/composables/useSiteSettings'

const { footerMenus, copyright } = useSiteSettings()

const getMenuItemUrl = (item) => {
  if (item.link?.type === 'page' && item.link?.page?.slug?.current) {
    return `/${item.link.page.slug.current}`
  }
  if (item.link?.type === 'knowledge') {
    return '/knowledge'
  }
  if (item.link?.url) {
    return item.link.url
  }
  return null
}

const getContentLinkUrl = (link) => {
  if (!link) return null
  if (link.type === 'page' && link.page?.slug?.current) {
    return `/${link.page.slug.current}`
  }
  if (link.url) {
    return link.url
  }
  return null
}

const isExternalUrl = (url) => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}

const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
</script>

<style scoped>
.footer__wrap {
  position: relative;
  background:var(--black);
}

.footer-icon-svg {
  
}
.footer-icon-svg svg {
  display: block;
  height: auto;
}
.footer-icon-svg svg > * {
  fill:currentColor;
}
.footer-brand {
  position:relative;
}
.footer-brand:after {
  background: linear-gradient(359deg,rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 120%;
  content: '';
}

.footer-full-logo {
  display: grid;
  align-items: start;
  grid-template-columns: 0.5fr 0.2fr 4fr;
  max-width: 400px;
}
.footer-full-logo svg, .footer-full-logo .logo, .footer-full-logo .logo svg {
  width: 100%;
  max-width: 100%;
  height: auto;
}
.footer {
  position: relative;
  /* min-height: 100svh; */
  display: flex;
  padding-top:100px;
  flex-direction: column;
}


.footer-icon-svg svg {
  width: 100%;
  max-width: 120px;
  /* opacity: 0; */
}

.footer__dark {
  position: absolute;
  inset: 0;
  background: #000;
  pointer-events: none;
  z-index: 1;
}

.footer-matrix {
  z-index: 2;
}

.footer-content {
  position: relative;
  z-index: 3;
  pointer-events: none;
  flex: 1;
  gap: 50px;
  display: flex;
  height: 100%;
  flex-direction: column;
}

.flex-1 {
  flex: 1;
}

.footer-content a,
.footer-content button {
  pointer-events: auto;
}

.footer-menus {
  padding-top:30px;
  
}

.footer-menu-item {
  /* Ready for your styling */
}

.footer-menu-title {
  /* Ready for your styling */
}

.footer-menu-content {
  /* Ready for your styling */
}

.footer-menu-content-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.footer-brand, .footer-logo, .footer-logo .logo-svg, .footer-logo.logo-svg svg {
  width: 100%;
}


.footer-copyright {
  /* Ready for your styling */
}
</style>
