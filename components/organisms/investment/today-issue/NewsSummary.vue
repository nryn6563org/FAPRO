<!-- 뉴스 요약 카드: 현재 이슈와 관련된 주요 뉴스 헤드라인 및 내용 요약 -->
<template>
  <div class="c-news-summary">
    <div class="c-news-summary__header">
      <span class="c-news-summary__tag">주요뉴스</span>
      <h4 class="c-news-summary__title">{{ news.title }}</h4>
    </div>
    <p class="c-news-summary__content">{{ news.content }}</p>
  </div>
</template>

<script>
export default {
  name: 'NewsSummary',
  props: {
    news: {
      type: Object,
      required: true
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-issue/issue-info.css"></style>
