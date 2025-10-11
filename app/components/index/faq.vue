<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import type { ContentTotal } from '@/api/bulletin'
type ParagraphTopic = ContentTotal['type']
const paragraphTopics: ParagraphTopic[] = [
  'PVP',
  'PVE',
  'PVX',
  '格式',
  '无更新',
  '商城',
  '职业调整',
  '通用调整',

]

const topicsSentence = computed(() => {
  if (paragraphTopics.length === 0) return ''
  if (paragraphTopics.length === 1) return paragraphTopics[0]
  return `${paragraphTopics.slice(0, -1).join('、')}以及${paragraphTopics[paragraphTopics.length - 1]}`
})

const faqItems = ref([
  {
    question: '公告的文本分类有哪些',
    answer: `目前分类为：${topicsSentence.value}。`
  },
  {
    question: '公告的文本是如何分类的',
    answer: '根据段落拆分公告，使用训练的模型对段落类型进行预测，目前模型准确率: 0.7857。所以在分类中不必过分关注数据大小，使用同一模型下不同版本之间的对比更有意义。'
  },
])
</script>

<template>
  <div class="min-h-30vh w-full md:w-80vw  px-space-xl  my-space-2xl">
    <Accordion.Root :defaultValue="['faq-0']"
      class="flex flex-col items-center justify-between font-serif text-primary">
      <Accordion.Item v-for="(item, index) in faqItems" :key="index" :value="`faq-${index}`"
        class="w-full not-first:border-t border-solid border-[var(--bg-color-borer)]">
        <Accordion.ItemTrigger class="flex items-center justify-between w-full py-space-md">
          <span class="font-500 text-lg">{{ item.question }}</span>
          <Accordion.ItemIndicator
            class=" data-[state=open]:rotate-90 rotate-[-90deg]">
            <div class="w-[16px] h-[16px] text-primary  cursor-pointer i-material-symbols-arrow-back-ios-new-rounded">
            </div>
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent
          class="py-space-md text-secondary break-words overflow-hidden data-[state=open]:animate-slideDown data-[state=open]:duration-250 data-[state=closed]:animate-slideUp data-[state=closed]:duration-200 ease-in-out">
          {{ item.answer }}
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  </div>

</template>
