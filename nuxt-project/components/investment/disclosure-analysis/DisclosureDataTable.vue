<!-- 공시 데이터 테이블: 각 공시 유형별 맞춤형 헤더 및 데이터 분석 정보 제공 -->
<template>
  <div class="c-investment-container">
    <div class="overflow-x-auto">
      <table class="c-disclosure-table">
        <thead class="c-disclosure-table__thead">
          <tr v-if="type === '수주공시'">
            <th class="c-disclosure-table__th">날짜</th>
            <th class="c-disclosure-table__th">종목명</th>
            <th class="c-disclosure-table__th">공시제목</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">계약금액</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">매출대비</th>
            <th class="c-disclosure-table__th">계약상대방</th>
          </tr>
          <tr v-else-if="type === '지분공시'">
            <th class="c-disclosure-table__th">날짜</th>
            <th class="c-disclosure-table__th">종목명</th>
            <th class="c-disclosure-table__th">보고자</th>
            <th class="c-disclosure-table__th">관계</th>
            <th class="c-disclosure-table__th">보고사유</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">변동주식수</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">보유비율</th>
          </tr>
          <tr v-else-if="type === '전환사채공시'">
            <th class="c-disclosure-table__th">날짜</th>
            <th class="c-disclosure-table__th">종목명</th>
            <th class="c-disclosure-table__th">사채종류</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">총액</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">전환가액</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">비율</th>
            <th class="c-disclosure-table__th">청구기간</th>
          </tr>

          <tr v-else-if="type.includes('실적공시')">
            <th class="c-disclosure-table__th">날짜</th>
            <th class="c-disclosure-table__th">종목명</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">매출액 (YoY)</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">영업이익 (YoY)</th>
            <th class="c-disclosure-table__th c-disclosure-table__th--right">당기순이익 (YoY)</th>
          </tr>
          <tr v-else>
            <th class="c-disclosure-table__th">날짜</th>
            <th class="c-disclosure-table__th">종목명</th>
            <th class="c-disclosure-table__th">공시제목</th>
            <th class="c-disclosure-table__th">상세내용</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, idx) in items">
            <tr :key="idx" class="c-disclosure-table__tr">
              <!-- 공시 유형별 분기 처리 -->
              <template v-if="type === '수주공시'">
                <td class="c-disclosure-table__td">{{ item.date }}</td>
                <td class="c-disclosure-table__td">{{ item.stockName }}</td>
                <td class="c-disclosure-table__td">{{ item.title }}</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right">{{ formatAmount(item.amount) }}</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right">{{ item.ratio }}%</td>
                <td class="c-disclosure-table__td">{{ item.counterparty }}</td>
              </template>

              <template v-else-if="type === '지분공시'">
                <td class="c-disclosure-table__td">{{ item.date }}</td>
                <td class="c-disclosure-table__td">{{ item.stockName }}</td>
                <td class="c-disclosure-table__td">{{ item.reporter }}</td>
                <td class="c-disclosure-table__td">{{ item.relationship }}</td>
                <td class="c-disclosure-table__td">{{ item.reason }}</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right" :class="item.changeShares > 0 ? 'indicator--positive' : 'indicator--negative'">
                  {{ item.changeShares > 0 ? '+' : '' }}{{ item.changeShares.toLocaleString() }}
                </td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right">{{ item.totalRatio }}%</td>
              </template>

              <template v-else-if="type === '전환사채공시'">
                <td class="c-disclosure-table__td">{{ item.date }}</td>
                <td class="c-disclosure-table__td">{{ item.stockName }}</td>
                <td class="c-disclosure-table__td">{{ item.title }}</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right">{{ formatAmount(item.amount) }}</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right">{{ item.exercisePrice.toLocaleString() }}</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right c-disclosure-table__ratio--high">{{ item.ratio }}%</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--small">{{ item.period }}</td>
              </template>

              <template v-else-if="type.includes('실적공시')">
                <td class="c-disclosure-table__td">{{ item.date }}</td>
                <td class="c-disclosure-table__td">{{ item.stockName }}</td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right">
                  {{ formatAmount(item.sales) }} ({{ item.salesYoY > 0 ? '+' : '' }}{{ item.salesYoY }}%)
                </td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right" :class="item.opYoY > 0 ? 'indicator--positive' : 'indicator--negative'">
                  {{ formatAmount(item.op) }} ({{ item.opYoY > 0 ? '+' : '' }}{{ item.opYoY }}%)
                </td>
                <td class="c-disclosure-table__td c-disclosure-table__td--right" :class="item.niYoY > 0 ? 'indicator--positive' : 'indicator--negative'">
                  {{ formatAmount(item.ni) }} ({{ item.niYoY > 0 ? '+' : '' }}{{ item.niYoY }}%)
                </td>
              </template>

              <template v-else>
                <td class="c-disclosure-table__td">{{ item.date }}</td>
                <td class="c-disclosure-table__td">{{ item.stockName }}</td>
                <td class="c-disclosure-table__td">{{ item.title }}</td>
                <td class="c-disclosure-table__td">{{ item.aiAnalysis.substring(0, 30) }}...</td>
              </template>
            </tr>
            <!-- AI 분석 요약 (보조 행) -->
            <tr :key="`ai-${idx}`" class="c-disclosure-table__ai-tr">
              <td colspan="7" class="c-disclosure-table__td--expanded">
                <div class="c-disclosure-table__ai-box">
                  <SparklesIcon class="c-disclosure-table__ai-icon" />
                  <p class="c-disclosure-table__ai-text">
                    <span class="c-disclosure-table__ai-label">AI 분석:</span>
                    {{ item.aiAnalysis }}
                  </p>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { SparklesIcon } from 'lucide-vue'

export default {
  // 컴포넌트 이름: 공시 데이터 테이블
  name: 'DisclosureDataTable',
  components: {
    SparklesIcon
  },
  props: {
    // 현재 선택된 공시 유형 (예: '수주공시', '지분공시' 등)
    // 유형에 따라 테이블 헤더와 데이터 표시 방식이 달라짐
    type: {
      type: String,
      required: true
    },
    // 표시할 공시 데이터 배열
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    /**
     * 금액 포맷팅 함수
     * - 큰 숫자를 '조', '억' 단위로 변환하여 가독성을 높임
     * - 1조 이상: 'X.XX조'
     * - 1억 이상: 'X억'
     * - 그 외: 천 단위 콤마
     */
    formatAmount(value) {
      if (!value) return '-'
      if (value >= 1000000000000) return (value / 1000000000000).toFixed(2) + '조'
      if (value >= 100000000) return (value / 100000000).toFixed(0) + '억'
      return value.toLocaleString()
    }
  }
}
</script>

<style src="@/assets/css/components/investment/disclosure-analysis/disclosure-table-components.css"></style>
