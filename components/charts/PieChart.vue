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
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'

import { defineComponent } from 'vue'

// ECharts 모듈 등록
use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

export default defineComponent({
  name: 'PieChart',
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
      const dataset = datasets[0] || {}

      const data = labels.map((label, index) => ({
        name: label,
        value: dataset.data ? dataset.data[index] : 0,
        itemStyle: {
          color: Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[index] : dataset.backgroundColor
        }
      }))

      return {
        tooltip: {
          trigger: 'item',
          confine: true
        },
        legend: {
          show: this.options && this.options.legend && this.options.legend.display !== false,
          orient: 'vertical',
          right: 5,
          top: 'center',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 11, color: '#64748b' }
        },
        series: [
          {
            name: dataset.label || '',
            type: 'pie',
            radius: ['45%', '75%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data
          }
        ]
      }
    }
  }
})
</script>
