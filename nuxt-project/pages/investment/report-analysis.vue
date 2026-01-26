<!-- 리포트 분석 페이지: 증권사 애널리스트 리포트 및 투자의견 분석 정보 제공 -->
<template>
  <div class="p-report-analysis">
    <!-- 페이지 헤더 -->
    <ReportAnalysisHeader last-update="2024.01.22 09:25" />

    <!-- 리포트 필터 탭 -->
    <ReportFilterTabs
      :tabs="tabs"
      :active-tab="activeTab"
      @update-tab="activeTab = $event"
    />

    <div class="p-report-analysis__content">
      <!-- 리포트 데이터 테이블 -->
      <div class="p-report-analysis__table-wrapper">
        <ReportDataTable
          :reports="currentReports"
          @select-report="openReportDetail"
        />
      </div>
    </div>

    <!-- 리포트 상세 모달 -->
    <ReportDetailModal
      :open="isDetailModalOpen"
      :report="selectedReport"
      @update:open="isDetailModalOpen = $event"
    />
  </div>
</template>

<script>
// 개별 컴포넌트 임포트
import ReportAnalysisHeader from '@/components/investment/report-analysis/ReportAnalysisHeader.vue'
import ReportFilterTabs from '@/components/investment/report-analysis/ReportFilterTabs.vue'
import ReportDataTable from '@/components/investment/report-analysis/ReportDataTable.vue'
import ReportDetailModal from '@/components/domain/investment/ReportDetailModal.vue'

// 데이터 유틸리티 임포트
import { reportCategories, mockReportData } from '@/utils/report-analysis-data'

export default {
  name: 'ReportAnalysis',
  components: {
    ReportAnalysisHeader,
    ReportFilterTabs,
    ReportDataTable,
    ReportDetailModal
  },
  data() {
    return {
      tabs: reportCategories,
      activeTab: '신규리포트',
      isDetailModalOpen: false,
      selectedReport: null,
      mockReportData
    }
  },
  computed: {
    currentReports() {
      return this.mockReportData[this.activeTab] || []
    }
  },
  methods: {
    openReportDetail(report) {
      this.selectedReport = report
      this.isDetailModalOpen = true
    }
  }
}
</script>

<style src="@/assets/css/pages/report-analysis.css"></style>
