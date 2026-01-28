<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold">추천 종목 수익률</h2>
      <p class="text-slate-600 mt-1">AI 추천 종목의 실적 및 성과 분석</p>
    </div>

    <!-- 성과 요약 카드 섹션 (수익률, 승률, 거래건수 등) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="(card, index) in summaryCards" :key="index" class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-600">{{ card.title }}</p>
            <p :class="['text-3xl font-bold mt-2', card.textColor]">{{ card.value }}</p>
          </div>
          <div :class="['w-12 h-12 rounded-full flex items-center justify-center', card.bgColor]">
            <component :is="card.icon" :class="['w-6 h-6', card.iconColor]" />
          </div>
        </div>
      </div>
    </div>

    <!-- 수익률 분석 차트 섹션 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 월별 수익률 막대 차트 -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div class="p-6 border-b border-slate-100">
          <h3 class="text-lg font-semibold">월별 수익률</h3>
        </div>
        <div class="p-6">
          <div class="h-80 relative">
            <bar-chart :chart-data="monthlyChartData" :options="barChartOptions" :height="320" />
          </div>
        </div>
      </div>

      <!-- 업종별 수익률 파이 차트 -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div class="p-6 border-b border-slate-100">
          <h3 class="text-lg font-semibold">업종별 수익률</h3>
        </div>
        <div class="p-6">
          <div class="h-80 relative">
            <pie-chart :chart-data="categoryChartData" :options="pieChartOptions" :height="320" />
          </div>
        </div>
      </div>
    </div>

    <!-- 수익률 상위 종목 리스트 -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
       <div class="p-6 border-b border-slate-100">
        <h3 class="text-lg font-semibold">최고 수익 종목 TOP 5</h3>
      </div>
      <div class="p-6">
        <div class="space-y-3">
          <div
            v-for="(stock, index) in topPerformers"
            :key="stock.ticker"
            class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
             <div class="flex items-center gap-4">
               <div
 :class="[
                 'w-10 h-10 rounded-full flex items-center justify-center font-bold text-white',
                 getRankColor(index)
               ]">
                 {{ index + 1 }}
               </div>
               <div>
                 <p class="font-semibold">{{ stock.name }}</p>
                 <p class="text-sm text-slate-500">{{ stock.ticker }}</p>
               </div>
             </div>
             <div class="text-right">
                <p class="text-2xl font-bold text-green-600">+{{ stock.return }}%</p>
                <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-slate-200 text-slate-900 hover:bg-slate-300">
                    {{ stock.period }}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 상세 통계 (수익/손실 거래, 최대 수익/손실) -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div class="p-6 border-b border-slate-100">
            <h3 class="text-lg font-semibold">상세 통계</h3>
        </div>
        <div class="p-6">
             <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-xl">
                    <p class="text-xs text-green-700 mb-1">수익 거래</p>
                    <p class="text-2xl font-bold text-green-700">{{ performanceData.profitTrades }}건</p>
                </div>
                 <div class="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-xl">
                    <p class="text-xs text-red-700 mb-1">손실 거래</p>
                    <p class="text-2xl font-bold text-red-700">{{ performanceData.totalTrades - performanceData.profitTrades }}건</p>
                </div>
                 <div class="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl">
                    <p class="text-xs text-blue-700 mb-1">최대 수익</p>
                    <p class="text-2xl font-bold text-blue-700">+{{ performanceData.maxReturn }}%</p>
                </div>
                 <div class="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-xl">
                    <p class="text-xs text-purple-700 mb-1">최대 손실</p>
                    <p class="text-2xl font-bold text-purple-700">{{ performanceData.minReturn }}%</p>
                </div>
             </div>
        </div>
    </div>
</div>
</template>

<script>
import { TrendingUp, Target, Award, CheckCircle2 } from 'lucide-vue'
import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'

export default {
  // 컴포넌트 이름: 추천 종목 수익률 분석 (도메인 컴포넌트)
  name: 'RecommendReturn',
  components: {
    TrendingUp,
    Target,
    Award,
    CheckCircle2,
    BarChart,
    PieChart
  },
  data() {
    return {
      // 핵심 성과 데이터 (누적 수익률, 승률 등)
      performanceData: {
        totalReturns: 15.8,
        winRate: 72.5,
        totalTrades: 124,
        profitTrades: 90,
        avgReturn: 5.2,
        maxReturn: 35.6,
        minReturn: -8.3
      },
      // 월별 수익률 데이터 (막대 차트용)
      monthlyReturns: [
        { month: '7월', return: 8.5 },
        { month: '8월', return: 12.3 },
        { month: '9월', return: -2.1 },
        { month: '10월', return: 15.7 },
        { month: '11월', return: 9.4 },
        { month: '12월', return: 18.2 },
        { month: '1월', return: 15.8 }
      ],
      // 최고 수익 종목 TOP 5 리스트
      topPerformers: [
        { ticker: '207940', name: '삼성바이오로직스', return: 35.6, period: '3개월' },
        { ticker: '079550', name: 'LIG넥스원', return: 28.4, period: '3개월' },
        { ticker: '000660', name: 'SK하이닉스', return: 22.1, period: '1개월' },
        { ticker: '373220', name: 'LG에너지솔루션', return: 18.7, period: '1개월' },
        { ticker: '005930', name: '삼성전자', return: 15.3, period: '1주' }
      ],
      // 업종별 수익률 분포 (파이 차트용)
      categoryReturns: [
        { name: '반도체', value: 18.5, color: '#3b82f6' },
        { name: '바이오', value: 22.3, color: '#ec4899' },
        { name: '방산', value: 25.8, color: '#06b6d4' },
        { name: '2차전지', value: 12.4, color: '#10b981' },
        { name: '기타', value: 8.7, color: '#6b7280' }
      ],
      // 막대 차트 옵션 설정
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true },
            gridLines: { borderDash: [4, 4] },
            scaleLabel: { display: true, labelString: '수익률 (%)' }
          }],
          xAxes: [{
            gridLines: { display: false }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel + '%'
            }
          }
        }
      },
      // 파이 차트 옵션 설정
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: 'right' }
      }
    }
  },
  computed: {
    // 상단 요약 카드 데이터 생성
    summaryCards() {
      return [
        { title: '누적 수익률', value: `+${this.performanceData.totalReturns}%`, textColor: 'text-green-600', bgColor: 'bg-green-100', iconColor: 'text-green-600', icon: 'TrendingUp' },
        { title: '승률', value: `${this.performanceData.winRate}%`, textColor: 'text-blue-600', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', icon: 'Target' },
        { title: '총 거래', value: `${this.performanceData.totalTrades}건`, textColor: 'text-purple-600', bgColor: 'bg-purple-100', iconColor: 'text-purple-600', icon: 'Award' },
        { title: '평균 수익률', value: `+${this.performanceData.avgReturn}%`, textColor: 'text-orange-600', bgColor: 'bg-orange-100', iconColor: 'text-orange-600', icon: 'CheckCircle2' }
      ]
    },
    // 월별 수익률 차트 데이터 가공
    monthlyChartData() {
      return {
        labels: this.monthlyReturns.map(item => item.month),
        datasets: [{
          label: '수익률',
          data: this.monthlyReturns.map(item => item.return),
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }]
      }
    },
    // 업종별 수익률 차트 데이터 가공
    categoryChartData() {
      return {
        labels: this.categoryReturns.map(d => d.name),
        datasets: [
          {
            data: this.categoryReturns.map(d => d.value),
            backgroundColor: this.categoryReturns.map(d => d.color)
          }
        ]
      }
    }
  },
  methods: {
    // 순위별 메달 색상 반환 (1, 2, 3위 강조)
    getRankColor(index) {
      if (index === 0) { return 'bg-gradient-to-r from-yellow-400 to-orange-500' }
      if (index === 1) { return 'bg-gradient-to-r from-gray-300 to-gray-400' }
      if (index === 2) { return 'bg-gradient-to-r from-amber-600 to-amber-700' }
      return 'bg-slate-400'
    }
  }
}
</script>
