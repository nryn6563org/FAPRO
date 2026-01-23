<!-- 테마/업종 분석 페이지: 주도 테마 및 관련 종목들의 등락 현황 분석 제공 -->
<template>
  <div class="p-theme-sector">
    <div class="c-page-header">
      <div class="c-page-header__inner">
        <div class="c-page-header__content">
          <h2 class="c-page-header__title">테마 & 업종</h2>
          <p class="c-page-header__desc">현재 시장을 주도하는 테마와 업종별 흐름을 분석합니다.</p>
        </div>
      </div>
    </div>

    <!-- Theme Grid (2 columns on 1920x1080) -->
    <div class="p-theme-sector__grid">
      <div v-for="theme in themes" :key="theme.name" class="c-theme-card">
         <div class="c-theme-card__header">
            <h3 class="c-theme-card__title">{{ theme.name }}</h3>
            <span class="c-theme-card__yield" :class="theme.change > 0 ? 'indicator--positive' : 'indicator--negative'">
               {{ theme.change > 0 ? '+' : '' }}{{ theme.change }}%
            </span>
         </div>
         <div class="c-theme-card__stocks">
            <div v-for="stock in theme.stocks" :key="stock.name" class="c-theme-stock-item">
               <span class="c-theme-stock-item__name">{{ stock.name }}</span>
               <span class="c-theme-stock-item__price">{{ stock.price.toLocaleString() }}</span>
            </div>
         </div>
         <Button variant="outline" size="sm">테마 상세분석</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

export default {
  name: "ThemeSector",
  components: { Button },
  data() {
    return {
      themes: [
        { name: 'AI 반도체', change: 4.25, stocks: [{ name: 'SK하이닉스', price: 145000 }, { name: '한미반도체', price: 68000 }] },
        { name: '초전도체', change: -8.12, stocks: [{ name: '신성델타테크', price: 92000 }, { name: '파워로직스', price: 12000 }] },
        { name: '자동차 대표주', change: 1.25, stocks: [{ name: '현대차', price: 240000 }, { name: '기아', price: 110000 }] }
      ]
    }
  }
}
</script>

<style src="@/assets/css/pages/theme-sector.css"></style>
