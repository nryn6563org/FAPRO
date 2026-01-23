<template>
  <div class="p-supply-analysis">
    <div class="c-page-header">
      <h2 class="c-page-header__title">수급분석</h2>
      <p class="c-page-header__desc">기관 및 외국인 매수 동향 분석</p>
    </div>

    <div class="c-content-card p-supply-analysis__card l-section-gap" style="padding: 1.5rem">
      <div class="p-supply-analysis__header">
         <h3 class="p-supply-analysis__title">수급 현황</h3>
         <div class="p-supply-analysis__tabs">
            <Button
              v-for="tab in tabs" :key="tab"
              variant="outline"
              size="sm"
              :class="selectedTab === tab ? 'investment-tab-trigger--active' : 'investment-tab-trigger--inactive'"
              @click="selectedTab = tab"
            >
              {{ tab }}
            </Button>
         </div>
      </div>

      <div>
        <div class="p-supply-analysis__metadata">
           업데이트 {{ currentDate }} {{ currentTime }}
        </div>

        <div v-if="selectedTab === '순매수'" class="p-supply-analysis__grid-4">
              <div v-for="section in ['기관 코스피', '기관 코스닥', '외국인 코스피', '외국인 코스닥']" :key="section" class="p-supply-analysis__section">
                  <h3 class="p-supply-analysis__section-title">{{ section }}</h3>
                  <div class="p-supply-analysis__table-wrapper">
                     <table class="p-supply-analysis__table">
                          <thead>
                              <tr>
                                  <th>종목명</th>
                                  <th style="text-align: right">금액</th>
                                  <th style="text-align: right">등락</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(stock, idx) in mockDataByTab['순매수'].slice(0, 5)" :key="idx">
                                  <td>
                                      <div class="p-supply-analysis__stock-mini">
                                        <div class="p-supply-analysis__stock-dot" :class="getStockColor(stock.stockName)">{{ stock.stockName[0] }}</div>
                                        <span class="truncate" style="max-width: 60px">{{ stock.stockName }}</span>
                                      </div>
                                  </td>
                                  <td style="text-align: right; font-weight: 700">{{ stock.netBuyAmount }}억</td>
                                  <td style="text-align: right">
                                      <span :class="stock.changeRate > 0 ? 'indicator--positive' : 'indicator--negative'">
                                        {{ stock.changeRate > 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
                                      </span>
                                  </td>
                              </tr>
                          </tbody>
                     </table>
                  </div>
              </div>
        </div>

        <div v-else class="p-supply-analysis__grid-2">
            <div class="p-supply-analysis__section">
                 <h3 class="p-supply-analysis__section-title">기관</h3>
                 <div class="p-supply-analysis__table-wrapper">
                    <table class="p-supply-analysis__table">
                       <thead>
                           <tr>
                               <th>종목명</th>
                               <th style="text-align: right">{{ selectedTab === '순매수 상위 신규진입' ? '순매수' : '매수비중' }}</th>
                               <th style="text-align: right">등락률</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="(stock, idx) in institutionData" :key="idx">
                                <td>
                                    <div class="p-supply-analysis__stock-mini">
                                      <div class="p-supply-analysis__stock-dot" :class="getStockColor(stock.stockName)">{{ stock.stockName[0] }}</div>
                                      <span class="truncate">{{ stock.stockName }}</span>
                                    </div>
                                </td>
                                <td style="text-align: right; font-weight: 700">
                                    {{ selectedTab === '순매수 상위 신규진입' ? stock.netBuyAmount + '억' : stock.buyRatio + '%' }}
                                </td>
                                <td style="text-align: right">
                                    <span :class="stock.changeRate > 0 ? 'indicator--positive' : 'indicator--negative'">
                                      {{ stock.changeRate > 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
                                    </span>
                                </td>
                           </tr>
                       </tbody>
                    </table>
                 </div>
            </div>

            <div class="p-supply-analysis__section">
                 <h3 class="p-supply-analysis__section-title">외국인</h3>
                 <div class="p-supply-analysis__table-wrapper">
                    <table class="p-supply-analysis__table">
                       <thead>
                           <tr>
                               <th>종목명</th>
                               <th style="text-align: right">{{ selectedTab === '순매수 상위 신규진입' ? '순매수' : '매수비중' }}</th>
                               <th style="text-align: right">등락률</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="(stock, idx) in foreignData" :key="idx">
                                <td>
                                    <div class="p-supply-analysis__stock-mini">
                                      <div class="p-supply-analysis__stock-dot" :class="getStockColor(stock.stockName)">{{ stock.stockName[0] }}</div>
                                      <span class="truncate">{{ stock.stockName }}</span>
                                    </div>
                                </td>
                                <td style="text-align: right; font-weight: 700">
                                    {{ selectedTab === '순매수 상위 신규진입' ? stock.netBuyAmount + '억' : stock.buyRatio + '%' }}
                                </td>
                                <td style="text-align: right">
                                    <span :class="stock.changeRate > 0 ? 'indicator--positive' : 'indicator--negative'">
                                      {{ stock.changeRate > 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
                                    </span>
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

<style src="@/assets/css/pages/supply-analysis.css"></style>
