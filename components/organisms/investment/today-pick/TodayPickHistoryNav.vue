<!-- 오늘의 종목 Pick 히스토리 네비게이션: 외부 슬라이더 제어 기능을 통합 -->
<template>
  <nav class="c-today-pick-nav">
    <div class="c-today-pick-nav__selector">
      <!-- Swiper 내비게이션 버튼 (외부 제어용 클래스 적용) -->
      <button class="c-today-pick-nav__btn c-today-pick-nav__btn--prev">
        <ChevronLeftIcon class="c-today-pick-nav__icon" />
      </button>

      <span class="c-today-pick-nav__date">{{ currentDate }}</span>

      <button class="c-today-pick-nav__btn c-today-pick-nav__btn--next">
        <ChevronRightIcon class="c-today-pick-nav__icon" />
      </button>
    </div>

    <!-- Swiper 페이지네이션 인디케이터 (외부 출력용 클래스 적용) -->
    <div class="c-today-pick-nav__indicators"></div>
  </nav>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue'

export default {
  name: 'TodayPickHistoryNav',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    currentDate: {
      type: String,
      default: '오늘'
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-pick/today-pick-history-nav.css"></style>
