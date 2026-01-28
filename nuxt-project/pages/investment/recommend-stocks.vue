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
    <RecommendHeroCard 
      v-if="heroStock" 
      :stock="heroStock" 
      :description="activeCategoryDescription"
    />

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
  // 컴포넌트 이름: 투자 추천 종목 페이지
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
    // 현재 선택된 카테고리에 해당하는 종목 목록 반환
    currentStocks() {
      // 해당 카테고리 데이터가 없으면 빈 배열 반환
      return this.allStocks[this.activeCategory] || []
    },
    // 수익률 1위 종목 (히어로 섹션용)
    heroStock() {
      return this.currentStocks.find(s => s.rank === 1)
    },
    // 전체 추천 종목 리스트 (5열 그리드에 1위 포함 모든 종목 노출)
    secondaryStocks() {
      return this.currentStocks
    },
    // 현재 활성화된 카테고리의 설명 문구
    // 현재 활성화된 카테고리의 설명 문구 반환
    activeCategoryDescription() {
      const cat = this.categories.find(c => c.id === this.activeCategory)
      return cat ? cat.description : ''
    }
  },
  methods: {
    /**
     * 카테고리 변경 핸들러
     * @param {string} categoryId - 변경할 카테고리 ID
     */
    // 카테고리 탭 변경 시 호출되는 메서드
    handleCategoryChange(categoryId) {
      this.activeCategory = categoryId
    }
  }
}
</script>

<style src="@/assets/css/pages/recommend-stocks.css"></style>
