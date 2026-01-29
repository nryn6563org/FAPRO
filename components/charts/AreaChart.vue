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
import * as echarts from 'echarts/core'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

import { defineComponent } from 'vue'

// ECharts 모듈 등록
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

export default defineComponent({
  name: 'AreaChart',
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
    },
    gradientColor: {
      type: String,
      default: '#3b82f6'
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
          type: 'line',
          data: ds.data,
          smooth: true,
          showSymbol: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: this.hexToRgba(this.gradientColor || ds.borderColor || '#3b82f6', 0.4) },
              { offset: 1, color: this.hexToRgba(this.gradientColor || ds.borderColor || '#3b82f6', 0) }
            ])
          },
          lineStyle: {
            width: ds.borderWidth || 2,
            color: ds.borderColor || this.gradientColor
          },
          itemStyle: {
            color: ds.borderColor || this.gradientColor
          }
        }))
      }
    }
  },
  methods: {
    hexToRgba(hex, alpha) {
      let r = 0, g = 0, b = 0
      if (hex.length === 4) {
        r = '0x' + hex[1] + hex[1]
        g = '0x' + hex[2] + hex[2]
        b = '0x' + hex[3] + hex[3]
      } else if (hex.length === 7) {
        r = '0x' + hex[1] + hex[2]
        g = '0x' + hex[3] + hex[4]
        b = '0x' + hex[5] + hex[6]
      }
      return `rgba(${+r},${+g},${+b},${alpha})`
    }
  }
})
</script>
