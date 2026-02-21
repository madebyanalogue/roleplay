<template>
  <nav
    data-twostep-nav
    :data-nav-status="isActive ? 'active' : 'not-active'"
    :class="{ 'twostep-nav': true, 'is--transitioning': isMounted && isTransitioning }"
  >
    <div data-nav-toggle="close" class="twostep-nav__bg" @click="closeNav" />
    <div class="twostep-nav__wrap">
      <div class="twostep-nav__width">
        <div class="twostep-nav__bar header">
          <div class="twostep-nav__back">
            <div class="twostep-nav__back-bg" />
          </div>
          <div class="twostep-nav__top">
            <NuxtLink to="/" class="twostep-nav__logo">
              <Logo class="twostep-nav__logo-inner" />
            </NuxtLink>
            <ul class="twostep-nav__desktop-nav">
              <li
                v-for="item in desktopNavItems"
                :key="item._key || item.text"
                class="twostep-nav__desktop-li"
              >
                <NuxtLink
                  :to="getMenuItemUrl(item)"
                  :target="isExternalUrl(item.link?.url) ? '_blank' : undefined"
                  :rel="isExternalUrl(item.link?.url) ? 'noopener' : undefined"
                  class="twostep-nav__desktop-link h6"
                >
                  {{ item.text }}
                </NuxtLink>
              </li>
            </ul>
            <button
              type="button"
              data-nav-toggle="toggle"
              class="twostep-nav__toggle"
              aria-label="Toggle menu"
              @click="toggleNav"
            >
              <div class="twostep-nav__toggle-bar" />
              <div class="twostep-nav__toggle-bar" />
            </button>
            <div class="twostep-nav__top-line" />
          </div>
          <div class="twostep-nav__bottom">
            <div class="twostep-nav__bottom-overflow">
              <div class="twostep-nav__bottom-inner">
                <div class="twostep-nav__bottom-row">
                  <div class="twostep-nav__bottom-col">
                    <div class="twostep-nav__info">
                      <ul class="twostep-nav__ul">
                        <li
                          v-for="item in navItems"
                          :key="item._key || item.text"
                          class="twostep-nav__li"
                        >
                          <NuxtLink
                            :to="getMenuItemUrl(item)"
                            :target="isExternalUrl(item.link?.url) ? '_blank' : undefined"
                            :rel="isExternalUrl(item.link?.url) ? 'noopener' : undefined"
                            class="twostep-nav__link"
                            @click="closeNav"
                          >
                            <span class="twostep-nav__link-span">{{ item.text }}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                      <ul v-if="smallNavItems.length > 0" class="twostep-nav__ul is--small">
                        <li
                          v-for="item in smallNavItems"
                          :key="item._key || item.text"
                          class="twostep-nav__li"
                        >
                          <NuxtLink
                            :to="getMenuItemUrl(item)"
                            :target="isExternalUrl(getMenuItemUrl(item)) ? '_blank' : undefined"
                            :rel="isExternalUrl(getMenuItemUrl(item)) ? 'noopener' : undefined"
                            class="twostep-nav__link"
                            @click="closeNav"
                          >
                            <span class="twostep-nav__link-eyebrow">{{ item.text }}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="navImage" class="twostep-nav__bottom-col is--visual">
                    <div class="twostep-nav__visual">
                      <NuxtImg
                        :src="navImage"
                        alt=""
                        class="twostep-nav__visual-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Logo from '~/components/Logo.vue'
import { useSiteSettings } from '~/composables/useSiteSettings'
import { usePageTransition } from '~/composables/usePageTransition'

const { mainMenu, footerLinks, refreshBypassCache } = useSiteSettings()
const { isTransitioning } = usePageTransition()

const isActive = ref(false)
const isMounted = ref(false)

const navItems = computed(() => mainMenu.value?.items || [])

// Desktop nav: show all menu items (main + small) so nothing is hidden
const desktopNavItems = computed(() => {
  const items = mainMenu.value?.items || []
  const smallItems = mainMenu.value?.smallItems || []
  return [...items, ...smallItems]
})

// Bypass CDN cache when menu is empty (fixes menu not showing after selecting in Sanity - CDN may serve stale data)
onMounted(() => {
  if (!mainMenu.value?.items?.length && !mainMenu.value?.smallItems?.length) {
    refreshBypassCache()
  }
  isMounted.value = true
})

const smallNavItems = computed(() => mainMenu.value?.smallItems || [])

const navImage = computed(() => null)

const openNav = () => {
  isActive.value = true
}

const closeNav = () => {
  isActive.value = false
}

const toggleNav = () => {
  isActive.value = !isActive.value
}

const isExternalUrl = (url) => {
  if (!url) return false
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return true
  if (url.startsWith('mailto:') || url.startsWith('tel:')) return false
  return !url.startsWith('/') && !url.startsWith('#')
}

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
  return '#'
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && isActive.value) {
    closeNav()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1300;
  --background-color:#111;
  --text-color:#fff;
}

/* Above page transition overlay (1100) and entering page (1200) */
.twostep-nav {
  z-index: 1300;
  pointer-events: none;
  position: fixed;
  inset: 0;
}

/* Disable nav interactions during page transition */
.twostep-nav.is--transitioning .twostep-nav__logo,
.twostep-nav.is--transitioning .twostep-nav__desktop-link,
.twostep-nav.is--transitioning .twostep-nav__link,
.twostep-nav.is--transitioning .twostep-nav__toggle {
  pointer-events: none;
  cursor: not-allowed;
}

.twostep-nav__bg {
  z-index: 0;
  opacity: 0;
  pointer-events: auto;
  visibility: hidden;
  background-color: rgb(0 0 0 / 30%);
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  cursor: pointer;
}

.twostep-nav__wrap {
  justify-content: center;
  align-items: stretch;
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.twostep-nav__width {
  flex-flow: column;
  flex: none;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 48em;
  padding-top: 1.25em;
  padding-left: 1.25em;
  padding-right: 1.25em;
  display: flex;
}

.twostep-nav__bar {
  pointer-events: auto;
  color: var(--text-color);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}



.twostep-nav__back {
  z-index: 0;
  position: absolute;
  inset: 0;
}

.twostep-nav__top {
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 11px 6px 20px;
  display: flex;
  position: relative;
  gap:50px;
  background-color: var(--background-color);
}

@media all and (min-width:768px) {
  .twostep-nav__top {
   padding: 15px 28px 15px 22px;
  }
}

.twostep-nav__bottom {
  grid-template-rows: 0fr;
  width: 100%;
  display: grid;
  position: relative;
  overflow: hidden;
}

.twostep-nav__logo {
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  display: flex;
  text-decoration: none;
  color: inherit;
}

.twostep-nav__logo-inner {
  height: 100%;
  font-size: 1.5em;
}

.twostep-nav__back-bg {
  background-color: var(--background-color);
  border: 1px solid currentColor;
  border-radius: 0.5em;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.twostep-nav__toggle {
  pointer-events: auto;
  cursor: pointer;
  background: none;
  border: none;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  padding: 0;
  display: flex;
  position: relative;
  color: inherit;
}

.twostep-nav__toggle-bar {
  background-color: currentColor;
  width: 1.875em;
  height: 0.125em;
  position: absolute;
}

.twostep-nav__bottom-overflow {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}

.twostep-nav__bottom-inner {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1.5em;
  display: flex;
  position: relative;
}

.twostep-nav__bottom-row {
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  display: flex;
}

.twostep-nav__bottom-col {
  flex: 1;
  min-height: 100%;
  display: flex;
}

.twostep-nav__ul {
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}

.twostep-nav__ul.is--small {
  gap: 0.25em 1em;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.twostep-nav__link {
  color: inherit;
  width: 100%;
  padding-top: 0.375em;
  padding-bottom: 0.375em;
  text-decoration: none;
  position: relative;
}

.twostep-nav__link-span {
  letter-spacing: -0.04em;
  font-family: var(--font-family);
  font-size: 2.125em;
  font-weight: 400;
  line-height: 1;
}

.twostep-nav__visual {
  aspect-ratio: 1;
  border-radius: 0.375em;
  width: 100%;
  overflow: hidden;
}

.twostep-nav__visual-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.twostep-nav__info {
  gap: 2em;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  display: flex;
}

.twostep-nav__link-eyebrow {
  opacity: 0.7;
  letter-spacing: -0.02em;
  font-family: var(--font-family);
  font-size: 1em;
  font-weight: 400;
  line-height: 1;
}

.twostep-nav__top-line {
  z-index: 2;
  background-color: rgb(0 0 0 / 10%);
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0.5em;
  right: 0.5em;
}

/* Desktop nav - hidden on mobile */
.twostep-nav__desktop-nav {
  display: none;
  margin: 0;
  padding: 0;
  list-style: none;
}

.twostep-nav__desktop-li {
  display: inline-block;
}

.twostep-nav__desktop-link {
  color: inherit;
  text-decoration: none;
  display: block;
  transition: color var(--animation-default);
}

.twostep-nav__desktop-link:hover {
  color: var(--red);
}

/* Animation variables */
.twostep-nav {
  --cubic-default: cubic-bezier(0.625, 0.05, 0, 1);
  --animation-ease: 0.2s ease;
  --duration-default: 0.5s;
  --duration-default-long: 0.75s;
  --duration-default-half: 0.25s;
  --animation-default: var(--duration-default) var(--cubic-default);
  --animation-default-long: var(--duration-default-long) var(--cubic-default);
  --animation-default-half: var(--duration-default-half) var(--cubic-default);
}

/* Menu button */
.twostep-nav__toggle-bar {
  transition: transform var(--animation-default);
  transform: translateY(-0.25em) rotate(0.001deg);
}

.twostep-nav__toggle:hover .twostep-nav__toggle-bar {
  transform: translateY(0.25em) rotate(0.001deg);
}

.twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(0.15em) rotate(0.001deg);
}

.twostep-nav__toggle:hover .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(-0.15em) rotate(0.001deg);
}

.twostep-nav[data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar {
  transform: translateY(0) rotate(45deg);
}

.twostep-nav[data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(0) rotate(-45deg);
}

/* Page dark overlay */
.twostep-nav__bg {
  transition: opacity var(--animation-default), visibility var(--animation-default);
}

.twostep-nav[data-nav-status="active"] .twostep-nav__bg {
  opacity: 1;
  visibility: visible;
}

/* Inner bar grow */
.twostep-nav__bar {
  transition: max-width var(--animation-default-long) 0.2s;
}

.twostep-nav[data-nav-status="active"] .twostep-nav__bar {
  transition: max-width var(--animation-default) 0s;
  max-width: 100%;
}

/* Thin line in nav bar */
.twostep-nav__top-line {
  transition: all var(--animation-default) 0s;
  opacity: 0;
}

.twostep-nav[data-nav-status="active"] .twostep-nav__top-line {
  transition: all var(--animation-default) 0.1s;
  opacity: 1;
}

/* Nav bar background */
.twostep-nav__back {
  transition: all var(--animation-default);
  inset: 0;
}

.twostep-nav[data-nav-status="active"] .twostep-nav__back {
  inset: -0.25em;
}

/* Nav bottom */
.twostep-nav__bottom {
  transition: grid-template-rows var(--animation-default) 0s;
}

.twostep-nav[data-nav-status="active"] .twostep-nav__bottom {
  transition: grid-template-rows var(--animation-default-long) 0.25s;
  grid-template-rows: 1fr;
}

/* Nav columns reveal */
.twostep-nav__bottom-row > * {
  transition: all var(--animation-default) 0s;
  transform: translateY(2em);
  opacity: 0;
}

.twostep-nav__bottom-row > *:nth-child(2) {
  transition-delay: 0.075s;
}

.twostep-nav[data-nav-status="active"] .twostep-nav__bottom-row > * {
  transition: all var(--animation-default-long) 0.5s;
  transform: translateY(0);
  opacity: 1;
}

.twostep-nav[data-nav-status="active"] .twostep-nav__bottom-row > *:nth-child(2) {
  transition-delay: 0.575s;
}

@media (min-width: 768px) {
  .twostep-nav__desktop-nav {
    display: flex;
    gap: 23px;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }

  .twostep-nav__toggle {
    display: none;
  }

}

@media (max-width: 767px) {
  .twostep-nav__bottom-col.is--visual {
    display: none;
  }

  .twostep-nav__top-line {
    bottom: -0.5em;
    left: 1em;
    right: 1em;
  }

  .twostep-nav[data-nav-status="active"] .twostep-nav__top-line {
    inset: auto 0 -0.5em;
  }

  .twostep-nav[data-nav-status="active"] .twostep-nav__back {
    inset: -1.25em;
  }

  .twostep-nav__bottom {
    transition: grid-template-rows var(--animation-default) 0s, transform var(--animation-default) 0s;
    transform: translateY(-0.625em);
  }

  .twostep-nav[data-nav-status="active"] .twostep-nav__bottom {
    transition: grid-template-rows var(--animation-default-long) 0.25s, transform var(--animation-default) 0.25s;
    transform: translateY(0);
  }
}
</style>
