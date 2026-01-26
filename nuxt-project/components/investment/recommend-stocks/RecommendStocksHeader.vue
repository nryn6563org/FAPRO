<!-- 추천종목 헤더: 투자 전략 선정 및 마켓 상태 표시 -->
<template>
  <div class="c-recommend-header">
    <div class="c-recommend-header__top">
      <div class="c-recommend-header__title-group">
        <LightbulbIcon class="c-recommend-header__icon" />
        <h2 class="c-recommend-header__title">추천종목</h2>
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
import { LightbulbIcon, RefreshCwIcon } from 'lucide-vue'

export default {
  name: 'RecommendStocksHeader',
  components: {
    LightbulbIcon,
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

<style src="@/assets/css/components/investment/recommend-stocks/recommend-header.css"></style>
