<!-- 추천종목 카드: 개별 종목의 상세 성과 및 매매 신호 정보 제공 -->
<template>
  <div class="c-recommend-card">
    <div 
      class="c-recommend-card__avatar" 
    >
      {{ stock.name[0] }}
    </div>

    <div class="c-recommend-card__info-group">
      <div class="c-recommend-card__name-row">
        <div v-if="stock.rank <= 5" :class="['c-recommend-card__rank-badge', `is-rank-${stock.rank}`]">
          <span class="c-recommend-card__rank-icon">🎗️</span>
          TOP{{ stock.rank }}
        </div>
        <h3 class="c-recommend-card__name">{{ stock.name }}</h3>
      </div>

      <p class="c-recommend-card__desc">{{ stock.description }}</p>

      <div class="c-recommend-card__tags">
        <span v-for="tag in stock.tags" :key="tag" class="c-recommend-card__tag">#{{ tag }}</span>
      </div>

      <div class="c-recommend-card__history">
        {{ stock.buyDate }} 매수 {{ stock.buyPrice.toLocaleString() }} | 
        {{ stock.sellDate === '보유중' ? '보유중' : `${stock.sellDate} 매도` }}
      </div>
    </div>

    <div class="c-recommend-card__yield-section">
      <div class="c-recommend-card__yield-value">
        +{{ stock.yield }}% 수익
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue'
import { getStockColor } from '@/utils/today-pick-data.js'

export default {
  name: 'RecommendStockCard',
  components: {
    Button
  },
  props: {
    stock: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStockColor
  }
}
</script>

<style src="@/assets/css/components/investment/recommend-stocks/recommend-stock-card.css"></style>
