<!-- 리포트 데이터 테이블: 증권사 리포트 목록 및 투자의견 요약 정보 제공 -->
<template>
  <div class="c-investment-container">
    <div class="overflow-x-auto">
      <table class="c-report-table">
        <thead class="c-report-table__thead">
          <tr>
            <th class="c-report-table__th c-report-table__th--center">날짜</th>
            <th class="c-report-table__th">종목명</th>
            <th class="c-report-table__th c-report-table__th--right">등락률</th>
            <th class="c-report-table__th c-report-table__th--right">목표가</th>
            <th class="c-report-table__th c-report-table__th--center">투자의견</th>
            <th class="c-report-table__th">리포트 제목</th>
            <th class="c-report-table__th c-report-table__th--center">증권사</th>
          </tr>
        </thead>
        <tbody class="c-report-table__tbody">
          <tr v-for="(report, idx) in reports" :key="idx" class="c-report-table__tr">
            <td class="c-report-table__td c-report-table__td--center">{{ report.date }}</td>
            <td class="c-report-table__td">
              <div class="c-report-table__stock-group">
                <div
                  class="c-report-table__stock-initial"
                  :style="{ backgroundColor: getStockInitialColor(report.stockName) }"
                >
                  {{ report.stockName.substring(0, 1) }}
                </div>
                <span class="c-report-table__stock-name">{{ report.stockName }}</span>
              </div>
            </td>
            <td class="c-report-table__td c-report-table__td--right">
              <span :class="report.changeRate > 0 ? 'indicator--positive' : report.changeRate < 0 ? 'indicator--negative' : 'indicator--neutral'">
                {{ report.changeRate > 0 ? '+' : '' }}{{ report.changeRate }}%
              </span>
            </td>
            <td class="c-report-table__td c-report-table__td--right">
              {{ report.targetPrice.toLocaleString() }}원
            </td>
            <td class="c-report-table__td c-report-table__td--center">
              <span
                class="c-report-table__badge"
                :class="getRatingBadgeClass(report.rating)"
              >
                {{ report.rating }}
              </span>
            </td>
            <td class="c-report-table__td">
              <span
                class="c-report-table__title"
                @click="$emit('select-report', report)"
              >
                {{ report.title }}
              </span>
            </td>
            <td class="c-report-table__td c-report-table__td--center">
              <span class="c-report-table__firm">{{ report.firm }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 푸터: 도움말 및 페이지네이션 -->
    <div class="c-report-table__footer">
      <p class="c-report-table__guide">※ 신규리포트는 증권사에서 신규 매수 의견을 제시한 리포트입니다.</p>

      <div class="c-report-pager">
        <button class="c-report-pager__btn c-report-pager__btn--inactive">
          <ChevronLeftIcon class="c-report-pager__icon" />
        </button>
        <button
          v-for="page in 3"
          :key="page"
          class="c-report-pager__btn"
          :class="page === 1 ? 'c-report-pager__btn--active' : 'c-report-pager__btn--inactive'"
        >
          {{ page }}
        </button>
        <button class="c-report-pager__btn c-report-pager__btn--inactive">
          <ChevronRightIcon class="c-report-pager__icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue'

export default {
  name: 'ReportDataTable',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    reports: {
      type: Array,
      required: true
    }
  },
  methods: {
    getRatingBadgeClass(rating) {
      if (rating.includes('BUY')) { return 'c-report-table__badge--buy' }
      if (rating.includes('HOLD')) { return 'c-report-table__badge--hold' }
      if (rating.includes('SELL')) { return 'c-report-table__badge--sell' }
      return ''
    },
    getStockInitialColor(name) {
      const colors = ['#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#ef4444', '#f97316']
      return colors[name.charCodeAt(0) % colors.length]
    }
  }
}
</script>

<style src="@/assets/css/components/organisms/investment/report-data-table.css"></style>
