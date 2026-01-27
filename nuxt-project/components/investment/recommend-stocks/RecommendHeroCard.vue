<!-- 추천종목 히어로 카드: 수익률이 가장 높은 종목을 시각적으로 강조 -->
<template>
  <div class="c-recommend-hero">
    <div class="c-recommend-hero__badge">1년 Top 수익률</div>
    
    <transition name="hero-switch" mode="out-in">
      <div :key="stock.id" class="c-recommend-hero__inner">
        <div class="c-recommend-hero__intro">
          <div class="c-recommend-hero__intro-title">{{ description.split('\n')[0] }}</div>
          <div class="c-recommend-hero__intro-subtitle">{{ description.split('\n')[1] }}</div>
        </div>

        <div class="c-recommend-hero__content">
          <div class="c-recommend-hero__yield">
            <div class="c-recommend-hero__yield-value">
              +{{ displayYield }}<span class="c-recommend-hero__yield-unit">%</span>
            </div>
          </div>

          <div class="c-recommend-hero__stock">
            <div class="c-recommend-hero__info">
              <div class="c-recommend-hero__name-group">
                <h3 class="c-recommend-hero__name">{{ stock.name }}</h3>
                <span class="c-recommend-hero__ticker">{{ stock.ticker }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'RecommendHeroCard',
  props: {
    stock: {
      type: Object,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      displayYield: 0,
      animationInProgress: false
    }
  },
  watch: {
    'stock.id': {
      immediate: true,
      handler() {
        this.animateYield()
      }
    }
  },
  methods: {
    animateYield() {
      if (!process.client) return

      const target = this.stock.yield
      const duration = 1500 // 1.5s
      const startValue = 0
      const startTime = (window.performance && window.performance.now) ? window.performance.now() : Date.now()

      const update = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        
        const currentValue = startValue + (target - startValue) * easeProgress
        this.displayYield = currentValue.toFixed(2)

        if (progress < 1) {
          requestAnimationFrame(update)
        } else {
          this.displayYield = target.toFixed(2)
        }
      }

      requestAnimationFrame(update)
    }
  }
}
</script>

<style src="@/assets/css/components/investment/recommend-stocks/recommend-hero-card.css"></style>
