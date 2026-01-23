/**
 * 라인 차트(Line Chart) 컴포넌트
 */
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
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
    // chartData는 reactiveProp 믹스인을 통해 자동으로 주입됩니다.
    this.renderChart(this.chartData, this.options);
  }
};
