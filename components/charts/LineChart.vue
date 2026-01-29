<template>
  <div :style="{ height: typeof height === 'number' ? `${height}px` : height }">
    <client-only>
      <v-chart
        :option="echartsOption"
        autoresize
        style="width: 100%; height: 100%"
      />
    </client-only>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

import { defineComponent } from 'vue'

// ECharts 모듈 등록
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

export default defineComponent({
  name: 'LineChart',
  components: {
    'v-chart': ECharts
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: [Number, String],
      default: 200
    }
  },
  computed: {
    echartsOption() {
      const { labels = [], datasets = [] } = this.chartData

      return {
        grid: {
          top: 10,
          left: 5,
          right: 5,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          textStyle: { color: '#1e293b' },
          extraCssText: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0;'
        },
        xAxis: {
          type: 'category',
          data: labels,
          axisLabel: {
            fontSize: 10,
            color: '#64748b'
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            color: '#64748b'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#f1f5f9'
            }
          }
        },
        series: datasets.map(ds => ({
          name: ds.label,
          type: 'line',
          data: ds.data,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: ds.borderWidth || 2,
            color: ds.borderColor || '#3b82f6'
          },
          itemStyle: {
            color: ds.borderColor || '#3b82f6'
          }
        }))
      }
    }
  }
})
</script>
