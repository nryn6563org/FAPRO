<!-- 일간 종목 페이지: 매일 선정되는 주요 종목 정보 및 성과 요약 제공 -->
<template>
  <div class="p-daily-stocks">
    <div class="c-page-header">
      <div class="c-page-header__inner">
        <div class="c-page-header__content">
          <h2 class="c-page-header__title">일간 종목</h2>
          <p class="c-page-header__desc">매일 아침 AI가 선정한 오늘의 주요 종목 리스트입니다.</p>
        </div>
      </div>
    </div>

    <!-- Daily Stocks Grid -->
    <div class="p-daily-stocks__grid">
      <div v-for="stock in dailyStocks" :key="stock.ticker" class="c-daily-card">
         <div class="c-daily-card__header">
            <h3 class="c-daily-card__title">{{ stock.name }}</h3>
            <span class="c-daily-card__date">{{ stock.date }}</span>
         </div>
         <div class="c-daily-card__body">
            <p class="c-daily-card__desc">{{ stock.description }}</p>
            <div class="c-daily-card__tags">
               <span v-for="tag in stock.tags" :key="tag" class="c-daily-card__tag">#{{ tag }}</span>
            </div>
         </div>
         <div class="c-daily-card__footer">
            <div class="c-daily-card__performance">
               <span class="c-daily-card__yield" :class="stock.yield > 0 ? 'indicator--positive' : 'indicator--negative'">
                  {{ stock.yield > 0 ? '+' : '' }}{{ stock.yield }}%
               </span>
            </div>
            <Button variant="outline" size="sm">상세보기</Button>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

export default {
  name: "DailyStocks",
  components: { Button },
  data() {
    return {
      dailyStocks: [
        { name: '삼성전자', ticker: '005930', date: '2024.01.22', description: 'AI 반도체 수요 급증에 따른 HBM3E 공급 본격화 기대감', tags: ['반도체', 'HBM', 'AI'], yield: 2.5 },
        { name: '현대차', ticker: '005380', date: '2024.01.22', description: '하이브리드 카 판매 비중 확대로 인한 수익성 개선 전망', tags: ['자동차', '친환경', '실적'], yield: -0.8 },
        { name: '카카오', ticker: '035720', date: '2024.01.21', description: '광고 업황 회복 및 AI 서비스 고도화에 따른 성장 모멘텀', tags: ['IT', 'AI', '플랫폼'], yield: 4.2 }
      ]
    }
  }
}
</script>

<style src="@/assets/css/pages/daily-stocks.css"></style>
