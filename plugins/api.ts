import type { RuntimeConfig } from '@nuxt/schema';
function getBaseApi(conifg: RuntimeConfig): string {
  if (process.server) {
    return process.env.NUXT_PUBLIC_SERVER as string;
  } else {
    return conifg.public.apiBase;
  }
}
export default defineNuxtPlugin(() => {
  const baseApi = getBaseApi(useRuntimeConfig());
  const $api = $fetch.create({
    baseURL: baseApi
  });
  return {
    provide: {
      api: $api
    }
  };
});
