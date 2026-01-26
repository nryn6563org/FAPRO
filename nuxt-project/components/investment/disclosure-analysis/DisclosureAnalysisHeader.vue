<!-- 공시 분석 헤더: 페이지 타이틀 및 공시 실시간 업데이트 정보 제공 -->
<template>
  <div class="c-investment-header">
    <div class="c-disclosure-header__content">
      <h2 class="c-investment-header__title">공시 분석 리포트</h2>
      <p class="c-investment-header__desc">
        인공지능이 실시간 공시 데이터를 분석하여 투자 핵심 가이드를 제공합니다.
      </p>
    </div>
    <div class="c-disclosure-header__meta">
      <ClockIcon class="c-disclosure-header__icon" />
      마지막 업데이트: {{ lastUpdate }}
    </div>
  </div>
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


