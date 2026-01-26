<!-- 오늘의 종목 Pick 페이지: AI 기반 종목 추천 및 히스토리 제공 (날짜별 슬라이더 적용) -->
<template>
  <div class="p-today-pick">
    <!-- 페이지 헤더 -->
    <TodayPickHeader />

    <!-- 날짜 네비게이션 (슬라이더 컨트롤러) -->
    <TodayPickHistoryNav :current-date="activeDate" />

    <!-- 날짜별 종목 컨텐츠 슬라이더 -->
    <div class="p-today-pick__slider-container">
      <div v-swiper:mySwiper="swiperOption" class="swiper-container" @slideChange="handleSlideChange">
        <div class="swiper-wrapper">
          <div v-for="(day, dayIdx) in historyData" :key="day.date" class="swiper-slide">
            <div class="p-today-pick__day-grid">
              <TodayPickStockCard
                v-for="pick in day.picks"
                :key="`${dayIdx}-${pick.ticker}`"
                :pick="pick"
                @toggle-favorite="handleToggleFavorite($event, dayIdx)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 컴포넌트 임포트
import TodayPickHeader from '@/components/investment/today-pick/TodayPickHeader.vue'
import TodayPickHistoryNav from '@/components/investment/today-pick/TodayPickHistoryNav.vue'
import TodayPickStockCard from '@/components/investment/today-pick/TodayPickStockCard.vue'

// 데이터 임포트
import { historyPicks } from '@/utils/today-pick-data'

export default {
  name: 'TodayPick',
  components: {
    TodayPickHeader,
    TodayPickHistoryNav,
    TodayPickStockCard
  },
  data() {
    return {
      historyData: historyPicks,
      activeDate: historyPicks[0].date,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 50,
        navigation: {
          nextEl: '.c-today-pick-nav__btn--next',
          prevEl: '.c-today-pick-nav__btn--prev'
        },
        pagination: {
          el: '.c-today-pick-nav__indicators',
          bulletClass: 'c-today-pick-nav__indicator',
          bulletActiveClass: 'c-today-pick-nav__indicator--active',
          clickable: true
        }
      }
    }
  },
  methods: {
    handleSlideChange() {
      const activeIndex = this.mySwiper.activeIndex
      if (this.historyData[activeIndex]) {
        this.activeDate = this.historyData[activeIndex].date
      }
    },
    handleToggleFavorite(targetPick, dayIdx) {
      const pick = this.historyData[dayIdx].picks.find(p => p.ticker === targetPick.ticker)
      if (pick) {
        pick.isFavorite = !pick.isFavorite
      }
    }
  }
}
</script>

<style src="@/assets/css/pages/today-pick.css"></style>
