<template>
  <div class="c-report-analysis">
    <div class="c-report-analysis__header">
      <h2 class="c-report-analysis__title">리포트 분석</h2>
      <p class="c-report-analysis__desc">증권사 애널리스트 리포트 및 목표가 분석</p>
    </div>

    <!-- 리포트 분류 탭 메뉴 -->
    <div class="c-report-analysis__tabs-card">
      <div class="c-report-analysis__tabs-grid">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'c-report-analysis__tab-btn',
            activeTab === tab ? 'c-report-analysis__tab-btn--active' : ''
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- 리포트 리스트 테이블 섹션 -->
    <div class="c-report-analysis__list-card">
      <div class="c-report-analysis__update-info">
        <span class="c-report-analysis__update-text">업데이트 01/22 09:25</span>
      </div>

      <div class="c-report-analysis__table-wrapper">
        <table class="c-report-analysis__table">
          <thead>
            <tr>
              <th class="c-report-analysis__th c-report-analysis__th--center">날짜</th>
              <th class="c-report-analysis__th c-report-analysis__th--left">종목명</th>
              <th class="c-report-analysis__th c-report-analysis__th--right">등락률</th>

              <template v-if="activeTab === '기관관심리포트'">
                <th class="c-report-analysis__th c-report-analysis__th--right">기관누적순매매금액</th>
              </template>
              <template v-else-if="activeTab === '외국인관심리포트'">
                <th class="c-report-analysis__th c-report-analysis__th--right">외국인누적순매매금액</th>
              </template>
              <template v-else-if="activeTab === '연기금관심리포트'">
                <th class="c-report-analysis__th c-report-analysis__th--right">연기금누적순매매금액</th>
              </template>
              <template v-else-if="activeTab === '증권사관심종목'">
                <th class="c-report-analysis__th c-report-analysis__th--center">리포트수량</th>
                <th class="c-report-analysis__th c-report-analysis__th--right">최고목표가</th>
                <th class="c-report-analysis__th c-report-analysis__th--right">최저목표가</th>
              </template>
              <template v-else-if="activeTab === '목표가높음'">
                <th class="c-report-analysis__th c-report-analysis__th--right">목표가</th>
                <th class="c-report-analysis__th c-report-analysis__th--center">주가대비</th>
              </template>
              <template v-else>
                <th class="c-report-analysis__th c-report-analysis__th--right">목표가</th>
                <th class="c-report-analysis__th c-report-analysis__th--center">투자의견</th>
              </template>

              <th class="c-report-analysis__th c-report-analysis__th--left">
                {{ activeTab === '증권사관심종목' ? '최신리포트' : '제목' }}
              </th>
              <th v-if="activeTab !== '증권사관심종목'" class="c-report-analysis__th c-report-analysis__th--center">증권사</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(report, idx) in currentData"
              :key="idx"
              class="c-report-analysis__tr"
            >
              <td class="c-report-analysis__td c-report-analysis__td--center">{{ report.date }}</td>
              <td class="c-report-analysis__td c-report-analysis__td--stock">
                <div class="c-report-analysis__avatar-box">
                  <div :class="['c-report-analysis__avatar', getStockColor(report.stockName)]">
                    {{ report.stockName.charAt(0) }}
                  </div>
                  <span>{{ report.stockName }}</span>
                </div>
              </td>
              <td
                   class="c-report-analysis__td c-report-analysis__td--rate"
                   :class="report.changeRate > 0 ? 'c-report-analysis__rate--up' : report.changeRate < 0 ? 'c-report-analysis__rate--down' : 'c-report-analysis__rate--neutral'"
              >
                 {{ report.changeRate > 0 ? '+' : '' }}{{ report.changeRate }}%
              </td>

              <!-- 선택된 탭에 따른 동적 컬럼 렌더링 -->
              <template v-if="activeTab === '기관관심리포트'">
                 <td class="c-report-analysis__td c-report-analysis__td--value">{{ report.institutionalAmount }}</td>
              </template>
              <template v-else-if="activeTab === '외국인관심리포트'">
                 <td class="c-report-analysis__td c-report-analysis__td--value">{{ report.foreignAmount }}</td>
              </template>
              <template v-else-if="activeTab === '연기금관심리포트'">
                 <td class="c-report-analysis__td c-report-analysis__td--value">{{ report.pensionAmount }}</td>
              </template>
              <template v-else-if="activeTab === '증권사관심종목'">
                 <td class="c-report-analysis__td c-report-analysis__td--value-center">{{ report.reportCount }}</td>
                 <td class="c-report-analysis__td c-report-analysis__td--value">{{ formatPrice(report.highestTargetPrice) }}</td>
                 <td class="c-report-analysis__td c-report-analysis__td--value">{{ formatPrice(report.lowestTargetPrice) }}</td>
              </template>
              <template v-else-if="activeTab === '목표가높음'">
                 <td class="c-report-analysis__td c-report-analysis__td--value">{{ formatPrice(report.targetPrice) }}</td>
                 <td class="c-report-analysis__td c-report-analysis__td--value-center">{{ report.targetVsPrice }}</td>
              </template>
              <template v-else>
                 <td class="c-report-analysis__td c-report-analysis__td--value">{{ formatPrice(report.targetPrice) }}</td>
                 <td class="c-report-analysis__td c-report-analysis__td--center">
                    <span :class="['c-report-analysis__rating-badge', getRatingColor(report.rating)]">
                        {{ report.rating }}
                    </span>
                 </td>
              </template>

              <td
                class="c-report-analysis__td c-report-analysis__td--title"
                @click="selectedReport = report"
              >
                {{ report.title }}
              </td>
              <td v-if="activeTab !== '증권사관심종목'" class="c-report-analysis__td c-report-analysis__td--firm">
                {{ report.firm }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

       <!-- 페이지네이션 및 하단 설명 문구 -->
      <div class="c-report-analysis__footer">
        <div class="c-report-analysis__footer-desc">
            {{ getTabDescription(activeTab) }}
        </div>
        <div class="c-report-analysis__pagination">
            <button class="c-report-analysis__page-btn">‹</button>
            <button class="c-report-analysis__page-btn c-report-analysis__page-btn--active">1</button>
            <button class="c-report-analysis__page-btn">2</button>
            <button class="c-report-analysis__page-btn">›</button>
        </div>
      </div>
    </div>

    <!-- 리포트 상세 모달 -->
    <div v-if="selectedReport" class="c-report-analysis__modal-overlay" role="dialog" aria-modal="true">
        <div class="c-report-analysis__modal-backdrop" aria-hidden="true" @click="selectedReport = null"></div>

        <div class="c-report-analysis__modal-content">
            <div class="c-report-analysis__modal-body">
                <div class="c-report-analysis__modal-header">
                     <h3 class="c-report-analysis__modal-title">
                        [{{ selectedReport.stockName }}]<br />
                        {{ selectedReport.title }}
                     </h3>
                     <button @click="selectedReport = null" type="button" class="c-report-analysis__modal-close">
                        <x class="w-6 h-6" />
                     </button>
                </div>

                <div class="c-report-analysis__modal-meta">
                    {{ selectedReport.firm }} | {{ selectedReport.date }}
                </div>

                <div class="c-report-analysis__modal-stats">
                    <div>
                        <span class="c-report-analysis__stat-label">목표가 : </span>
                        <span class="c-report-analysis__stat-value">{{ formatPrice(selectedReport.targetPrice) }} 원</span>
                    </div>
                     <div>
                        <span class="c-report-analysis__stat-label">투자의견 : </span>
                        <span class="c-report-analysis__stat-value">{{ selectedReport.rating }}</span>
                    </div>
                </div>

                 <div class="c-report-analysis__modal-text">
                    {{ selectedReport.content || '상세 내용이 제공되지 않습니다.' }}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue'

// Mock Data: 리포트 탭별 예시 데이터
const mockReports = {
  신규리포트: [
    {
      date: '01/22',
      stockName: '두산에스나',
      currentPrice: 52600,
      changeRate: 1.94,
      targetPrice: 69000,
      title: '비메모리 턴어라운드와 직관적인 동행',
      firm: '교보증권',
      rating: 'BUY(신규)',
      upside: 31.5,
      content: '국내 대표 시스템반도체 디자인하우스. DSP 전환의 성과가 보여줄 원년...'
    }
  ],
  // 실제 사용 시 각 키에 맞는 데이터 배열이 필요함
  목표가상향: [],
  목표가하향: [],
  기관관심리포트: [],
  외국인관심리포트: [],
  연기금관심리포트: [],
  증권사관심종목: [],
  목표가높음: []
}

export default {
  // 컴포넌트 이름: 리포트 분석 (도메인 컴포넌트)
  name: 'ReportAnalysis',
  components: {
    X
  },
  data() {
    return {
      activeTab: '신규리포트', // 현재 활성화된 탭
      selectedReport: null, // 상세 보기 선택된 리포트
      // 분석 탭 목록
      tabs: [
        '신규리포트', '목표가상향', '목표가하향', '기관관심리포트',
        '외국인관심리포트', '연기금관심리포트', '증권사관심종목', '목표가높음'
      ],
      reportsData: mockReports // 리포트 데이터 소스
    }
  },
  computed: {
    // 현재 선택된 탭의 리포트 목록 반환
    currentData() {
      return this.reportsData[this.activeTab] || []
    }
  },
  methods: {
    // 금액/수치 3자리 콤마 포맷팅
    formatPrice(price) {
      return price ? price.toLocaleString() : '-'
    },
    // 종목명 첫 글자에 따라 아바타 배경색 결정 (시각적 구분)
    getStockColor(stockName) {
      const colors = [
        'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
        'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
        'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
        'bg-cyan-500', 'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500'
      ]
      const index = stockName.charCodeAt(0) % colors.length
      return colors[index]
    },
    // 투자의견(Buy, Hold, Sell)에 따른 배지 스타일 반환
    getRatingColor(rating) {
      if (!rating) { return 'bg-gray-100 text-gray-700 border-gray-300' }
      const r = rating.toLowerCase()
      if (r.includes('buy')) { return 'bg-green-100 text-green-700 border-green-300' }
      if (r.includes('hold')) { return 'bg-yellow-100 text-yellow-700 border-yellow-300' }
      if (r.includes('sell')) { return 'bg-red-100 text-red-700 border-red-300' }
      return 'bg-gray-100 text-gray-700 border-gray-300'
    },
    /**
     * 탭별 설명 텍스트 반환
     * @param {string} tab - 탭 이름
     */
    getTabDescription(tab) {
      const descriptions = {
        신규리포트: "신규리포트는 증권사에서 '신규매수'의견을 제시한 리포트 입니다.",
        목표가상향: '해당 증권사에서 최근 3개월이내에 발표한 리포트 중, 직전 목표가 대비 목표가가 상향된 종목입니다.',
        목표가하향: '해당 증권사에서 최근 3개월이내에 발표한 리포트 중, 직전 목표가 대비 목표가가 하향된 종목입니다.',
        기관관심리포트: '리포트 발표 당일 기관의 순매수량이 큰 종목입니다.',
        외국인관심리포트: '리포트 발표 당일 외국인의 순매수량이 큰 종목입니다.',
        연기금관심리포트: '리포트 발표 당일 연기금의 순매수량이 큰 종목입니다.',
        증권사관심종목: '오늘 증권사의 리포트가 많이 발생한 종목입니다.',
        목표가높음: '오늘 발표한 리포트 중, 목표가와 현재가의 괴리율이 큰 종목입니다.'
      }
      return descriptions[tab] || ''
    }
  }
}
</script>

<style scoped src="@/assets/css/components/organisms/report-analysis.css"></style>
