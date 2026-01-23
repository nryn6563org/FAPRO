<template>
  <div class="p-disclosure-analysis">
    <div class="c-page-header">
      <h2 class="c-page-header__title">공시 분석</h2>
      <p class="c-page-header__desc">실시간 공시 정보 및 영향 분석</p>
    </div>

    <div class="p-disclosure-analysis__grid">
      <div v-for="disclosure in mockDisclosures" :key="disclosure.id" class="p-disclosure-analysis__card">
        <div class="p-disclosure-analysis__icon-group">
           <div class="p-disclosure-analysis__icon-box" :class="getImportanceIconBg(disclosure.importance)">
              <ClipboardList class="p-disclosure-analysis__icon" :class="getImportanceIconColor(disclosure.importance)" />
           </div>
        </div>
        
        <div class="p-disclosure-analysis__content">
           <div class="p-disclosure-analysis__header-row">
              <h3 class="p-disclosure-analysis__stock-name">{{ disclosure.stockName }}</h3>
              <span class="status-badge" :class="getImportanceBadgeClass(disclosure.importance)">
                 {{ getImportanceLabel(disclosure.importance) }}
              </span>
              <span class="p-disclosure-analysis__type-badge">
                 {{ disclosure.type }}
              </span>
           </div>
           
           <h4 class="p-disclosure-analysis__title">{{ disclosure.title }}</h4>
           
           <div class="p-disclosure-analysis__meta">
              <div class="p-disclosure-analysis__time-group">
                <Clock class="p-disclosure-analysis__meta-icon" />
                <span>{{ disclosure.time }}</span>
              </div>
              <span class="p-disclosure-analysis__ticker">{{ disclosure.ticker }}</span>
           </div>
           
           <div class="p-disclosure-analysis__summary-card">
              <p class="p-disclosure-analysis__summary-text">{{ disclosure.summary }}</p>
              <p v-if="disclosure.amount" class="p-disclosure-analysis__amount">
                 계약금액: {{ (disclosure.amount / 100000000).toFixed(0) }}억원
              </p>
           </div>

           <div class="p-disclosure-analysis__actions">
              <Button variant="outline" size="sm" class="p-disclosure-analysis__action-btn">공시 전문 보기</Button>
              <Button size="sm" class="p-disclosure-analysis__action-btn">종목 상세보기</Button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { ClipboardList, Clock } from 'lucide-vue';

const mockDisclosures = [
  {
    id: 1,
    ticker: '005930',
    stockName: '삼성전자',
    title: '단일판매·공급계약체결',
    type: '매출',
    importance: 'high',
    amount: 125000000000,
    time: '10:05',
    impact: 'positive',
    summary: '미국 빅테크사와 AI 반도체 공급 계약 체결'
  },
  {
    id: 2,
    ticker: '000660',
    stockName: 'SK하이닉스',
    title: '주요사항보고서(회사합병결정)',
    type: 'M&A',
    importance: 'high',
    amount: null,
    time: '09:30',
    impact: 'positive',
    summary: '메모리 반도체 관련 기업 인수 결정'
  },
  {
    id: 3,
    ticker: '373220',
    stockName: 'LG에너지솔루션',
    title: '단일판매·공급계약체결',
    type: '매출',
    importance: 'medium',
    amount: 85000000000,
    time: '08:50',
    impact: 'positive',
    summary: '북미 완성차 업체와 배터리 공급 계약'
  },
  {
    id: 4,
    ticker: '005380',
    stockName: '현대차',
    title: '주요경영사항(자기주식취득신탁계약체결결정)',
    type: '자사주',
    importance: 'medium',
    amount: 50000000000,
    time: '전일 16:30',
    impact: 'positive',
    summary: '자사주 매입 신탁 계약 체결'
  },
  {
    id: 5,
    ticker: '051910',
    stockName: 'LG화학',
    title: '기타주요경영사항(자율공시)',
    type: '기타',
    importance: 'low',
    amount: null,
    time: '전일 15:20',
    impact: 'neutral',
    summary: '친환경 소재 사업 확대 계획 발표'
  }
];

export default {
  name: "DisclosureAnalysis",
  components: {
    Button, ClipboardList, Clock
  },
  data() {
    return {
      mockDisclosures
    }
  },
  methods: {
    getImportanceBadgeClass(importance) {
      switch (importance) {
        case 'high': return 'status-badge--danger';
        case 'medium': return 'status-badge--warning';
        case 'low': return 'status-badge--info';
        default: return 'status-badge--info';
      }
    },
    getImportanceLabel(importance) {
      switch (importance) {
        case 'high': return '중요';
        case 'medium': return '보통';
        case 'low': return '참고';
        default: return importance;
      }
    },
    getImportanceIconColor(importance) {
      switch (importance) {
        case 'high': return 'disclosure-icon--red';
        case 'medium': return 'disclosure-icon--orange';
        case 'low': return 'disclosure-icon--blue';
        default: return 'disclosure-icon--blue';
      }
    },
    getTypeBadgeClass() {
      // All use status-badge--info or similar, can differentiate if needed
      return 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400';
    },
    getImportanceIconBg(importance) {
      switch (importance) {
        case 'high': return 'disclosure-bg--red';
        case 'medium': return 'disclosure-bg--orange';
        case 'low': return 'disclosure-bg--blue';
        default: return 'bg-slate-50 dark:bg-slate-800';
      }
    }
  }
}
</script>
<style src="@/assets/css/pages/disclosure-analysis.css"></style>

