<!-- 상태 필터 섹션: 이슈종목, 신고가 등 다양한 가격 상태 필터 칩 제공 -->
<template>
  <div class="c-status-filter">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="c-status-filter__btn"
      :class="selectedTab === tab ? 'c-status-filter__btn--active' : 'c-status-filter__btn--inactive'"
      @click="$emit('update-tab', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'StatusFilterSection',
  props: {
    tabs: { type: Array, required: true },
    selectedTab: { type: String, required: true }
  }
}
</script>

<style scoped>
@import url('@/assets/css/components/investment/price-analysis/status-components.css');
</style>
