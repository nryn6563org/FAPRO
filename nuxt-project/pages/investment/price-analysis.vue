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

// 리액트 소스에서 추출된 데이터 (Mock Data)
import { kospiData, kosdaqData, priceStatusData } from '@/utils/price-analysis-data'

export default {
  // 컴포넌트 이름: 시세 분석 페이지
  name: 'PriceAnalysis',
  components: {
    PriceAnalysisHeader,
    IndexChartCard,
    StatusFilterSection,
    PriceStatusTable
  },
  data() {
    return {
      viewMode: '시간별', // 지수 보기 모드 ('시간별' | '날짜별')
      kospiPeriod: '1일', // KOSPI 차트 기간 설정
      kosdaqPeriod: '1년', // KOSDAQ 차트 기간 설정
      selectedTab: '이슈종목', // 현재 선택된 시세 현황 탭
      // 시세 현황 필터 탭 목록
      tabs: ['이슈종목', '52주신고가', '52주신저가', '상한가', '하한가', '거래비중상위', '관리종목', '거래정지', '투자주의', '투자경고', '투자위험'],
      kospiData, // KOSPI 차트 데이터
      kosdaqData, // KOSDAQ 차트 데이터
      priceStatusData, // 종목별 시세 현황 데이터
      now: new Date() // 현재 시간 (업데이트 표시용)
    }
  },
  computed: {
    // 현재 날짜 포맷 (MM/DD)
    currentDate() {
      return `${String(this.now.getMonth() + 1).padStart(2, '0')}/${String(this.now.getDate()).padStart(2, '0')}`
    },
    // 현재 시간 포맷 (HH:MM)
    currentTime() {
      return `${String(this.now.getHours()).padStart(2, '0')}:${String(this.now.getMinutes()).padStart(2, '0')}`
    },
    // 선택된 기간에 따른 KOSPI 차트 데이터 반환
    currentKospiData() {
      return this.kospiData[this.kospiPeriod] || this.kospiData['1일']
    },
    // 선택된 기간에 따른 KOSDAQ 차트 데이터 반환
    currentKosdaqData() {
      return this.kosdaqData[this.kosdaqPeriod] || this.kosdaqData['1일']
    },
    // 선택된 탭에 해당하는 종목 리스트 반환
    currentStockData() {
      return this.priceStatusData[this.selectedTab] || []
    }
  },
  mounted() {
    // 실시간 시간 업데이트를 위한 타이머 설정 (1분 간격)
    this.timer = setInterval(() => {
      this.now = new Date()
    }, 60000)
  },
  beforeDestroy() {
    // 컴포넌트 제거 시 타이머 해제 (메모리 누수 방지)
    clearInterval(this.timer)
  }
}
</script>

<style src="@/assets/css/pages/price-analysis.css"></style>
