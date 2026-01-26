<!-- 추천종목 히어로 카드: 수익률이 가장 높은 종목을 시각적으로 강조 -->
<template>
  <div class="c-recommend-hero">
    <div class="c-recommend-hero__decoration"></div>

    <div class="c-recommend-hero__content">
      <div class="c-recommend-hero__badge">1년 TOP 수익률</div>

      <div class="c-recommend-hero__name-row">
        <div class="c-recommend-hero__avatar">{{ stock.name[0] }}</div>
        <div class="c-recommend-hero__stock-info">
          <h3 class="c-recommend-hero__name">{{ stock.name }}</h3>
          <span class="c-recommend-hero__ticker">{{ stock.ticker }}</span>
        </div>
      </div>

      <p class="c-recommend-hero__desc">{{ stock.description }}</p>

      <div class="c-recommend-hero__tags">
        <span v-for="tag in stock.tags" :key="tag" class="c-recommend-hero__tag">#{{ tag }}</span>
      </div>

      <div class="c-recommend-hero__history">
        <div class="c-recommend-hero__history-item">
          <span class="c-recommend-hero__history-label">매수</span>
          <span>{{ stock.buyDate }} ({{ stock.buyPrice.toLocaleString() }})</span>
        </div>
        <div class="c-recommend-hero__history-item">
          <span class="c-recommend-hero__history-label">매도</span>
          <span>{{ stock.sellDate === '보유중' ? '보유중' : `${stock.sellDate} (${stock.sellPrice.toLocaleString()})` }}</span>
        </div>
      </div>
    </div>

    <div class="c-recommend-hero__yield-section">
      <p class="c-recommend-hero__yield-label">수익률</p>
      <div class="c-recommend-hero__yield-value">
        +{{ stock.yield }}<span class="c-recommend-hero__yield-unit">%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendHeroCard',
  props: {
    stock: {
      type: Object,
      required: true
    }
  }
}
</script>

<style src="@/assets/css/components/investment/recommend-stocks/recommend-hero-card.css"></style>
