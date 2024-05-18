import type { UseFetchOptions } from 'nuxt/app'

// type defaultValue<T> = () => (T extends void ? unknown : T) | Ref<T extends void ? unknown : T>
type defaultValue<T> = () => T | Ref<T>
type Options<T> = Omit<UseFetchOptions<T>, 'default'> & { default: defaultValue<T> }
type query<T> = UseFetchOptions<T>['query']
type Url = string | (() => string)
type OtherConfig<T> = Omit<UseFetchOptions<T>, 'default'>

/**
 * 发起GET请求
 * @param url API路径
 * @param query 搜索参数
 * @param defaultValue 默认值
 * @param [otherConfig={}] 其他 UseFetchOptions 的参数
 * @returns useFetch 方法包装后的返回值
 */
export function useGet<T>(url: Url, defaultValue: defaultValue<T>, query: query<T> = undefined, otherConfig: OtherConfig<T> = {}) {
  const options: Options<T> = {
    method: 'GET',
    query,
    key: toValue(url),
    default: defaultValue,
    ...otherConfig,
  }
  return useAPI(url, options)
}
