<!-- 시세분석 페이지: 주요 시장 지수 차트 및 종목별 시세/이슈 현황 제공 -->
<template>
  <div class="p-price-analysis">
    <!-- 페이지 헤더 -->
    <PriceAnalysisHeader />

    <!-- 주요 지수 섹션 -->
    <section class="p-price-analysis__market-section">
      <div class="p-price-analysis__section-header">
        <h3 class="p-price-analysis__section-title">주요 지수</h3>
        <div class="p-price-analysis__view-tabs">
          <button
            v-for="mode in ['시간별', '날짜별']"
            :key="mode"
            class="p-price-analysis__view-btn"
            :class="viewMode === mode ? 'p-price-analysis__view-btn--active' : 'p-price-analysis__view-btn--inactive'"
            @click="viewMode = mode"
          >
            {{ mode }}
          </button>
        </div>
      </div>

      <div class="p-price-analysis__market-grid">
        <IndexChartCard
          name="KOSPI"
          value="4,897.17"
          :change="11.42"
          :change-pct="0.23"
          :selected-period="kospiPeriod"
          :history-data="currentKospiData"
          @update-period="kospiPeriod = $event"
        />
        <IndexChartCard
          name="KOSDAQ"
          value="950.07"
          :change="-26.3"
          :change-pct="-2.69"
          :selected-period="kosdaqPeriod"
          :history-data="currentKosdaqData"
          @update-period="kosdaqPeriod = $event"
        />
      </div>
    </section>

    <!-- 시세 현황 섹션 -->
    <section class="p-price-analysis__status-section">
      <div class="p-price-analysis__status-header">
        <div class="p-price-analysis__update-box">
          <h3 class="p-price-analysis__section-title">시세 현황</h3>
          <div class="p-price-analysis__update-meta">
            업데이트 {{ currentDate }} {{ currentTime }}
          </div>
        </div>

        <StatusFilterSection
          :tabs="tabs"
          :selected-tab="selectedTab"
          @update-tab="selectedTab = $event"
        />
      </div>

      <div class="p-price-analysis__table-wrapper">
        <PriceStatusTable :data="currentStockData" />
      </div>
    </section>
  </div>
</template>

<script>
import PriceAnalysisHeader from '@/components/investment/price-analysis/PriceAnalysisHeader.vue'
import IndexChartCard from '@/components/investment/price-analysis/IndexChartCard.vue'
import StatusFilterSection from '@/components/investment/price-analysis/StatusFilterSection.vue'
import PriceStatusTable from '@/components/investment/price-analysis/PriceStatusTable.vue'

// 리액트 소스에서 추출된 데이터
import { kospiData, kosdaqData, priceStatusData } from '@/utils/price-analysis-data'

export default {
  name: 'PriceAnalysis',
  components: {
    PriceAnalysisHeader,
    IndexChartCard,
    StatusFilterSection,
    PriceStatusTable
  },
  data() {
    return {
      viewMode: '시간별',
      kospiPeriod: '1일',
      kosdaqPeriod: '1년',
      selectedTab: '이슈종목',
      tabs: ['이슈종목', '52주신고가', '52주신저가', '상한가', '하한가', '거래비중상위', '관리종목', '거래정지', '투자주의', '투자경고', '투자위험'],
      kospiData,
      kosdaqData,
      priceStatusData,
      now: new Date()
    }
  },
  computed: {
    currentDate() {
      return `${String(this.now.getMonth() + 1).padStart(2, '0')}/${String(this.now.getDate()).padStart(2, '0')}`
    },
    currentTime() {
      return `${String(this.now.getHours()).padStart(2, '0')}:${String(this.now.getMinutes()).padStart(2, '0')}`
    },
    currentKospiData() {
      return this.kospiData[this.kospiPeriod] || this.kospiData['1일']
    },
    currentKosdaqData() {
      return this.kosdaqData[this.kosdaqPeriod] || this.kosdaqData['1일']
    },
    currentStockData() {
      return this.priceStatusData[this.selectedTab] || []
    }
  },
  mounted() {
    // 실시간 업데이트를 위한 타이머 (예시)
    this.timer = setInterval(() => {
      this.now = new Date()
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style src="@/assets/css/pages/price-analysis.css"></style>
