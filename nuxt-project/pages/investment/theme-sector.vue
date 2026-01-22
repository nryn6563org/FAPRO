<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">테마/업종</h2>
      <p class="p-investment__desc">주요 테마 및 업종별 시황 분석</p>
    </div>

    <div class="flex items-center space-x-4 mb-4">
      <Button
        :class="activeTab === '테마' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
        @click="activeTab = '테마'"
      >
        테마
      </Button>
      <Button
        :class="activeTab === '업종' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
        @click="activeTab = '업종'"
      >
        업종
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="theme in currentData" :key="theme.id" class="c-content-card c-content-card--hover">
        <div class="c-content-card__header border-0 bg-white shadow-none pb-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', theme.change >= 0 ? 'bg-green-100' : 'bg-red-100']">
                 <Layers :class="['w-5 h-5', theme.change >= 0 ? 'text-green-600' : 'text-red-600']" />
              </div>
              <div>
                <h3 class="text-sm font-semibold">{{ theme.name }}</h3>
                <p class="text-[10px] text-slate-500">{{ theme.stockCount }}개</p>
              </div>
            </div>
            <div :class="['text-right', theme.change >= 0 ? 'text-red-600' : 'text-blue-600']">
              <div class="flex items-center gap-1 justify-end">
                <TrendingUp v-if="theme.change >= 0" class="w-4 h-4" />
                <TrendingDown v-else class="w-4 h-4" />
                <span class="text-sm font-bold">{{ theme.change >= 0 ? '+' : '' }}{{ theme.change }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="c-content-card__body pt-3">
          <div class="c-data-table-wrapper">
            <table class="w-full">
              <thead>
                <tr class="border-b border-slate-300">
                  <th class="text-left py-1 px-1 font-semibold text-slate-700 text-[10px]">종목명</th>
                  <th class="text-right py-1 px-1 font-semibold text-slate-700 text-[10px]">현재가</th>
                  <th class="text-right py-1 px-1 font-semibold text-slate-700 text-[10px]">등락률</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stock, idx) in theme.topStocks" :key="idx" class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td class="py-1.5 px-1 font-medium text-slate-900 text-[10px]">
                    <div class="flex items-center gap-1">
                      <div :class="['w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0', getStockColor(stock.name)]">
                        {{ stock.name.charAt(0) }}
                      </div>
                      <span class="truncate">{{ stock.name }}</span>
                    </div>
                  </td>
                  <td class="py-1.5 px-1 text-right font-semibold text-slate-900 text-[10px]">
                    {{ stock.currentPrice.toLocaleString() }}
                  </td>
                  <td :class="['py-1.5 px-1 text-right font-semibold text-[10px]', stock.changeRate > 0 ? 'u-text-up' : stock.changeRate < 0 ? 'u-text-down' : 'text-slate-600']">
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
        'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
        'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
        'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
        'bg-cyan-500', 'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500'
      ];
      const index = stockName.charCodeAt(0) % colors.length;
      return colors[index];
    }
  }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

