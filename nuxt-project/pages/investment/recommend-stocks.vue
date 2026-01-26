<!-- 추천 종목 페이지: AI 기반 전략별 선별 종목 목록 제공 -->
<template>
  <div class="p-recommend-stocks">
    <!-- 페이지 헤더 및 탭 -->
    <RecommendStocksHeader
      :categories="categories"
      :active-category="activeCategory"
      @change-category="handleCategoryChange"
    />

    <div class="p-recommend-stocks__content">
      <!-- 히어로 카드 (해당 카테고리 TOP 1) -->
      <RecommendHeroCard v-if="heroStock" :stock="heroStock" />

      <!-- 나머지 종목 그리드 -->
      <div class="p-recommend-stocks__grid">
        <RecommendStockCard
          v-for="stock in secondaryStocks"
          :key="stock.id"
          :stock="stock"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 컴포넌트 임포트
import RecommendStocksHeader from '@/components/investment/recommend-stocks/RecommendStocksHeader.vue'
import RecommendHeroCard from '@/components/investment/recommend-stocks/RecommendHeroCard.vue'
import RecommendStockCard from '@/components/investment/recommend-stocks/RecommendStockCard.vue'

// 데이터 임포트
import { strategyStocks, categories } from '@/utils/recommend-stocks-data'

export default {
  name: 'RecommendStocks',
  components: {
    RecommendStocksHeader,
    RecommendHeroCard,
    RecommendStockCard
  },
  data() {
    return {
      categories,
      activeCategory: 'momentum',
      allStocks: strategyStocks
    }
  },
  computed: {
    currentStocks() {
      return this.allStocks[this.activeCategory] || []
    },
    heroStock() {
      return this.currentStocks.find(s => s.isHero)
    },
    secondaryStocks() {
      return this.currentStocks.filter(s => !s.isHero)
    }
  },
  methods: {
    handleCategoryChange(categoryId) {
      this.activeCategory = categoryId
    }
  }
}
</script>

<style src="@/assets/css/pages/recommend-stocks.css"></style>
