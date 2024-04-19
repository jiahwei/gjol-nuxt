export const useDevice = () => {
  let UA: string;
  if (process.client) {
    UA = navigator.userAgent;
  } else {
    UA = useRequestHeader('user-agent') as string;
  }

  const type = ref<'mobile' | 'desktop'>('desktop');

  // console.log(UA);

  // 通过 UA 来判断设备类型是 desktop 还是 mobile
  if (/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA)) type.value = 'mobile';
  else type.value = 'desktop';

  return type;
};
