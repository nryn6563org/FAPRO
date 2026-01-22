<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">추천 종목</h2>
      <p class="p-investment__desc">투자 기간별 AI 추천 종목</p>
    </div>

    <div class="c-content-card">
      <div class="c-content-card__body p-6">
         <!-- Tabs -->
         <div class="c-recommend-tabs">
           <button 
             v-for="tab in tabOptions" 
             :key="tab.value"
             :class="['c-recommend-tab-btn', activeTab === tab.value ? 'c-recommend-tab-btn--active' : 'c-recommend-tab-btn--inactive']"
             @click="activeTab = tab.value"
           >
             {{ tab.label }}
           </button>
         </div>

         <div class="space-y-4">
             <div v-for="stock in currentStocks" :key="stock.ticker" class="c-content-card c-content-card--hover">
                <div class="c-recommend-card-header">
                   <div class="u-flex-between-start">
                      <div class="u-flex-center-gap-3">
                         <div class="c-recommend-card__icon-box">
                            <Lightbulb class="u-icon-lg-blue" />
                         </div>
                         <div>
                            <h3 class="u-text-lg-bold">{{ stock.name }}</h3>
                            <p class="u-text-sm-slate-500">{{ stock.ticker }}</p>
                         </div>
                      </div>
                      <div class="text-right">
                         <span class="c-recommend-card__score-badge">
                            AI {{ stock.aiScore }}점
                         </span>
                         <p class="u-text-xs-slate-500">신뢰도 {{ stock.confidence }}%</p>
                      </div>
                   </div>
                </div>
                <div class="c-recommend-card__body">
                   <div class="c-recommend-stats-grid">
                      <div>
                         <p class="u-text-xs-slate-500 mb-1">현재가</p>
                         <p class="u-font-semibold">{{ stock.currentPrice.toLocaleString() }}원</p>
                      </div>
                      <div>
                         <p class="u-text-xs-slate-500 mb-1">목표가</p>
                         <p class="u-font-semibold u-text-blue-600">{{ stock.targetPrice.toLocaleString() }}원</p>
                      </div>
                      <div>
                         <p class="u-text-xs-slate-500 mb-1">기대수익</p>
                         <div class="u-flex-center-gap-1">
                            <TrendingUp class="u-icon-sm u-text-green-600" />
                            <p class="u-font-semibold u-text-green-600">+{{ stock.upside }}%</p>
                         </div>
                      </div>
                   </div>

                   <div class="c-recommend-reason-box">
                      <Target class="u-icon-base u-text-blue-600 u-flex-shrink-0 u-mt-0_5" />
                      <div>
                         <p class="u-text-sm-bold-blue-900">{{ stock.reason }}</p>
                         <div class="c-recommend-period-box">
                            <Clock class="u-icon-sm" />
                            <span>목표 기간: {{ stock.period }}</span>
                         </div>
                      </div>
                   </div>

                   <Button class="u-w-full">상세 분석 보기</Button>
                </div>
             </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { Lightbulb, TrendingUp, Target, Clock } from 'lucide-vue';

const recommendStocks = {
  short: [
    {
      ticker: '005930',
      name: '삼성전자',
      currentPrice: 72500,
      targetPrice: 78000,
      upside: 7.6,
      aiScore: 92,
      period: '1주',
      reason: '단기 급등 모멘텀 포착',
      confidence: 88
    },
    {
      ticker: '035720',
      name: '카카오',
      currentPrice: 52000,
      targetPrice: 56000,
      upside: 7.7,
      aiScore: 89,
      period: '1주',
      reason: 'AI 서비스 출시 임박',
      confidence: 85
    }
  ],
  medium: [
    {
      ticker: '000660',
      name: 'SK하이닉스',
      currentPrice: 145000,
      targetPrice: 165000,
      upside: 13.8,
      aiScore: 94,
      period: '1개월',
      reason: 'HBM 시장 점유율 확대',
      confidence: 92
    },
    {
      ticker: '373220',
      name: 'LG에너지솔루션',
      currentPrice: 485000,
      targetPrice: 550000,
      upside: 13.4,
      aiScore: 91,
      period: '1개월',
      reason: '북미 수주 확대 전망',
      confidence: 90
    }
  ],
  long: [
    {
      ticker: '207940',
      name: '삼성바이오로직스',
      currentPrice: 875000,
      targetPrice: 1050000,
      upside: 20.0,
      aiScore: 96,
      period: '3개월',
      reason: '바이오 CDMO 시장 성장',
      confidence: 94
    },
    {
      ticker: '079550',
      name: 'LIG넥스원',
      currentPrice: 125000,
      targetPrice: 160000,
      upside: 28.0,
      aiScore: 95,
      period: '3개월',
      reason: 'K-방산 중장기 성장',
      confidence: 93
    }
  ]
};

export default {
  name: "RecommendStocks",
  components: {
    Button, Lightbulb, TrendingUp, Target, Clock
  },
  data() {
    return {
      activeTab: 'medium',
      recommendStocks,
      tabOptions: [
        { value: 'short', label: '단기 (1주)' },
        { value: 'medium', label: '중기 (1개월)' },
        { value: 'long', label: '장기 (3개월)' }
      ]
    }
  },
  computed: {
    currentStocks() {
      return this.recommendStocks[this.activeTab];
    }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

