<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold">리포트 분석</h2>
      <p class="text-slate-600 mt-1">증권사 애널리스트 리포트 및 목표가 분석</p>
    </div>

    <!-- 리포트 분류 탭 메뉴 -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <div class="grid grid-cols-4 lg:grid-cols-8 gap-2">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'text-xs py-2 rounded-md transition-colors',
            activeTab === tab
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- 리포트 리스트 테이블 섹션 -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div class="flex justify-end mb-4">
        <span class="text-sm text-slate-500">업데이트 01/22 09:25</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-slate-300">
              <th class="text-center py-3 px-4 font-semibold text-slate-700">날짜</th>
              <th class="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
              <th class="text-right py-3 px-4 font-semibold text-slate-700">등락률</th>

              <template v-if="activeTab === '기관관심리포트'">
                <th class="text-right py-3 px-4 font-semibold text-slate-700">기관누적순매매금액</th>
              </template>
              <template v-else-if="activeTab === '외국인관심리포트'">
                <th class="text-right py-3 px-4 font-semibold text-slate-700">외국인누적순매매금액</th>
              </template>
              <template v-else-if="activeTab === '연기금관심리포트'">
                <th class="text-right py-3 px-4 font-semibold text-slate-700">연기금누적순매매금액</th>
              </template>
              <template v-else-if="activeTab === '증권사관심종목'">
                <th class="text-center py-3 px-4 font-semibold text-slate-700">리포트수량</th>
                <th class="text-right py-3 px-4 font-semibold text-slate-700">최고목표가</th>
                <th class="text-right py-3 px-4 font-semibold text-slate-700">최저목표가</th>
              </template>
              <template v-else-if="activeTab === '목표가높음'">
                <th class="text-right py-3 px-4 font-semibold text-slate-700">목표가</th>
                <th class="text-center py-3 px-4 font-semibold text-slate-700">주가대비</th>
              </template>
              <template v-else>
                <th class="text-right py-3 px-4 font-semibold text-slate-700">목표가</th>
                <th class="text-center py-3 px-4 font-semibold text-slate-700">투자의견</th>
              </template>

              <th class="text-left py-3 px-4 font-semibold text-slate-700">
                {{ activeTab === '증권사관심종목' ? '최신리포트' : '제목' }}
              </th>
              <th v-if="activeTab !== '증권사관심종목'" class="text-center py-3 px-4 font-semibold text-slate-700">증권사</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(report, idx) in currentData"
              :key="idx"
              class="border-b border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <td class="py-3 px-4 text-center text-slate-600">{{ report.date }}</td>
              <td class="py-3 px-4 font-medium text-blue-600 cursor-pointer hover:underline">
                <div class="flex items-center gap-2">
                  <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0', getStockColor(report.stockName)]">
                    {{ report.stockName.charAt(0) }}
                  </div>
                  <span>{{ report.stockName }}</span>
                </div>
              </td>
              <td :class="['py-3 px-4 text-right font-semibold', report.changeRate > 0 ? 'text-red-600' : report.changeRate < 0 ? 'text-blue-600' : 'text-slate-600']">
                 {{ report.changeRate > 0 ? '+' : '' }}{{ report.changeRate }}%
              </td>

              <!-- 선택된 탭에 따른 동적 컬럼 렌더링 -->
              <template v-if="activeTab === '기관관심리포트'">
                 <td class="py-3 px-4 text-right font-semibold text-slate-900">{{ report.institutionalAmount }}</td>
              </template>
              <template v-else-if="activeTab === '외국인관심리포트'">
                 <td class="py-3 px-4 text-right font-semibold text-slate-900">{{ report.foreignAmount }}</td>
              </template>
              <template v-else-if="activeTab === '연기금관심리포트'">
                 <td class="py-3 px-4 text-right font-semibold text-slate-900">{{ report.pensionAmount }}</td>
              </template>
              <template v-else-if="activeTab === '증권사관심종목'">
                 <td class="py-3 px-4 text-center font-semibold text-slate-900">{{ report.reportCount }}</td>
                 <td class="py-3 px-4 text-right font-semibold text-slate-900">{{ formatPrice(report.highestTargetPrice) }}</td>
                 <td class="py-3 px-4 text-right font-semibold text-slate-900">{{ formatPrice(report.lowestTargetPrice) }}</td>
              </template>
              <template v-else-if="activeTab === '목표가높음'">
                 <td class="py-3 px-4 text-right font-semibold text-slate-900">{{ formatPrice(report.targetPrice) }}</td>
                 <td class="py-3 px-4 text-center font-semibold text-slate-900">{{ report.targetVsPrice }}</td>
              </template>
              <template v-else>
                 <td class="py-3 px-4 text-right font-semibold text-slate-900">{{ formatPrice(report.targetPrice) }}</td>
                 <td class="py-3 px-4 text-center">
                    <span :class="['inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent', getRatingColor(report.rating)]">
                        {{ report.rating }}
                    </span>
                 </td>
              </template>

              <td
                class="py-3 px-4 text-slate-700 max-w-md truncate cursor-pointer hover:text-blue-600 hover:underline"
                @click="selectedReport = report"
              >
                {{ report.title }}
              </td>
              <td v-if="activeTab !== '증권사관심종목'" class="py-3 px-4 text-center text-slate-600">
                {{ report.firm }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

       <!-- 페이지네이션 및 하단 설명 문구 -->
      <div class="flex justify-between items-center mt-6 pt-4 border-t border-slate-200">
        <div class="text-sm text-slate-600">
            {{ getTabDescription(activeTab) }}
        </div>
        <div class="flex items-center gap-2">
            <button class="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">‹</button>
            <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button class="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100">2</button>
            <button class="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100">›</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedReport" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="selectedReport = null"></div>

        <div class="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full max-h-[80vh] flex flex-col pointer-events-auto border border-slate-200">
            <div class="p-6 overflow-y-auto">
                <div class="flex justify-between items-start mb-4">
                     <h3 class="text-lg font-bold pr-8">
                        [{{ selectedReport.stockName }}]<br />
                        {{ selectedReport.title }}
                     </h3>
                     <button @click="selectedReport = null" type="button" class="text-slate-400 hover:text-slate-600">
                        <x class="w-6 h-6" />
                     </button>
                </div>

                <div class="text-sm text-slate-500 mb-6">
                    {{ selectedReport.firm }} | {{ selectedReport.date }}
                </div>

                <div class="space-y-3 mb-6">
                    <div>
                        <span class="text-sm text-slate-600">목표가 : </span>
                        <span class="font-semibold">{{ formatPrice(selectedReport.targetPrice) }} 원</span>
                    </div>
                     <div>
                        <span class="text-sm text-slate-600">투자의견 : </span>
                        <span class="font-semibold">{{ selectedReport.rating }}</span>
                    </div>
                </div>

                 <div class="text-sm text-slate-700 leading-relaxed">
                    {{ selectedReport.content || '상세 내용이 제공되지 않습니다.' }}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue'

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
    // ... Add more mock data as needed
  ],
  // ... Add structure for other tabs to avoid errors, empty initially
  목표가상향: [],
  목표가하향: [],
  기관관심리포트: [],
  외국인관심리포트: [],
  연기금관심리포트: [],
  증권사관심종목: [],
  목표가높음: []
}

export default {
  name: 'ReportAnalysis',
  components: {
    X
  },
  data() {
    return {
      activeTab: '신규리포트',
      selectedReport: null,
      tabs: [
        '신규리포트', '목표가상향', '목표가하향', '기관관심리포트',
        '외국인관심리포트', '연기금관심리포트', '증권사관심종목', '목표가높음'
      ],
      reportsData: mockReports
    }
  },
  computed: {
    currentData() {
      return this.reportsData[this.activeTab] || []
    }
  },
  methods: {
    formatPrice(price) {
      return price ? price.toLocaleString() : '-'
    },
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
