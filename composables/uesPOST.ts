import type { UseFetchOptions } from 'nuxt/app';

type Options<T> = Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> };
type body<T> = UseFetchOptions<T>['body'];
type Url = string | (() => string);
type defaultValue<T> = () => T | Ref<T>;

export function usePOST<T>(url: Url, body: body<T>, defaultValue: defaultValue<T>) {
  const options: Options<T> = {
    method: 'POST',
    body,
    key: toValue(url),
    default: defaultValue
  };
  return useAPI(url, options);
}
