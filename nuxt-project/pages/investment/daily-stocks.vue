<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">오늘의 종목 일자별 보기</h2>
      <p class="p-investment__desc">일자별 AI 추천 종목 및 성과</p>
    </div>

    <div class="c-content-card">
      <div class="c-content-card__header">
         <div class="c-content-card__header-content">
           <div class="u-flex-center-gap-3">
             <CalendarDays class="u-icon-md-blue" />
             <h3 class="u-text-xl-bold">{{ currentData.date }}</h3>
             <span v-if="currentPage === 0" class="c-daily-today-badge">
                오늘
             </span>
           </div>
           <div class="c-content-card__actions">
             <Button
               variant="outline"
               size="sm"
               @click="currentPage++"
               :disabled="!canGoPrev"
             >
               <ChevronLeft class="u-icon-sm" />
             </Button>
             <Button
               variant="outline"
               size="sm"
               @click="currentPage--"
               :disabled="!canGoNext"
             >
               <ChevronRight class="u-icon-sm" />
             </Button>
           </div>
         </div>
      </div>
      
      <div class="p-6">
        <div class="c-daily-grid">
           <div v-for="pick in currentData.picks" :key="pick.ticker" class="c-daily-card">
              <div class="c-daily-card__score-pos">
                 <span class="c-daily-card__score-badge">
                    AI {{ pick.aiScore }}점
                 </span>
              </div>
              <div class="p-4 pb-3">
                 <div class="u-flex-center-gap-2">
                    <div class="c-daily-card__icon-box">
                       <Star class="u-icon-md-blue" />
                    </div>
                    <div>
                       <h3 class="u-text-lg-bold">{{ pick.name }}</h3>
                       <p class="u-text-xs-slate-500">{{ pick.ticker }}</p>
                    </div>
                 </div>
              </div>
              <div class="p-4 pt-0">
                 <div v-if="pick.result !== null" :class="['c-daily-card__result-box', pick.result >= 0 ? 'c-daily-card__result-box--profit' : 'c-daily-card__result-box--loss']">
                    <p class="u-text-xs-slate-600 mb-1">수익률</p>
                    <p :class="['c-daily-card__result-val', pick.result >= 0 ? 'u-text-green-600' : 'u-text-red-600']">
                       {{ pick.result >= 0 ? '+' : '' }}{{ pick.result }}%
                    </p>
                 </div>
                 <div v-else class="c-daily-card__result-box c-daily-card__result-box--pending">
                    <p class="u-text-sm u-text-slate-600 u-text-center">진행 중</p>
                 </div>
                 <Button variant="outline" class="u-w-full" size="sm">상세보기</Button>
              </div>
           </div>
        </div>

        <div v-if="hasResults" class="c-daily-stats-box">
           <div class="u-flex-between">
              <div>
                 <p class="u-text-sm-slate-600 mb-1">일평균 수익률</p>
                 <p class="u-text-2xl-bold u-text-green-600">
                    +{{ averageReturn }}%
                 </p>
              </div>
              <div class="u-text-right">
                 <p class="u-text-sm-slate-600 mb-1">적중률</p>
                 <p class="u-text-2xl-bold u-text-blue-600">
                    {{ hitRate }}%
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { CalendarDays, ChevronLeft, ChevronRight, Star } from 'lucide-vue';

const mockDailyData = [
  {
    date: '2026-01-20',
    picks: [
      { ticker: '005930', name: '삼성전자', aiScore: 95, result: null },
      { ticker: '000660', name: 'SK하이닉스', aiScore: 92, result: null },
      { ticker: '079550', name: 'LIG넥스원', aiScore: 90, result: null }
    ]
  },
  {
    date: '2026-01-17',
    picks: [
      { ticker: '373220', name: 'LG에너지솔루션', aiScore: 88, result: 5.3 },
      { ticker: '005380', name: '현대차', aiScore: 85, result: 2.1 },
      { ticker: '051910', name: 'LG화학', aiScore: 83, result: -1.2 }
    ]
  },
  {
    date: '2026-01-16',
    picks: [
      { ticker: '035720', name: '카카오', aiScore: 87, result: 8.5 },
      { ticker: '035420', name: 'NAVER', aiScore: 84, result: 4.2 },
      { ticker: '096770', name: 'SK이노베이션', aiScore: 82, result: 1.8 }
    ]
  },
  {
    date: '2026-01-15',
    picks: [
      { ticker: '207940', name: '삼성바이오로직스', aiScore: 91, result: 6.7 },
      { ticker: '068270', name: '셀트리온', aiScore: 89, result: 3.4 },
      { ticker: '000270', name: '기아', aiScore: 86, result: -0.5 }
    ]
  },
  {
    date: '2026-01-14',
    picks: [
      { ticker: '105560', name: 'KB금융', aiScore: 84, result: 4.1 },
      { ticker: '055550', name: '신한지주', aiScore: 82, result: 3.2 },
      { ticker: '086790', name: '하나금융지주', aiScore: 80, result: 2.8 }
    ]
  }
];

export default {
  name: "DailyStocks",
  components: {
    Button, CalendarDays, ChevronLeft, ChevronRight, Star
  },
  data() {
    return {
      currentPage: 0,
      mockDailyData
    }
  },
  computed: {
    currentData() {
      return this.mockDailyData[this.currentPage];
    },
    canGoPrev() {
      return this.currentPage < this.mockDailyData.length - 1;
    },
    canGoNext() {
      return this.currentPage > 0;
    },
    hasResults() {
      return this.currentData.picks.some(p => p.result !== null);
    },
    averageReturn() {
      if (!this.hasResults) return 0;
      const sum = this.currentData.picks.reduce((sum, p) => sum + (p.result || 0), 0);
      return (sum / this.currentData.picks.length).toFixed(2);
    },
    hitRate() {
      if (!this.hasResults) return 0;
      const hits = this.currentData.picks.filter(p => (p.result || 0) > 0).length;
      return ((hits / this.currentData.picks.length) * 100).toFixed(0);
    }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

