<template>
  <div class="c-widget__revenue-wrapper">
    <div class="c-widget__revenue-value">
      <p class="c-widget__value">52,400,000원</p>
      <div class="c-widget__change c-widget__change--up">
        <TrendingUp class="c-widget__change-icon" />
        <span>+8.5% (전월 대비)</span>
      </div>
    </div>
    <div class="c-widget__chart-area">
      <BarChart :chart-data="revenueChartData" :options="barChartOptions" class="c-widget__chart-inner" />
    </div>
  </div>
</template>

<script>
import { TrendingUp } from 'lucide-vue'
import BarChart from '@/components/charts/BarChart.vue'

export default {
  name: 'RevenueWidget',
  components: {
    TrendingUp,
    BarChart
  },
  computed: {
    revenueChartData() {
      return {
        labels: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
        datasets: [
          {
            label: 'Revenue',
            backgroundColor: '#1e40af',
            data: Array.from({ length: 12 }, () => Math.random() * 50 + 30)
          }
        ]
      }
    },
    barChartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: false },
        scales: {
          xAxes: [{
            gridLines: { display: false }
          }],
          yAxes: [{
            ticks: { display: false },
            gridLines: { display: false }
          }]
        }
      }
    }
  }
}
</script>


