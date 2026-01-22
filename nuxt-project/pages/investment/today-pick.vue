<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <div class="u-flex-center-gap-3 u-mb-1">
        <Star class="u-icon-md-yellow" />
        <h2 class="p-investment__title">오늘의 종목 Pick</h2>
      </div>
      <p class="p-investment__desc">AI가 선정한 오늘의 추천 종목</p>
    </div>

    <div class="p-investment__pick-grid">
      <div v-for="pick in todayPicks" :key="pick.rank" class="c-pick-card">
        <div class="c-pick-card__rank-badge">
           <span class="c-pick-card__rank-text">#{{ pick.rank }}</span>
        </div>

        <div class="c-content-card__body p-6 pb-0">
           <div class="u-flex-between-start">
              <div class="u-flex-center-gap-4">
                 <div class="c-pick-card__icon-wrapper">
                    <Star class="u-icon-md-white" />
                 </div>
                 <div>
                    <div class="u-flex-center-gap-2 mb-1">
                       <h3 class="u-text-2xl-bold">{{ pick.name }}</h3>
                       <span class="c-pick-card__category-badge">
                          {{ pick.category }}
                       </span>
                    </div>
                    <p class="u-text-sm u-text-slate-500">{{ pick.ticker }}</p>
                    <div class="u-flex-center-gap-2 mt-2">
                       <span class="c-pick-card__score-badge">
                          AI 점수: {{ pick.aiScore }}점
                       </span>
                       <span class="c-pick-card__timing-badge">
                          {{ pick.buyTiming }}
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div class="c-content-card__body p-6 space-y-4">
           <div class="c-pick-card__stats-grid">
              <div>
                 <p class="u-text-xs u-text-slate-500 u-mb-1">현재가</p>
                 <p class="text-xl font-bold">{{ pick.price.toLocaleString() }}원</p>
              </div>
              <div>
                 <p class="u-text-xs u-text-slate-500 u-mb-1">목표가</p>
                 <p class="u-text-xl-bold u-text-blue-600">{{ pick.targetPrice.toLocaleString() }}원</p>
              </div>
              <div>
                 <p class="u-text-xs u-text-slate-500 u-mb-1">기대수익률</p>
                 <div class="u-flex-center-gap-1">
                    <TrendingUp class="u-icon-sm u-text-green-600" />
                    <p class="u-text-xl-bold u-text-green-600">+{{ pick.upside }}%</p>
                 </div>
              </div>
              <div>
                 <p class="u-text-xs u-text-slate-500 u-mb-1">손절가</p>
                 <p class="u-text-xl-bold u-text-red-600">{{ pick.stopLoss.toLocaleString() }}원</p>
              </div>
           </div>

           <div class="c-pick-card__reason-box">
              <div class="u-flex-start-gap-2">
                 <Zap class="u-icon-sm u-text-blue-600 u-flex-shrink-0 u-mt-0_5" />
                 <div>
                    <p class="u-font-semibold u-text-blue-900 u-mb-1">AI 추천 이유</p>
                    <p class="u-text-sm u-text-blue-800">{{ pick.reason }}</p>
                 </div>
              </div>
           </div>

           <div class="u-flex-gap-2">
              <Button class="c-pick-card__action-btn">
                 <Star class="u-icon-sm u-mr-2" />
                 관심종목 추가
              </Button>
              <Button variant="outline" class="u-flex-1">상세 분석 보기</Button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { Star, TrendingUp, Zap, Target } from 'lucide-vue';

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
    stopLoss: 68000
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
    stopLoss: 138000
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
    stopLoss: 118000
  }
];

export default {
  name: "TodayPick",
  components: {
    Button, Star, TrendingUp, Zap, Target
  },
  data() {
    return {
      todayPicks
    }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

