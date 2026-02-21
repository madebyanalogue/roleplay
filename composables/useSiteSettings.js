export const useSiteSettings = () => {
    const query = `*[_type == "siteSettings"][0] {
      maxWidth,
      avg {
        asset-> {
          _id,
          url,
          _ref
        }
      },
      logoSvg,
    title,
      seoTitle,
      seoDescription,
    headerType,
    mobileBreakpoint,
    gutterMobile,
    gutterDesktop,
    lineHeight,
    disablePreloader,
    preloaderImages[] {
      image {
        asset->
      },
      alt,
      repeatLeftRight
    },
    preloaderText,
    preloaderSvgCode,
    preloaderFontSizeMobile,
    preloaderFontSize,
      facebookShareImage {
        asset-> {
          _id,
          url,
          _ref
        }
      },
      mainMenu-> {
        title,
        items[] {
          text,
          link {
            type,
            page-> {
              slug {
                current
              }
            },
            url
          }
        },
        smallItems[] {
          text,
          link {
            type,
            page-> {
              slug {
                current
              }
            },
            url
          }
        }
      },
      footerLinks,
      footerMenus[] {
        title,
        sourceType,
        link {
          type,
          page-> {
            slug {
              current
            }
          },
          url
        },
        menu-> {
          items[] {
            text,
            link {
              type,
              page-> {
                slug {
                  current
                }
              },
              url
            }
          },
          smallItems[] {
            text,
            link {
              type,
              page-> {
                slug {
                  current
                }
              },
              url
            }
          }
        },
        content[] {
          _type,
          _key,
          style,
          children[] {
            _type,
            _key,
            text,
            marks
          },
          markDefs[] {
            _type,
            _key,
            href
          }
        }
      },
      copyright
    }`
    
  const fetchSettings = async (bypassCache = false) => {
    if (process.server) {
      const config = useRuntimeConfig()
      const projectId = config.public.sanity?.projectId || 'uuzbe0e0'
      const dataset = config.public.sanity?.dataset || 'production'
      const useCdn = !bypassCache
      const baseUrl = useCdn
        ? `https://${projectId}.apicdn.sanity.io/v2021-10-21/data/query/${dataset}`
        : `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}`
      
      return await $fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }).then(result => result?.result ?? null).catch(() => null)
    }
    return await $fetch('/api/sanity/query', {
      method: 'POST',
      body: { query, useCdn: !bypassCache },
    }).then(result => result?.result ?? null).catch(() => null)
  }

  const { data: settings, refresh } = useAsyncData('siteSettings', () => fetchSettings(false), { server: true })

  // Bypass CDN cache - use when menu/logo was just added in Sanity
  const refreshBypassCache = async () => {
    const fresh = await fetchSettings(true)
    if (fresh !== null) {
      settings.value = fresh
    }
  }

  const maxWidth = computed(() => settings.value?.maxWidth || '1800px')
  const logo = computed(() => settings.value?.avg?.asset || null)
  const logoSvg = computed(() => settings.value?.logoSvg || null)
  const title = computed(() => settings.value?.title || 'Registix')
  const seoTitle = computed(() => settings.value?.seoTitle || 'Registix')
  const seoDescription = computed(() => settings.value?.seoDescription || '')
  const disablePreloader = computed(() => settings.value?.disablePreloader === true)
  const preloaderImages = computed(() => settings.value?.preloaderImages || [])
  const preloaderText = computed(() => settings.value?.preloaderText || [])
  const preloaderSvgCode = computed(() => settings.value?.preloaderSvgCode || null)
  const preloaderFontSizeMobile = computed(() => settings.value?.preloaderFontSizeMobile ?? 20)
  const preloaderFontSize = computed(() => settings.value?.preloaderFontSize ?? 40)
  const facebookShareImage = computed(() => {
    const asset = settings.value?.facebookShareImage?.asset
    if (!asset) return null
    
    // If we have a direct URL, use it
    if (asset.url) {
      return asset.url
    }
    
    // Fallback: construct URL from _id or _ref
    if (asset._id) {
      // Extract parts from "image-abc123-1920x1080-jpg"
      const match = String(asset._id).match(/image-([^-]+)-(\d+)x(\d+)-(\w+)/)
      if (match) {
        const [, assetId, width, height, ext] = match
        return `https://cdn.sanity.io/images/uuzbe0e0/production/${assetId}-${width}x${height}.${ext}`
      }
    }
    
    if (asset._ref) {
      const [file, id, extension] = asset._ref.replace('image-', '').split('-')
    return `https://cdn.sanity.io/images/uuzbe0e0/production/${id}.${extension}`
    }
    
    return null
  })
  const mainMenu = computed(() => settings.value?.mainMenu)
  const footerLinks = computed(() => settings.value?.footerLinks || [])
  const footerMenus = computed(() => settings.value?.footerMenus || [])
  const headerType = computed(() => settings.value?.headerType || 'responsive')
  const mobileBreakpoint = computed(() => settings.value?.mobileBreakpoint ?? 800)
  const gutterMobile = computed(() => settings.value?.gutterMobile ?? 15)
  const gutterDesktop = computed(() => settings.value?.gutterDesktop ?? 20)
  const lineHeight = computed(() => settings.value?.lineHeight ?? 1.1)
  const copyright = computed(() => {
    const text = settings.value?.copyright || ''
    const currentYear = new Date().getFullYear()
    return text.replace(/\[year\]/g, currentYear.toString())
  })

  return {
    settings,
    refresh,
    refreshBypassCache,
    maxWidth,
    logo,
    logoSvg,
    title,
    seoTitle,
    seoDescription,
    facebookShareImage,
    mainMenu,
    footerLinks,
    footerMenus,
    headerType,
    mobileBreakpoint,
    gutterMobile,
    gutterDesktop,
    lineHeight,
    copyright,
    disablePreloader,
    preloaderImages,
    preloaderText,
    preloaderSvgCode,
    preloaderFontSizeMobile,
    preloaderFontSize,
  }
}

