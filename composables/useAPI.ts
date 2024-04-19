import type { UseFetchOptions } from 'nuxt/app';

type Options<T> = Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> };
type Url = string | (() => string);

export function useAPI<T>(url: Url, options: Options<T>) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api
  });
}
