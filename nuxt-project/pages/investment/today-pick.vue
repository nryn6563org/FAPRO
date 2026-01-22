<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <div class="flex items-center gap-3 mb-2">
        <Star class="w-8 h-8 text-yellow-500 fill-yellow-500" />
        <h2 class="p-investment__title">오늘의 종목 Pick</h2>
      </div>
      <p class="p-investment__desc">AI가 선정한 오늘의 추천 종목</p>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div v-for="pick in todayPicks" :key="pick.rank" class="c-content-card c-content-card--hover border-2 border-yellow-200 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-full flex items-start justify-end p-3">
           <span class="text-white font-bold text-2xl mr-2 mt-1">#{{ pick.rank }}</span>
        </div>

        <div class="c-content-card__body p-6 pb-0">
           <div class="flex items-start justify-between">
              <div class="flex items-center gap-4">
                 <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Star class="w-8 h-8 text-white fill-white" />
                 </div>
                 <div>
                    <div class="flex items-center gap-2 mb-1">
                       <h3 class="text-2xl font-bold">{{ pick.name }}</h3>
                       <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-white text-slate-700 hover:bg-slate-100">
                          {{ pick.category }}
                       </span>
                    </div>
                    <p class="text-sm text-slate-500">{{ pick.ticker }}</p>
                    <div class="flex items-center gap-2 mt-2">
                       <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          AI 점수: {{ pick.aiScore }}점
                       </span>
                       <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {{ pick.buyTiming }}
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div class="c-content-card__body p-6 space-y-4">
           <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <div>
                 <p class="text-xs text-slate-500 mb-1">현재가</p>
                 <p class="text-xl font-bold">{{ pick.price.toLocaleString() }}원</p>
              </div>
              <div>
                 <p class="text-xs text-slate-500 mb-1">목표가</p>
                 <p class="text-xl font-bold text-blue-600">{{ pick.targetPrice.toLocaleString() }}원</p>
              </div>
              <div>
                 <p class="text-xs text-slate-500 mb-1">기대수익률</p>
                 <div class="flex items-center gap-1">
                    <TrendingUp class="w-5 h-5 text-green-600" />
                    <p class="text-xl font-bold text-green-600">+{{ pick.upside }}%</p>
                 </div>
              </div>
              <div>
                 <p class="text-xs text-slate-500 mb-1">손절가</p>
                 <p class="text-xl font-bold text-red-600">{{ pick.stopLoss.toLocaleString() }}원</p>
              </div>
           </div>

           <div class="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <div class="flex items-start gap-2">
                 <Zap class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                 <div>
                    <p class="font-semibold text-blue-900 mb-1">AI 추천 이유</p>
                    <p class="text-sm text-blue-800">{{ pick.reason }}</p>
                 </div>
              </div>
           </div>

           <div class="flex gap-2">
              <Button class="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-none">
                 <Star class="w-4 h-4 mr-2" />
                 관심종목 추가
              </Button>
              <Button variant="outline" class="flex-1">상세 분석 보기</Button>
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

