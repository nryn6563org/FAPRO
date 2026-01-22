<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">테마/업종</h2>
      <p class="p-investment__desc">주요 테마 및 업종별 시황 분석</p>
    </div>

    <div class="l-tab-actions">
      <Button
        :class="['c-tab-btn', activeTab === '테마' ? 'c-tab-btn--active' : '']"
        @click="activeTab = '테마'"
      >
        테마
      </Button>
      <Button
        :class="['c-tab-btn', activeTab === '업종' ? 'c-tab-btn--active' : '']"
        @click="activeTab = '업종'"
      >
        업종
      </Button>
    </div>

    <div class="l-theme-grid">
      <div v-for="theme in currentData" :key="theme.id" class="c-content-card c-content-card--hover">
        <div class="c-theme-card__header">
          <div class="u-flex-between">
            <div class="u-flex-center-gap-2">
              <div :class="['c-theme-card__icon-box', theme.change >= 0 ? 'u-bg-up-light' : 'u-bg-down-light']">
                 <Layers :class="['c-theme-card__icon', theme.change >= 0 ? 'u-text-up' : 'u-text-down']" />
              </div>
              <div>
                <h3 class="c-theme-card__name">{{ theme.name }}</h3>
                <p class="c-theme-card__count">{{ theme.stockCount }}개</p>
              </div>
            </div>
            <div :class="['c-theme-card__change-box', theme.change >= 0 ? 'u-text-up' : 'u-text-down']">
              <div class="c-theme-card__change-content">
                <TrendingUp v-if="theme.change >= 0" class="u-icon-sm" />
                <TrendingDown v-else class="u-icon-sm" />
                <span class="c-theme-card__change-value">{{ theme.change >= 0 ? '+' : '' }}{{ theme.change }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="c-theme-card__body">
          <div class="c-data-table-wrapper">
            <table class="c-theme-table">
              <thead>
                <tr class="c-theme-table__row-head">
                  <th class="c-theme-table__th">종목명</th>
                  <th class="c-theme-table__th--right">현재가</th>
                  <th class="c-theme-table__th--right">등락률</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stock, idx) in theme.topStocks" :key="idx" class="c-theme-table__row">
                  <td class="c-theme-table__td">
                    <div class="u-flex-center-gap-1">
                      <div :class="['c-theme-table__stock-icon', getStockColor(stock.name)]">
                        {{ stock.name.charAt(0) }}
                      </div>
                      <span class="u-truncate">{{ stock.name }}</span>
                    </div>
                  </td>
                  <td class="c-theme-table__td--right">
                    {{ stock.currentPrice.toLocaleString() }}
                  </td>
                  <td :class="['c-theme-table__td--status', stock.changeRate > 0 ? 'u-text-up' : stock.changeRate < 0 ? 'u-text-down' : 'u-text-slate-600']">
                    {{ stock.changeRate > 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Button from '@/components/common/Button.vue';
import { Layers, TrendingUp, TrendingDown } from 'lucide-vue';

const mockThemes = [
  {
    id: 1, name: 'AI 반도체', change: 12.5, stockCount: 23,
    topStocks: [
      { name: '삼성전자', currentPrice: 74500, change: 1500, changeRate: 2.05 },
      { name: 'SK하이닉스', currentPrice: 142000, change: 4500, changeRate: 3.27 },
      { name: '메리츠반도체', currentPrice: 28900, change: -800, changeRate: -2.69 },
      { name: 'DB하이텍', currentPrice: 52300, change: 2100, changeRate: 4.18 },
      { name: '엔비디아코리아', currentPrice: 18700, change: 900, changeRate: 5.06 },
    ]
  },
  {
    id: 2, name: 'K-방산', change: 18.9, stockCount: 18,
    topStocks: [
      { name: '한화에어로스페이스', currentPrice: 286000, change: 15000, changeRate: 5.54 },
      { name: 'LIG넥스원', currentPrice: 198000, change: 9800, changeRate: 5.21 },
      { name: '현대로템', currentPrice: 58900, change: 3200, changeRate: 5.75 },
      { name: '퍼스텍', currentPrice: 42300, change: 2800, changeRate: 7.09 },
      { name: '비츠로테크', currentPrice: 23500, change: 1900, changeRate: 8.80 },
    ]
  },
    {
    id: 3, name: '2차전지', change: -3.2, stockCount: 45,
    topStocks: [
      { name: 'LG에너지솔루션', currentPrice: 423000, change: -12000, changeRate: -2.76 },
      { name: '삼성SDI', currentPrice: 567000, change: -18000, changeRate: -3.08 },
      { name: '포스코퓨처엠', currentPrice: 289000, change: -8900, changeRate: -2.99 },
      { name: '에코프로비엠', currentPrice: 178000, change: -5600, changeRate: -3.05 },
      { name: 'LG화학', currentPrice: 389000, change: -11000, changeRate: -2.75 },
    ]
  },
  {
    id: 4, name: '바이오', change: 5.7, stockCount: 67,
    topStocks: [
      { name: '삼성바이오로직스', currentPrice: 876000, change: 28000, changeRate: 3.30 },
      { name: '셀트리온', currentPrice: 198000, change: 9500, changeRate: 5.04 },
      { name: '유한양행', currentPrice: 89600, change: 4200, changeRate: 4.92 },
      { name: '녹십자', currentPrice: 156000, change: 7800, changeRate: 5.26 },
      { name: 'SK바이오팜', currentPrice: 78900, change: 3900, changeRate: 5.20 },
    ]
  }
];

const mockSectors = [
  {
    id: 1, name: '은행', change: 4.2, stockCount: 8,
    topStocks: [
      { name: 'KB금융', currentPrice: 78900, change: 2800, changeRate: 3.68 },
      { name: '신한지주', currentPrice: 56700, change: 2100, changeRate: 3.85 },
      { name: '하나금융지주', currentPrice: 67800, change: 2500, changeRate: 3.83 },
      { name: '우리금융지주', currentPrice: 18900, change: 700, changeRate: 3.85 },
      { name: 'JB금융지주', currentPrice: 13400, change: 500, changeRate: 3.88 },
    ]
  },
  {
    id: 2, name: '반도체', change: 15.8, stockCount: 32,
    topStocks: [
      { name: '삼성전자', currentPrice: 74500, change: 9800, changeRate: 15.15 },
      { name: 'SK하이닉스', currentPrice: 142000, change: 18900, changeRate: 15.35 },
      { name: '삼성전기', currentPrice: 178000, change: 23400, changeRate: 15.13 },
      { name: 'SK스퀘어', currentPrice: 67800, change: 9100, changeRate: 15.50 },
      { name: 'DB하이텍', currentPrice: 52300, change: 6900, changeRate: 15.20 },
    ]
  },
  {
    id: 3, name: '자동차', change: -2.5, stockCount: 24,
    topStocks: [
      { name: '현대차', currentPrice: 234000, change: -6000, changeRate: -2.50 },
      { name: '기아', currentPrice: 98600, change: -2500, changeRate: -2.47 },
      { name: '현대모비스', currentPrice: 267000, change: -6800, changeRate: -2.48 },
      { name: '현대위아', currentPrice: 78900, change: -2000, changeRate: -2.47 },
      { name: '만도', currentPrice: 56700, change: -1400, changeRate: -2.41 },
    ]
  },
  {
    id: 4, name: '화학', change: 3.6, stockCount: 41,
    topStocks: [
      { name: 'LG화학', currentPrice: 389000, change: 13500, changeRate: 3.60 },
      { name: 'SK이노베이션', currentPrice: 145000, change: 5000, changeRate: 3.57 },
      { name: '한화솔루션', currentPrice: 34500, change: 1200, changeRate: 3.60 },
      { name: '롯데케미칼', currentPrice: 156000, change: 5400, changeRate: 3.59 },
      { name: '금호석유', currentPrice: 123000, change: 4300, changeRate: 3.62 },
    ]
  }
];

export default {
  name: "ThemeSector",
  components: {
    Button, Layers, TrendingUp, TrendingDown
  },
  data() {
    return {
      activeTab: '테마',
      mockThemes,
      mockSectors
    }
  },
  computed: {
    currentData() {
      return this.activeTab === '테마' ? this.mockThemes : this.mockSectors;
    }
  },
  methods: {
    getStockColor(stockName) {
      const colors = [
        'u-stock-bg-blue', 'u-stock-bg-indigo', 'u-stock-bg-purple', 'u-stock-bg-pink',
        'u-stock-bg-red', 'u-stock-bg-orange', 'u-stock-bg-amber', 'u-stock-bg-yellow',
        'u-stock-bg-lime', 'u-stock-bg-green', 'u-stock-bg-emerald', 'u-stock-bg-teal',
        'u-stock-bg-cyan', 'u-stock-bg-sky', 'u-stock-bg-violet', 'u-stock-bg-fuchsia'
      ];
      const index = stockName.charCodeAt(0) % colors.length;
      return colors[index];
    }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

