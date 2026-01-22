<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">시세분석</h2>
      <p class="p-investment__desc">종목별 시세 및 이슈 현황</p>
    </div>

    <!-- Index Charts Section -->
    <div class="c-content-card">
      <div class="c-content-card__header">
         <div class="c-content-card__header-content">
           <h3 class="c-content-card__title">주요 지수</h3>
           <div class="c-content-card__actions">
             <Button 
               :variant="viewMode === '시간별' ? 'default' : 'outline'" 
               size="sm"
               :class="viewMode === '시간별' ? 'c-tab-btn--active' : ''"
               @click="viewMode = '시간별'"
             >
               시간별 지수보기
             </Button>
             <Button 
               :variant="viewMode === '날짜별' ? 'default' : 'outline'" 
               size="sm"
               :class="viewMode === '날짜별' ? 'c-tab-btn--active' : ''"
               @click="viewMode = '날짜별'"
             >
               날짜별 지수보기
             </Button>
           </div>
         </div>
      </div>
      <div class="c-content-card__body">
         <div class="l-analysis-grid">
            <!-- KOSPI Chart -->
            <div>
               <div class="u-mb-4">
                  <div class="c-price-market-header">
                     <h3 class="u-text-lg-bold-slate-700">코스피</h3>
                     <span class="u-text-2xl-bold-slate-900">4,897.17</span>
                     <span class="c-price-change--up">
                        <TrendingUp class="w-4 h-4 mr-1" />
                        11.42
                     </span>
                     <span class="c-price-pct--up">+0.23%</span>
                  </div>
                  <div class="u-flex-gap-2">
                     <Button 
                       v-for="period in ['1일', '3개월', '1년']" 
                       :key="period"
                       :variant="kospiPeriod === period ? 'default' : 'outline'"
                       size="sm"
                       :class="kospiPeriod === period ? 'c-tab-btn--active' : ''"
                       @click="kospiPeriod = period"
                     >
                       {{ period }}
                     </Button>
                  </div>
               </div>
               <div class="c-price-chart-container">
                   <AreaChart :chart-data="getKospiChartData" :options="chartOptions" :gradient-color="'#3b82f6'" class="u-full" />
               </div>
            </div>

            <!-- KOSDAQ Chart -->
            <div>
               <div class="u-mb-4">
                  <div class="c-price-market-header">
                     <h3 class="u-text-lg-bold-slate-700">코스닥</h3>
                     <span class="u-text-2xl-bold-slate-900">950.07</span>
                     <span class="c-price-change--down">
                        <TrendingDown class="w-4 h-4 mr-1" />
                        26.3
                     </span>
                     <span class="c-price-pct--down">-2.69%</span>
                  </div>
                  <div class="u-flex-gap-2">
                     <Button 
                       v-for="period in ['1일', '3개월', '1년']" 
                       :key="period"
                       :variant="kosdaqPeriod === period ? 'default' : 'outline'"
                       size="sm"
                       :class="kosdaqPeriod === period ? 'c-tab-btn--active' : ''"
                       @click="kosdaqPeriod = period"
                     >
                       {{ period }}
                     </Button>
                  </div>
               </div>
               <div class="c-price-chart-container">
                   <AreaChart :chart-data="getKosdaqChartData" :options="chartOptions" :gradient-color="'#3b82f6'" class="u-full" />
               </div>
            </div>
         </div>
      </div>
    </div>

    <!-- Stock Status Table -->
    <div class="c-price-table-card">
       <div class="c-price-table-header-box">
          <h3 class="u-text-lg-bold mb-4">시세 현황</h3>
          <div class="u-flex-gap-2 flex-wrap">
             <Button 
               v-for="tab in tabs" 
               :key="tab"
               :variant="selectedTab === tab ? 'default' : 'outline'"
               size="sm"
               :class="selectedTab === tab ? 'c-tab-btn--active' : ''"
               @click="selectedTab = tab"
             >
               {{ tab }}
             </Button>
          </div>
       </div>

       <div class="p-6">
          <div class="u-flex-end-mb-4">
             <span class="u-text-sm-slate-600">
               업데이트 {{ currentDate }} {{ currentTime }}
             </span>
          </div>

          <div class="u-overflow-x-auto">
             <table class="u-w-full">
                <thead>
                   <tr class="c-price-table-thead-tr">
                      <th class="c-price-table-th">날짜</th>
                      <th class="c-price-table-th">종목명</th>
                      <th class="c-price-table-th--right">현재가</th>
                      <th class="c-price-table-th--right">등락률</th>
                      <th class="c-price-table-th">이슈내용</th>
                   </tr>
                </thead>
                <tbody>
                   <tr v-for="(stock, index) in currentData" :key="index" class="c-price-table-tr">
                      <td class="c-price-table-td">{{ stock.date }} {{ stock.time }}</td>
                      <td class="c-price-table-td--name">{{ stock.stockName }}</td>
                      <td class="c-price-table-td--right">
                         {{ stock.currentPrice === 0 ? '-' : stock.currentPrice.toLocaleString() }}
                      </td>
                      <td :class="['c-price-table-td--right font-semibold', stock.changeRate > 0 ? 'text-red-600' : stock.changeRate < 0 ? 'text-blue-600' : 'text-slate-600']">
                         {{ stock.changeRate === 0 ? '-' : (stock.changeRate > 0 ? '+' : '') + stock.changeRate.toFixed(2) + '%' }}
                      </td>
                      <td class="c-price-table-td">{{ stock.issueContent }}</td>
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
<style src="@/assets/css/pages/investment.css"></style>

