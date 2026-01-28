<!-- 리포트 필터 탭: 신규리포트, 목표가 변동 등 다양한 분류 필터 제공 -->
<template>
  <nav class="c-report-filter">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="c-report-filter__btn"
      :class="activeTab === tab ? 'c-report-filter__btn--active' : 'c-report-filter__btn--inactive'"
      @click="$emit('update-tab', tab)"
    >
      {{ tab }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'ReportFilterTabs',
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

<style src="@/assets/css/components/investment/report-analysis/report-filter-tabs.css"></style>
