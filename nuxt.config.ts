// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  typescript: {
    typeCheck: true
  },
  nitro: {
    devProxy: {
      '/api/': {
        target: 'http://124.220.78.194:8000/',
        changeOrigin: true
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  modules: ['@nuxt/devtools', ['@nuxtjs/eslint-module', { lintOnStart: false }], '@nuxtjs/google-fonts', ['@tdesign-vue-next/nuxt', { include: ['Button', 'Message'] }], '@vueuse/nuxt'],
  css: ['~/assets/css/normalize.css', '~/assets/css/theme.css']
});
