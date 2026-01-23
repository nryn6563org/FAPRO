<template>
  <div class="p-today-pick">
    <div class="c-page-header">
      <div class="p-today-pick__header">
        <Star class="p-today-pick__highlight-icon" />
        <div class="p-today-pick__title-group">
          <h2 class="c-page-header__title">오늘의 종목 Pick</h2>
          <p class="c-page-header__desc">AI가 선정한 오늘의 추천 종목입니다.</p>
        </div>
      </div>
    </div>

    <!-- 1920x1080 Optimized Grid Layout -->
    <div class="p-today-pick__grid">
      <div v-for="pick in todayPicks" :key="pick.rank" class="p-today-pick__card">
         <button 
           class="p-today-pick__favorite-btn" 
           :class="{ 'p-today-pick__favorite-btn--active': pick.isFavorite }"
           @click="toggleWatchlist(pick)"
         >
            <Star class="p-today-pick__favorite-icon" :class="{ 'p-today-pick__favorite-icon--filled': pick.isFavorite }" />
         </button>

         <div class="p-today-pick__rank-box">
            <Medal 
               class="p-today-pick__rank-icon" 
               :class="getRankIconClass(pick.rank)" 
            />
         </div>

         <div class="p-today-pick__core-info">
            <div class="p-today-pick__icon-container">
               <Target class="p-today-pick__type-icon" />
            </div>
            <div class="p-today-pick__name-group">
               <div class="p-today-pick__name-row">
                  <h3 class="p-today-pick__name">{{ pick.name }}</h3>
                  <span class="p-today-pick__tag">{{ pick.category }}</span>
               </div>
               <p class="p-today-pick__ticker">{{ pick.ticker }}</p>
               <div class="p-today-pick__stats-badge-row">
                  <span class="p-today-pick__ai-badge">AI 점수: {{ pick.aiScore }}점</span>
                  <span class="p-today-pick__timing-badge">{{ pick.buyTiming }}</span>
               </div>
            </div>
         </div>

         <div class="p-today-pick__metrics">
            <div class="p-today-pick__metric-item">
               <p class="p-today-pick__metric-label">현재가</p>
               <p class="p-today-pick__metric-value">{{ pick.price.toLocaleString() }}원</p>
            </div>
            <div class="p-today-pick__metric-item">
               <p class="p-today-pick__metric-label">목표가</p>
               <p class="p-today-pick__metric-value p-today-pick__metric-value--target">{{ pick.targetPrice.toLocaleString() }}원</p>
            </div>
            <div class="p-today-pick__metric-item">
               <p class="p-today-pick__metric-label">기대수익률</p>
               <div class="p-today-pick__upside-group">
                  <TrendingUp class="p-today-pick__upside-icon indicator--positive" />
                  <p class="p-today-pick__metric-value indicator--positive">+{{ pick.upside }}%</p>
               </div>
            </div>
            <div class="p-today-pick__metric-item">
               <p class="p-today-pick__metric-label">손절가</p>
               <p class="p-today-pick__metric-value p-today-pick__metric-value--stoploss">{{ pick.stopLoss.toLocaleString() }}원</p>
            </div>
         </div>

         <div class="p-today-pick__reason-box">
            <Zap class="p-today-pick__reason-icon" />
            <div class="p-today-pick__reason-content">
               <p class="p-today-pick__reason-title">AI 추천 이유</p>
               <p class="p-today-pick__reason-text">{{ pick.reason }}</p>
            </div>
         </div>

         <div class="p-today-pick__actions">
            <Button class="p-today-pick__action-btn" @click="toggleWatchlist(pick)">
               <Star 
                  class="p-today-pick__btn-star-icon" 
                  :class="{ 'p-today-pick__btn-star-icon--filled': pick.isFavorite }" 
               />
               {{ pick.isFavorite ? '관심종목 해제' : '관심종목 추가' }}
            </Button>
            <Button variant="outline" class="p-today-pick__action-btn">상세 분석 보기</Button>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { Star, TrendingUp, Zap, Target, Medal } from 'lucide-vue';

const todayPicks = [
  {
    rank: 1,
    ticker: '005930',
    name: '삼성전자',
    price: 72500,
    targetPrice: 85000,
    upside: 17.2,
    aiScore: 95,
    reason: 'AI 반도체 수요 급증, HBM 시장 점유율 확대, 실적 개선 전망',
    category: '반도체',
    buyTiming: '즉시 매수',
    stopLoss: 68000,
    isFavorite: false
  },
  {
    rank: 2,
    ticker: '000660',
    name: 'SK하이닉스',
    price: 145000,
    targetPrice: 168000,
    upside: 15.9,
    aiScore: 92,
    reason: 'HBM3 출하 본격화, NVIDIA와의 협력 강화, 기술 경쟁력 우위',
    category: '반도체',
    buyTiming: '즉시 매수',
    stopLoss: 138000,
    isFavorite: false
  },
  {
    rank: 3,
    ticker: '079550',
    name: 'LIG넥스원',
    price: 125000,
    targetPrice: 150000,
    upside: 20.0,
    aiScore: 90,
    reason: 'K-방산 수주 확대, 중장기 성장성 우수, 정부 지원 확대',
    category: '방산',
    buyTiming: '분할 매수',
    stopLoss: 118000,
    isFavorite: false
  }
];

export default {
  name: "TodayPick",
  components: {
    Button, Star, TrendingUp, Zap, Target, Medal
  },
  data() {
    return {
      todayPicks
    }
  },
  methods: {
    toggleWatchlist(pick) {
       pick.isFavorite = !pick.isFavorite;
    },
    getRankIconClass(rank) {
      return {
        'rank-icon-gold': rank === 1,
        'rank-icon-silver': rank === 2,
        'rank-icon-bronze': rank === 3
      };
    }
  }
}
</script>
<style src="@/assets/css/pages/today-pick.css"></style>

