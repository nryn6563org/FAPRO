<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">추천 종목</h2>
      <p class="p-investment__desc">투자 기간별 AI 추천 종목</p>
    </div>

    <div class="c-content-card">
      <div class="c-content-card__body p-6">
         <!-- Tabs -->
         <div class="grid grid-cols-3 bg-slate-100 p-1 rounded-lg mb-6">
           <button 
             v-for="tab in tabOptions" 
             :key="tab.value"
             :class="['text-sm font-medium py-2 rounded-md transition-all', activeTab === tab.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900']"
             @click="activeTab = tab.value"
           >
             {{ tab.label }}
           </button>
         </div>

         <div class="space-y-4">
             <div v-for="stock in currentStocks" :key="stock.ticker" class="c-content-card c-content-card--hover">
                <div class="c-content-card__header bg-white border-b-slate-100 shadow-none pb-0">
                   <div class="flex items-start justify-between">
                      <div class="flex items-center gap-3">
                         <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Lightbulb class="w-6 h-6 text-blue-600" />
                         </div>
                         <div>
                            <h3 class="text-lg font-semibold">{{ stock.name }}</h3>
                            <p class="text-sm text-slate-500">{{ stock.ticker }}</p>
                         </div>
                      </div>
                      <div class="text-right">
                         <span class="block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500 text-white mb-2">
                            AI {{ stock.aiScore }}점
                         </span>
                         <p class="text-xs text-slate-500">신뢰도 {{ stock.confidence }}%</p>
                      </div>
                   </div>
                </div>
                <div class="p-6 space-y-4">
                   <div class="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                         <p class="text-xs text-slate-500 mb-1">현재가</p>
                         <p class="font-semibold">{{ stock.currentPrice.toLocaleString() }}원</p>
                      </div>
                      <div>
                         <p class="text-xs text-slate-500 mb-1">목표가</p>
                         <p class="font-semibold text-blue-600">{{ stock.targetPrice.toLocaleString() }}원</p>
                      </div>
                      <div>
                         <p class="text-xs text-slate-500 mb-1">기대수익</p>
                         <div class="flex items-center gap-1">
                            <TrendingUp class="w-4 h-4 text-green-600" />
                            <p class="font-semibold text-green-600">+{{ stock.upside }}%</p>
                         </div>
                      </div>
                   </div>

                   <div class="flex items-start gap-2 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                      <Target class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                         <p class="text-sm font-semibold text-blue-900">{{ stock.reason }}</p>
                         <div class="flex items-center gap-1 mt-1 text-xs text-blue-700">
                            <Clock class="w-3 h-3" />
                            <span>목표 기간: {{ stock.period }}</span>
                         </div>
                      </div>
                   </div>

                   <Button class="w-full">상세 분석 보기</Button>
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

