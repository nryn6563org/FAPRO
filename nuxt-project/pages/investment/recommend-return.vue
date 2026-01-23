<template>
  <div class="p-recommend-return">
    <div class="c-page-header">
      <h2 class="c-page-header__title">추천 종목 수익률</h2>
      <p class="c-page-header__desc">AI 추천 종목의 실적 및 성과 분석</p>
    </div>

    <!-- Summary Cards -->
    <div class="p-recommend-return__metrics">
      <div v-for="(card, index) in summaryCards" :key="index" class="p-recommend-return__metric-card">
        <div class="p-recommend-return__metric-info">
          <p class="p-recommend-return__metric-label">{{ card.title }}</p>
          <p class="p-recommend-return__metric-value" :class="card.valueClass">{{ card.value }}</p>
        </div>
        <div class="p-recommend-return__metric-icon-box" :class="card.iconBoxClass">
          <component :is="card.icon" class="p-recommend-return__metric-icon" :class="card.iconClass" />
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="p-recommend-return__charts-grid">
      <div class="p-recommend-return__chart-card">
        <div class="p-recommend-return__chart-header">
          <h3 class="p-recommend-return__chart-title">월별 수익률</h3>
        </div>
        <div class="p-recommend-return__chart-container">
          <BarChart :chart-data="monthlyChartData" :options="barOptions" />
        </div>
      </div>
      <div class="p-recommend-return__chart-card">
        <div class="p-recommend-return__chart-header">
          <h3 class="p-recommend-return__chart-title">업종별 수익률</h3>
        </div>
        <div class="p-recommend-return__chart-container">
          <PieChart :chart-data="categoryChartData" :options="pieOptions" />
        </div>
      </div>
    </div>

    <!-- Top Performers -->
    <div class="c-content-card p-recommend-return__top-performers">
      <div class="p-recommend-return__section-header">
        <h3 class="p-recommend-return__section-title">최고 수익 종목 TOP 5</h3>
      </div>
      <div class="p-recommend-return__performers-list">
        <div v-for="(stock, index) in topPerformers" :key="stock.ticker" class="p-recommend-return__performer-item">
          <div class="p-recommend-return__performer-left">
            <div class="p-recommend-return__performer-rank" :class="'p-recommend-return__performer-rank--' + (index + 1)">
              {{ index + 1 }}
            </div>
            <div class="p-recommend-return__performer-info">
              <span class="p-recommend-return__performer-name">{{ stock.name }}</span>
              <span class="p-recommend-return__performer-ticker">{{ stock.ticker }}</span>
            </div>
          </div>
          <div class="p-recommend-return__performer-right">
            <p class="p-recommend-return__performer-return indicator--positive">+{{ stock.return }}%</p>
            <span class="p-recommend-return__performer-period"> {{ stock.period }} 보유 </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Stats -->
    <div class="c-content-card p-recommend-return__stats-section">
      <div class="p-recommend-return__section-header">
        <h3 class="p-recommend-return__section-title">상세 통계</h3>
      </div>
      <div class="p-recommend-return__stats-grid">
        <div class="p-recommend-return__stat-box p-recommend-return__stat-box--profit">
          <p class="p-recommend-return__stat-label">수익 거래</p>
          <p class="p-recommend-return__stat-value">{{ performanceData.profitTrades }}건</p>
        </div>
        <div class="p-recommend-return__stat-box p-recommend-return__stat-box--loss">
          <p class="p-recommend-return__stat-label">손실 거래</p>
          <p class="p-recommend-return__stat-value">{{ performanceData.totalTrades - performanceData.profitTrades }}건</p>
        </div>
        <div class="p-recommend-return__stat-box p-recommend-return__stat-box--max">
          <p class="p-recommend-return__stat-label">최대 수익</p>
          <p class="p-recommend-return__stat-value indicator--positive">+{{ performanceData.maxReturn }}%</p>
        </div>
        <div class="p-recommend-return__stat-box p-recommend-return__stat-box--min">
          <p class="p-recommend-return__stat-label">최대 손실</p>
          <p class="p-recommend-return__stat-value indicator--negative">{{ performanceData.minReturn }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp, Target, Award, CheckCircle2 } from "lucide-vue";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";

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
  { month: "7월", return: 8.5 },
  { month: "8월", return: 12.3 },
  { month: "9월", return: -2.1 },
  { month: "10월", return: 15.7 },
  { month: "11월", return: 9.4 },
  { month: "12월", return: 18.2 },
  { month: "1월", return: 15.8 }
];

const categoryReturns = [
  { name: "반도체", value: 18.5, color: "#3b82f6" },
  { name: "바이오", value: 22.3, color: "#ec4899" },
  { name: "방산", value: 25.8, color: "#06b6d4" },
  { name: "2차전지", value: 12.4, color: "#10b981" },
  { name: "기타", value: 8.7, color: "#6b7280" }
];

const topPerformers = [
  { ticker: "207940", name: "삼성바이오로직스", return: 35.6, period: "3개월" },
  { ticker: "079550", name: "LIG넥스원", return: 28.4, period: "3개월" },
  { ticker: "000660", name: "SK하이닉스", return: 22.1, period: "1개월" },
  { ticker: "373220", name: "LG에너지솔루션", return: 18.7, period: "1개월" },
  { ticker: "005930", name: "삼성전자", return: 15.3, period: "1주" }
];

export default {
  name: "RecommendReturn",
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
      performanceData,
      topPerformers,
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: { beginAtZero: true },
              gridLines: { display: true }
            }
          ],
          xAxes: [
            {
              gridLines: { display: false }
            }
          ]
        },
        legend: { display: false }
      },
      pieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: "right" }
      }
    };
  },
  computed: {
    summaryCards() {
      return [
        { 
          title: "누적 수익률", 
          value: `+${this.performanceData.totalReturns}%`, 
          valueClass: "indicator--positive", 
          icon: "TrendingUp", 
          iconBoxClass: "p-recommend-return__metric-icon-box--positive" 
        },
        { 
          title: "승률", 
          value: `${this.performanceData.winRate}%`, 
          valueClass: "p-recommend-return__metric-value--primary", 
          icon: "Target", 
          iconBoxClass: "p-recommend-return__metric-icon-box--primary" 
        },
        { 
          title: "총 거래", 
          value: `${this.performanceData.totalTrades}건`, 
          valueClass: "p-recommend-return__metric-value--accent", 
          icon: "Award", 
          iconBoxClass: "p-recommend-return__metric-icon-box--accent" 
        },
        { 
          title: "평균 수익률", 
          value: `+${this.performanceData.avgReturn}%`, 
          valueClass: "indicator--positive", 
          icon: "CheckCircle2", 
          iconBoxClass: "p-recommend-return__metric-icon-box--neutral" 
        }
      ];
    },
    monthlyChartData() {
      return {
        labels: monthlyReturns.map((d) => d.month),
        datasets: [
          {
            label: "수익률 (%)",
            data: monthlyReturns.map((d) => d.return),
            backgroundColor: "#3b82f6",
            borderRadius: 4
          }
        ]
      };
    },
    categoryChartData() {
      return {
        labels: categoryReturns.map((d) => d.name),
        datasets: [
          {
            data: categoryReturns.map((d) => d.value),
            backgroundColor: categoryReturns.map((d) => d.color)
          }
        ]
      };
    }
  }
};
</script>

<style src="@/assets/css/pages/recommend-return.css"></style>
