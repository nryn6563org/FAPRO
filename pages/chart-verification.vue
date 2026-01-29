<!-- 차트 마이그레이션 검증 페이지: 각종 차트 컴포넌트의 렌더링 상태를 확인하기 위한 개발용 페이지 -->
<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-7xl mx-auto space-y-12">
      <h1 class="text-3xl font-bold mb-8">차트 마이그레이션 검증</h1>

      <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">1. 시장 지수 (Market Indices)</h2>
        <MarketIndices />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">2. 추천 수익률 (Recommend Return)</h2>
        <RecommendReturn />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">3. 시세 분석 (Price Analysis)</h2>
        <PriceAnalysis />
      </section>

       <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">4. 리포트 분석 (Report Analysis)</h2>
        <ReportAnalysis />
      </section>
    </div>
  </div>
</template>

<script>
import MarketIndices from '@/components/organisms/MarketIndices.vue'
import RecommendReturn from '@/components/organisms/RecommendReturn.vue'
import PriceAnalysis from '@/components/organisms/PriceAnalysis.vue'
import ReportAnalysis from '@/components/organisms/ReportAnalysis.vue'

export default {
  components: {
    MarketIndices,
    RecommendReturn,
    PriceAnalysis,
    ReportAnalysis
  }
}
</script>
