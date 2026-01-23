<template>
  <div class="p-price-analysis">
    <div class="c-page-header">
      <h2 class="c-page-header__title">시세분석</h2>
      <p class="c-page-header__desc">종목별 시세 및 이슈 현황</p>
    </div>

    <!-- Index Charts Section -->
    <div class="c-content-card p-6">
      <div class="p-price-analysis__header-row">
         <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">주요 지수</h3>
         <div class="flex gap-2">
           <Button 
             :variant="viewMode === '시간별' ? 'default' : 'outline'" 
             size="sm"
             :class="viewMode === '시간별' ? 'investment-tab-trigger--active' : 'investment-tab-trigger--inactive'"
             @click="viewMode = '시간별'"
           >
             시간별 지수보기
           </Button>
           <Button 
             :variant="viewMode === '날짜별' ? 'default' : 'outline'" 
             size="sm"
             :class="viewMode === '날짜별' ? 'investment-tab-trigger--active' : 'investment-tab-trigger--inactive'"
             @click="viewMode = '날짜별'"
           >
             날짜별 지수보기
           </Button>
         </div>
      </div>
      <div>
         <div class="p-price-analysis__market-grid">
            <!-- KOSPI Chart -->
            <div class="p-price-analysis__market-card">
               <div class="p-price-analysis__market-card-header">
                  <div>
                    <h3 class="p-price-analysis__market-name">코스피</h3>
                    <span class="p-price-analysis__market-value">4,897.17</span>
                  </div>
                  <div class="p-price-analysis__market-change-info">
                     <span class="p-price-analysis__market-change-val indicator--positive">
                        <TrendingUp class="p-price-analysis__trend-icon" />
                        11.42
                     </span>
                     <span class="p-price-analysis__market-change-pct indicator--positive">+0.23%</span>
                  </div>
               </div>
               <div class="p-price-analysis__chart-container">
                   <AreaChart :chart-data="getKospiChartData" :options="chartOptions" :gradient-color="'#3b82f6'" class="h-full" />
               </div>
               <div class="p-price-analysis__period-selector">
                  <Button 
                    v-for="period in ['1일', '3개월', '1년']" 
                    :key="period"
                    :variant="kospiPeriod === period ? 'default' : 'outline'"
                    size="sm"
                    class="h-7 text-xs px-3"
                    :class="kospiPeriod === period ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 border-none'"
                    @click="kospiPeriod = period"
                  >
                    {{ period }}
                  </Button>
               </div>
            </div>

            <!-- KOSDAQ Chart -->
            <div class="p-price-analysis__market-card">
               <div class="p-price-analysis__market-card-header">
                  <div>
                    <h3 class="p-price-analysis__market-name">코스닥</h3>
                    <span class="p-price-analysis__market-value">950.07</span>
                  </div>
                  <div class="p-price-analysis__market-change-info">
                     <span class="p-price-analysis__market-change-val indicator--negative">
                        <TrendingDown class="p-price-analysis__trend-icon" />
                        26.3
                     </span>
                     <span class="p-price-analysis__market-change-pct indicator--negative">-2.69%</span>
                  </div>
               </div>
               <div class="p-price-analysis__chart-container">
                   <AreaChart :chart-data="getKosdaqChartData" :options="chartOptions" :gradient-color="'#3b82f6'" class="h-full" />
               </div>
               <div class="p-price-analysis__period-selector">
                  <Button 
                    v-for="period in ['1일', '3개월', '1년']" 
                    :key="period"
                    :variant="kosdaqPeriod === period ? 'default' : 'outline'"
                    size="sm"
                    class="h-7 text-xs px-3"
                    :class="kosdaqPeriod === period ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 border-none'"
                    @click="kosdaqPeriod = period"
                  >
                    {{ period }}
                  </Button>
               </div>
            </div>
         </div>
      </div>
    </div>

    <!-- Stock Status Table -->
    <div class="c-content-card p-6">
       <div class="p-price-analysis__status-section">
          <div class="p-price-analysis__status-tabs-row">
             <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">시세 현황</h3>
             <div class="p-price-analysis__status-tabs">
                <Button 
                  v-for="tab in tabs" 
                  :key="tab"
                  :variant="selectedTab === tab ? 'default' : 'outline'"
                  size="sm"
                  :class="selectedTab === tab ? 'investment-tab-trigger--active' : 'investment-tab-trigger--inactive'"
                  @click="selectedTab = tab"
                >
                  {{ tab }}
                </Button>
             </div>
          </div>

          <div class="p-price-analysis__update-info">
             업데이트 {{ currentDate }} {{ currentTime }}
          </div>

          <div class="p-price-analysis__table-wrapper">
             <table class="p-price-analysis__table">
                <thead>
                   <tr>
                      <th class="p-price-analysis__table-th">날짜</th>
                      <th class="p-price-analysis__table-th">종목명</th>
                      <th class="p-price-analysis__table-th p-price-analysis__table-th--right">현재가</th>
                      <th class="p-price-analysis__table-th p-price-analysis__table-th--right">등락률</th>
                      <th class="p-price-analysis__table-th">이슈내용</th>
                   </tr>
                </thead>
                <tbody>
                   <tr v-for="(stock, index) in currentData" :key="index" class="p-price-analysis__table-tr">
                      <td class="p-price-analysis__table-td p-price-analysis__date-cell">{{ stock.date }} {{ stock.time }}</td>
                      <td class="p-price-analysis__table-td p-price-analysis__stock-name">{{ stock.stockName }}</td>
                      <td class="p-price-analysis__table-td p-price-analysis__table-td--right">
                         <span class="p-price-analysis__price-val">{{ stock.currentPrice === 0 ? '-' : stock.currentPrice.toLocaleString() }}</span>
                      </td>
                      <td class="p-price-analysis__table-td p-price-analysis__table-td--right">
                         <span class="p-price-analysis__change-val" :class="stock.changeRate > 0 ? 'indicator--positive' : stock.changeRate < 0 ? 'indicator--negative' : 'indicator--neutral'">
                            {{ stock.changeRate === 0 ? '-' : (stock.changeRate > 0 ? '+' : '') + stock.changeRate.toFixed(2) + '%' }}
                         </span>
                      </td>
                      <td class="p-price-analysis__table-td p-price-analysis__issue-content">{{ stock.issueContent }}</td>
                   </tr>
                </tbody>
             </table>
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { TrendingUp, TrendingDown } from 'lucide-vue';
import AreaChart from '@/components/charts/AreaChart';

// Mock Data
const kospiData1Day = [
    { time: '09:00', value: 4827 }, { time: '10:00', value: 4845 }, { time: '11:00', value: 4860 },
    { time: '12:00', value: 4875 }, { time: '13:00', value: 4890 }, { time: '13:30', value: 4897 }
];
const kosdaqData1Day = [
    { time: '09:00', value: 924 }, { time: '10:00', value: 932 }, { time: '11:00', value: 940 },
    { time: '12:00', value: 948 }, { time: '12:30', value: 950 }
];

const mockDataByTab = {
  '이슈종목': [
    { date: '01/20', time: '09:08', stockName: '유비쿼스', currentPrice: 0, changeRate: 0, issueContent: '피지컬SI 수혜 전망…PBR 역사적 저점 분석에 상승세' },
    { date: '01/20', time: '15:00', stockName: '우진', currentPrice: 25200, changeRate: 13.26, issueContent: '국내 유일 원전 계측기 공급사…후대특형 원전 필요 발...' },
    { date: '01/20', time: '14:30', stockName: '카카오페이', currentPrice: 53800, changeRate: 12.08, issueContent: '스테이블코인 법안 기대에 강세' }
  ],
  '52주신고가': [
    { date: '01/20', time: '15:30', stockName: '삼성전자', currentPrice: 72500, changeRate: 3.42, issueContent: 'AI 반도체 수요 증가로 52주 신고가 경신' },
    { date: '01/20', time: '14:25', stockName: 'SK하이닉스', currentPrice: 145000, changeRate: 4.18, issueContent: 'HBM 공급 확대 소식에 52주 최고가 달성' }
  ],
  '52주신저가': [
     { date: '01/20', time: '15:10', stockName: '카카오', currentPrice: 42500, changeRate: -5.22, issueContent: '규제 우려로 52주 신저가 기록' } 
  ],
  '상한가': [], '하한가': [], '거래비중상위': [], '관리종목': [], '거래정지': [], '투자주의': [], '투자경고': [], '투자위험': []
};

export default {
  name: "PriceAnalysis",
  components: {
    Button, TrendingUp, TrendingDown, AreaChart
  },
  data() {
      return {
          viewMode: '시간별',
          kospiPeriod: '1일',
          kosdaqPeriod: '1년',
          selectedTab: '이슈종목',
          tabs: ['이슈종목', '52주신고가', '52주신저가', '상한가', '하한가', '거래비중상위', '관리종목', '거래정지', '투자주의', '투자경고', '투자위험'],
          now: new Date()
      }
  },
  computed: {
      currentDate() {
          return `${String(this.now.getMonth() + 1).padStart(2, '0')}/${String(this.now.getDate()).padStart(2, '0')}`;
      },
      currentTime() {
          return `${String(this.now.getHours()).padStart(2, '0')}:${String(this.now.getMinutes()).padStart(2, '0')}`;
      },
      currentData() {
          return mockDataByTab[this.selectedTab] || [];
      },
      getKospiChartData() {
          // Simplified logic for demo
          return {
              labels: kospiData1Day.map(d => d.time),
              datasets: [{
                  label: 'KOSPI',
                  borderColor: '#3b82f6',
                  data: kospiData1Day.map(d => d.value),
                  fill: true
              }]
          };
      },
      getKosdaqChartData() {
          return {
              labels: kosdaqData1Day.map(d => d.time),
              datasets: [{
                  label: 'KOSDAQ',
                  borderColor: '#3b82f6',
                  data: kosdaqData1Day.map(d => d.value),
                  fill: true
              }]
          };
      },
      chartOptions() {
          return {
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                  xAxes: [{ gridLines: { display: false } }],
                  yAxes: [{ display: false }]
              },
              legend: { display: false },
              elements: { point: { radius: 0 } }
          };
      }
  }
};
</script>

<style src="@/assets/css/pages/price-analysis.css"></style>

