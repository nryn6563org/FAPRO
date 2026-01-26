<!-- 이슈 히스토리: 선택된 키워드와 관련된 과거 히스토리 및 AI 요약 제공 -->
<template>
  <div class="c-issue-history">
    <div class="c-issue-history__header">
      <h3 class="c-issue-history__title">{{ selectedKeyword }} 관련 이슈 히스토리</h3>
      <p class="c-issue-history__desc">과거 이슈부터 현재까지의 흐름을 분석합니다.</p>
    </div>

    <div class="c-issue-history__list">
      <div v-for="issue in issues" :key="issue.id" class="c-issue-history__item">
        <div class="c-issue-history__date-box">
          <span class="c-issue-history__date-text">{{ issue.date }}</span>
        </div>

        <div class="c-issue-history__content">
          <div class="c-issue-history__content-top">
            <h4 class="c-issue-history__item-title">{{ issue.title }}</h4>
            <div
              class="c-issue-history__change-rate"
              :class="issue.trend === 'up' ? 'c-issue-history__change-rate--up' : 'c-issue-history__change-rate--down'"
            >
              <TrendingUpIcon v-if="issue.trend === 'up'" class="w-4 h-4" />
              <TrendingDownIcon v-else class="w-4 h-4" />
              +{{ issue.changeRate }}%
            </div>
          </div>

          <div class="c-issue-history__summary">
            <span class="c-issue-history__summary-tag">[AI요약]</span>
            <p class="c-issue-history__summary-text">{{ issue.summary }}</p>
          </div>

          <p class="c-issue-history__detail">{{ issue.newsContent }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-vue'

export default {
  name: 'IssueHistory',
  components: {
    TrendingUpIcon,
    TrendingDownIcon
  },
  props: {
    selectedKeyword: {
      type: String,
      required: true
    },
    issues: {
      type: Array,
      required: true
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-issue/issue-history.css"></style>
