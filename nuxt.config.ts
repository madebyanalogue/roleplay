// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/sanity',
    '@nuxt/image',
  ],
  sanity: {
    projectId: 'uuzbe0e0',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-19',
    visualEditing: {
      studioUrl: false,
      enabled: false,
    },
  },
  runtimeConfig: {
    public: {
      sanity: {
        projectId: 'uuzbe0e0',
        dataset: 'production',
        apiVersion: '2024-03-19',
      },
    },
  },
  image: {
    sanity: {
      projectId: 'uuzbe0e0',
      dataset: 'production',
    },
    quality: 80,
    format: ['webp', 'jpg'],
    // Enable image caching
    domains: ['cdn.sanity.io'],
    // Add cache headers for images
    // Breakpoints used by Nuxt Image to generate widths.
    // Increase the largest size so hero images on desktop can get a sharper,
    // higher‑resolution source than 1536px.
    screens: {
      lg: 1200,
      xl: 2560,
      xxl: 3200,
    },
  },
  experimental: {
    inlineSSRStyles: true, /* Inline component CSS in initial HTML to prevent FOUC */
  },
  app: {
    head: {
      title: 'Registix',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      style: [
        {
          children: `
            /* Critical CSS - inline so styles apply before main.css loads (prevents FOUC) */
            @font-face {
              font-family: 'KH Teka';
              src: url('/fonts/KHTeka-Regular.otf') format('opentype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Fractul';
              src: url('/fonts/Fractul-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Fractul';
              src: url('/fonts/Fractul-SemiBold.ttf') format('truetype');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Ayer';
              src: url('/fonts/AyerRegular.woff') format('woff');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Ayer';
              src: url('/fonts/AyerRegularItalic.woff') format('woff');
              font-weight: normal;
              font-style: italic;
              font-display: swap;
            }
            :root {
              --mobile-breakpoint: 800;
              --gutter-mobile: 15;
              --gutter-desktop: 20;
              --font-size-body-mobile: 12;
              --font-size-large-mobile: 18;
              --font-size-logo-mobile: 18;
              --font-size-body-desktop: 16;
              --font-size-large-desktop: 22;
              --font-size-logo-desktop: 40;
              --line-height: 1.2;
              --max-width: 1800px;
              --text-color: #000000;
              --background-color: #ffffff;
              --font-family: 'KH Teka', sans-serif;
              --heading-font-family: 'Fractul', sans-serif;
              --logo-font-family: 'Ayer', sans-serif;
              --header-height: 0px;
              --font-size-body: clamp(12px, 2vw, 16px);
              --font-size-large: clamp(18px, 2.5vw, 22px);
              --font-size-logo: clamp(18px, 4vw, 40px);
            }
            html, body {
              font-family: var(--font-family);
              font-size: var(--font-size-body);
              line-height: var(--line-height);
              color: var(--text-color);
              background-color: var(--background-color);
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            *, *::before, *::after { box-sizing: border-box; }
            /* Hide body until CSS and fonts are ready */
            html:not(.css-loaded) body { 
              visibility: hidden !important; 
              opacity: 0 !important;
            } 
            html.css-loaded body { 
              visibility: visible !important; 
              opacity: 1 !important;
              transition: opacity 0.2s ease-in;
            }
            /* Hide app until preloader ready - must be in critical CSS so it applies before bundle loads */
            #app.is--hidden {
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            #app:not(.is--hidden) {
              visibility: visible;
              opacity: 1;
              transition: opacity 0.2s ease-in;
            }
          `,
          key: 'critical-css'
        }
      ],
      link: [
        {
          rel: 'preload',
          href: '/fonts/KHTeka-Regular.otf',
          as: 'font',
          type: 'font/otf',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/Fractul-Regular.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/Fractul-SemiBold.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous',
        },
      ],
      script: [],
    },
    pageTransition: false,
  },
  build: {
    transpile: ['@nuxtjs/sanity'],
  },
  vite: {
    optimizeDeps: {
      exclude: ['@sanity/visual-editing', '@sanity/ui', 'react-compiler-runtime', 'react', 'react-dom'],
    },
    ssr: {
      noExternal: [],
    },
    resolve: {
      alias: {
        'react-compiler-runtime': join(__dirname, 'node_modules/react-compiler-runtime/dist/index.js'),
        '@sanity/visual-editing': join(__dirname, 'stubs/@sanity/visual-editing/index.js'),
      },
    },
    plugins: [
      {
        name: 'stub-react-compiler-nested',
        resolveId(id) {
          if (id.includes('react-compiler-runtime')) {
            return join(__dirname, 'node_modules/react-compiler-runtime/dist/index.js')
          }
          if (id.includes('@sanity/visual-editing') && !id.includes('stubs/visual-editing')) {
            return join(__dirname, 'stubs/@sanity/visual-editing/index.js')
          }
        },
      },
    ],
  },
})

