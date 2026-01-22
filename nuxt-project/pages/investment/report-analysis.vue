<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">리포트 분석</h2>
      <p class="p-investment__desc">증권사 애널리스트 리포트 및 목표가 분석</p>
    </div>

    <div class="l-list-grid">
      <div v-for="report in mockReports" :key="report.id" class="c-content-card c-content-card--hover">
        <div class="c-report-card__header">
           <div class="u-flex-between-start">
              <div class="u-flex-center-gap-3-flex-1">
                  <div class="c-report-card__icon-box">
                     <FileBarChart class="c-report-card__icon" />
                  </div>
                  <div class="u-flex-1">
                     <h3 class="c-report-card__title">{{ report.title }}</h3>
                     <div class="c-report-card__meta">
                        <Building2 class="u-icon-sm" />
                        <span>{{ report.firm }}</span>
                        <span>•</span>
                        <span>{{ report.analyst }}</span>
                        <span>•</span>
                        <span>{{ report.date }}</span>
                     </div>
                  </div>
              </div>
              <span :class="['c-badge', getRatingColor(report.rating)]">
                 {{ getRatingLabel(report.rating) }}
              </span>
           </div>
        </div>
        <div class="c-report-card__body">
            <div class="c-report-card__data-grid">
                <div>
                   <p class="c-report-card__data-label">종목명</p>
                   <p class="c-report-card__data-value">{{ report.stockName }}</p>
                   <p class="c-report-card__data-subtext">{{ report.ticker }}</p>
                </div>
                <div>
                   <p class="c-report-card__data-label">현재가</p>
                   <p class="c-report-card__data-value">{{ report.currentPrice.toLocaleString() }}원</p>
                </div>
                <div>
                   <p class="c-report-card__data-label">목표가</p>
                   <p class="c-report-card__data-value u-text-primary">{{ report.targetPrice.toLocaleString() }}원</p>
                </div>
                <div>
                   <p class="c-report-card__data-label">상승여력</p>
                   <div class="u-flex-center-gap-1">
                      <TrendingUp class="u-icon-sm u-text-up" />
                      <p class="c-report-card__data-value u-text-up">+{{ report.upside }}%</p>
                   </div>
                </div>
            </div>

            <div class="c-report-card__actions">
               <Button variant="outline" class="u-flex-1">리포트 전문 보기</Button>
               <Button class="u-flex-1">종목 상세보기</Button>
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
    getRatingColor(rating) {
      switch (rating) {
        case 'Buy':
          return 'c-badge--buy';
        case 'Hold':
          return 'c-badge--hold';
        case 'Sell':
          return 'c-badge--sell';
        default:
          return 'c-badge--default';
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
<style src="@/assets/css/pages/investment.css"></style>

