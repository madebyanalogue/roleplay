<template>
  <section
    v-if="section.mapAddress || section.mapEmbedUrl"
    class="map-section"
    :class="{ 'map-section--floating': isFloating, 'map-section--relative': !isFloating }"
  >
    <div class="map-section__map-wrap">
      <ClientOnly>
        <div
          v-if="apiKey && section.mapAddress"
          ref="mapEl"
          class="map-section__map"
        />
        <iframe
          v-else-if="section.mapEmbedUrl"
          :src="mapEmbedUrlWithOptions"
          class="map-section__map map-section__map--iframe"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Map"
        />
      </ClientOnly>
    </div>

    <div class="map-section__box">
      <div class="grid-1 gap-3">
        <div class="grid-1 gap-1">
          <div v-if="section.mapTitle" class="h4 fractul">
            {{ section.mapTitle }}
          </div>
          <p v-if="section.mapDescription" class="map-section__description">
            {{ section.mapDescription }}
          </p>
        </div>
        <div v-if="contactItems.length" class="contacts">
          <div
            v-for="(item, index) in contactItems"
            :key="item._key || index"
            class="map-section__contact"
          >
            <span class="contact-icon" :aria-hidden="true">
              <svg v-if="item.icon === 'phone'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <svg v-else-if="item.icon === 'email'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </span>
            <div class="contact-content subdued-link">
              <span v-if="item.title" class="contact-title">{{ item.title }}</span>
              <a
                v-if="item.url"
                :href="formatUrl(item.url, item.icon)"
                :target="isExternalUrl(item.url) ? '_blank' : undefined"
                :rel="isExternalUrl(item.url) ? 'noopener noreferrer' : undefined"
                class="contact-link"
              >
                {{ item.linkText || item.url }}
              </a>
              <span v-else class="contact-text">{{ item.linkText }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const config = useRuntimeConfig()
const apiKey = config.public?.googleMapsApiKey || ''
const mapEl = ref(null)

const contactItems = computed(() => props.section?.mapContactItems || [])

/** Floating = content overlays map. Relative = stacked below. Always relative on mobile. */
const isFloating = computed(() => props.section?.mapLayout !== 'relative')

const mapEmbedUrlWithOptions = computed(() => {
  const url = props.section?.mapEmbedUrl || ''
  if (!url) return ''
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}scrollwheel=0&gestureHandling=cooperative`
})

function formatUrl(url, icon) {
  if (!url) return '#'
  const u = url.trim()
  if (u.startsWith('tel:') || u.startsWith('mailto:') || u.startsWith('http')) return u
  if (icon === 'phone') return `tel:${u.replace(/\s/g, '')}`
  if (icon === 'email') return `mailto:${u}`
  if (icon === 'location') return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u)}`
  return u
}

function isExternalUrl(url) {
  if (!url || !url.startsWith('http')) return false
  if (import.meta.server) return true
  try {
    return !url.includes(window?.location?.hostname || '')
  } catch {
    return true
  }
}

onMounted(() => {
  if (import.meta.client && apiKey && mapEl.value && props.section?.mapAddress) {
    loadGoogleMap()
  }
})

function loadGoogleMap() {
  if (window.google?.maps) {
    initMap()
    return
  }
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
  script.async = true
  script.defer = true
  script.onload = initMap
  document.head.appendChild(script)
}

function initMap() {
  if (!mapEl.value || !window.google?.maps) return
  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ address: props.section.mapAddress }, (results, status) => {
    if (status !== 'OK' || !results?.[0]) return
    const map = new google.maps.Map(mapEl.value, {
      center: results[0].geometry.location,
      zoom: 15,
      scrollwheel: false,
      gestureHandling: 'cooperative',
      zoomControl: true,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })
    new google.maps.Marker({
      map,
      position: results[0].geometry.location,
      title: props.section.mapTitle || 'Location',
    })
  })
}
</script>

<style scoped>
.map-section {
  position: relative;
  overflow: hidden;
  background:url('/images/map.png') no-repeat center top / 100%;
}

/* Floating: map fills section, box overlays */
.map-section--floating {
  height:calc(var(--unit-grid) * 13);
}

/* Pin centred on (100vw/6)*4; map wider to cover left after transform */
.map-section--floating .map-section__map-wrap {
  position: absolute;
  left: 50%;
  transform: translateX(calc(-50% + (100vw / 6)));
  width: calc(100% + (100vw / 3));
  min-width: calc(100% + (100vw / 3));
  top: 0;
  bottom: 0;
}

.map-section--floating .map-section__box {
  z-index: 1;
  width: calc(var(--unit-grid) * 8);
  left: calc(var(--unit-grid) * 1);
  bottom: calc(var(--unit-grid) * 1);
  padding: var(--unit-grid);
  top: unset;
  position: absolute;
}

/* Relative: map and box side by side on desktop */
.map-section--relative {
  display: flex;
  flex-direction: row;
  min-height: 50vh;
}

.map-section--relative .map-section__map-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 360px;
}

.map-section--relative .map-section__box {
  position: relative;
  flex-shrink: 0;
}

/* Mobile: always stacked regardless of desktop setting (--mobile-breakpoint: 800) */
@media (max-width: 800px) {
  .map-section--floating {
    min-height: unset;
  }

  .map-section--floating .map-section__map-wrap {
    position: relative !important;
    aspect-ratio: 16 / 10;
    min-height: 280px;
  }

  .map-section--relative {
    flex-direction: column;
    min-height: unset;
  }

  .map-section .map-section__map-wrap {
    aspect-ratio: 16 / 10;
    min-height: 280px;
  }

  .map-section .map-section__box {
    max-width: none;
  }
}

.map-section__map {
  width: 100%;
  height: 100%;
  border: 0;
}

/* Map remains interactive for zoom controls; scrollwheel disabled via API/URL */

.map-section__box {
  background: var(--background-color);
}

.map-section__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--unit);
}

.map-section__contact {
  display: flex;
  align-items: flex-start;
}

.map-section__contact-icon {
  flex-shrink: 0;
  width: var(--unit-grid);
  aspect-ratio: 1 / 1;
  border: 1px solid currentColor;
  color: var(--red, #e44620);
}

.map-section__contact-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.map-section__contact-content {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.map-section__contact-title {
  font-size: 0.875em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(0, 0, 0, 0.6);
}

.map-section__contact-link,
.map-section__contact-text {
  font-size: 1em;
  line-height: 1.4;
  color: inherit;
}

.map-section__contact-link {
  text-decoration: none;
}

.map-section__contact-content.subdued-link .map-section__contact-link:hover {
  text-decoration: underline;
}

</style>
