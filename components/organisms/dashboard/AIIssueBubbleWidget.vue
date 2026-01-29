<template>
  <div class="c-widget__bubble-wrapper">
    <div class="c-widget__chart-area">
      <BubbleChart :chart-data="scatterChartData" :options="scatterChartOptions" class="c-widget__chart-inner" />
    </div>
    <!-- 범례 -->
    <div class="c-widget__bubble-legend">
      <div v-for="(color, category) in categoryColors" :key="category" class="c-widget__bubble-legend-item">
        <div class="c-widget__bubble-dot" :style="{ backgroundColor: color }" />
        <span class="c-widget__bubble-label">{{ getCategoryLabel(category) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BubbleChart from '@/components/charts/BubbleChart'
import { mockAIIssueData } from '@/utils/dashboard-data'

export default {
  name: 'AIIssueBubbleWidget',
  components: {
    BubbleChart
  },
  data() {
    return {
      // 카테고리별 색상 매핑 (AI 이슈 버블 차트용)
      categoryColors: {
        tech: '#3b82f6',     // 기술
        auto: '#8b5cf6',     // 자동차
        energy: '#10b981',   // 에너지
        finance: '#f59e0b',  // 금융
        realestate: '#ef4444', // 부동산
        defense: '#06b6d4',  // 방산
        bio: '#ec4899'       // 바이오
      }
    }
  },
  computed: {
    scatterChartData() {
      return {
        datasets: mockAIIssueData.map(item => ({
          label: item.keyword,
          data: [{
            x: item.x,
            y: item.y,
            r: Math.sqrt(item.size) // 버블 크기 계산
          }],
          backgroundColor: this.categoryColors[item.category] || '#6b7280',
          borderColor: this.categoryColors[item.category] || '#6b7280'
        }))
      }
    },
    scatterChartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: false },
        scales: {
          xAxes: [{
            scaleLabel: { display: true, labelString: '시간 흐름 →' },
            gridLines: { color: '#717478' }
          }],
          yAxes: [{
            scaleLabel: { display: true, labelString: '관심도 ↑' },
            gridLines: { color: '#717478' }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex]
              return dataset.label
            }
          }
        }
      }
    }
  },
  methods: {
    getCategoryLabel(cat) {
      const labels = {
        tech: '기술',
        auto: '자동차',
        energy: '에너지',
        finance: '금융',
        realestate: '부동산',
        defense: '방산',
        bio: '바이오'
      }
      return labels[cat] || cat
    }
  }
}
</script>


