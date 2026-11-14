<script setup lang="ts">
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
    answer: `目前分类为：${topicsSentence.value}。`,
  },
  {
    question: '公告的文本是如何分类的',
    answer: '根据段落拆分公告，使用Deepseek对段落类型进行预测，在分类中不必过分关注数据大小，使用同一模型下不同版本之间的对比更有意义。',
  },
])
</script>

<template>
  <div class="faq">
    <div class="faq-list">
      <details v-for="item in faqItems" :key="item.question" class="faq-item">
        <summary>
          <span>{{ item.question }}</span>
          <span class="faq-icon" aria-hidden="true" />
        </summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </div>
</template>

<style scoped>
.faq { width: 100%; color: var(--text-color-primary); }

.faq-item p { color: var(--text-color-secondary); line-height: 1.8; }

.faq-item {
  border-top: 1px solid var(--bg-color-borer);
}

.faq-item:last-child {
  border-bottom: 1px solid var(--bg-color-borer);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.3rem 0;
  cursor: pointer;
  font-weight: 600;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary:focus-visible {
  outline: 2px solid var(--brand-color);
  outline-offset: 4px;
}

.faq-item p {
  margin: 0;
  padding: 0 2rem 1.3rem 0;
}

.faq-icon {
  position: relative;
  flex: 0 0 1rem;
  width: 1rem;
  height: 1rem;
}

.faq-icon::before,
.faq-icon::after {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  content: '';
}

.faq-icon::after {
  transform: rotate(90deg);
  transition: transform 150ms ease;
}

.faq-item[open] .faq-icon::after {
  transform: rotate(0deg);
}
</style>
