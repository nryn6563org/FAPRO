<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">리포트 분석</h2>
      <p class="p-investment__desc">증권사 애널리스트 리포트 및 목표가 분석</p>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div v-for="report in mockReports" :key="report.id" class="c-content-card c-content-card--hover">
        <div class="c-content-card__header bg-white border-b-slate-100 shadow-none pb-0">
           <div class="flex items-start justify-between">
              <div class="flex items-center gap-3 flex-1">
                 <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileBarChart class="w-6 h-6 text-blue-600" />
                 </div>
                 <div class="flex-1">
                    <h3 class="text-lg font-semibold mb-1">{{ report.title }}</h3>
                    <div class="flex items-center gap-2 text-sm text-slate-500">
                       <Building2 class="w-4 h-4" />
                       <span>{{ report.firm }}</span>
                       <span>•</span>
                       <span>{{ report.analyst }}</span>
                       <span>•</span>
                       <span>{{ report.date }}</span>
                    </div>
                 </div>
              </div>
              <span :class="['px-2.5 py-0.5 rounded-full text-xs font-semibold border', getRatingColor(report.rating)]">
                 {{ getRatingLabel(report.rating) }}
              </span>
           </div>
        </div>
        <div class="c-content-card__body pt-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                   <p class="text-xs text-slate-500 mb-1">종목명</p>
                   <p class="font-semibold">{{ report.stockName }}</p>
                   <p class="text-xs text-slate-500">{{ report.ticker }}</p>
                </div>
                <div>
                   <p class="text-xs text-slate-500 mb-1">현재가</p>
                   <p class="font-semibold">{{ report.currentPrice.toLocaleString() }}원</p>
                </div>
                <div>
                   <p class="text-xs text-slate-500 mb-1">목표가</p>
                   <p class="font-semibold text-blue-600">{{ report.targetPrice.toLocaleString() }}원</p>
                </div>
                <div>
                   <p class="text-xs text-slate-500 mb-1">상승여력</p>
                   <div class="flex items-center gap-1">
                      <TrendingUp class="w-4 h-4 text-green-600" />
                      <p class="font-semibold text-green-600">+{{ report.upside }}%</p>
                   </div>
                </div>
            </div>

            <div class="flex gap-2 mt-4">
               <Button variant="outline" class="flex-1">리포트 전문 보기</Button>
               <Button class="flex-1">종목 상세보기</Button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { FileBarChart, Building2, TrendingUp } from 'lucide-vue';

const mockReports = [
  {
    id: 1,
    title: '삼성전자, AI 반도체 수요 증가로 목표가 상향',
    firm: 'KB증권',
    analyst: '김분석',
    ticker: '005930',
    stockName: '삼성전자',
    rating: 'Buy',
    targetPrice: 85000,
    currentPrice: 72500,
    upside: 17.2,
    date: '2026-01-20'
  },
  {
    id: 2,
    title: 'SK하이닉스, HBM3 출하 본격화 전망',
    firm: '미래에셋증권',
    analyst: '이애널',
    ticker: '000660',
    stockName: 'SK하이닉스',
    rating: 'Buy',
    targetPrice: 160000,
    currentPrice: 145000,
    upside: 10.3,
    date: '2026-01-20'
  },
  {
    id: 3,
    title: 'LG에너지솔루션, 북미 수주 확대 기대',
    firm: '한국투자증권',
    analyst: '박리서치',
    ticker: '373220',
    stockName: 'LG에너지솔루션',
    rating: 'Buy',
    targetPrice: 520000,
    currentPrice: 485000,
    upside: 7.2,
    date: '2026-01-19'
  },
  {
    id: 4,
    title: '현대차, 전기차 판매 증가세 지속',
    firm: '신한투자증권',
    analyst: '최전문',
    ticker: '005380',
    stockName: '현대차',
    rating: 'Hold',
    targetPrice: 245000,
    currentPrice: 240000,
    upside: 2.1,
    date: '2026-01-19'
  }
];

export default {
  name: "ReportAnalysis",
  components: {
    Button, FileBarChart, Building2, TrendingUp
  },
  data() {
    return {
      mockReports
    }
  },
  methods: {
    getRatingColor(rating) {
      switch (rating) {
        case 'Buy':
          return 'bg-green-100 text-green-700 border-green-300';
        case 'Hold':
          return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        case 'Sell':
          return 'bg-red-100 text-red-700 border-red-300';
        default:
          return 'bg-gray-100 text-gray-700 border-gray-300';
      }
    },
    getRatingLabel(rating) {
      switch (rating) {
        case 'Buy': return '매수';
        case 'Hold': return '보유';
        case 'Sell': return '매도';
        default: return rating;
      }
    }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

