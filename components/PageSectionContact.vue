<template>
  <section class="contact-section grid gap-30">
    <div class="contact-section__panel rounded-medium pad-50 pad-md-50">
      <div class="contact-section__columns">
        <div class="contact-section__column contact-section__column--left">
          <h2
            v-if="displayTitle"
            class="contact-section__title fluid-type line-height-1"
            style="--desktop: 72; --mobile: 40;"
          >
            {{ displayTitle }}
          </h2>

          <div v-if="contacts.length" class="contact-information-list grid gap-50">
            <div
              v-for="row in contacts"
              :key="row._key"
              class="contact-information-item gap-20"
            >
              <div
                class="contact-information-item-title subtitle subtitle--circle"
                :style="dotColour ? { '--subtitle-dot-color': dotColour } : undefined"
              >
                {{ row.title }}
              </div>
              <div class="contact-information-link-wrap">
                <a
                  v-if="contactLinkUsesNative(getContactLinkUrl(row))"
                  :href="getContactLinkUrl(row)"
                  :target="isExternalHttp(getContactLinkUrl(row)) ? '_blank' : undefined"
                  :rel="isExternalHttp(getContactLinkUrl(row)) ? 'noopener' : undefined"
                  class="contact-information-link fluid-type line-height-1"
                  style="--desktop: 54; --mobile: 24;"
                >{{ row.linkText }}</a>
                <NuxtLink
                  v-else
                  :to="getContactLinkUrl(row)"
                  class="contact-information-link fluid-type line-height-1"
                  style="--desktop: 54; --mobile: 24;"
                >
                  {{ row.linkText }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="videoEnabled"
          class="contact-section__column contact-section__column--right"
        >
          <div
            class="contact-section__video-group"
            :class="videoAspectClass"
          >
            <p
              v-if="section.contactVideoSubtitle"
              class="contact-section__video-subtitle subtitle subtitle--circle"
              :style="{ '--subtitle-dot-color': dotColour }"
            >
              {{ section.contactVideoSubtitle }}
            </p>

            <div
              class="contact-section__video rounded-medium"
              :class="[videoAspectClass, { 'contact-section__video--placeholder': !videoUrl }]"
            >
              <PlyrPlayer
                v-if="videoUrl"
                type="html5"
                :src="videoUrl"
                variant="contact"
              />
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

const displayTitle = computed(
  () => props.section.contactTitle || props.section.title || '',
)

const contacts = computed(() => props.section.contactInformation || [])

const dotColour = computed(
  () => props.section.contactDotColour || 'var(--orange)',
)

const videoUrl = computed(() => props.section.contactVideo?.asset?.url || '')

const videoEnabled = computed(() => {
  if (props.section.contactEnableVideo === true) return true
  if (props.section.contactEnableVideo === false) return false
  return !!(props.section.contactVideoSubtitle || videoUrl.value)
})

const videoAspectClass = computed(() => {
  const ratio = props.section.contactVideoAspectRatio
  return ratio === 'portrait' ? 'portrait' : ratio === 'landscape' ? 'landscape' : ''
})

const { contactLinkUsesNative, isExternalHttp, getContactLinkUrl } = useContactLink()
</script>

<style scoped>
.contact-section__panel {
  background-color: var(--pink-tint-4);
}

.contact-section__columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--gutter) * 4);
}

@media (min-width: 800px) {
  .contact-section__columns {
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--gutter) * 2);
  }
}

.contact-section__column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  min-height: 0;
  gap: calc(var(--gutter) * 4);
}

.contact-information-list {
  padding-bottom: calc(var(--unit) * 15);
}

@media (min-width: 800px) {
  .contact-section__column--right {
    align-items: flex-end;
  }
  .contact-section__column {
    gap: calc(var(--gutter) * 10);
  }
}

.contact-section__video-group {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  width: 100%;
}

.contact-section__video-group.portrait {
  width: clamp(300px, 44%, 600px);
}
@media (max-width: 799px) {
  .contact-section__video-group.portrait {
    width: 100%;
  }
}

.contact-section__video {
  position: relative;
  width: 100%;
  aspect-ratio: auto;
  overflow: hidden;
  background-color: var(--black);
  max-height: 100cqw;
  cursor: pointer;
}

.contact-section__video--placeholder {
  background-color: var(--light-grey);
  cursor: default;
  min-height: 280px;
}

.contact-section__video.landscape {
  aspect-ratio: 16 / 9;
}

.contact-section__video.portrait {
  aspect-ratio: 9 / 16;
  width: 100%;
}

.contact-section__title,
.contact-section__video-subtitle {
  margin: 0;
}
@media (max-width: 799px) {
  .contact-section__title br {
    display: none;
  }
}

.contact-section__title {
  white-space: pre-line;
}

.contact-information-item {
  display: flex;
  flex-direction: column;
}

.subtitle {
  padding-left: 0;
}
</style>
