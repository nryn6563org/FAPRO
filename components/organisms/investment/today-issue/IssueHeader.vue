<!-- 오늘의 이슈 헤더: 사용자 환영 인사, 검색, 및 주요 지수 정보 제공 -->
<template>
  <header class="c-issue-header">
    <div class="c-issue-header__top">
      <div class="c-issue-header__greeting">
        <h2 class="c-investment-header__title">오늘의 이슈</h2>
        <p class="c-investment-header__desc">실시간으로 업데이트되는 주요 시장 이슈</p>
      </div>
    </div>

    <div class="c-issue-header__market">
      <div class="c-issue-header__market-container">
        <div class="c-issue-header__market-list">
          <div
            v-for="(item, index) in marketIndices"
            :key="index"
            class="c-issue-header__market-item"
          >
            <span class="c-issue-header__market-name">{{ item.name }}</span>
            <span class="c-issue-header__market-value">{{ item.value }}</span>
            <span
              class="c-issue-header__market-change"
              :class="item.change > 0 ? 'c-issue-header__market-change--up' : 'c-issue-header__market-change--down'"
            >
              {{ item.change > 0 ? '▲' : '▼' }} {{ Math.abs(item.change) }}%
            </span>
          </div>
          <!-- 연이어 표시하기 위한 복제 -->
          <div
            v-for="(item, index) in marketIndices"
            :key="'clone-' + index"
            class="c-issue-header__market-item"
          >
            <span class="c-issue-header__market-name">{{ item.name }}</span>
            <span class="c-issue-header__market-value">{{ item.value }}</span>
            <span
              class="c-issue-header__market-change"
              :class="item.change > 0 ? 'c-issue-header__market-change--up' : 'c-issue-header__market-change--down'"
            >
              {{ item.change > 0 ? '▲' : '▼' }} {{ Math.abs(item.change) }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>


export default {
  name: 'IssueHeader',
  components: {
  },
  data() {
    return {
      marketIndices: [
        { name: '코스피', value: '2,584.14', change: 0.12 },
        { name: '코스닥', value: '857.14', change: -0.45 },
        { name: 'S&P 500', value: '4,839.81', change: 1.23 },
        { name: '나스닥', value: '15,310.97', change: 1.70 },
        { name: '다우존스', value: '37,863.80', change: 1.05 },
        { name: '상해종합', value: '2,832.28', change: -0.82 }
      ]
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-issue/issue-header.css"></style>
