<!-- 공시 요약 섹션: 금일 공시, 중요 공시 등 주요 지표 요약 정보 제공 -->
<template>
  <section class="c-disclosure-metrics">
    <div
      v-for="(metric, idx) in metrics"
      :key="idx"
      class="c-disclosure-metrics__card"
    >
      <div class="c-disclosure-metrics__icon-box" :class="metric.bgClass">
        <component
          :is="metric.icon"
          class="c-disclosure-metrics__icon"
          :class="metric.iconClass"
        />
      </div>
      <div class="c-disclosure-metrics__content">
        <span class="c-disclosure-metrics__label">{{ metric.label }}</span>
        <span class="c-disclosure-metrics__value">{{ metric.value }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { ClipboardListIcon, AlertCircleIcon, CheckCircleIcon, SparklesIcon } from 'lucide-vue'

export default {
  name: 'DisclosureSummaryMetrics',
  components: {
    ClipboardListIcon,
    AlertCircleIcon,
    CheckCircleIcon,
    SparklesIcon
  },
  data() {
    return {
      metrics: [
        {
          label: '금일 공시',
          value: '124건',
          icon: 'ClipboardListIcon',
          bgClass: 'bg-blue-50 dark:bg-blue-900/20',
          iconClass: 'text-blue-600 dark:text-blue-400'
        },
        {
          label: '중요 공시',
          value: '12건',
          icon: 'AlertCircleIcon',
          bgClass: 'bg-rose-50 dark:bg-rose-900/20',
          iconClass: 'text-rose-600 dark:text-rose-400'
        },
        {
          label: '분석 완료',
          value: '98건',
          icon: 'CheckCircleIcon',
          bgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
          iconClass: 'text-emerald-600 dark:text-emerald-400'
        },
        {
          label: '영향 증가',
          value: '45개',
          icon: 'SparklesIcon',
          bgClass: 'bg-amber-50 dark:bg-amber-900/20',
          iconClass: 'text-amber-600 dark:text-amber-400'
        }
      ]
    }
  }
}
</script>

<style src="@/assets/css/components/investment/disclosure-analysis/disclosure-summary-metrics.css"></style>
