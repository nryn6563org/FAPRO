<!-- 테마/업종 분석 페이지: 주도 테마 및 업종별 시황 분석 정보 제공 -->
<template>
  <div class="p-theme-sector">
    <!-- 페이지 헤더 -->
    <ThemeSectorHeader />

    <!-- 테마/업종 탭 -->
    <ThemeSectorTabs
      :active-tab="activeTab"
      @update-tab="activeTab = $event"
    />

    <!-- 그리드 레이아웃: 테마 또는 업종 카드 목록 -->
    <div class="p-theme-sector__grid">
      <CategoryCard
        v-for="item in currentData"
        :key="item.id"
        :item="item"
        class="p-theme-sector__item"
      />
    </div>
  </div>
</template>

<script>
// 개별 컴포넌트 임포트
import ThemeSectorHeader from '@/components/organisms/investment/theme-sector/ThemeSectorHeader.vue'
import ThemeSectorTabs from '@/components/organisms/investment/theme-sector/ThemeSectorTabs.vue'
import CategoryCard from '@/components/organisms/investment/theme-sector/CategoryCard.vue'

// 데이터 유틸리티 임포트 (Mock Data)
import { mockThemes, mockSectors } from '@/utils/theme-sector-data'

export default {
  // 컴포넌트 이름: 테마/업종 분석 페이지
  name: 'ThemeSector',
  components: {
    ThemeSectorHeader,
    ThemeSectorTabs,
    CategoryCard
  },
  data() {
    return {
      activeTab: '테마', // 현재 활성화된 탭 ('테마' | '업종')
      mockThemes, // 테마 데이터 목록
      mockSectors // 업종 데이터 목록
    }
  },
  computed: {
    // 선택된 탭에 따라 표시할 데이터 목록 반환
    currentData() {
      return this.activeTab === '테마' ? this.mockThemes : this.mockSectors
    }
  }
}
</script>

<style src="@/assets/css/pages/theme-sector.css"></style>
