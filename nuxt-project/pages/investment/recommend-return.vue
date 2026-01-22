<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">추천 종목 수익률</h2>
      <p class="p-investment__desc">AI 추천 종목의 실적 및 성과 분석</p>
    </div>

    <!-- Summary Cards -->
    <div class="l-summary-grid">
      <div v-for="(card, index) in summaryCards" :key="index" class="c-content-card">
          <div class="c-content-card__body">
              <div class="c-summary-card__content">
                  <div class="c-summary-card__info">
                      <p class="c-summary-card__title">{{ card.title }}</p>
                      <p :class="['c-summary-card__value', card.valueColor]">{{ card.value }}</p>
                  </div>
                  <div :class="['c-summary-card__icon-wrapper', card.bgColor]">
                      <component :is="card.icon" :class="['c-summary-card__icon', card.iconColor]" />
                  </div>
              </div>
          </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="l-charts-grid">
        <div class="c-chart-card">
            <h3 class="c-chart-card__title">월별 수익률</h3>
            <div class="c-chart-card__chart-wrapper">
                <BarChart :chart-data="monthlyChartData" :options="barOptions" class="h-full" />
            </div>
        </div>
        <div class="c-chart-card">
            <h3 class="c-chart-card__title">업종별 수익률</h3>
            <div class="c-chart-card__chart-wrapper">
                <PieChart :chart-data="categoryChartData" :options="pieOptions" class="h-full" />
            </div>
        </div>
    </div>

    <!-- Top Performers -->
    <div class="c-chart-card">
        <h3 class="c-chart-card__title">최고 수익 종목 TOP 5</h3>
        <div class="l-performers-list">
            <div v-for="(stock, index) in topPerformers" :key="stock.ticker" class="c-performer-item">
                <div class="c-performer-item__left">
                    <div :class="['c-performer-item__rank', getRankColor(index)]">
                        {{ index + 1 }}
                    </div>
                    <div class="c-performer-item__info">
                        <p class="c-performer-item__name">{{ stock.name }}</p>
                        <p class="c-performer-item__ticker">{{ stock.ticker }}</p>
                    </div>
                </div>
                <div class="c-performer-item__right">
                    <p class="c-performer-item__return">+{{ stock.return }}%</p>
                    <span class="c-performer-item__period">
                        {{ stock.period }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional Stats -->
    <div class="c-chart-card">
        <h3 class="c-chart-card__title">상세 통계</h3>
        <div class="l-stats-grid">
            <div class="c-stat-box c-stat-box--profit">
                <p class="c-stat-box__label">수익 거래</p>
                <p class="c-stat-box__value">{{ performanceData.profitTrades }}건</p>
            </div>
             <div class="c-stat-box c-stat-box--loss">
                <p class="c-stat-box__label">손실 거래</p>
                <p class="c-stat-box__value">{{ performanceData.totalTrades - performanceData.profitTrades }}건</p>
            </div>
             <div class="c-stat-box c-stat-box--max">
                <p class="c-stat-box__label">최대 수익</p>
                <p class="c-stat-box__value">+{{ performanceData.maxReturn }}%</p>
            </div>
             <div class="c-stat-box c-stat-box--min">
                <p class="c-stat-box__label">최대 손실</p>
                <p class="c-stat-box__value">{{ performanceData.minReturn }}%</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp, Target, Award, CheckCircle2 } from 'lucide-vue';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

const performanceData = {
  totalReturns: 15.8,
  winRate: 72.5,
  totalTrades: 124,
  profitTrades: 90,
  avgReturn: 5.2,
  maxReturn: 35.6,
  minReturn: -8.3
};

const monthlyReturns = [
  { month: '7월', return: 8.5 },
  { month: '8월', return: 12.3 },
  { month: '9월', return: -2.1 },
  { month: '10월', return: 15.7 },
  { month: '11월', return: 9.4 },
  { month: '12월', return: 18.2 },
  { month: '1월', return: 15.8 }
];

const categoryReturns = [
  { name: '반도체', value: 18.5, color: '#3b82f6' },
  { name: '바이오', value: 22.3, color: '#ec4899' },
  { name: '방산', value: 25.8, color: '#06b6d4' },
  { name: '2차전지', value: 12.4, color: '#10b981' },
  { name: '기타', value: 8.7, color: '#6b7280' }
];

const topPerformers = [
  { ticker: '207940', name: '삼성바이오로직스', return: 35.6, period: '3개월' },
  { ticker: '079550', name: 'LIG넥스원', return: 28.4, period: '3개월' },
  { ticker: '000660', name: 'SK하이닉스', return: 22.1, period: '1개월' },
  { ticker: '373220', name: 'LG에너지솔루션', return: 18.7, period: '1개월' },
  { ticker: '005930', name: '삼성전자', return: 15.3, period: '1주' }
];

export default {
  name: "RecommendReturn",
  components: {
    TrendingUp, Target, Award, CheckCircle2,
    BarChart, PieChart
  },
  data() {
      return {
          performanceData,
          topPerformers,
          barOptions: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  yAxes: [{ 
                      ticks: { beginAtZero: true },
                      gridLines: { display: true }
                  }],
                  xAxes: [{
                      gridLines: { display: false }
                  }]
              },
              legend: { display: false }
          },
          pieOptions: {
              responsive: true,
              maintainAspectRatio: false,
              legend: { position: 'right' }
          }
      };
  },
  computed: {
      summaryCards() {
          return [
              { title: '누적 수익률', value: `+${this.performanceData.totalReturns}%`, valueColor: 'u-text-green-600', icon: 'TrendingUp', iconColor: 'u-text-green-600', bgColor: 'u-bg-green-100' },
              { title: '승률', value: `${this.performanceData.winRate}%`, valueColor: 'u-text-blue-600', icon: 'Target', iconColor: 'u-text-blue-600', bgColor: 'u-bg-blue-100' },
              { title: '총 거래', value: `${this.performanceData.totalTrades}건`, valueColor: 'u-text-purple-600', icon: 'Award', iconColor: 'u-text-purple-600', bgColor: 'u-bg-purple-100' },
              { title: '평균 수익률', value: `+${this.performanceData.avgReturn}%`, valueColor: 'u-text-orange-600', icon: 'CheckCircle2', iconColor: 'u-text-orange-600', bgColor: 'u-bg-orange-100' }
          ];
      },
      monthlyChartData() {
          return {
              labels: monthlyReturns.map(d => d.month),
              datasets: [{
                  label: '수익률 (%)',
                  data: monthlyReturns.map(d => d.return),
                  backgroundColor: '#3b82f6',
                  borderRadius: 4
              }]
          };
      },
      categoryChartData() {
          return {
              labels: categoryReturns.map(d => d.name),
              datasets: [{
                  data: categoryReturns.map(d => d.value),
                  backgroundColor: categoryReturns.map(d => d.color)
              }]
          };
      }
  },
  methods: {
      getRankColor(index) {
          if (index === 0) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
          if (index === 1) return 'bg-gradient-to-r from-gray-300 to-gray-400';
          if (index === 2) return 'bg-gradient-to-r from-amber-600 to-amber-700';
          if (strength === 'strong') return 'u-bg-green-500'; // updated to u-bg if exists or leave as logic class
          if (strength === 'neutral') return 'u-bg-blue-500';
          if (strength === 'weak') return 'u-bg-red-500';
          return 'bg-slate-400';
      }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

