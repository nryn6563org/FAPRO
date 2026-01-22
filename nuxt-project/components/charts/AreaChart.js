import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    },
    gradientColor: {
      type: String, // Hex color for the gradient top
      default: '#3b82f6' // Blue-500 default
    }
  },
  mounted () {
    const ctx = this.$refs.canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 100) // Vertical gradient
    gradient.addColorStop(0, this.hexToRgba(this.gradientColor, 0.4))
    gradient.addColorStop(1, this.hexToRgba(this.gradientColor, 0))

    // Inject gradient into the first dataset's background color if not set
    if (this.chartData && this.chartData.datasets && this.chartData.datasets.length > 0) {
        if (!this.chartData.datasets[0].backgroundColor) {
            this.chartData.datasets[0].backgroundColor = gradient
        }
    }

    this.renderChart(this.chartData, this.options)
  },
  methods: {
    hexToRgba(hex, alpha) {
        let r = 0, g = 0, b = 0;
        // 3 digits
        if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
        }
        return "rgba(" + +r + "," + +g + "," + +b + "," + alpha + ")";
    }
  }
}
