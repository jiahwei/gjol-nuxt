// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from 'rollup-plugin-visualizer'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'GjolDB',
      meta: [
        { name: 'description', content: 'gjol DB收集、统计和分析古网的公告数据。' },
      ],
    },
  },
  modules: [
    '@nuxt/devtools',
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

  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  build:{
    analyze: false,
  },

  css: ['~/assets/css/theme.css'],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    classSuffix: '',
  },

  runtimeConfig: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000',
    public : {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  },

  routeRules: {
    '/': { static: true },
  },

  compatibilityDate: '2025-10-09',

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

  vite:{
    plugins: [visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true })],

    build:{
      rollupOptions:{
        output:{
          manualChunks(id){
            if(id.includes('echarts')){
              return 'echarts'
            }
          }
        }
      }
    }
  }
})
