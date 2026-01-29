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
import { SparklesIcon } from 'lucide-vue'
import IssueHeader from '@/components/organisms/investment/today-issue/IssueHeader.vue'
import IssueBubbleMap from '@/components/organisms/investment/today-issue/IssueBubbleMap.vue'
import IssueTrendChart from '@/components/organisms/investment/today-issue/IssueTrendChart.vue'
import MajorStocksList from '@/components/organisms/investment/today-issue/MajorStocksList.vue'
import NewsSummary from '@/components/organisms/investment/today-issue/NewsSummary.vue'
import IssueHistory from '@/components/organisms/investment/today-issue/IssueHistory.vue'

// 리액트 소스에서 가져온 데이터 (Mock Data)
import { domesticBubbles, usBubbles, keywordDataMap, allIssues } from '@/utils/today-issue-data'

export default {
  // 컴포넌트 이름: 오늘의 이슈 페이지
  name: 'TodayIssue',
  components: {
    SparklesIcon,
    IssueHeader,
    IssueBubbleMap,
    IssueTrendChart,
    MajorStocksList,
    NewsSummary,
    IssueHistory
  },
  data() {
    return {
      selectedKeyword: '원전', // 현재 선택된 이슈 키워드
      domesticBubbles, // 국내 이슈 버블 차트 데이터
      usBubbles, // 미국 이슈 버블 차트 데이터
      keywordDataMap, // 키워드별 상세 분석 데이터 맵
      allIssues // 전체 이슈 히스토리 데이터 목록
    }
  },
  computed: {
    // 현재 선택된 키워드에 해당하는 분석 데이터 반환
    currentData() {
      // 키워드가 없으면 기본값 '원전' 데이터 사용
      return this.keywordDataMap[this.selectedKeyword] || this.keywordDataMap['원전']
    },
    // 현재 선택된 키워드와 관련된 과거 이슈 목록 필터링
    filteredIssues() {
      const relatedIds = this.currentData.relatedIssues || []
      return this.allIssues.filter(issue => relatedIds.includes(issue.id))
    }
  },
  methods: {
    /**
     * 키워드 변경 핸들러
     * @param {string} keyword - 선택된 새로운 키워드
     */
    handleKeywordChange(keyword) {
      this.selectedKeyword = keyword
    },
    /**
     * 데이터 새로고침 핸들러
     * - 버블 맵의 상단 새로고침 버튼 클릭 시 호출
     * - API 재호출 등을 통해 최신 데이터를 갱신
     */
    handleRefresh() {
      console.log('Refreshing data...')
      // TODO: 실제 API 연동 시 데이터 갱신 로직 구현
    }
  }
}
</script>

<style src="@/assets/css/pages/today-issue.css"></style>
