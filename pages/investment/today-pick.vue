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

// 데이터 임포트 (Mock Data)
import { historyPicks } from '@/utils/today-pick-data'

export default {
  // 컴포넌트 이름: 오늘의 Pick (종목 추천 히스토리)
  name: 'TodayPick',
  components: {
    TodayPickHeader,
    TodayPickHistoryNav,
    TodayPickStockCard
  },
  data() {
    // 과거 날짜부터 오름차순으로 정렬 (Past -> Present)
    const sortedHistory = [...historyPicks].reverse()

    return {
      historyData: sortedHistory, // 정렬된 데이터 할당
      activeDate: sortedHistory[sortedHistory.length - 1].date, // 현재 보고 있는 날짜 (초기값: 가장 최근 날짜)
      // Swiper 슬라이더 옵션 설정
      swiperOption: {
        initialSlide: sortedHistory.length - 1, // 가장 마지막 슬라이드(최신 날짜)부터 시작
        slidesPerView: 1, // 한 번에 하나의 날짜(카드 그룹)만 표시
        spaceBetween: 50, // 슬라이드 간 간격
        navigation: {
          nextEl: '.c-today-pick-nav__btn--next', // 다음 버튼 클래스 연결
          prevEl: '.c-today-pick-nav__btn--prev'  // 이전 버튼 클래스 연결
        },
        pagination: {
          el: '.c-today-pick-nav__indicators', // 페이지네이션 요소 연결
          bulletClass: 'c-today-pick-nav__indicator', // 불릿 클래스 커스텀
          bulletActiveClass: 'c-today-pick-nav__indicator--active', // 활성 불릿 클래스
          clickable: true // 불릿 클릭 가능 여부
        }
      }
    }
  },
  methods: {
    /**
     * 슬라이더 변경 핸들러
     * - 슬라이드가 넘어가면 해당 인덱스의 날짜정보로 상단 네비게이션을 업데이트
     */
    handleSlideChange() {
      const activeIndex = this.mySwiper.activeIndex
      if (this.historyData[activeIndex]) {
        this.activeDate = this.historyData[activeIndex].date
      }
    },
    /**
     * 관심 종목 토글 핸들러
     * @param {Object} targetPick - 클릭된 종목 객체
     * @param {number} dayIdx - 해당 종목이 속한 날짜 인덱스
     */
    handleToggleFavorite(targetPick, dayIdx) {
      const pick = this.historyData[dayIdx].picks.find(p => p.ticker === targetPick.ticker)
      if (pick) {
        pick.isFavorite = !pick.isFavorite
        // TODO: 실제 API 호출을 통해 관심종목 상태 서버 동기화 필요
      }
    }
  }
}
</script>

<style src="@/assets/css/pages/today-pick.css"></style>
