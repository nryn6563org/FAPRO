<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-7xl mx-auto space-y-12">
      <h1 class="text-3xl font-bold mb-8">Chart Migration Verification</h1>
      
      <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">1. Market Indices</h2>
        <MarketIndices />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">2. Recommend Return</h2>
        <RecommendReturn />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">3. Price Analysis</h2>
        <PriceAnalysis />
      </section>

       <section>
        <h2 class="text-xl font-bold mb-4 text-blue-600">4. Report Analysis</h2>
        <ReportAnalysis />
      </section>
    </div>
  </div>
</template>

<script>
import MarketIndices from '@/components/domain/MarketIndices'
import RecommendReturn from '@/components/domain/RecommendReturn'
import PriceAnalysis from '@/components/domain/PriceAnalysis'
import ReportAnalysis from '@/components/domain/ReportAnalysis'

export default {
  components: {
    MarketIndices,
    RecommendReturn,
    PriceAnalysis,
    ReportAnalysis
  }
}
</script>
