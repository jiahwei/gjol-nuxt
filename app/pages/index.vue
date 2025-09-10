<template>
  <div class="flex flex-col  justify-center items-center">
    <box v-for="(value, index) in [1, 2, 3]" :key="value" :id="`box-${value}`" />
  </div>
</template>

<script lang="ts" setup>
import version from '~/components/index/version.vue';
import box from '~/components/index/box.vue';


function setIntersectionObserver() {
  const { ssrContext } = useNuxtApp()
  if (ssrContext) return;

  const options = {
    root: null,
    threshold: 0.4,
  };

  const observer = new IntersectionObserver(callback, options);
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`box-${i}`);
    if (el) {
      observer.observe(el);
    }
  }

  function callback(entries: IntersectionObserverEntry[]) {
    console.log(entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('进入视图', entry.target.id);
        observer.unobserve(entry.target)
      } else {
        console.log('未进入视图', entry.target.id);
      }
    });
  }
}

onMounted(() => {
  setIntersectionObserver();
})
</script>
