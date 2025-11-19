# 各种奇怪的BUG

## Uncaught ReferenceError: Cannot access 'Qf' before initialization

其实就是暂时性死区问题，有个变量在声明之前使用，导致报错。

这个问题主要出现在SSR阶段，**并且使用manualChunks代码分块优化之后**，核心原因模块执行顺序错乱 ，导致后声明的代码先运行。

先试试**先升级nuxt的版本**。

如果无所谓性能去掉manualChunks代码分块优化，问题就会消失。欣赏warn

```log
 WARN                                                                                          
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

[参考Github的讨论](https://github.com/nuxt/nuxt/issues/22127#issuecomment-1635925362) 尝试

```ts
  hooks: {
    // 仅在客户端构建时执行，避免在服务器端构建时出错
    // 服务端打包时，某些 chunk 被错误拆分，导致变量初始化顺序错乱 → 出现 Cannot access 'Qf' before initialization。
    'vite:extendConfig'(config, { isClient, isServer }) {
      if (isClient) {
        // 添加插件
        config.plugins?.push(visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as unknown as PluginOption)

        const output = Array.isArray(config.build?.rollupOptions?.output)
          ? config.build?.rollupOptions?.output[0]
          : config.build?.rollupOptions?.output

        if (output) {
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

```

可即使这样我的问题也没有消失

```text
Uncaught ReferenceError: Cannot access 'Qf' before initialization
at virtual:nuxt:D:/myObject/gjol-nuxt/node_modules/.cache/nuxt/.nuxt/router.options.mjs:9:4
```

下面是报错的文件所在，看起来是router.options.mjs文件的问题

```js
import routerOptions0 from "D:/myObject/gjol-nuxt/node_modules/.pnpm/nuxt@4.2.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.7.0_@vue+compiler-sfc@3._w3jklxqzorwizavrlhnmrx5gvq/node_modules/nuxt/dist/pages/runtime/router.options.js";
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
}
export const hashMode = false
export default {
...configRouterOptions,
...routerOptions0,
}
```

router.options.mjs 是 Nuxt 自动生成 的虚拟模块，它会被同时打进客户端和服务端 bundle，
逐步打开 manualChunks ，每次只保留一个，直到再次报错
只保留任意一个manualChunks都不会有问题，那就是顺序问题了

```ts
// 这俩一起开就一定报错
// vue-router 被扔进 vendor ，而 router.options.mjs 本身被归到 vue-ecosystem
// Rollup 先加载了 vendor ，于是访问了尚未初始化的 vue-router 内部变量（压缩后叫 Qf ）
if (output) {
  output.manualChunks = (id: string) => {
    // if (id.includes('echarts')) return 'echarts'
    if (id.includes('vue') || id.includes('@vue')) return 'vue-ecosystem'
    // if (id.includes('@vueuse')) return 'vueuse'
    // if (id.includes('@ark-ui')) return 'ark-ui'
    // if (id.includes('unocss') || id.includes('@unocss')) return 'unocss'
    if (id.includes('node_modules')) return 'vendor'
  }
}

// 罪魁祸首就是 if (id.includes('node_modules')) return 'vendor'
// 这样也是可以的
if (output) {
  output.manualChunks = (id: string) => {
    if (id.includes('echarts')) return 'echarts'
    if (id.includes('vue') || id.includes('@vue')) return 'vue-ecosystem'
    if (id.includes('@vueuse')) return 'vueuse'
    if (id.includes('@ark-ui')) return 'ark-ui'
    if (id.includes('unocss') || id.includes('@unocss')) return 'unocss'
    // if (id.includes('node_modules')) return 'vendor'
  }
}
      
```
