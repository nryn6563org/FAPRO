/**
 * 파이 차트(Pie Chart) 컴포넌트
 */
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    // 차트 옵션 설정 객체
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // 차트 데이터와 옵션을 기반으로 렌더링 실행
    this.renderChart(this.chartData, this.options)
  }
}
