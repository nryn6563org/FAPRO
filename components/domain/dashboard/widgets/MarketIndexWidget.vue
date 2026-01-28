<template>
  <div class="c-widget__market-wrapper">
    <!-- 좌측: 현재가 및 등락률 -->
    <div class="c-widget__value-area">
      <p class="c-widget__value">{{ marketData.value.toLocaleString() }}</p>
      <div class="c-widget__change" :class="isPositive ? 'c-widget__change--up' : 'c-widget__change--down'">
        <component :is="isPositive ? 'TrendingUp' : 'TrendingDown'" class="c-widget__change-icon" />
        <span>{{ isPositive ? '+' : '' }}{{ marketData.change.toFixed(2) }}</span>
        <span>({{ isPositive ? '+' : '' }}{{ marketData.changePercent.toFixed(2) }}%)</span>
      </div>
    </div>
    <!-- 우측: 미니 라인 차트 -->
    <div class="c-widget__chart-container">
      <LineChart :chart-data="lineChartData" :options="lineChartOptions" class="c-widget__chart-inner" />
    </div>
  </div>
</template>

<script>
import { TrendingUp, TrendingDown } from 'lucide-vue'
import { mockMarketData } from '@/utils/dashboard-data'
import LineChart from '@/components/charts/LineChart'

export default {
  name: 'MarketIndexWidget',
  components: {
    TrendingUp,
    TrendingDown,
    LineChart
  },
  props: {
    widgetId: {
      type: String,
      required: true
    }
  },
  computed: {
    marketData() {
      return mockMarketData[this.widgetId] || { value: 0, change: 0, changePercent: 0 }
    },
    isPositive() {
      return this.marketData.change >= 0
    },
    lineChartData() {
      // 데모를 위한 랜덤 데이터 생성
      const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}일`)
      const data = Array.from({ length: 30 }, () => Math.random() * 1000 + 2000)

      // 상승/하락 색상 결정
      const color = this.isPositive ? '#10b981' : '#ef4444'

      return {
        labels,
        datasets: [
          {
            label: 'Value',
            borderColor: color,
            backgroundColor: () => {
              // 배경색을 반투명하게 설정
              return this.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
            },
            borderWidth: 2,
            data,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 4
          }
        ]
      }
    },
    lineChartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: false },
        scales: {
          xAxes: [{ display: false }],
          yAxes: [{ display: false }]
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      }
    }
  }
}
</script>


