<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">공시 분석</h2>
      <p class="p-investment__desc">실시간 공시 정보 및 영향 분석</p>
    </div>

    <div class="c-disclosure-grid">
      <div v-for="disclosure in mockDisclosures" :key="disclosure.id" class="c-content-card c-content-card--hover">
        <div class="c-content-card__body">
          <div class="c-disclosure-card__header">
             <div class="u-flex-center-gap-3 u-flex-1">
                <div :class="['c-disclosure-card__icon-box', `c-disclosure-card__icon-box--${disclosure.importance}`]">
                   <ClipboardList :class="['u-icon-lg', 
                      disclosure.importance === 'high' ? 'u-text-red-600' :
                      disclosure.importance === 'medium' ? 'u-text-yellow-600' : 'u-text-blue-600']" />
                </div>
                <div class="u-flex-1">
                   <div class="u-flex-center-gap-2 mb-1">
                      <h3 class="u-text-lg-bold">{{ disclosure.stockName }}</h3>
                      <span :class="['c-disclosure-card__badge', getImportanceColor(disclosure.importance)]">
                         {{ getImportanceLabel(disclosure.importance) }}
                      </span>
                      <span :class="['c-disclosure-card__type-badge', getTypeColor(disclosure.type)]">
                         {{ disclosure.type }}
                      </span>
                   </div>
                   <p class="c-disclosure-card__title">{{ disclosure.title }}</p>
                   <div class="u-flex-center-gap-2 u-text-meta">
                      <Clock class="u-icon-sm" />
                      <span>{{ disclosure.time }}</span>
                      <span>•</span>
                      <span>{{ disclosure.ticker }}</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div class="space-y-4">
             <div class="c-disclosure-card__summary-box">
                <p class="u-text-sm u-text-slate-700">{{ disclosure.summary }}</p>
                <p v-if="disclosure.amount" class="c-disclosure-card__amount">
                   계약금액: {{ (disclosure.amount / 100000000).toFixed(0) }}억원
                </p>
             </div>

             <div class="u-flex-gap-2">
                <Button variant="outline" class="u-flex-1">공시 전문 보기</Button>
                <Button class="u-flex-1">종목 분석</Button>
             </div>
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
    getImportanceColor(importance) {
      switch (importance) {
        case 'high': return 'c-disclosure-card__badge--high';
        case 'medium': return 'c-disclosure-card__badge--medium';
        case 'low': return 'c-disclosure-card__badge--low';
        default: return 'c-disclosure-card__badge--low';
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
    getTypeColor(type) {
      const colors = {
        '매출': 'c-disclosure-card__type-badge--sales',
        'M&A': 'c-disclosure-card__type-badge--ma',
        '자사주': 'c-disclosure-card__type-badge--stock',
        '기타': 'c-disclosure-card__type-badge--etc'
      };
      return colors[type] || 'c-disclosure-card__type-badge--etc';
    }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

