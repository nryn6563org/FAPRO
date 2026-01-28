<!-- 마켓 요약 섹션: 외국인, 기관, 연기금, 개인의 매매 동향 요약 정보 제공 -->
<template>
  <section class="c-market-summary">
    <div
      v-for="(metric, idx) in metrics"
      :key="idx"
      class="c-market-summary__card"
    >
      <span class="c-market-summary__label">{{ metric.label }}</span>
      <div class="c-market-summary__value">{{ metric.value }}</div>
      <div class="c-market-summary__trend">
        <span
          class="c-market-summary__trend-text"
          :class="metric.trendVal > 0 ? 'indicator--positive' : 'indicator--negative'"
        >
          {{ metric.trend }}
        </span>
        <TrendingUpIcon v-if="metric.trendVal > 0" class="c-market-summary__icon indicator--positive" />
        <TrendingDownIcon v-else class="c-market-summary__icon indicator--negative" />
      </div>
    </div>
  </section>
</template>

<script>
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-vue'

export default {
  name: 'MarketSummarySection',
  components: {
    TrendingUpIcon,
    TrendingDownIcon
  },
  props: {
    metrics: {
      type: Array,
      required: true
    }
  }
}
</script>

<style src="@/assets/css/components/investment/supply-analysis/market-summary-section.css"></style>
