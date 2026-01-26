<!-- 오늘의 종목 Pick 헤더: 서비스 소개 및 시각적 강조 피드백 제공 -->
<template>
  <header class="c-today-pick-header">
    <div class="c-today-pick-header__content">
      <div class="c-today-pick-header__icon-box">
        <StarIcon class="c-today-pick-header__icon" />
      </div>
      <div class="c-today-pick-header__text">
        <h2 class="c-today-pick-header__title">오늘의 종목 Pick</h2>
        <p class="c-today-pick-header__desc">AI 알고리즘이 매일 아침 5종목을 추천합니다. 종목탐색의 용도로 활용할 수 있습니다.</p>
      </div>
    </div>
  </header>
</template>

<script>
import { StarIcon } from 'lucide-vue'

export default {
  name: 'TodayPickHeader',
  components: {
    StarIcon
  }
}
</script>

<style src="@/assets/css/components/investment/today-pick/today-pick-header.css"></style>
