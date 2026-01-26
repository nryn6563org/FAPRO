<!-- 추천종목 카드: 개별 종목의 상세 성과 및 매매 신호 정보 제공 -->
<template>
  <div class="c-recommend-card">
    <div class="c-recommend-card__rank">{{ stock.status }}</div>

    <div class="c-recommend-card__header">
      <div class="c-recommend-card__avatar">
        {{ stock.name[0] }}
      </div>
      <div class="c-recommend-card__info">
        <h3 class="c-recommend-card__name">{{ stock.name }}</h3>
        <p class="c-recommend-card__desc">{{ stock.description }}</p>
      </div>
    </div>

    <div class="c-recommend-card__tags">
      <span v-for="tag in stock.tags" :key="tag" class="c-recommend-card__tag">
        #{{ tag }}
      </span>
    </div>

    <div class="c-recommend-card__yield-section">
      <span class="c-recommend-card__yield-label">누적 수익률</span>
      <span class="c-recommend-card__yield-value">+{{ stock.yield }}%</span>
    </div>

    <div class="c-recommend-card__history">
      <div class="c-recommend-card__history-item">
        <div class="c-recommend-card__history-label">
          <div class="c-recommend-card__dot"></div>
          매수
        </div>
        <div class="c-recommend-card__history-val">
          {{ stock.buyDate }} ({{ stock.buyPrice.toLocaleString() }})
        </div>
      </div>
      <div class="c-recommend-card__history-item">
        <div class="c-recommend-card__history-label">
          <div class="c-recommend-card__dot"></div>
          매도
        </div>
        <div class="c-recommend-card__history-val">
          {{ stock.sellDate === '보유중' ? '보유중' : `${stock.sellDate} (${stock.sellPrice.toLocaleString()})` }}
        </div>
      </div>
    </div>

    <div class="c-recommend-card__actions">
      <Button variant="outline" class="c-recommend-card__btn">종목분석 리포트</Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue'

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
  }
}
</script>

<style src="@/assets/css/components/investment/recommend-stocks/recommend-stock-card.css"></style>
