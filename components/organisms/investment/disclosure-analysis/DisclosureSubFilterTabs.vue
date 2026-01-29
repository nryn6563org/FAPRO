<!-- 공시 서브 필터 탭: 매출 규모, 지분 유형 등 상세 분류 필터 제공 -->
<template>
  <nav class="c-disclosure-sub-tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="c-disclosure-sub-tabs__btn"
      :class="activeTab === tab ? 'c-disclosure-sub-tabs__btn--active' : 'c-disclosure-sub-tabs__btn--inactive'"
      @click="$emit('update-sub-tab', tab)"
    >
      {{ tab }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'DisclosureSubFilterTabs',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  }
}
</script>

<style src="@/assets/css/components/investment/disclosure-analysis/disclosure-table-components.css"></style>
