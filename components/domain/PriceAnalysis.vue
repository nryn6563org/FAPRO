<template>
  <div class="c-price-analysis">
    <div class="c-price-analysis__header">
      <h2 class="c-price-analysis__title">시세분석</h2>
      <p class="c-price-analysis__desc">종목별 시세 및 이슈 현황</p>
    </div>

    <!-- 주요 지수 차트 섹션 (코스피, 코스닥) -->
    <div class="c-price-analysis__index-section">
      <div class="c-price-analysis__section-header">
        <h3 class="c-price-analysis__section-title">주요 지수</h3>
        <div class="c-price-analysis__mode-actions">
          <button
             v-for="mode in ['시간별', '날짜별']"
             :key="mode"
             @click="viewMode = mode"
             :class="[
               'c-price-analysis__mode-btn',
               viewMode === mode ? 'c-price-analysis__mode-btn--active' : ''
             ]"
          >
            {{ mode }} 지수보기
          </button>
        </div>
      </div>

      <div class="c-price-analysis__section-body">
        <div class="c-price-analysis__index-grid">
          <!-- 코스피 차트 -->
          <div>
            <div class="mb-4">
              <div class="c-price-analysis__index-info">
                <h3 class="c-price-analysis__index-name">코스피</h3>
                <span class="c-price-analysis__index-value">4,897.17</span>
                <span class="flex items-center font-semibold c-price-analysis__text--up">
                  <TrendingUp class="w-4 h-4 mr-1" />
                  11.42
                </span>
                <span class="font-semibold c-price-analysis__text--up">+0.23%</span>
              </div>
              <div class="c-price-analysis__period-actions">
                 <button
                   v-for="period in ['1일', '3개월', '1년']"
                   :key="period"
                   @click="kospiPeriod = period"
                   :class="[
                     'c-price-analysis__period-btn',
                     kospiPeriod === period ? 'c-price-analysis__period-btn--active' : ''
                   ]"
                 >
                   {{ period }}
                 </button>
              </div>
            </div>
            <div class="c-price-analysis__chart">
              <line-chart :chart-data="getKospiChartData" :options="chartOptions" :height="200" />
            </div>
          </div>

          <!-- 코스닥 차트 -->
          <div>
            <div class="mb-4">
              <div class="c-price-analysis__index-info">
                <h3 class="c-price-analysis__index-name">코스닥</h3>
                <span class="c-price-analysis__index-value">950.07</span>
                <span class="flex items-center font-semibold c-price-analysis__text--down">
                  <TrendingDown class="w-4 h-4 mr-1" />
                  26.3
                </span>
                <span class="font-semibold c-price-analysis__text--down">-2.69%</span>
              </div>
              <div class="c-price-analysis__period-actions">
                 <button
                   v-for="period in ['1일', '3개월', '1년']"
                   :key="period"
                   @click="kosdaqPeriod = period"
                   :class="[
                     'c-price-analysis__period-btn',
                     kosdaqPeriod === period ? 'c-price-analysis__period-btn--active' : ''
                   ]"
                 >
                   {{ period }}
                 </button>
              </div>
            </div>
             <div class="c-price-analysis__chart">
              <line-chart :chart-data="getKosdaqChartData" :options="chartOptions" :height="200" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 시세 현황 및 이슈 데이터 테이블 -->
    <div class="c-price-analysis__table-section">
      <div class="c-price-analysis__section-header flex-col items-start gap-4">
        <h3 class="c-price-analysis__section-title">시세 현황</h3>
        <div class="c-price-analysis__tab-actions">
          <button
             v-for="tab in tabs"
             :key="tab"
             @click="selectedTab = tab"
             :class="[
               'c-price-analysis__tab-btn',
               selectedTab === tab ? 'c-price-analysis__tab-btn--active' : ''
             ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="c-price-analysis__section-body">
        <div class="c-price-analysis__update-time">
          <span class="c-price-analysis__time-text">
            업데이트 {{ currentDate }} {{ currentTime }}
          </span>
        </div>

        <div class="c-price-analysis__table-wrapper">
          <table class="c-price-analysis__table">
            <thead>
              <tr>
                <th class="c-price-analysis__th">날짜</th>
                <th class="c-price-analysis__th">종목명</th>
                <th class="c-price-analysis__th c-price-analysis__th--right">현재가</th>
                <th class="c-price-analysis__th c-price-analysis__th--right">등락률</th>
                <th class="c-price-analysis__th">이슈내용</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(stock, index) in currentData"
                :key="index"
                class="c-price-analysis__tr"
              >
                <td class="c-price-analysis__td">
                  {{ stock.date }} {{ stock.time }}
                </td>
                <td class="c-price-analysis__td c-price-analysis__td--stock">
                  {{ stock.stockName }}
                </td>
                <td class="c-price-analysis__td c-price-analysis__td--price">
                  {{ stock.currentPrice === 0 ? '-' : stock.currentPrice.toLocaleString() }}
                </td>
                <td
                  class="c-price-analysis__td c-price-analysis__td--change"
                  :class="stock.changeRate > 0 ? 'c-price-analysis__text--up' : stock.changeRate < 0 ? 'c-price-analysis__text--down' : ''"
                >
                  {{ stock.changeRate === 0 ? '-' : (stock.changeRate > 0 ? '+' : '') + stock.changeRate.toFixed(2) + '%' }}
                </td>
                <td class="c-price-analysis__td c-price-analysis__td--issue">
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
import { TrendingUp, TrendingDown } from 'lucide-vue'
import LineChart from '@/components/charts/LineChart'

const now = new Date()

export default {
  // 컴포넌트 이름: 시세 분석 (도메인 컴포넌트)
  name: 'PriceAnalysis',
  components: {
    TrendingUp,
    TrendingDown,
    LineChart
  },
  data() {
    return {
      selectedTab: '이슈종목', // 현재 선택된 시세 현황 탭
      kospiPeriod: '1일', // KOSPI 차트 기간
      kosdaqPeriod: '1년', // KOSDAQ 차트 기간
      viewMode: '시간별', // 지수 보기 모드
      // 다양한 시세 현황 필터 탭
      tabs: [
        '이슈종목', '52주신고가', '52주신저가', '상한가', '하한가', '거래비중상위',
        '관리종목', '거래정지', '투자주의', '투자경고', '투자위험'
      ],
      currentDate: `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`,
      currentTime: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      // 차트 라이브러리(Chart.js) 전용 옵션 설정
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
          intersect: false
        }
      },
      // 탭별 시계 데이터 (이슈종목, 신고가 등)
      mockDataByTab: {
        이슈종목: [
          { date: '01/20', time: '09:08', stockName: '유비쿼스', currentPrice: 0, changeRate: 0, issueContent: '피지컬SI 수혜 전망…PBR 역사적 저점 분석에 상승세' },
          { date: '01/20', time: '15:00', stockName: '우진', currentPrice: 25200, changeRate: 13.26, issueContent: '국내 유일 원전 계측기 공급사…후대특형 원전 필요 발...' },
          { date: '01/20', time: '14:30', stockName: '카카오페이', currentPrice: 53800, changeRate: 12.08, issueContent: '스테이블코인 법안 기대에 강세' },
          { date: '01/20', time: '14:28', stockName: '일진파워', currentPrice: 17610, changeRate: 29.96, issueContent: '신규원전 건설 업종 현안 원인 일진 전기철강까지 \'...' },
          { date: '01/20', time: '14:22', stockName: '오로비덱', currentPrice: 5140, changeRate: 25.83, issueContent: '신규 원전 필요 현안 원전계 초기협상 기대감까지...' },
          { date: '01/20', time: '14:00', stockName: '우리기술', currentPrice: 7980, changeRate: 29.97, issueContent: '쫓 국연 원전 필요 신규원전 검토에 현안 원전계...' },
          { date: '01/20', time: '13:58', stockName: '한국전력', currentPrice: 65400, changeRate: 16.16, issueContent: '발전 공기업 동행한 기대감에 15%대↑' },
          { date: '01/20', time: '13:42', stockName: '티앤씨', currentPrice: 17600, changeRate: 25.18, issueContent: '이 대통령 전력난 핵소 원전 필요상에 ↑…원전 필수...' },
          { date: '01/20', time: '13:28', stockName: '나노스에이스틱글로벌지', currentPrice: 46650, changeRate: 29.94, issueContent: '우주발도래 과제 수주에 13% 급등' },
          { date: '01/20', time: '11:46', stockName: '한화에어로스페이스', currentPrice: 1309000, changeRate: -1.58, issueContent: '그림판도 돌리면 자잘하적 건강작 \'상승...' }
        ],
        '52주신고가': [
          { date: '01/20', time: '15:30', stockName: '삼성전자', currentPrice: 72500, changeRate: 3.42, issueContent: 'AI 반도체 수요 증가로 52주 신고가 경신' },
          { date: '01/20', time: '14:25', stockName: 'SK하이닉스', currentPrice: 145000, changeRate: 4.18, issueContent: 'HBM 공급 확대 소식에 52주 최고가 달성' }
        ],
        '52주신저가': [
          { date: '01/20', time: '15:10', stockName: '카카오', currentPrice: 42500, changeRate: -5.22, issueContent: '규제 우려로 52주 신저가 기록' }
        ],
        상한가: [],
        하한가: [],
        거래비중상위: [],
        관리종목: [],
        거래정지: [],
        투자주의: [],
        투자경고: [],
        투자위험: []
      }
    }
  },
  computed: {
    // 선택된 탭에 해당하는 시세 데이터 반환
    currentData() {
      return this.mockDataByTab[this.selectedTab] || []
    },
    // 코스피 차트 데이터 가공 (선택된 기간에 대응)
    getKospiChartData() {
      const labels = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
      const data = [4820, 4830, 4850, 4860, 4880, 4890, 4897] // 더미 데이터

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
      }
    },
    // 코스닥 차트 데이터 가공 (선택된 기간에 대응)
    getKosdaqChartData() {
      const labels = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
      const data = [920, 930, 925, 935, 940, 945, 950] // 더미 데이터
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
      }
    }
  }
}
</script>

<style scoped>
@import url('@/assets/css/components/domain/price-analysis.css');
</style>

