import type { UseFetchOptions } from 'nuxt/app'
interface Response<T> {
  code: number
  data: T
  msg: string
}
type Options<T> = Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> }
type Url = string | (() => string)

export function useAPI<T>(url: Url, options: Options<T>) {
  return useFetch(url, {
    ...options,
    server: true,
    onResponse({ request, response, options }) {
      const info = response._data as Response<T>
      if (info.code === 200) {
        response._data = info.data
      }
    },
  })
}
