<!-- 리포트 분석 헤더: 페이지 타이틀 및 리포트 실시간 업데이트 정보 제공 -->
<template>
  <header class="c-report-analysis-header">
    <div class="c-report-analysis-header__content">
      <h2 class="c-report-analysis-header__title">리포트 분석</h2>
      <p class="c-report-analysis-header__desc">증권사 애널리스트 리포트 및 목표가 변동 현황입니다.</p>
    </div>
    <div class="c-report-analysis-header__meta">
      <ClockIcon class="c-report-analysis-header__icon" />
      마지막 업데이트: {{ lastUpdate }}
    </div>
  </header>
</template>

<script>
import { ClockIcon } from 'lucide-vue'

export default {
  name: 'ReportAnalysisHeader',
  components: {
    ClockIcon
  },
  props: {
    lastUpdate: {
      type: String,
      default: '2024.01.22 09:25'
    }
  }
}
</script>

<style src="@/assets/css/components/investment/report-analysis/report-analysis-header.css"></style>
