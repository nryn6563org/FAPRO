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
import ReportAnalysisHeader from '@/components/organisms/investment/report-analysis/ReportAnalysisHeader.vue'
import ReportFilterTabs from '@/components/organisms/investment/report-analysis/ReportFilterTabs.vue'
import ReportDataTable from '@/components/organisms/investment/report-analysis/ReportDataTable.vue'
import ReportDetailModal from '@/components/organisms/investment/ReportDetailModal.vue'

// 데이터 유틸리티 임포트 (Mock Data)
import { reportCategories, mockReportData } from '@/utils/report-analysis-data'

export default {
  // 컴포넌트 이름: 리포트 분석 페이지
  name: 'ReportAnalysis',
  components: {
    ReportAnalysisHeader,
    ReportFilterTabs,
    ReportDataTable,
    ReportDetailModal
  },
  data() {
    return {
      tabs: reportCategories, // 리포트 필터 카테고리 목록
      activeTab: '신규리포트', // 현재 선택된 리포트 필터 탭
      isDetailModalOpen: false, // 리포트 상세 모달 표시 여부
      selectedReport: null, // 모달에 표시할 선택된 리포트 상세 데이터
      mockReportData // 탭별 리포트 목록 데이터
    }
  },
  computed: {
    // 현재 선택된 탭에 해당하는 리포트 목록 반환
    currentReports() {
      return this.mockReportData[this.activeTab] || []
    }
  },
  methods: {
    /**
     * 리포트 상세 보기 모달 오픈
     * @param {Object} report - 선택된 리포트 객체
     */
    openReportDetail(report) {
      this.selectedReport = report
      this.isDetailModalOpen = true
    }
  }
}
</script>

<style src="@/assets/css/pages/report-analysis.css"></style>
