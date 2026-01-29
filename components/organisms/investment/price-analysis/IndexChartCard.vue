<!-- 지수 차트 카드: 코스피, 코스닥 등 주요 지수의 시세 및 변동 차트 제공 -->
<template>
  <div class="c-index-chart-card">
    <div class="c-index-chart-card__header">
      <div class="c-index-chart-card__info">
        <h4 class="c-index-chart-card__name">{{ name }}</h4>
        <div class="c-index-chart-card__price-row">
          <span class="c-index-chart-card__value">{{ value }}</span>
          <div class="c-index-chart-card__change">
            <span
              class="c-index-chart-card__change-val"
              :class="change > 0 ? 'indicator--positive' : 'indicator--negative'"
            >
              <TrendingUpIcon v-if="change > 0" class="c-index-chart-card__icon" />
              <TrendingDownIcon v-else class="c-index-chart-card__icon" />
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
        :height="256"
        :styles="{ height: '256px', position: 'relative' }"
      />
    </div>
  </div>
</template>

<script>
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-vue'
import AreaChart from '@/components/charts/AreaChart.vue'

export default {
  // 컴포넌트 이름: 지수 차트 카드
  name: 'IndexChartCard',
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    AreaChart
  },
  props: {
    name: { type: String, required: true }, // 지수 이름 (예: KOSPI, KOSDAQ)
    value: { type: String, required: true }, // 현재 지수 값 (문자열 포맷됨)
    change: { type: Number, required: true }, // 전일 대비 변동량
    changePct: { type: Number, required: true }, // 전일 대비 등락률 (%)
    selectedPeriod: { type: String, required: true }, // 현재 선택된 기간 ('1일', '3개월', '1년')
    historyData: { type: Array, required: true } // 차트 데이터 배열 ([{ time, value }, ...])
  },
  computed: {
    // 차트 컴포넌트에 전달할 데이터 형식 가공
    chartData() {
      return {
        labels: this.historyData.map(d => d.time),
        datasets: [{
          label: this.name,
          // 지수 상승 시 빨간색, 하락 시 파란색
          borderColor: this.change > 0 ? '#ef4444' : '#3b82f6',
          data: this.historyData.map(d => d.value),
          fill: true
        }]
      }
    },
    // Chart.js 옵션 설정
    chartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontSize: 11,
              fontColor: '#94a3b8',
              maxTicksLimit: 6,
              padding: 10
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: '#f1f5f9',
              borderDash: [2, 2],
              drawBorder: false
            },
            ticks: {
              fontSize: 10,
              fontColor: '#94a3b8',
              padding: 10,
              // 지수 종류에 따라 y축 눈금 간격 조정
              stepSize: (this.name.includes('코스피') || this.name.toUpperCase().includes('KOSPI')) ? 20 : 50,
              callback: function(value) {
                return value.toLocaleString()
              }
            }
          }]
        },
        legend: { display: false },
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 10,
            right: 10
          }
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 4,
            backgroundColor: '#ffffff',
            borderWidth: 2
          },
          line: {
            tension: 0.4,
            borderWidth: 2
          }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFontColor: '#fff',
          bodyFontColor: '#fff',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          cornerRadius: 4,
          xPadding: 10,
          yPadding: 10
        }
      }
    }
  }
}
</script>

<style scoped>
@import url('@/assets/css/components/investment/price-analysis/index-chart-card.css');
</style>
