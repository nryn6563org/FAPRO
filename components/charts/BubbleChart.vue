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
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

import { defineComponent } from 'vue'

// ECharts 모듈 등록
use([CanvasRenderer, ScatterChart, GridComponent, TooltipComponent])

export default defineComponent({
  name: 'BubbleChart',
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
      const { datasets = [] } = this.chartData

      return {
        grid: {
          top: 30,
          left: 5,
          right: 30,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: (params) => {
            return `<b>${params.seriesName}</b><br/>관심도: ${params.value[1]}`
          }
        },
        xAxis: {
          type: 'value',
          name: this.options && this.options.scales && this.options.scales.xAxes && this.options.scales.xAxes[0].scaleLabel ? this.options.scales.xAxes[0].scaleLabel.labelString : '',
          nameLocation: 'middle',
          nameGap: 25,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#334155'
            }
          },
          axisLabel: { fontSize: 10, color: '#94a3b8' }
        },
        yAxis: {
          type: 'value',
          name: this.options && this.options.scales && this.options.scales.yAxes && this.options.scales.yAxes[0].scaleLabel ? this.options.scales.yAxes[0].scaleLabel.labelString : '',
          nameLocation: 'end',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#334155'
            }
          },
          axisLabel: { fontSize: 10, color: '#94a3b8' }
        },
        series: datasets.map(ds => ({
          name: ds.label,
          type: 'scatter',
          data: ds.data.map(p => [p.x, p.y, p.r]),
          symbolSize: (data) => data[2] * 4,
          itemStyle: {
            color: ds.backgroundColor,
            opacity: 0.8
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
              borderWidth: 2,
              borderColor: '#fff'
            }
          }
        }))
      }
    }
  }
})
</script>
