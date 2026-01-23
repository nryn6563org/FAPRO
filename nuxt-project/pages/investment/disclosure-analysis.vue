<template>
  <div class="p-disclosure">
    <div class="c-page-header">
      <div class="c-page-header__inner">
        <div class="c-page-header__content">
          <h2 class="c-page-header__title">공시 분석</h2>
          <p class="c-page-header__desc">실시간 공시 정보 및 영향 분석을 제공합니다.</p>
        </div>
      </div>
    </div>

    <!-- Summary Metrics -->
    <div class="p-disclosure__metrics">
        <div v-for="(metric, idx) in summaryMetrics" :key="idx" class="p-disclosure__metric-card">
            <div class="p-disclosure__metric-icon-box" :class="metric.bgClass">
                <component :is="metric.icon" class="p-disclosure__metric-icon" :class="metric.iconClass" />
            </div>
            <div class="p-disclosure__metric-content">
                <p class="p-disclosure__metric-label">{{ metric.label }}</p>
                <p class="p-disclosure__metric-value">{{ metric.value }}</p>
            </div>
        </div>
    </div>

    <!-- Disclosure Feed (2-column on 1920x1080) -->
    <div class="p-disclosure__list">
      <div v-for="disclosure in mockDisclosures" :key="disclosure.id" class="c-disclosure-item">
        <div class="c-disclosure-item__header">
            <div class="c-disclosure-item__stock-group">
                <div class="c-disclosure-item__avatar">
                    {{ disclosure.stockName[0] }}
                </div>
                <div class="c-disclosure-item__meta">
                    <h3 class="c-disclosure-item__name">{{ disclosure.stockName }}</h3>
                    <span class="c-disclosure-item__time">{{ disclosure.time }} • {{ disclosure.ticker }}</span>
                </div>
            </div>
            <span class="c-disclosure-item__title-tag">
                {{ disclosure.title }}
            </span>
        </div>
        
        <div class="c-disclosure-item__body">
           <h4 class="c-disclosure-item__news-title">{{ disclosure.summary }}</h4>
           
           <div class="c-disclosure-item__analysis">
              <Sparkles class="c-disclosure-item__analysis-icon" />
              <div class="c-disclosure-item__analysis-text">
                  <strong>AI 분석 의견:</strong>
                  본 공시는 {{ disclosure.stockName }}의 매출 증대에 긍정적인 영향을 줄것으로 분석됩니다. 
                  계약 규모는 약 {{ (disclosure.amount / 100000000).toFixed(0) }}억원 수준입니다.
              </div>
           </div>
        </div>

        <div class="c-disclosure-item__footer">
            <div class="c-disclosure-item__tags">
                <span class="c-disclosure-item__sector-tag">IT/반도체</span>
                <span class="c-disclosure-item__sector-tag" :class="getImportanceBadgeClass(disclosure.importance)">
                    {{ getImportanceLabel(disclosure.importance) }}
                </span>
            </div>
            <div class="c-disclosure-item__actions">
                <Button variant="outline" size="sm" class="c-disclosure-item__action-btn">공시원문</Button>
                <Button size="sm" class="c-disclosure-item__action-btn">상세분석</Button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { ClipboardList, Clock, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-vue';

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
    Button, ClipboardList, Clock, Sparkles, AlertCircle, CheckCircle2
  },
  data() {
    return {
      mockDisclosures,
      summaryMetrics: [
          { label: '금일 공시', value: '124건', icon: 'ClipboardList', bgClass: 'bg-blue-50 dark:bg-blue-900/20', iconClass: 'text-blue-600 dark:text-blue-400' },
          { label: '중요 공시', value: '12건', icon: 'AlertCircle', bgClass: 'bg-rose-50 dark:bg-rose-900/20', iconClass: 'text-rose-600 dark:text-rose-400' },
          { label: '분석 완료', value: '98건', icon: 'CheckCircle2', bgClass: 'bg-emerald-50 dark:bg-emerald-900/20', iconClass: 'text-emerald-600 dark:text-emerald-400' },
          { label: '영향 증가', value: '45개', icon: 'Sparkles', bgClass: 'bg-amber-50 dark:bg-amber-900/20', iconClass: 'text-amber-600 dark:text-amber-400' },
      ]
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

