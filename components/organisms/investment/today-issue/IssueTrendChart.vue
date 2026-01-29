<!-- 이슈 검색 빈도 및 종목 등락률 차트: 선택된 키워드의 트렌드 분석 제공 -->
<template>
  <div class="c-issue-trend">
    <div class="c-issue-trend__header">
      <h3 class="c-issue-trend__title">{{ title }} 검색빈도 및 종목 누적 등락률</h3>
      <button class="c-issue-trend__more">더보기 →</button>
    </div>
    <div class="c-issue-trend__chart-container">
      <line-chart
        :chart-data="chartData"
        :options="chartOptions"
        :height="null"
        class="h-full"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IssueTrendChart',
  // LineChart는 ~/components/charts/LineChart.vue를 통해 글로벌로 등록되어 자동 임포트됩니다.
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      // 리액트 소스의 데이터 구조를 Chart.js 형식으로 변환
      const labels = this.data.map(item => item.date)
      const datasets = [
        {
          label: '검색 빈도',
          borderColor: '#3b82f6',
          backgroundColor: 'transparent',
          data: this.data.map(item => item.value),
          borderWidth: 2,
          pointRadius: 3,
          hoverBorderWidth: 4,
          hoverRadius: 5,
          fill: false,
          yAxisID: 'y-axis-1'
        }
      ]

      // 종목별 데이터 추가 (value 제외 나머지 키들)
      if (this.data.length > 0) {
        const keys = Object.keys(this.data[0]).filter(k => k !== 'date' && k !== 'value')
        const colors = ['#f59e0b', '#10b981', '#6366f1', '#ec4899']

        keys.forEach((key, index) => {
          datasets.push({
            label: key,
            borderColor: colors[index % colors.length],
            backgroundColor: 'transparent',
            data: this.data.map(item => item[key]),
            borderWidth: 1.5,
            pointRadius: 2,
            hoverBorderWidth: 3,
            hoverRadius: 4,
            fill: false,
            yAxisID: 'y-axis-2'
          })
        })
      }

      return { labels, datasets }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: 'dataset',
          intersect: false,
          animationDuration: 400
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            fontSize: 10,
            fontStyle: 'bold',
            padding: 15
          }
        },
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              position: 'left',
              gridLines: {
                color: '#f1f5f9',
                borderDash: [5, 5],
                drawBorder: false
              },
              ticks: {
                fontColor: '#94a3b8',
                fontSize: 10,
                padding: 10
              }
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              position: 'right',
              gridLines: { display: false },
              ticks: {
                display: false
              }
            }
          ],
          xAxes: [{
            gridLines: { display: false },
            ticks: {
              fontColor: '#94a3b8',
              fontSize: 10,
              padding: 10
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          padding: 10,
          titleStyle: { fontWeight: 'bold' }
        }
      }
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-issue/issue-trend-chart.css"></style>
