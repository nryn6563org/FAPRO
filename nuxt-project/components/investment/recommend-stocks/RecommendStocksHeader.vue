<!-- 추천종목 헤더: 투자 전략 선정 및 마켓 상태 표시 -->
<template>
  <div class="c-recommend-header">
    <div class="c-recommend-header__top">
      <div class="c-disclosure-header__content">
        <h2 class="c-investment-header__title">추천종목</h2>
        <p class="c-investment-header__desc">투자 기간별 AI 추천 종목</p>
      </div>
      <div class="c-recommend-header__status">
        <span>01/22 장마감</span>
        <RefreshCwIcon class="c-recommend-header__refresh" />
      </div>
    </div>

    <div class="c-recommend-header__tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="c-recommend-header__tab"
        :class="{ 'c-recommend-header__tab--active': activeCategory === cat.id }"
        @click="$emit('change-category', cat.id)"
      >
        {{ cat.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { RefreshCwIcon } from 'lucide-vue'

export default {
  name: 'RecommendStocksHeader',
  components: {
    RefreshCwIcon
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: String,
      required: true
    }
  }
}
</script>

<style src="@/assets/css/components/investment/disclosure-analysis/disclosure-header.css"></style>
<style src="@/assets/css/components/investment/recommend-stocks/recommend-header.css"></style>
