<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">수급분석</h2>
      <p class="p-investment__desc">기관 및 외국인 매수 동향 분석</p>
    </div>

    <div class="c-content-card">
      <div class="c-content-card__header">
        <h3 class="c-content-card__title u-mb-4">수급 현황</h3>
        <div class="c-content-card__actions flex-wrap">
           <Button v-for="tab in tabs" :key="tab"
             :variant="selectedTab === tab ? 'default' : 'outline'"
             size="sm"
             :class="selectedTab === tab ? 'c-tab-btn--active' : ''"
             @click="selectedTab = tab"
           >
             {{ tab }}
           </Button>
        </div>
      </div>

      <div class="c-content-card__body">
        <div class="u-flex-end-mb-4">
           <span class="u-text-sm-slate-600">업데이트 {{ currentDate }} {{ currentTime }}</span>
        </div>

        <div v-if="selectedTab === '순매수'" class="l-analysis-grid">
             <!-- Pure Buy Logic (4 tables) -->
             <div v-for="section in ['기관 코스피', '기관 코스닥', '외국인 코스피', '외국인 코스닥']" :key="section">
                 <h3 class="u-text-sm-bold-slate-800 mb-2">{{ section }}</h3>
                 <div class="u-overflow-x-auto">
                    <table class="u-w-full">
                        <thead>
                            <tr class="c-price-table-thead-tr">
                                <th class="c-supply-table-th">종목명</th>
                                <th class="c-supply-table-th--right">순매수금액</th>
                                <th class="c-supply-table-th--right">등락률</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(stock, idx) in mockDataByTab['순매수'].slice(0, 5)" :key="idx" class="c-price-table-tr">
                                <td class="c-supply-table-td--name">
                                    <div :class="['c-supply-stock-icon', getStockColor(stock.stockName)]">{{ stock.stockName[0] }}</div>
                                    <span class="truncate">{{ stock.stockName }}</span>
                                </td>
                                <td class="c-supply-table-td--amount">{{ stock.netBuyAmount }}억</td>
                                <td :class="['c-supply-table-td--change', stock.changeRate > 0 ? 'text-red-600' : 'text-blue-600']">
                                    {{ stock.changeRate > 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
             </div>
        </div>

        <div v-else class="c-supply-grid-split">
            <!-- Normal Tab (2 tables: Inst vs Foreign) -->
            <div>
                 <h3 class="u-text-sm-bold-slate-800 mb-2">기관</h3>
                 <div class="u-overflow-x-auto">
                    <table class="u-w-full">
                       <thead>
                           <tr class="c-price-table-thead-tr">
                               <th class="c-supply-table-th">종목명</th>
                               <th class="c-supply-table-th--right">{{ selectedTab === '순매수 상위 신규진입' ? '순매수' : '매수비중' }}</th>
                               <th class="c-supply-table-th--right">등락률</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="(stock, idx) in institutionData" :key="idx" class="c-price-table-tr">
                                <td class="c-supply-table-td--name">
                                    <div :class="['c-supply-stock-icon', getStockColor(stock.stockName)]">{{ stock.stockName[0] }}</div>
                                    <span>{{ stock.stockName }}</span>
                                </td>
                                <td class="c-supply-table-td--amount">
                                    {{ selectedTab === '순매수 상위 신규진입' ? stock.netBuyAmount + '억' : stock.buyRatio + '%' }}
                                </td>
                                <td :class="['c-supply-table-td--change', stock.changeRate > 0 ? 'text-red-600' : 'text-blue-600']">
                                    {{ stock.changeRate > 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
                                </td>
                           </tr>
                       </tbody>
                    </table>
                 </div>
            </div>

            <div>
                 <h3 class="u-text-sm-bold-slate-800 mb-2">외국인</h3>
                 <div class="u-overflow-x-auto">
                    <table class="u-w-full">
                       <thead>
                           <tr class="c-price-table-thead-tr">
                               <th class="c-supply-table-th">종목명</th>
                               <th class="c-supply-table-th--right">{{ selectedTab === '순매수 상위 신규진입' ? '순매수' : '매수비중' }}</th>
                               <th class="c-supply-table-th--right">등락률</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="(stock, idx) in foreignData" :key="idx" class="c-price-table-tr">
                                <td class="c-supply-table-td--name">
                                    <div :class="['c-supply-stock-icon', getStockColor(stock.stockName)]">{{ stock.stockName[0] }}</div>
                                    <span>{{ stock.stockName }}</span>
                                </td>
                                <td class="c-supply-table-td--amount">
                                    {{ selectedTab === '순매수 상위 신규진입' ? stock.netBuyAmount + '억' : stock.buyRatio + '%' }}
                                </td>
                                <td :class="['c-supply-table-td--change', stock.changeRate > 0 ? 'text-red-600' : 'text-blue-600']">
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
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

const mock = [
    { date: '01/21', stockName: '삼성전자', buyRatio: 68.5, changeRate: 2.34, institution: '기관', netBuyAmount: 1500 },
    { date: '01/21', stockName: 'SK하이닉스', buyRatio: 72.3, changeRate: 3.12, institution: '기관', netBuyAmount: 1200 },
    { date: '01/21', stockName: '카카오', buyRatio: 75.4, changeRate: 4.21, institution: '외국인', netBuyAmount: 850 },
    { date: '01/21', stockName: '네이버', buyRatio: 70.9, changeRate: 2.88, institution: '외국인', netBuyAmount: 700 },
];

const mockDataByTab = {
    '매수비중': mock,
    '순매수': mock,
    '순매수 상위 신규진입': mock,
    '주요기관 순매수 상위': mock,
    '연속순매수': mock
};

export default {
    name: "SupplyAnalysis",
    components: { Button },
    data() {
        return {
            selectedTab: '매수비중',
            tabs: ['매수비중', '순매수', '순매수 상위 신규진입', '주요기관 순매수 상위', '연속순매수'],
            now: new Date(),
            mockDataByTab
        }
    },
    computed: {
        currentDate() {
          return `${String(this.now.getMonth() + 1).padStart(2, '0')}/${String(this.now.getDate()).padStart(2, '0')}`;
        },
        currentTime() {
          return `${String(this.now.getHours()).padStart(2, '0')}:${String(this.now.getMinutes()).padStart(2, '0')}`;
        },
        institutionData() {
            return mockDataByTab[this.selectedTab].filter(i => i.institution === '기관');
        },
        foreignData() {
            return mockDataByTab[this.selectedTab].filter(i => i.institution === '외국인');
        }
    },
    methods: {
        getStockColor(name) {
             const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500'];
             return colors[name.charCodeAt(0) % colors.length];
        }
    }
}
</script>
<style src="@/assets/css/pages/investment.css"></style>

