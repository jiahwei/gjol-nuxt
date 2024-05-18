import type { UseFetchOptions } from 'nuxt/app'

type Options<T> = Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> }
type body<T> = UseFetchOptions<T>['body']
type Url = string | (() => string)
type defaultValue<T> = () => T | Ref<T>
type OtherConfig<T> = Omit<UseFetchOptions<T>, 'default'>

/**
 * 发起POST请求
 * @param url API路径
 * @param body 请求体
 * @param defaultValue 默认值
 * @param [otherConfig={}] 其他 UseFetchOptions 的参数
 * @returns useFetch 方法包装后的返回值
 */
export function usePost<T>(url: Url, body: body<T>, defaultValue: defaultValue<T>, otherConfig: OtherConfig<T> = {}) {
  const options: Options<T> = {
    method: 'POST',
    body,
    key: toValue(url),
    default: defaultValue,
    ...otherConfig,
  }
  return useAPI(url, options)
}
