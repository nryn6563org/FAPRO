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
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

import { defineComponent } from 'vue'

// ECharts 모듈 등록
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

export default defineComponent({
  name: 'BarChart',
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
          top: 30,
          left: 5,
          right: 5,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          confine: true
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
          type: 'bar',
          data: ds.data,
          barMaxWidth: 40,
          itemStyle: {
            color: ds.backgroundColor || '#3b82f6',
            borderRadius: ds.borderRadius || 0
          }
        }))
      }
    }
  }
})
</script>
