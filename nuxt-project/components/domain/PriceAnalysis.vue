<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold">시세분석</h2>
      <p class="text-slate-600 mt-1">종목별 시세 및 이슈 현황</p>
    </div>

    <!-- Index Charts Section -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 flex justify-between items-center rounded-t-xl">
        <h3 class="text-lg font-semibold">주요 지수</h3>
        <div class="flex gap-2">
          <button
             v-for="mode in ['시간별', '날짜별']"
             :key="mode"
             @click="viewMode = mode"
             :class="[
               'px-3 py-1 rounded text-xs font-medium border transition-colors',
               viewMode === mode
                 ? 'bg-blue-600 text-white border-blue-600'
                 : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
             ]"
          >
            {{ mode }} 지수보기
          </button>
        </div>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- KOSPI Chart -->
          <div>
            <div class="mb-4">
              <div class="flex items-baseline gap-3 mb-3">
                <h3 class="text-lg font-semibold text-slate-700">코스피</h3>
                <span class="text-2xl font-bold text-slate-900">4,897.17</span>
                <span class="flex items-center text-red-600 font-semibold">
                  <TrendingUp class="w-4 h-4 mr-1" />
                  11.42
                </span>
                <span class="text-red-600 font-semibold">+0.23%</span>
              </div>
              <div class="flex gap-2">
                 <button
                   v-for="period in ['1일', '3개월', '1년']"
                   :key="period"
                   @click="kospiPeriod = period"
                   :class="[
                     'px-2 py-1 rounded text-xs border transition-colors',
                     kospiPeriod === period
                       ? 'bg-blue-600 text-white border-blue-600'
                       : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                   ]"
                 >
                   {{ period }}
                 </button>
              </div>
            </div>
            <div class="h-48 relative">
              <line-chart :chart-data="getKospiChartData" :options="chartOptions" :height="200" />
            </div>
          </div>

          <!-- KOSDAQ Chart -->
          <div>
            <div class="mb-4">
              <div class="flex items-baseline gap-3 mb-3">
                <h3 class="text-lg font-semibold text-slate-700">코스닥</h3>
                <span class="text-2xl font-bold text-slate-900">950.07</span>
                <span class="flex items-center text-blue-600 font-semibold">
                  <TrendingDown class="w-4 h-4 mr-1" />
                  26.3
                </span>
                <span class="text-blue-600 font-semibold">-2.69%</span>
              </div>
              <div class="flex gap-2">
                 <button
                   v-for="period in ['1일', '3개월', '1년']"
                   :key="period"
                   @click="kosdaqPeriod = period"
                   :class="[
                     'px-2 py-1 rounded text-xs border transition-colors',
                     kosdaqPeriod === period
                       ? 'bg-blue-600 text-white border-blue-600'
                       : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                   ]"
                 >
                   {{ period }}
                 </button>
              </div>
            </div>
             <div class="h-48 relative">
              <line-chart :chart-data="getKosdaqChartData" :options="chartOptions" :height="200" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Market Status Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 rounded-t-xl">
        <h3 class="text-lg font-semibold mb-4">시세 현황</h3>
        <div class="flex gap-2 flex-wrap">
          <button
             v-for="tab in tabs"
             :key="tab"
             @click="selectedTab = tab"
             :class="[
               'px-3 py-1 rounded text-xs font-medium border transition-colors',
               selectedTab === tab
                 ? 'bg-blue-600 text-white border-blue-600'
                 : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
             ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="p-6">
        <div class="flex justify-end mb-4">
          <span class="text-sm text-slate-600">
            업데이트 {{ currentDate }} {{ currentTime }}
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-slate-300">
                <th class="text-left py-3 px-4 font-semibold text-slate-700">날짜</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                <th class="text-right py-3 px-4 font-semibold text-slate-700">현재가</th>
                <th class="text-right py-3 px-4 font-semibold text-slate-700">등락률</th>
                <th class="text-left py-3 px-4 font-semibold text-slate-700">이슈내용</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(stock, index) in currentData" 
                :key="index"
                class="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td class="py-3 px-4 text-sm text-slate-600">
                  {{ stock.date }} {{ stock.time }}
                </td>
                <td class="py-3 px-4 font-medium text-slate-900">
                  {{ stock.stockName }}
                </td>
                <td class="py-3 px-4 text-right font-medium">
                  {{ stock.currentPrice === 0 ? '-' : stock.currentPrice.toLocaleString() }}
                </td>
                <td
:class="[
                  'py-3 px-4 text-right font-semibold',
                  stock.changeRate > 0 ? 'text-red-600' : stock.changeRate < 0 ? 'text-blue-600' : 'text-slate-600'
                ]">
                  {{ stock.changeRate === 0 ? '-' : (stock.changeRate > 0 ? '+' : '') + stock.changeRate.toFixed(2) + '%' }}
                </td>
                <td class="py-3 px-4 text-sm text-slate-700">
                  {{ stock.issueContent }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp, TrendingDown } from 'lucide-vue';
import LineChart from '@/components/charts/LineChart';

const now = new Date();

export default {
  name: 'PriceAnalysis',
  components: {
    TrendingUp,
    TrendingDown,
    LineChart
  },
  data() {
    return {
      selectedTab: '이슈종목',
      kospiPeriod: '1일',
      kosdaqPeriod: '1년',
      viewMode: '시간별',
      tabs: [
        '이슈종목', '52주신고가', '52주신저가', '상한가', '하한가', '거래비중상위',
        '관리종목', '거래정지', '투자주의', '투자경고', '투자위험'
      ],
      currentDate: `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`,
      currentTime: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          xAxes: [{ 
            gridLines: { display: false },
            ticks: { fontSize: 10 }
          }],
          yAxes: [{ 
            gridLines: { borderDash: [4, 4] },
            ticks: { fontSize: 10 }
          }]
        },
        elements: {
          point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
          line: { tension: 0.4 }
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        }
      },
      mockDataByTab: {
          '이슈종목': [
            { date: '01/20', time: '09:08', stockName: '유비쿼스', currentPrice: 0, changeRate: 0, issueContent: '피지컬SI 수혜 전망…PBR 역사적 저점 분석에 상승세' },
            { date: '01/20', time: '15:00', stockName: '우진', currentPrice: 25200, changeRate: 13.26, issueContent: '국내 유일 원전 계측기 공급사…후대특형 원전 필요 발...' },
            { date: '01/20', time: '14:30', stockName: '카카오페이', currentPrice: 53800, changeRate: 12.08, issueContent: '스테이블코인 법안 기대에 강세' },
            { date: '01/20', time: '14:28', stockName: '일진파워', currentPrice: 17610, changeRate: 29.96, issueContent: '신규원전 건설 업종 현안 원인 일진 전기철강까지 \'...' },
            { date: '01/20', time: '14:22', stockName: '오로비덱', currentPrice: 5140, changeRate: 25.83, issueContent: '신규 원전 필요 현안 원전계 초기협상 기대감까지...' },
            { date: '01/20', time: '14:00', stockName: '우리기술', currentPrice: 7980, changeRate: 29.97, issueContent: '쫓 국연 원전 필요 신규원전 검토에 현안 원전계...' },
            { date: '01/20', time: '13:58', stockName: '한국전력', currentPrice: 65400, changeRate: 16.16, issueContent: '발전 공기업 동행한 기대감에 15%대↑' },
            { date: '01/20', time: '13:42', stockName: '티앤씨', currentPrice: 17600, changeRate: 25.18, issueContent: '이 대통령 전력난 핵소 원전 필요상에 ↑…원전 필수...' },
            { date: '01/20', time: '13:28', stockName: '나노스에이스틱글로벌지', currentPrice: 46650, changeRate: 29.94, issueContent: '우주발도래 과제 수주에 13% 급등' },
            { date: '01/20', time: '11:46', stockName: '한화에어로스페이스', currentPrice: 1309000, changeRate: -1.58, issueContent: '그림판도 돌리면 자잘하적 건강작 \'상승...' },
          ],
          '52주신고가': [
            { date: '01/20', time: '15:30', stockName: '삼성전자', currentPrice: 72500, changeRate: 3.42, issueContent: 'AI 반도체 수요 증가로 52주 신고가 경신' },
            { date: '01/20', time: '14:25', stockName: 'SK하이닉스', currentPrice: 145000, changeRate: 4.18, issueContent: 'HBM 공급 확대 소식에 52주 최고가 달성' },
          ],
          '52주신저가': [
            { date: '01/20', time: '15:10', stockName: '카카오', currentPrice: 42500, changeRate: -5.22, issueContent: '규제 우려로 52주 신저가 기록' },
          ],
          '상한가': [],
          '하한가': [],
          '거래비중상위': [],
          '관리종목': [],
          '거래정지': [],
          '투자주의': [],
          '투자경고': [],
          '투자위험': [],
      }
    };
  },
  computed: {
    currentData() {
        return this.mockDataByTab[this.selectedTab] || [];
    },
    getKospiChartData() {
        // ... (Logic to return chart js data structure based on this.kospiPeriod) ...
        // Simplification for brevity, assume similar logic to MarketIndices
         const labels = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
         const data = [4820, 4830, 4850, 4860, 4880, 4890, 4897]; // Mock data
         
         return {
             labels,
             datasets: [{
                 label: 'KOSPI',
                 data,
                 borderColor: '#3b82f6',
                 backgroundColor: 'transparent',
                 borderWidth: 2,
                 pointRadius: 0
             }]
         };
    },
    getKosdaqChartData() {
         const labels = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
         const data = [920, 930, 925, 935, 940, 945, 950]; // Mock data
         return {
             labels,
             datasets: [{
                 label: 'KOSDAQ',
                 data,
                 borderColor: '#3b82f6',
                 backgroundColor: 'transparent',
                 borderWidth: 2,
                 pointRadius: 0
             }]
         };
    }
  }
};
</script>
