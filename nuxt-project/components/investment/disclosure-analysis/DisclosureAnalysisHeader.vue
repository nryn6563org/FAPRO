<!-- 공시 분석 헤더: 페이지 타이틀 및 공시 실시간 업데이트 정보 제공 -->
<template>
  <header class="c-disclosure-header">
    <div class="c-disclosure-header__content">
      <h2 class="c-disclosure-header__title">공시 분석</h2>
      <p class="c-disclosure-header__desc">실시간 공시 정보 및 영향 분석을 제공합니다.</p>
    </div>
    <div class="c-disclosure-header__meta">
      <ClockIcon class="c-disclosure-header__icon" />
      마지막 업데이트: {{ lastUpdate }}
    </div>
  </header>
</template>

<script>
import { ClockIcon } from 'lucide-vue'

export default {
  name: 'DisclosureAnalysisHeader',
  components: {
    ClockIcon
  },
  props: {
    lastUpdate: {
      type: String,
      default: '2024.01.22 14:40'
    }
  }
}
</script>

<style src="@/assets/css/components/investment/disclosure-analysis/disclosure-analysis-header.css"></style>
