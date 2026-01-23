<template>
  <div class="supply-page">
    <div class="supply-header">
      <div class="supply-header__content">
        <h2 class="supply-header__title">수급 분석</h2>
        <p class="supply-header__desc">외국인/기관 투자자의 수급 동향을 실시간으로 분석합니다.</p>
      </div>
    </div>

    <!-- Market Summary Section -->
    <div class="market-summary">
       <div v-for="(metric, idx) in summaryMetrics" :key="idx" class="market-summary__card">
          <div class="market-summary__label">{{ metric.label }}</div>
          <div class="market-summary__value" :class="metric.valueClass">
             {{ metric.value }}
          </div>
          <div class="market-summary__trend">
             <span class="market-summary__trend-text" :class="metric.trendClass">{{ metric.trend }}</span>
             <TrendingUp v-if="metric.trendVal > 0" class="indicator-icon identifier--positive" />
             <TrendingDown v-else class="indicator-icon identifier--negative" />
          </div>
       </div>
    </div>

    <!-- Transactions Table Section -->
    <div class="supply-transactions">
      <div class="supply-transactions__header">
         <h3 class="supply-transactions__title">수급 거래 현황</h3>
         <div class="supply-transactions__tabs">
            <Button 
              v-for="tab in tabs" 
              :key="tab"
              size="sm"
              class="supply-transactions__tab-btn"
              :class="selectedTab === tab ? 'tab--active' : 'tab--inactive'"
              @click="selectedTab = tab"
            >
              {{ tab }}
            </Button>
         </div>
      </div>

      <div class="transaction-table-container">
         <table class="transaction-table">
            <thead class="transaction-table__head">
               <tr>
                  <th class="transaction-table__th">순위</th>
                  <th class="transaction-table__th">종목명</th>
                  <th class="transaction-table__th cell--right">현재가</th>
                  <th class="transaction-table__th cell--right">수급합계(억)</th>
                  <th class="transaction-table__th cell--right">외국인(억)</th>
                  <th class="transaction-table__th cell--right">기관(억)</th>
                  <th class="transaction-table__th cell--right">연기금(억)</th>
               </tr>
            </thead>
            <tbody class="transaction-table__body">
               <tr v-for="item in currentList" :key="item.rank" class="transaction-table__row">
                  <td class="transaction-table__td cell--center cell--rank">{{ item.rank }}</td>
                  <td class="transaction-table__td">
                    <div class="stock-info">
                      <span class="stock-info__name">{{ item.name }}</span>
                      <span class="stock-info__ticker">{{ item.ticker }}</span>
                    </div>
                  </td>
                  <td class="transaction-table__td cell--right">{{ item.price.toLocaleString() }}</td>
                  <td class="transaction-table__td cell--right cell--total">
                    <span :class="item.total > 0 ? 'text--positive' : item.total < 0 ? 'text--negative' : 'text--neutral'">
                      {{ item.total > 0 ? '+' : '' }}{{ item.total }}
                    </span>
                  </td>
                  <td class="transaction-table__td cell--right">{{ item.foreign }}</td>
                  <td class="transaction-table__td cell--right">{{ item.institution }}</td>
                  <td class="transaction-table__td cell--right">{{ item.pension }}</td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { TrendingUp, TrendingDown } from 'lucide-vue';

export default {
  name: "SupplyAnalysis",
  components: {
    Button, TrendingUp, TrendingDown
  },
  data() {
    return {
      selectedTab: '순매수',
      tabs: ['순매수', '외국인순매수', '기관순매수', '연기금순매수', '사모펀드순매수'],
      summaryMetrics: [
          { label: '외국인 매매', value: '450.2억', trend: '+12.5%', trendVal: 1, valueClass: 'text--positive', trendClass: 'text--positive' },
          { label: '기관 매매', value: '-82.4억', trend: '-2.4%', trendVal: -1, valueClass: 'text--negative', trendClass: 'text--negative' },
          { label: '연기금 매매', value: '115.8억', trend: '+4.1%', trendVal: 1, valueClass: 'text--positive', trendClass: 'text--positive' },
          { label: '개인 매매', value: '-367.8억', trend: '+0.8%', trendVal: 1, valueClass: 'text--negative', trendClass: 'text--positive' },
      ],
      mockSupplyList: [
        { rank: 1, name: '삼성전자', ticker: '005930', price: 72500, total: 125, foreign: 85, institution: 40, pension: 15 },
        { rank: 2, name: 'SK하이닉스', ticker: '000660', price: 145000, total: 85, foreign: 60, institution: 25, pension: 5 },
        { rank: 3, name: '현대차', ticker: '005380', price: 240000, total: -24, foreign: -10, institution: -14, pension: -2 },
        { rank: 4, name: 'LG에너지솔루션', ticker: '373220', price: 485000, total: 18, foreign: 25, institution: -7, pension: 2 },
        { rank: 5, name: '카카오', ticker: '035720', price: 42500, total: -15, foreign: -8, institution: -7, pension: -1 }
      ]
    }
  },
  computed: {
    currentList() {
      return this.mockSupplyList;
    }
  }
}
</script>

<style scoped>
/* Page Layout */
.supply-page {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem;
}

@media (min-width: 1024px) {
  .supply-page {
    gap: 3.5rem;
  }
}

/* Header */
.supply-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.supply-header__title {
  font-size: 1.875rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.dark .supply-header__title {
  color: #ffffff;
}

.supply-header__desc {
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
}

/* Market Summary */
.market-summary {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .market-summary {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1400px) { /* 1920x1080 Optimization */
  .market-summary {
    grid-template-columns: repeat(4, 1fr);
  }
}

.market-summary__card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dark .market-summary__card {
  background-color: #0f172a;
  border-color: #1e293b;
}

.market-summary__label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.market-summary__value {
  font-size: 2rem;
  font-weight: 900;
  color: #0f172a;
}

.dark .market-summary__value {
  color: #ffffff;
}

.market-summary__trend {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.market-summary__trend-text {
  font-size: 0.875rem;
  font-weight: 700;
}

/* Transactions Section */
.supply-transactions {
  background-color: #ffffff;
  border-radius: 2.5rem;
  border: 1px solid #e2e8f0;
  padding: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dark .supply-transactions {
  background-color: #0f172a;
  border-color: #1e293b;
}

.supply-transactions__header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .supply-transactions__header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.supply-transactions__title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}

.dark .supply-transactions__title {
  color: #ffffff;
}

.supply-transactions__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.supply-transactions__tab-btn.tab--active {
  background-color: #0f172a;
  color: #ffffff;
  border: 1px solid #0f172a;
}

.dark .supply-transactions__tab-btn.tab--active {
  background-color: #ffffff;
  color: #0f172a;
}

.supply-transactions__tab-btn.tab--inactive {
  background-color: transparent;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.dark .supply-transactions__tab-btn.tab--inactive {
  border-color: #334155;
  color: #94a3b8;
}

/* Table */
.transaction-table-container {
  overflow-x: auto;
  width: 100%;
}

.transaction-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.transaction-table__th {
  padding: 1.25rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  border-bottom: 2px solid #f1f5f9;
  white-space: nowrap;
}

.dark .transaction-table__th {
  color: #94a3b8;
  border-bottom-color: #1e293b;
}

.transaction-table__row {
  transition: background-color 0.2s;
}

.transaction-table__row:hover {
  background-color: #f8fafc;
}

.dark .transaction-table__row:hover {
  background-color: rgba(30, 41, 59, 0.5);
}

.transaction-table__td {
  padding: 1.5rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
}

.dark .transaction-table__td {
  color: #cbd5e1;
  border-bottom-color: #1e293b;
}

/* Cell Helpers */
.cell--right { text-align: right; }
.cell--center { text-align: center; }
.cell--rank { font-weight: 900; color: #94a3b8; font-size: 1.1rem; }
.cell--total { font-weight: 800; font-size: 1rem; }

/* Stock Info */
.stock-info {
  display: flex;
  flex-direction: column;
}

.stock-info__name {
  font-weight: 800;
  color: #0f172a;
}

.dark .stock-info__name {
  color: #ffffff;
}

.stock-info__ticker {
  font-size: 0.75rem;
  color: #94a3b8;
  font-family: monospace;
}

/* Indicators */
.text--positive { color: #ef4444; }
.text--negative { color: #3b82f6; }
.text--neutral { color: #94a3b8; }

.indicator-icon {
  width: 1rem;
  height: 1rem;
}

.identifier--positive { color: #ef4444; }
.identifier--negative { color: #3b82f6; }
</style>
