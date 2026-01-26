<!-- 오늘의 이슈 헤더: 사용자 환영 인사, 검색, 및 주요 지수 정보 제공 -->
<template>
  <header class="c-issue-header">
    <div class="c-issue-header__top">
      <div class="c-issue-header__greeting">
        <h1 class="c-issue-header__user">안녕하세요! {{ userName }}님</h1>
        <span class="c-issue-header__date">{{ currentDate }}</span>
      </div>
      <div class="c-issue-header__search">
        <SearchIcon class="c-issue-header__search-icon" />
        <input
          type="text"
          placeholder="관심있는 이슈를 검색해보세요"
          class="c-issue-header__search-input"
        />
      </div>
    </div>

    <div class="c-issue-header__market">
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
  </header>
</template>

<script>
import { SearchIcon } from 'lucide-vue'

export default {
  name: 'IssueHeader',
  components: {
    SearchIcon
  },
  data() {
    return {
      userName: '김승원', // 실제 앱에서는 스토어에서 가져올 수 있음
      currentDate: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
      }),
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
