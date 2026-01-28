<!-- 수급 탭 네비게이션: 매수비중, 순매수 등 다양한 수급 분석 탭 제공 -->
<template>
  <nav class="c-supply-tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="c-supply-tabs__btn"
      :class="selectedTab === tab ? 'c-supply-tabs__btn--active' : 'c-supply-tabs__btn--inactive'"
      @click="$emit('update-tab', tab)"
    >
      {{ tab }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'SupplyTabNavigation',
  props: {
    tabs: { type: Array, required: true },
    selectedTab: { type: String, required: true }
  }
}
</script>

<style src="@/assets/css/components/investment/supply-analysis/supply-table-components.css"></style>
