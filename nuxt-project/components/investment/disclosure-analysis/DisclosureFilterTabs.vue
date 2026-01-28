<!-- 공시 필터 탭: 수주, 지분, 실적 등 다양한 공시 유형 분류 필터 제공 -->
<template>
  <nav class="c-disclosure-tabs scrollbar-hide">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="c-disclosure-tabs__btn"
      :class="activeTab === tab ? 'c-disclosure-tabs__btn--active' : 'c-disclosure-tabs__btn--inactive'"
      @click="$emit('update-tab', tab)"
    >
      {{ tab }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'DisclosureFilterTabs',
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
