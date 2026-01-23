<template>
  <div class="p-report-analysis">
    <div class="c-page-header">
      <h2 class="c-page-header__title">리포트 분석</h2>
      <p class="c-page-header__desc">증권사 애널리스트 리포트 및 목표가 분석</p>
    </div>

    <div class="p-report-analysis__grid">
      <div v-for="report in mockReports" :key="report.id" class="p-report-analysis__card">
        <div class="p-report-analysis__card-header">
          <div class="p-report-analysis__source-group">
            <div class="p-report-analysis__icon-box">
              <FileBarChart class="p-report-analysis__icon" />
            </div>
            <div class="p-report-analysis__title-group">
              <h3 class="p-report-analysis__card-title">{{ report.title }}</h3>
              <div class="p-report-analysis__metadata">
                <Building2 class="p-report-analysis__meta-icon" />
                <span>{{ report.firm }}</span>
                <span>•</span>
                <span>{{ report.analyst }}</span>
                <span>•</span>
                <span>{{ report.date }}</span>
              </div>
            </div>
          </div>
          <span class="status-badge" :class="getRatingBadgeClass(report.rating)">
            {{ getRatingLabel(report.rating) }}
          </span>
        </div>
        <div class="p-report-analysis__card-body">
          <div class="p-report-analysis__data-panel">
            <div class="p-report-analysis__metric">
              <p class="p-report-analysis__metric-label">종목명</p>
              <p class="p-report-analysis__metric-value">{{ report.stockName }}</p>
              <p class="p-report-analysis__metric-subtext">{{ report.ticker }}</p>
            </div>
            <div class="p-report-analysis__metric">
              <p class="p-report-analysis__metric-label">현재가</p>
              <p class="p-report-analysis__metric-value">{{ report.currentPrice.toLocaleString() }}원</p>
            </div>
            <div class="p-report-analysis__metric">
              <p class="p-report-analysis__metric-label">목표가</p>
              <p class="p-report-analysis__metric-value" style="color: var(--blue-600)">{{ report.targetPrice.toLocaleString() }}원</p>
            </div>
            <div class="p-report-analysis__metric">
              <p class="p-report-analysis__metric-label">상승여력</p>
              <div class="p-report-analysis__upside-box">
                <TrendingUp class="p-report-analysis__upside-icon indicator--positive" />
                <span class="indicator--positive">+{{ report.upside }}%</span>
              </div>
            </div>
          </div>

          <div class="p-report-analysis__actions">
            <Button variant="outline" class="p-report-analysis__action-btn">리포트 전문 보기</Button>
            <Button class="p-report-analysis__action-btn">종목 상세보기</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { FileBarChart, Building2, TrendingUp } from 'lucide-vue';

const mockReports = [
  {
    id: 1,
    title: '삼성전자, AI 반도체 수요 증가로 목표가 상향',
    firm: 'KB증권',
    analyst: '김분석',
    ticker: '005930',
    stockName: '삼성전자',
    rating: 'Buy',
    targetPrice: 85000,
    currentPrice: 72500,
    upside: 17.2,
    date: '2026-01-20'
  },
  {
    id: 2,
    title: 'SK하이닉스, HBM3 출하 본격화 전망',
    firm: '미래에셋증권',
    analyst: '이애널',
    ticker: '000660',
    stockName: 'SK하이닉스',
    rating: 'Buy',
    targetPrice: 160000,
    currentPrice: 145000,
    upside: 10.3,
    date: '2026-01-20'
  },
  {
    id: 3,
    title: 'LG에너지솔루션, 북미 수주 확대 기대',
    firm: '한국투자증권',
    analyst: '박리서치',
    ticker: '373220',
    stockName: 'LG에너지솔루션',
    rating: 'Buy',
    targetPrice: 520000,
    currentPrice: 485000,
    upside: 7.2,
    date: '2026-01-19'
  },
  {
    id: 4,
    title: '현대차, 전기차 판매 증가세 지속',
    firm: '신한투자증권',
    analyst: '최전문',
    ticker: '005380',
    stockName: '현대차',
    rating: 'Hold',
    targetPrice: 245000,
    currentPrice: 240000,
    upside: 2.1,
    date: '2026-01-19'
  }
];

export default {
  name: "ReportAnalysis",
  components: {
    Button, FileBarChart, Building2, TrendingUp
  },
  data() {
    return {
      mockReports
    }
  },
  methods: {
    getRatingBadgeClass(rating) {
      switch (rating) {
        case 'Buy': return 'status-badge--positive';
        case 'Hold': return 'status-badge--warning';
        case 'Sell': return 'status-badge--danger';
        default: return 'status-badge--info';
      }
    },
    getRatingLabel(rating) {
      switch (rating) {
        case 'Buy': return '매수';
        case 'Hold': return '보유';
        case 'Sell': return '매도';
        default: return rating;
      }
    }
  }
}
</script>

<style src="@/assets/css/pages/report-analysis.css"></style>

