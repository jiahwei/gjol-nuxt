// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    // 'nuxt-icon',
    '@formkit/auto-animate',
    '@nuxt/eslint',
    '@nuxt/image',
  ],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  // css: ['~/assets/css/theme.css'],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '',
  },

  runtimeConfig: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE,
  },

  routeRules: {
    '/': { static: true },
  },

  compatibilityDate: '2025-04-03',

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  typescript: {
    typeCheck: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
