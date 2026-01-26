<!-- 지수 차트 카드: 코스피, 코스닥 등 주요 지수의 시세 및 변동 차트 제공 -->
<template>
  <div class="c-index-chart-card">
    <div class="c-index-chart-card__header">
      <div class="c-index-chart-card__info">
        <h4 class="c-index-chart-card__name">{{ name }}</h4>
        <span class="c-index-chart-card__value">{{ value }}</span>
        <div class="c-index-chart-card__change">
          <span
            class="c-index-chart-card__change-val"
            :class="change > 0 ? 'indicator--positive' : 'indicator--negative'"
          >
            <TrendingUpIcon v-if="change > 0" class="w-3.5 h-3.5" />
            <TrendingDownIcon v-else class="w-3.5 h-3.5" />
            {{ Math.abs(change) }}
          </span>
          <span
            class="c-index-chart-card__change-pct"
            :class="changePct > 0 ? 'indicator--positive' : 'indicator--negative'"
          >
            {{ changePct > 0 ? '+' : '' }}{{ changePct }}%
          </span>
        </div>
      </div>

      <div class="c-index-chart-card__period-selector">
        <button
          v-for="p in ['1일', '3개월', '1년']"
          :key="p"
          class="c-index-chart-card__period-btn"
          :class="selectedPeriod === p ? 'c-index-chart-card__period-btn--active' : 'c-index-chart-card__period-btn--inactive'"
          @click="$emit('update-period', p)"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <div class="c-index-chart-card__chart-wrapper">
      <AreaChart
        :chart-data="chartData"
        :options="chartOptions"
        :gradient-color="change > 0 ? '#ef4444' : '#3b82f6'"
      />
    </div>
  </div>
</template>

<script>
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-vue'
import AreaChart from '@/components/charts/AreaChart'

export default {
  name: 'IndexChartCard',
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    AreaChart
  },
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    change: { type: Number, required: true },
    changePct: { type: Number, required: true },
    selectedPeriod: { type: String, required: true },
    historyData: { type: Array, required: true }
  },
  computed: {
    chartData() {
      return {
        labels: this.historyData.map(d => d.time),
        datasets: [{
          label: this.name,
          borderColor: this.change > 0 ? '#ef4444' : '#3b82f6',
          data: this.historyData.map(d => d.value),
          fill: true
        }]
      }
    },
    chartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            display: false,
            gridLines: { display: false }
          }],
          yAxes: [{
            display: false,
            gridLines: { display: false }
          }]
        },
        legend: { display: false },
        elements: {
          point: { radius: 0 },
          line: { tension: 0.4 }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false
        }
      }
    }
  }
}
</script>

<style src="@/assets/css/components/investment/price-analysis/index-chart-card.css"></style>
