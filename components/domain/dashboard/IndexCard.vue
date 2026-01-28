<!--
  지수 카드 컴포넌트 (IndexCard)
  - 주요 시장 지수(KOSPI, KOSDAQ 등)를 요약하여 표시하는 카드입니다.
  - 현재가, 변동폭, 변동률(%) 및 미니 차트(AreaChart)를 포함합니다.
-->
<template>
  <div class="c-index-card">
    <div class="c-index-card__header">
        <h3 class="c-index-card__title">{{ name }}</h3>
    </div>
    <div class="c-index-card__body">
        <!-- 값 및 등락률 영역 -->
        <div class="c-index-card__value-box">
            <p class="c-index-card__value">
                {{ value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </p>
            <p v-if="unit" class="c-index-card__unit">{{ unit }}</p>
            
            <!-- 등락 여부에 따른 스타일 적용 (상승 시 trendUp, 하락 시 trendDown) -->
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

        <!-- 미니 차트 영역 -->
        <div class="c-index-card__chart">
             <!-- AreaChart 컴포넌트: 등락 여부에 따라 그라데이션 색상 변경 -->
             <AreaChart 
                :chart-data="chartDataConfig" 
                :options="chartOptions" 
                :gradient-color="isPositive ? '#10b981' : '#ef4444'" 
                class="c-index-card__chart-inner" 
             />
        </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp, TrendingDown } from 'lucide-vue'
import AreaChart from '@/components/charts/AreaChart'

export default {
  // 컴포넌트 이름: 지수 카드
  name: 'IndexCard',
  components: {
    TrendingUp, TrendingDown, AreaChart
  },
  props: {
    // 지수 이름 (예: KOSPI, KOSDAQ)
    name: String,
    // 현재 값
    value: Number,
    // 전일 대비 변동폭
    change: Number,
    // 전일 대비 변동률 (%)
    changePercent: Number,
    // 단위 표시 (선택)
    unit: String,
    // 차트 데이터 (배열 형태: [{ date: string, value: number }])
    chartData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 등락 여부 (0보다 크거나 같으면 상승으로 간주)
    isPositive() {
      return this.change >= 0
    },
    /**
     * 차트 데이터 설정 (Chart.js 호환)
     * - labels: x축 (날짜)
     * - datasets: y축 (값) 및 스타일 설정
     */
    chartDataConfig() {
      return {
        labels: this.chartData.map(d => d.date),
        datasets: [
          {
            label: this.name,
            borderColor: this.isPositive ? '#10b981' : '#ef4444',
            // backgroundColor는 AreaChart 내부에서 그라데이션으로 처리됨
            data: this.chartData.map(d => d.value),
            borderWidth: 2,
            pointRadius: 0,      // 포인트 마커 숨김
            pointHoverRadius: 0, // 호버 시에도 포인트 마커 숨김
            fill: true,
            lineTension: 0.4     // 곡선 부드러움 정도
          }
        ]
      }
    },
    // 차트 옵션 설정 (축, 툴팁, 범례 등 숨김 처리하여 미니멀하게 표시)
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
      }
    }
  }
}
</script>
<!-- 지수 카드 스타일 사용 -->
