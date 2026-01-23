<template>
  <div class="p-recommend-stocks">
    <div class="c-page-header">
      <h2 class="c-page-header__title">추천 종목</h2>
      <p class="c-page-header__desc">투자 기간별 AI 추천 종목</p>
    </div>

    <div class="c-content-card p-recommend-stocks__content">
      <!-- Tabs -->
      <div class="p-recommend-stocks__tabs">
        <button 
          v-for="tab in tabOptions" 
          :key="tab.value"
          :class="['p-recommend-stocks__tab-button', activeTab === tab.value ? 'p-recommend-stocks__tab-button--active' : '']"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="p-recommend-stocks__list">
        <div v-for="stock in currentStocks" :key="stock.ticker" class="p-recommend-stocks__item">
          <div class="p-recommend-stocks__item-header">
            <div class="p-recommend-stocks__item-identity">
              <div class="p-recommend-stocks__item-icon-box">
                <Lightbulb class="p-recommend-stocks__item-icon" />
              </div>
              <div class="p-recommend-stocks__item-title-group">
                <h3 class="p-recommend-stocks__item-name">{{ stock.name }}</h3>
                <p class="p-recommend-stocks__item-ticker">{{ stock.ticker }}</p>
              </div>
            </div>
            <div class="p-recommend-stocks__item-meta">
              <span class="p-recommend-stocks__score-badge">
                AI {{ stock.aiScore }}점
              </span>
              <p class="p-recommend-stocks__confidence">신뢰도 {{ stock.confidence }}%</p>
            </div>
          </div>

          <div class="p-recommend-stocks__stats">
            <div class="p-recommend-stocks__stat-item">
              <p class="p-recommend-stocks__stat-label">현재가</p>
              <p class="p-recommend-stocks__stat-value">{{ stock.currentPrice.toLocaleString() }}원</p>
            </div>
            <div class="p-recommend-stocks__stat-item">
              <p class="p-recommend-stocks__stat-label">목표가</p>
              <p class="p-recommend-stocks__stat-value p-recommend-stocks__stat-value--primary">{{ stock.targetPrice.toLocaleString() }}원</p>
            </div>
            <div class="p-recommend-stocks__stat-item">
              <p class="p-recommend-stocks__stat-label">기대수익</p>
              <div class="p-recommend-stocks__stat-upside">
                <TrendingUp class="p-recommend-stocks__upside-icon indicator--positive" />
                <p class="p-recommend-stocks__stat-value indicator--positive">+{{ stock.upside }}%</p>
              </div>
            </div>
          </div>

          <div class="p-recommend-stocks__reason-box">
            <Target class="p-recommend-stocks__reason-icon" />
            <div class="p-recommend-stocks__reason-content">
              <p class="p-recommend-stocks__reason-text">{{ stock.reason }}</p>
              <div class="p-recommend-stocks__period-info">
                <Clock class="p-recommend-stocks__clock-icon" />
                <span>목표 기간: {{ stock.period }}</span>
              </div>
            </div>
          </div>

          <div class="p-recommend-stocks__footer">
            <Button class="p-recommend-stocks__details-button">상세 분석 보기</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { Lightbulb, TrendingUp, Target, Clock } from 'lucide-vue';

const recommendStocks = {
  short: [
    {
      ticker: '005930',
      name: '삼성전자',
      currentPrice: 72500,
      targetPrice: 78000,
      upside: 7.6,
      aiScore: 92,
      period: '1주',
      reason: '단기 급등 모멘텀 포착',
      confidence: 88
    },
    {
      ticker: '035720',
      name: '카카오',
      currentPrice: 52000,
      targetPrice: 56000,
      upside: 7.7,
      aiScore: 89,
      period: '1주',
      reason: 'AI 서비스 출시 임박',
      confidence: 85
    }
  ],
  medium: [
    {
      ticker: '000660',
      name: 'SK하이닉스',
      currentPrice: 145000,
      targetPrice: 165000,
      upside: 13.8,
      aiScore: 94,
      period: '1개월',
      reason: 'HBM 시장 점유율 확대',
      confidence: 92
    },
    {
      ticker: '373220',
      name: 'LG에너지솔루션',
      currentPrice: 485000,
      targetPrice: 550000,
      upside: 13.4,
      aiScore: 91,
      period: '1개월',
      reason: '북미 수주 확대 전망',
      confidence: 90
    }
  ],
  long: [
    {
      ticker: '207940',
      name: '삼성바이오로직스',
      currentPrice: 875000,
      targetPrice: 1050000,
      upside: 20.0,
      aiScore: 96,
      period: '3개월',
      reason: '바이오 CDMO 시장 성장',
      confidence: 94
    },
    {
      ticker: '079550',
      name: 'LIG넥스원',
      currentPrice: 125000,
      targetPrice: 160000,
      upside: 28.0,
      aiScore: 95,
      period: '3개월',
      reason: 'K-방산 중장기 성장',
      confidence: 93
    }
  ]
};

export default {
  name: "RecommendStocks",
  components: {
    Button, Lightbulb, TrendingUp, Target, Clock
  },
  data() {
    return {
      activeTab: 'medium',
      recommendStocks,
      tabOptions: [
        { value: 'short', label: '단기 (1주)' },
        { value: 'medium', label: '중기 (1개월)' },
        { value: 'long', label: '장기 (3개월)' }
      ]
    }
  },
  computed: {
    currentStocks() {
      return this.recommendStocks[this.activeTab];
    }
  }
}
</script>

<style src="@/assets/css/pages/recommend-stocks.css"></style>

