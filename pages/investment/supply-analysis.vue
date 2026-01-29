<!-- 수급분석 페이지: 기관 및 외국인 등 주요 투자 주체의 매매 동향 분석 정보 제공 -->
<template>
  <div class="p-supply-analysis">
    <!-- 페이지 헤더 -->
    <SupplyAnalysisHeader />

    <!-- 마켓 요약 지표 -->
    <MarketSummarySection :metrics="marketSummaryMetrics" />

    <!-- 탭 네비게이션 -->
    <SupplyTabNavigation
      :tabs="tabs"
      :selected-tab="selectedTab"
      @update-tab="selectedTab = $event"
    />

    <div class="p-supply-analysis__content">


      <!-- 1. 매수비중 탭 -->
      <div v-if="selectedTab === '매수비중'" class="p-supply-analysis__grid p-supply-analysis__grid--2">
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="기관"
          :data="buyRatioData.institution"
          data-label="매수비중"
          value-type="ratio"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="외국인"
          :data="buyRatioData.foreign"
          data-label="매수비중"
          value-type="ratio"
        />
      </div>

      <!-- 2. 순매수 탭 -->
      <div v-else-if="selectedTab === '순매수'" class="p-supply-analysis__grid p-supply-analysis__grid--4">
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="기관 코스피"
          :data="netBuyData.institutionKospi"
          data-label="순매수금액"
          value-type="amount"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="기관 코스닥"
          :data="netBuyData.institutionKosdaq"
          data-label="순매수금액"
          value-type="amount"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="외국인 코스피"
          :data="netBuyData.foreignKospi"
          data-label="순매수금액"
          value-type="amount"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="외국인 코스닥"
          :data="netBuyData.foreignKosdaq"
          data-label="순매수금액"
          value-type="amount"
        />
      </div>

      <!-- 3. 순매수 상위 신규진입 탭 -->
      <div v-else-if="selectedTab === '순매수 상위 신규진입'" class="p-supply-analysis__grid p-supply-analysis__grid--2">
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="기관"
          :data="newEntryData.institution"
          data-label="순매수"
          value-type="amount"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="외국인"
          :data="newEntryData.foreign"
          data-label="순매수"
          value-type="amount"
        />
      </div>

      <!-- 4. 주요기관 순매수 상위 탭 -->
      <div v-else-if="selectedTab === '주요기관 순매수 상위'" class="p-supply-analysis__grid p-supply-analysis__grid--3">
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="연기금"
          :data="majorInstitutionData.pension"
          data-label="순매수"
          value-type="amount"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="투신"
          :data="majorInstitutionData.trust"
          data-label="순매수"
          value-type="amount"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="사모펀드"
          :data="majorInstitutionData.private"
          data-label="순매수"
          value-type="amount"
        />
      </div>

      <!-- 5. 연속순매수 탭 -->
      <div v-else-if="selectedTab === '연속순매수'" class="p-supply-analysis__grid p-supply-analysis__grid--2">
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="기관"
          :data="continuousBuyData.institution"
          data-label="연속순매수"
          value-type="days"
        />
        <SupplyDataTable
          :update-time="formattedUpdateTime"
          title="외국인"
          :data="continuousBuyData.foreign"
          data-label="연속순매수"
          value-type="days"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 개별 컴포넌트 임포트
import SupplyAnalysisHeader from '@/components/organisms/investment/supply-analysis/SupplyAnalysisHeader.vue'
import MarketSummarySection from '@/components/organisms/investment/supply-analysis/MarketSummarySection.vue'
import SupplyTabNavigation from '@/components/organisms/investment/supply-analysis/SupplyTabNavigation.vue'
import SupplyDataTable from '@/components/organisms/investment/supply-analysis/SupplyDataTable.vue'

// 데이터 유틸리티 임포트 (Mock Data)
import {
  buyRatioData,
  netBuyData,
  newEntryData,
  majorInstitutionData,
  continuousBuyData,
  marketSummaryMetrics
} from '@/utils/supply-analysis-data'

export default {
  // 컴포넌트 이름: 수급 분석 페이지
  name: 'SupplyAnalysis',
  components: {
    SupplyAnalysisHeader,
    MarketSummarySection,
    SupplyTabNavigation,
    SupplyDataTable
  },
  data() {
    return {
      selectedTab: '매수비중', // 현재 선택된 분석 탭
      tabs: ['매수비중', '순매수', '순매수 상위 신규진입', '주요기관 순매수 상위', '연속순매수'],
      // 탭별 데이터 소스 매핑
      buyRatioData,
      netBuyData,
      newEntryData,
      majorInstitutionData,
      continuousBuyData,
      marketSummaryMetrics, // 상단 마켓 요약 지표
      now: new Date() // 실시간 업데이트 시간용
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
    // 통합 업데이트 시간 포맷
    formattedUpdateTime() {
      return `${this.currentDate} ${this.currentTime}`
    }
  },
  mounted() {
    // 1분마다 시간 업데이트
    this.timer = setInterval(() => {
      this.now = new Date()
    }, 60000)
  },
  beforeDestroy() {
    // 메모리 누수 방지를 위한 타이머 해제
    clearInterval(this.timer)
  }
}
</script>

<style src="@/assets/css/pages/supply-analysis.css"></style>
