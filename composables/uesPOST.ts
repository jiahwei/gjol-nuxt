import type { UseFetchOptions } from 'nuxt/app';

type Options<T> = Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> };
type body<T> = UseFetchOptions<T>['body'];
type Url = string | (() => string);

export function usePOST<T>(url: Url, body: body<T>, options: Options<T>) {
  options.method = 'POST';
  options.body = body;
  options.key = toValue(url);
  return useAPI(url, options);
}
