// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'GjolDB',
      meta: [
        { name: 'description', content: 'gjol DB收集、统计和分析古网的公告数据。' },
        { name: 'baidu-site-verification', content: 'codeva-Ae8HiaiU9b' },
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

  build: {
    analyze: false,
  },

  css: ['~/assets/css/theme.css'],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    classSuffix: '',
  },

  runtimeConfig: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
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

  sourcemap: {
    server: true,
    client: true,
  },


  hooks: {
    // 仅在客户端构建时执行，避免在服务器端构建时出错
    // 服务端打包时，某些 chunk 被错误拆分，导致变量初始化顺序错乱 → 出现 Cannot access 'Qf' before initialization。
    'vite:extendConfig'(config, { isClient, isServer }) {
      if (isClient) {
        // 添加插件
        config.plugins?.push(visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as unknown as PluginOption)

        const output = Array.isArray(config.build?.rollupOptions?.output)
          ? config.build.rollupOptions.output[0]
          : config.build?.rollupOptions?.output

        if (output) {
          // @ts-ignore
          output.manualChunks = (id: string) => {
            if (id.includes('echarts')) return 'echarts'
            if (id.includes('vue') || id.includes('@vue')) return 'vue-ecosystem'
            if (id.includes('@vueuse')) return 'vueuse'
            if (id.includes('@ark-ui')) return 'ark-ui'
            if (id.includes('unocss') || id.includes('@unocss')) return 'unocss'
            if (id.includes('node_modules')) return 'vendor'
          }
        }
      }

      // 强制清理服务端的 manualChunks，避免污染 SSR
      if (isServer && config.build?.rollupOptions?.output) {
        const output = Array.isArray(config.build.rollupOptions.output)
          ? config.build.rollupOptions.output[0]
          : config.build.rollupOptions.output
        if (output && 'manualChunks' in output) {
          // @ts-ignore
          delete output.manualChunks
        }
      }
    }
  },
})
