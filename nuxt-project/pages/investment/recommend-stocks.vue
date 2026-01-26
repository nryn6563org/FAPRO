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
  // 컴포넌트 이름: 추천 종목 페이지
  name: 'RecommendStocks',
  components: {
    RecommendStocksHeader,
    RecommendHeroCard,
    RecommendStockCard
  },
  data() {
    return {
      categories, // 추천 전략 카테고리 목록 (예: 성장주, 가치주 등)
      activeCategory: 'momentum', // 현재 선택된 카테고리
      allStocks: strategyStocks // 전체 전략별 추천 종목 데이터
    }
  },
  computed: {
    // 현재 선택된 카테고리의 종목 리스트 반환
    currentStocks() {
      return this.allStocks[this.activeCategory] || []
    },
    // 최상단 히어로 섹션에 표시할 대표 제안 종목 (isHero: true)
    heroStock() {
      return this.currentStocks.find(s => s.isHero)
    },
    // 히어로 종목을 제외한 나머지 추천 종목 리스트
    secondaryStocks() {
      return this.currentStocks.filter(s => !s.isHero)
    }
  },
  methods: {
    /**
     * 카테고리 변경 핸들러
     * @param {string} categoryId - 변경할 카테고리 ID
     */
    handleCategoryChange(categoryId) {
      this.activeCategory = categoryId
    }
  }
}
</script>

<style src="@/assets/css/pages/recommend-stocks.css"></style>
