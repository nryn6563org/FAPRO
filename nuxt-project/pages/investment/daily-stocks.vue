<template>
  <div class="p-daily-stocks">
    <div class="c-page-header">
      <h2 class="c-page-header__title">오늘의 종목 일자별 보기</h2>
      <p class="c-page-header__desc">일자별 AI 추천 종목 및 성과</p>
    </div>

    <div class="c-content-card p-daily-stocks__card">
      <div class="p-daily-stocks__header-row">
        <div class="p-daily-stocks__date-info">
          <div class="p-daily-stocks__calendar-icon-box">
            <CalendarDays class="p-daily-stocks__calendar-icon" />
          </div>
          <div class="p-daily-stocks__date-wrapper">
            <h3 class="p-daily-stocks__date-title">
              {{ currentData.date }}
              <span v-if="currentPage === 0" class="p-daily-stocks__today-badge">오늘</span>
            </h3>
          </div>
        </div>
        <div class="p-daily-stocks__nav-group">
          <Button
            variant="outline"
            size="sm"
            @click="currentPage++"
            :disabled="!canGoPrev"
          >
            <ChevronLeft class="p-daily-stocks__nav-icon" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            @click="currentPage--"
            :disabled="!canGoNext"
          >
            <ChevronRight class="p-daily-stocks__nav-icon" />
          </Button>
        </div>
      </div>
      
      <div class="p-daily-stocks__content-area">
        <div class="p-daily-stocks__grid">
          <div v-for="pick in currentData.picks" :key="pick.ticker" class="p-daily-stocks__pick-card">
            <div class="p-daily-stocks__pick-header">
              <div class="p-daily-stocks__pick-star-box">
                <Star class="p-daily-stocks__pick-star-icon" />
              </div>
              <span class="p-daily-stocks__pick-ai-badge">
                AI {{ pick.aiScore }}점
              </span>
            </div>
            <div class="p-daily-stocks__pick-info">
              <h3 class="p-daily-stocks__pick-name">{{ pick.name }}</h3>
              <p class="p-daily-stocks__pick-ticker">{{ pick.ticker }}</p>
            </div>
            <div class="p-daily-stocks__pick-footer">
              <div v-if="pick.result !== null" class="p-daily-stocks__pick-return-group">
                <p class="p-daily-stocks__pick-return-label">수익률</p>
                <p class="p-daily-stocks__pick-return-value" :class="pick.result >= 0 ? 'indicator--positive' : 'indicator--negative'">
                  {{ pick.result >= 0 ? '+' : '' }}{{ pick.result }}%
                </p>
              </div>
              <div v-else class="p-daily-stocks__pick-pending">
                진행 중
              </div>
              <Button variant="outline" size="sm" class="p-daily-stocks__pick-details-btn">상세보기</Button>
            </div>
          </div>
        </div>

        <div v-if="hasResults" class="p-daily-stocks__stats-summary">
          <div class="p-daily-stocks__stats-row">
            <div class="p-daily-stocks__stat-item">
              <p class="p-daily-stocks__stat-label">일평균 수익률</p>
              <p class="p-daily-stocks__stat-value indicator--positive">
                +{{ averageReturn }}%
              </p>
            </div>
            <div class="p-daily-stocks__stat-divider"></div>
            <div class="p-daily-stocks__stat-item">
              <p class="p-daily-stocks__stat-label">적중률</p>
              <p class="p-daily-stocks__stat-value" style="color: var(--blue-600)">
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

<style src="@/assets/css/pages/daily-stocks.css"></style>
</script>

<style src="@/assets/css/pages/daily-stocks.css"></style>

