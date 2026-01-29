<!-- 공시 분석 페이지: 실시간 공시 정보 및 AI 기반 영향 분석 정보 제공 -->
<template>
  <div class="p-disclosure-analysis">
    <!-- 페이지 헤더 -->
    <DisclosureAnalysisHeader last-update="2024.01.22 14:40" />

    <!-- 요약 메트릭 섹션 -->
    <DisclosureSummaryMetrics />

    <!-- 공시 필터 탭 -->
    <DisclosureFilterTabs
      :tabs="tabs"
      :active-tab="activeTab"
      @update-tab="handleMainTabChange"
    />

    <!-- 공시 서브 필터 탭 -->
    <DisclosureSubFilterTabs
      v-if="subTabs.length > 0"
      :tabs="subTabs"
      :active-tab="activeSubTab"
      @update-sub-tab="activeSubTab = $event"
    />

    <div class="p-disclosure-analysis__content">
      <!-- 공시 데이터 테이블 -->
      <div class="p-disclosure-analysis__table-wrapper">
        <DisclosureDataTable
          :type="activeTab"
          :items="currentDisclosures"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 개별 컴포넌트 임포트
import DisclosureAnalysisHeader from '@/components/organisms/investment/disclosure-analysis/DisclosureAnalysisHeader.vue'
import DisclosureSummaryMetrics from '@/components/organisms/investment/disclosure-analysis/DisclosureSummaryMetrics.vue'
import DisclosureFilterTabs from '@/components/organisms/investment/disclosure-analysis/DisclosureFilterTabs.vue'
import DisclosureSubFilterTabs from '@/components/organisms/investment/disclosure-analysis/DisclosureSubFilterTabs.vue'
import DisclosureDataTable from '@/components/organisms/investment/disclosure-analysis/DisclosureDataTable.vue'

// 데이터 유틸리티 임포트
import { disclosureCategories, disclosureSubCategories, mockDisclosureData } from '@/utils/disclosure-analysis-data'

export default {
  name: 'DisclosureAnalysis',
  components: {
    DisclosureAnalysisHeader,
    DisclosureSummaryMetrics,
    DisclosureFilterTabs,
    DisclosureSubFilterTabs,
    DisclosureDataTable
  },
  data() {
    return {
      tabs: disclosureCategories,
      activeTab: '수주공시',
      activeSubTab: '매출액 10%이상',
      mockDisclosureData,
      disclosureSubCategories
    }
  },
  computed: {
    subTabs() {
      return this.disclosureSubCategories[this.activeTab] || []
    },
    currentDisclosures() {
      const mainData = this.mockDisclosureData[this.activeTab] || {}
      return mainData[this.activeSubTab] || []
    }
  },
  methods: {
    handleMainTabChange(tab) {
      this.activeTab = tab
      const sub = this.disclosureSubCategories[tab]
      if (sub && sub.length > 0) {
        this.activeSubTab = sub[0]
      } else {
        this.activeSubTab = ''
      }
    }
  }
}
</script>

<style src="@/assets/css/pages/disclosure-analysis.css"></style>
