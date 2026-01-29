<template>
  <div class="p-my-stocks">
    <!-- Header Area -->
    <div class="p-my-stocks__header">
      <div class="p-my-stocks__title-group">
        <h2 class="p-my-stocks__title">MY 종목</h2>
        <p class="p-my-stocks__subtitle">관심 종목의 정보를 한눈에 확인하세요</p>
      </div>
      <button class="p-my-stocks__add-btn">
        <Plus class="w-4 h-4" />
        <span>종목추가</span>
      </button>
    </div>

    <!-- Tabs Area -->
    <div class="p-my-stocks__tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['p-my-stocks__tab', activeTab === tab ? 'p-my-stocks__tab--active' : '']"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Stock Grid -->
    <div class="p-my-stocks__grid">
      <div v-for="stock in myStocks" :key="stock.code" class="c-stock-card">
        <div class="c-stock-card__header">
          <div class="c-stock-card__info">
            <span class="c-stock-card__name">{{ stock.name }}</span>
            <span class="c-stock-card__code">{{ stock.code }}</span>
          </div>
          <button class="c-stock-card__delete">
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="c-stock-card__price-group">
          <span class="c-stock-card__price">{{ stock.price.toLocaleString() }}</span>
          <span :class="['c-stock-card__change', stock.change >= 0 ? 'c-stock-card__change--up' : 'c-stock-card__change--down']">
            {{ stock.change >= 0 ? '▲' : '▼' }} {{ Math.abs(stock.change) }}%
          </span>
        </div>

        <!-- Chart View (Default) -->
        <div v-if="activeTab === '차트'" class="c-stock-card__chart-area">
          <div class="c-stock-card__chart-selectors">
            <button
              v-for="period in periods"
              :key="period"
              :class="['c-stock-card__chart-selector', activePeriod === period ? 'c-stock-card__chart-selector--active' : '']"
              @click="activePeriod = period"
            >
              {{ period }}
            </button>
          </div>
          <div class="c-stock-card__chart-placeholder">
            <!-- Simplified chart representation -->
            <svg viewBox="0 0 200 80" class="w-full h-20 overflow-visible">
              <path
                :d="stock.chartData"
                fill="none"
                :stroke="stock.change >= 0 ? '#ef4444' : '#3b82f6'"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <!-- Placeholder for other tabs -->
        <div v-else class="c-stock-card__placeholder">
          <p class="text-[11px] text-slate-400 mt-4 text-center">
            {{ activeTab }} 정보를 불러오는 중입니다...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plus, X } from 'lucide-vue'

export default {
  name: 'MyStocksPage',
  components: {
    Plus,
    X
  },
  data() {
    return {
      activeTab: '차트',
      tabs: ['차트', '공시', '리포트', '이슈', '뉴스'],
      activePeriod: '일봉',
      periods: ['일봉', '주봉', '월봉'],
      myStocks: [
        {
          name: '삼성전자',
          code: '005930',
          price: 74500,
          change: 1.25,
          chartData: 'M0,60 L40,55 L80,65 L120,45 L160,35 L200,30'
        },
        {
          name: 'SK하이닉스',
          code: '000660',
          price: 135200,
          change: -0.85,
          chartData: 'M0,20 L40,25 L80,20 L120,40 L160,45 L200,55'
        },
        {
          name: 'NAVER',
          code: '035420',
          price: 215000,
          change: 2.45,
          chartData: 'M0,70 L40,65 L80,50 L120,45 L160,35 L200,20'
        },
        {
          name: 'LG에너지솔루션',
          code: '373220',
          price: 395000,
          change: -1.2,
          chartData: 'M0,30 L40,35 L80,45 L120,40 L160,55 L200,65'
        }
      ]
    }
  }
}
</script>

<style src="@/assets/css/components/organisms/my-stock.css"></style>
