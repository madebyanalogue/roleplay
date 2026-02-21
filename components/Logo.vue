<template>
  <div class="logo">
    <div
      v-if="logoSvg"
      class="logo-svg"
      v-html="logoSvg"
    />
    <NuxtImg
      v-else-if="logoUrl"
      :src="logoUrl"
      alt=""
      class="logo-img"
    />
    <span v-else class="logo-fallback">Registix</span>
  </div>
</template>

<script setup>
import { useSiteSettings } from '~/composables/useSiteSettings'
import { useSanityImage } from '~/composables/useSanityImage'

const { logo, logoSvg, refreshBypassCache } = useSiteSettings()
const { getImageSrc } = useSanityImage()

const logoUrl = computed(() => getImageSrc(logo.value))

// Bypass CDN cache when showing fallback (logo may have been added in Sanity)
onMounted(() => {
  if (!logoSvg.value && !logoUrl.value) {
    refreshBypassCache()
  }
})
</script>

<style scoped>
.logo {
  color: currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  height: 100%;
}

.logo-svg {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}



.logo-svg :deep(svg) {
  height: 100%;
  width: auto;
  fill: currentColor;
  display: block;
}

.logo-img {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.logo .logo-fallback {
  font-family: var(--logo-font-family);
  font-size: var(--font-size-logo);
}
</style>

