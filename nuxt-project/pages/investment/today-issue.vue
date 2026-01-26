<!-- 오늘의 이슈 페이지: AI 분석 및 시장 이슈의 종합적인 피드 제공 -->
<template>
  <div class="p-today-issue">
    <!-- 헤더 영역 -->
    <IssueHeader />

    <!-- AI 이슈 분석 섹션 -->
    <section class="p-today-issue__main-section">
      <div class="p-today-issue__section-header">
        <SparklesIcon class="p-today-issue__section-icon" />
        <h2 class="p-today-issue__section-title">AI이슈포착</h2>
        <span class="p-today-issue__keyword-badge">{{ selectedKeyword }}</span>
      </div>

      <div class="p-today-issue__analysis-grid">
        <!-- 왼쪽: 버블 맵 -->
        <IssueBubbleMap
          :selected-keyword="selectedKeyword"
          :domestic-bubbles="domesticBubbles"
          :us-bubbles="usBubbles"
          @select="handleKeywordChange"
          @refresh="handleRefresh"
        />

        <!-- 오른쪽: 분석 데이터 (차트, 종목, 뉴스) -->
        <div class="p-today-issue__analysis-right">
          <IssueTrendChart
            :title="selectedKeyword"
            :data="currentData.chartData"
          />

          <div class="p-today-issue__info-group">
            <MajorStocksList :stocks="currentData.stocks" />
            <NewsSummary :news="currentData.news" />
          </div>
        </div>
      </div>

      <!-- 하단: 이슈 히스토리 -->
      <IssueHistory
        :selected-keyword="selectedKeyword"
        :issues="filteredIssues"
      />
    </section>
  </div>
</template>

<script>
import IssueHeader from '@/components/investment/today-issue/IssueHeader.vue'
import IssueBubbleMap from '@/components/investment/today-issue/IssueBubbleMap.vue'
import IssueTrendChart from '@/components/investment/today-issue/IssueTrendChart.vue'
import MajorStocksList from '@/components/investment/today-issue/MajorStocksList.vue'
import NewsSummary from '@/components/investment/today-issue/NewsSummary.vue'
import IssueHistory from '@/components/investment/today-issue/IssueHistory.vue'

// 리액트 소스에서 가져온 데이터 (간략화된 예시, 실제로는 별도 데이터 파일로 분리 추천)
import { domesticBubbles, usBubbles, keywordDataMap, allIssues } from '@/utils/today-issue-data'

export default {
  name: 'TodayIssue',
  components: {
    IssueHeader,
    IssueBubbleMap,
    IssueTrendChart,
    MajorStocksList,
    NewsSummary,
    IssueHistory
  },
  data() {
    return {
      selectedKeyword: '원전',
      domesticBubbles,
      usBubbles,
      keywordDataMap,
      allIssues
    }
  },
  computed: {
    currentData() {
      return this.keywordDataMap[this.selectedKeyword] || this.keywordDataMap['원전']
    },
    filteredIssues() {
      const relatedIds = this.currentData.relatedIssues || []
      return this.allIssues.filter(issue => relatedIds.includes(issue.id))
    }
  },
  methods: {
    handleKeywordChange(keyword) {
      this.selectedKeyword = keyword
    },
    handleRefresh() {
      // 새로고침 로직 (필요 시 API 호출 등)
      console.log('Refreshing data...')
    }
  }
}
</script>

<style src="@/assets/css/pages/today-issue.css"></style>
