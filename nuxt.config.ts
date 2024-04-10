// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  typescript: {
    shim: false,
  },
  modules: [
    "@nuxt/devtools",
    ["@nuxtjs/eslint-module", { lintOnStart: false }],
    "@nuxtjs/google-fonts",
  ],
  css: ["~/assets/css/normalize.css", "~/assets/css/theme.css"],
});
