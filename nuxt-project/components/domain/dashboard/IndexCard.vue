<template>
  <div class="c-index-card">
    <div class="c-index-card__header">
        <h3 class="c-index-card__title">{{ name }}</h3>
    </div>
    <div class="c-index-card__body">
        <div class="c-index-card__value-box">
            <p class="c-index-card__value">
                {{ value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </p>
            <p v-if="unit" class="c-index-card__unit">{{ unit }}</p>
            <div class="c-index-card__change" :class="isPositive ? 'c-index-card__change--up' : 'c-index-card__change--down'">
                <component :is="isPositive ? 'TrendingUp' : 'TrendingDown'" class="c-index-card__icon" />
                <span class="c-index-card__change-val">
                    {{ isPositive ? '+' : '' }}{{ change.toFixed(2) }}
                </span>
                <span class="c-index-card__change-pct">
                    ({{ isPositive ? '+' : '' }}{{ changePercent.toFixed(2) }}%)
                </span>
            </div>
        </div>

        <div class="c-index-card__chart">
             <AreaChart :chart-data="chartDataConfig" :options="chartOptions" :gradient-color="isPositive ? '#10b981' : '#ef4444'" class="h-full w-full" />
        </div>
    </div>
  </div>
</template>


<script>
import { TrendingUp, TrendingDown } from 'lucide-vue';
import AreaChart from '@/components/charts/AreaChart';

export default {
  name: "IndexCard",
  components: {
    TrendingUp, TrendingDown, AreaChart
  },
  props: {
    name: String,
    value: Number,
    change: Number,
    changePercent: Number,
    unit: String,
    chartData: {
        type: Array, // Expected: [{ date: string, value: number }]
        default: () => []
    }
  },
  computed: {
    isPositive() {
        return this.change >= 0;
    },
    chartDataConfig() {
        // Convert array of objects to Chart.js format
        return {
            labels: this.chartData.map(d => d.date),
            datasets: [
                {
                    label: this.name,
                    borderColor: this.isPositive ? '#10b981' : '#ef4444', 
                    // backgroundColor handled in AreaChart via gradient
                    data: this.chartData.map(d => d.value),
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    fill: true,
                    lineTension: 0.4 
                }
            ]
        };
    },
    chartOptions() {
        return {
            maintainAspectRatio: false,
            responsive: true,
            legend: { display: false },
            scales: {
                xAxes: [{ display: false }],
                yAxes: [{ display: false }]
            },
            tooltips: { enabled: false },
            elements: {
                point: { radius: 0 }
            }
        };
    }
  }
};
</script>
<style src="@/assets/css/components/domain/dashboard/index-card.css"></style>

