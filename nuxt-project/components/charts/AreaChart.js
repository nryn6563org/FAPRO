/**
 * 영역 차트(Area Chart) 컴포넌트
 * vue-chartjs를 기반으로 그라데이션 효과가 포함된 라인 차트를 구현합니다.
 */
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    // 차트 옵션 설정 객체
    options: {
      type: Object,
      default: null
    },
    // 그라데이션 상단에 사용될 색상 (Hex 코드, 기본값: Blue-500)
    gradientColor: {
      type: String,
      default: '#3b82f6'
    }
  },
  mounted() {
    const ctx = this.$refs.canvas.getContext('2d')
    // 세로 방향 그라데이션 생성 (상단 -> 하단)
    const gradient = ctx.createLinearGradient(0, 0, 0, 100)
    gradient.addColorStop(0, this.hexToRgba(this.gradientColor, 0.4))
    gradient.addColorStop(1, this.hexToRgba(this.gradientColor, 0))

    // 첫 번째 데이터셋에 배경색(그라데이션) 주입
    if (this.chartData && this.chartData.datasets && this.chartData.datasets.length > 0) {
      if (!this.chartData.datasets[0].backgroundColor) {
        this.chartData.datasets[0].backgroundColor = gradient
      }
    }

    // 차트 렌더링 실행
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    /**
     * Hex 색상 코드를 RGBA 포맷으로 변환
     * @param {string} hex - Hex 색상 코드
     * @param {number} alpha - 알파(투명도) 값 (0 ~ 1)
     * @returns {string} rgba 색상 문자열
     */
    hexToRgba(hex, alpha) {
      let r = 0
      let g = 0
      let b = 0
      // 3 digits
      if (hex.length === 4) {
        r = '0x' + hex[1] + hex[1]
        g = '0x' + hex[2] + hex[2]
        b = '0x' + hex[3] + hex[3]
      } else if (hex.length === 7) {
        r = '0x' + hex[1] + hex[2]
        g = '0x' + hex[3] + hex[4]
        b = '0x' + hex[5] + hex[6]
      }
      return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + alpha + ')'
    }
  }
}
