<!-- 오늘의 종목 Pick 카드: 개별 종목의 AI 추천 정보 및 시세 요약 정보 제공 -->
<template>
  <div class="c-today-pick-card" :class="{ 'c-today-pick-card--highlight': pick.rank <= 3 }">
    <button
      class="c-today-pick-card__favorite"
      :class="{ 'c-today-pick-card__favorite--active': pick.isFavorite }"
      @click="$emit('toggle-favorite', pick)"
    >
      <StarIcon class="c-today-pick-card__fav-icon" />
    </button>

    <div class="c-today-pick-card__header">
      <div class="c-today-pick-card__avatar" :class="getStockColor(pick.name)">
        {{ pick.name[0] }}
      </div>
      <div class="c-today-pick-card__info">
        <div class="c-today-pick-card__name-row">
          <h3 class="c-today-pick-card__name">{{ pick.name }}</h3>
          <span class="c-today-pick-card__ticker">{{ pick.ticker }}</span>
        </div>
        <p class="c-today-pick-card__desc">{{ pick.description }}</p>
        <div class="c-today-pick-card__tags">
          <span v-for="tag in pick.issues" :key="tag" class="c-today-pick-card__tag">
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="c-today-pick-card__price-section">
      <div class="c-today-pick-card__price-group">
        <div class="c-today-pick-card__price">{{ pick.price.toLocaleString() }}</div>
        <div class="c-today-pick-card__change" :class="pick.changeRate >= 0 ? 'indicator--positive' : 'indicator--negative'">
          <ChevronUpIcon v-if="pick.changeRate >= 0" class="c-today-pick-card__change-icon" />
          <ChevronDownIcon v-else class="c-today-pick-card__change-icon" />
          {{ pick.changeAmount > 0 ? '+' : '' }}{{ pick.changeAmount.toLocaleString() }}
          ({{ pick.changeRate > 0 ? '+' : '' }}{{ pick.changeRate }}%)
        </div>
      </div>

      <!-- Sparkline Chart (Inline SVG) -->
      <div class="c-today-pick-card__chart">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="c-today-pick-card__sparkline">
          <path
            :d="sparklinePath"
            fill="none"
            :stroke="pick.changeRate >= 0 ? '#ef4444' : '#3b82f6'"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="c-today-pick-card__reason-box">
      <div class="c-today-pick-card__reason-label">
        <StarIcon class="c-today-pick-card__reason-icon" />
        AI 추천 이유
      </div>
      <p class="c-today-pick-card__reason-text">{{ pick.reason }}</p>
    </div>

    <div class="c-today-pick-card__actions">
      <Button
        class="c-today-pick-card__btn"
        :variant="pick.isFavorite ? 'outline' : 'default'"
        @click="$emit('toggle-favorite', pick)"
      >
        {{ pick.isFavorite ? '관심해제' : '관심추가' }}
      </Button>
      <Button variant="outline" class="c-today-pick-card__btn">상세분석</Button>
    </div>
  </div>
</template>

<script>
import { StarIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-vue'
import { getStockColor } from '@/utils/today-pick-data'
import Button from '@/components/atoms/Button.vue'

export default {
  name: 'TodayPickStockCard',
  components: {
    StarIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    Button
  },
  props: {
    pick: {
      type: Object,
      required: true
    }
  },
  computed: {
    sparklinePath() {
      if (!this.pick.chartData || this.pick.chartData.length < 2) { return '' }
      const min = Math.min(...this.pick.chartData)
      const max = Math.max(...this.pick.chartData)
      const range = max - min || 1
      const width = 100
      const height = 40

      const points = this.pick.chartData.map((val, i) => {
        const x = (i / (this.pick.chartData.length - 1)) * width
        const y = height - ((val - min) / range) * (height - 10) - 5
        return `${x},${y}`
      })

      return `M ${points.join(' L ')}`
    }
  },
  methods: {
    getStockColor
  }
}
</script>

<style src="@/assets/css/components/investment/today-pick/today-pick-stock-card.css"></style>
