<!-- 추천 종목 페이지: AI 분석 기반 선별된 추천 종목 목록 제공 -->
<template>
  <div class="p-recommend-stocks">
    <div class="c-page-header">
      <div class="c-page-header__inner">
        <div class="c-page-header__content">
          <h2 class="c-page-header__title">추천 종목</h2>
          <p class="c-page-header__desc">AI 분석을 통해 엄선된 추천 종목입니다.</p>
        </div>
      </div>
    </div>

    <!-- Page Header Summary -->
    <div class="p-recommend-stocks__summary">
       <div v-for="(stat, idx) in summaryStats" :key="idx" class="p-recommend-stocks__summary-card">
          <div class="p-recommend-stocks__summary-icon">
             <component :is="stat.icon" class="u-icon-sm" />
          </div>
          <div class="p-recommend-stocks__summary-content">
             <p class="p-recommend-stocks__summary-label">{{ stat.label }}</p>
             <p class="p-recommend-stocks__summary-value">{{ stat.value }}</p>
          </div>
       </div>
    </div>

    <!-- Recommended Stocks Grid (3 columns on 1920x1080) -->
    <div class="p-recommend-stocks__grid">
      <div v-for="stock in recommendedStocks" :key="stock.ticker" class="c-recommend-card">
        <div class="c-recommend-card__header">
           <div class="c-recommend-card__stock-info">
              <div class="c-recommend-card__avatar">
                 {{ stock.name[0] }}
              </div>
              <div class="c-recommend-card__meta">
                 <h3 class="c-recommend-card__name">{{ stock.name }}</h3>
                 <p class="c-recommend-card__ticker">{{ stock.ticker }}</p>
              </div>
           </div>
           <div class="c-recommend-card__badges">
              <span class="status-badge status-badge--positive">{{ stock.category }}</span>
           </div>
        </div>

        <div class="c-recommend-card__body">
           <div class="c-recommend-card__metrics">
              <div class="c-recommend-card__metric-item">
                 <p class="c-recommend-card__metric-label">현재가</p>
                 <p class="c-recommend-card__metric-value">{{ stock.price.toLocaleString() }}</p>
              </div>
              <div class="c-recommend-card__metric-item">
                 <p class="c-recommend-card__metric-label">등락률</p>
                 <p class="c-recommend-card__metric-value" :class="stock.change > 0 ? 'indicator--positive' : 'indicator--negative'">
                    {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                 </p>
              </div>
              <div class="c-recommend-card__metric-item">
                 <p class="c-recommend-card__metric-label">목표가</p>
                 <p class="c-recommend-card__metric-value c-recommend-card__metric-value--target">{{ stock.target.toLocaleString() }}</p>
              </div>
              <div class="c-recommend-card__metric-item">
                 <p class="c-recommend-card__metric-label">기대수익</p>
                 <p class="c-recommend-card__metric-value indicator--positive">+{{ stock.upside }}%</p>
              </div>
           </div>

           <div class="c-recommend-card__reason">
              <p class="c-recommend-card__reason-title">추천 사유</p>
              <p class="c-recommend-card__reason-text">{{ stock.reason }}</p>
           </div>
        </div>

        <div class="c-recommend-card__actions">
           <Button class="c-recommend-card__action-btn">종목 상세보기</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { LayoutDashboard, TrendingUp, AlertCircle } from 'lucide-vue';

export default {
  name: "RecommendStocks",
  components: {
    Button, LayoutDashboard, TrendingUp, AlertCircle
  },
  data() {
    return {
      summaryStats: [
          { label: '전체 추천', value: '12개', icon: 'LayoutDashboard' },
          { label: '평균 기대수익', value: '24.5%', icon: 'TrendingUp' },
          { label: '주의 종목', value: '0개', icon: 'AlertCircle' }
      ],
      recommendedStocks: [
        { name: '삼성전자', ticker: '005930', price: 72500, change: 1.25, target: 85000, upside: 17.2, reason: 'AI 반도체 호재 지속 및 HBM 시장 점유율 확대 기대', category: '반도체' },
        { name: 'SK하이닉스', ticker: '000660', price: 145000, change: 2.18, target: 168000, upside: 15.9, reason: 'NVIDIA향 HBM 공급물량 증가 및 메모리 업황 개선', category: '반도체' },
        { name: '현대차', ticker: '005380', price: 240000, change: -0.84, target: 280000, upside: 16.7, reason: '전기차 및 하이브리드 판매 호조, 주주가치 제고 기대', category: '자동차' },
        { name: 'LIG넥스원', ticker: '079550', price: 125000, change: 5.42, target: 150000, upside: 20.0, reason: '글로벌 방산 수주 모멘텀 지속 및 중동 지역 수출 확대', category: '방산' },
        { name: '기아', ticker: '000270', price: 110000, change: 0.92, target: 135000, upside: 22.7, reason: '역대급 실적 지속 및 배당 성향 강화에 따른 저평가 해소', category: '자동차' }
      ]
    }
  }
}
</script>

<style src="@/assets/css/pages/recommend-stocks.css"></style>
