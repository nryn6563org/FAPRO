<!-- 테마/업종 탭: 테마 또는 업종 시황으로 전환하기 위한 토글 네비게이션 -->
<template>
  <nav class="c-theme-sector-tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="c-theme-sector-tabs__btn"
      :class="activeTab === tab ? 'c-theme-sector-tabs__btn--active' : 'c-theme-sector-tabs__btn--inactive'"
      @click="$emit('update-tab', tab)"
    >
      {{ tab }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'ThemeSectorTabs',
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tabs: ['테마', '업종']
    }
  }
}
</script>

<style src="@/assets/css/components/investment/theme-sector/theme-sector-tabs.css"></style>
