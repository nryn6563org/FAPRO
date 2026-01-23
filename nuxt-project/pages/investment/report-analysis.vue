<!-- 리포트 분석 페이지: 증권사 애널리스트 리포트 목록 및 목표가/의견 요약 제공 -->
<template>
  <div class="p-report-analysis">
    <!-- Page Header (Premium 1920x1080 Style) -->
    <div class="c-page-header">
      <div class="c-page-header__inner">
        <div class="c-page-header__content">
          <h2 class="c-page-header__title">리포트 분석</h2>
          <p class="c-page-header__desc">증권사 애널리스트 리포트 및 목표가 변동 현황입니다.</p>
        </div>
        <div class="c-page-header__update">
          <Calendar class="c-page-header__calendar-icon" />
          마지막 업데이트: 2024.01.22 09:25
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="p-report-analysis__filter-card">
      <div class="p-report-analysis__filter-group">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="p-report-analysis__filter-btn"
          :class="activeTab === tab ? 'p-report-analysis__filter-btn--active' : 'p-report-analysis__filter-btn--inactive'"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Data Table Container -->
    <div class="p-report-analysis__table-container">
      <div class="p-report-analysis__table-wrapper">
        <table class="p-report-analysis__table">
          <thead class="p-report-analysis__thead">
            <tr class="p-report-analysis__tr">
              <th class="p-report-analysis__th p-report-analysis__th--center">날짜</th>
              <th class="p-report-analysis__th">종목명</th>
              <th class="p-report-analysis__th p-report-analysis__th--right">등락률</th>
              <th class="p-report-analysis__th p-report-analysis__th--right">목표가</th>
              <th class="p-report-analysis__th p-report-analysis__th--center">투자의견</th>
              <th class="p-report-analysis__th">리포트 제목</th>
              <th class="p-report-analysis__th p-report-analysis__th--center">증권사</th>
            </tr>
          </thead>
          <tbody class="p-report-analysis__tbody">
            <tr v-for="(report, idx) in currentReports" :key="idx" class="p-report-analysis__tr">
              <td class="p-report-analysis__td p-report-analysis__td--center">{{ report.date }}</td>
              <td class="p-report-analysis__td">
                <div class="p-report-analysis__stock-group">
                  <div class="p-report-analysis__stock-initial" :style="{ backgroundColor: getStockInitialColor(report.stockName) }">
                    {{ report.stockName.substring(0, 1) }}
                  </div>
                  <span class="p-report-analysis__stock-name">{{ report.stockName }}</span>
                </div>
              </td>
              <td class="p-report-analysis__td p-report-analysis__td--right">
                <span :class="report.changeRate > 0 ? 'indicator--positive' : report.changeRate < 0 ? 'indicator--negative' : ''">
                  {{ report.changeRate > 0 ? '+' : '' }}{{ report.changeRate }}%
                </span>
              </td>
              <td class="p-report-analysis__td p-report-analysis__td--right u-font-bold">{{ formatPrice(report.targetPrice) }}</td>
              <td class="p-report-analysis__td p-report-analysis__td--center">
                <span class="status-badge--premium" :class="getRatingBadgeClass(report.rating)">
                  {{ report.rating }}
                </span>
              </td>
              <td class="p-report-analysis__td">
                <span class="p-report-analysis__title-link" @click="openReportDetail(report)">
                  {{ report.title }}
                </span>
              </td>
              <td class="p-report-analysis__td p-report-analysis__th--center p-report-analysis__firm">{{ report.firm }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="p-report-analysis__pagination">
        <p class="p-report-analysis__guide">※ 신규리포트는 증권사에서 신규 매수 의견을 제시한 리포트입니다.</p>
        <div class="p-report-analysis__pager">
           <button class="p-report-analysis__page-btn p-report-analysis__page-btn--inactive">
             <ChevronLeft class="u-icon-sm" />
           </button>
           <button 
             v-for="i in 3" 
             :key="i"
             class="p-report-analysis__page-btn"
             :class="i === 1 ? 'p-report-analysis__page-btn--active' : 'p-report-analysis__page-btn--inactive'"
           >
             {{ i }}
           </button>
           <button class="p-report-analysis__page-btn p-report-analysis__page-btn--inactive">
             <ChevronRight class="u-icon-sm" />
           </button>
        </div>
      </div>
    </div>

    <!-- Report Detail Modal -->
    <ReportDetailModal 
      :open="isDetailModalOpen"
      :report="selectedReport"
      @update:open="isDetailModalOpen = $event"
    />
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import ReportDetailModal from '@/components/domain/investment/ReportDetailModal.vue';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue';

const CATEGORIES = ['신규리포트', '목표가상향', '목표가하향', '기관관심리포트', '외국인관심리포트', '연기금관심리포트', '증권사관심종목', '목표가높음'];

const mockData = {
  '신규리포트': [
    { date: '01/22', stockName: '두산에스나', currentPrice: 52600, changeRate: 1.94, targetPrice: 69000, title: '비메모리 턴어라운드와 직관적인 동행', firm: '교보증권', rating: 'BUY(신규)', upside: 31.5, content: '국내 대표 시스템반도체 디자인하우스. DSP 전환의 성과가 보여줄 원년...' },
    { date: '01/22', stockName: '에이디테크놀로지', currentPrice: 34750, changeRate: 1.46, targetPrice: 45000, title: 'DSP 전환의 결실을 맺을 엔넬', firm: '교보증권', rating: 'BUY(신규)', upside: 29.5, content: '국내 대표 시스템반도체 디자인하우스로서 비메모리 반도체 턴어라운드...' },
    { date: '01/22', stockName: '네패스', currentPrice: 15380, changeRate: -1.41, targetPrice: 20000, title: '지정학적 불확실성이 가져온 혼재', firm: '교보증권', rating: 'HOLD', upside: 30.1 },
    { date: '01/21', stockName: '아모센스', currentPrice: 10090, changeRate: 8.15, targetPrice: 16000, title: '블랭에서기 수혜 본격화, 동반된 리레이팅', firm: 'DS투자증권', rating: 'BUY', upside: 58.5 }
  ],
  '목표가상향': [
      { date: '01/22', stockName: '삼성전자', currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: 'AI 반도체 수요 증가로 목표가 상향', firm: 'KB증권', rating: 'BUY', upside: 14.1, content: 'AI 서버 수요 증가에 따른 HBM 매출 본격화 기대...' }
  ]
}

export default {
  name: "ReportAnalysis",
  components: {
    Button, ReportDetailModal, Calendar, ChevronLeft, ChevronRight
  },
  data() {
    return {
      tabs: CATEGORIES,
      activeTab: '신규리포트',
      isDetailModalOpen: false,
      selectedReport: null
    }
  },
  computed: {
    currentReports() {
      return mockData[this.activeTab] || [];
    }
  },
  methods: {
    formatPrice(value) {
      if (!value) return '';
      return value.toLocaleString() + '원';
    },
    getRatingBadgeClass(rating) {
      if (rating.includes('BUY')) return 'status-badge--positive';
      if (rating.includes('HOLD')) return 'status-badge--warning';
      if (rating.includes('SELL')) return 'status-badge--danger';
      return 'status-badge--info';
    },
    getStockInitialColor(name) {
      const colors = ["#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#ef4444", "#f97316"];
      return colors[name.charCodeAt(0) % colors.length];
    },
    openReportDetail(report) {
      this.selectedReport = report;
      this.isDetailModalOpen = true;
    }
  }
}
</script>

<style src="@/assets/css/pages/report-analysis.css"></style>

