<!-- 수급 데이터 테이블: 외국인, 기관 등 그룹별 수급 현황 데이터 목록 제공 -->
<template>
  <div class="c-supply-card">
    <h3 v-if="title" class="c-supply-data-table__title">{{ title }}</h3>
    <table class="c-supply-data-table">
      <thead class="c-supply-data-table__thead">
        <tr>
          <th class="c-supply-data-table__th">날짜</th>
          <th class="c-supply-data-table__th">종목명</th>
          <th class="c-supply-data-table__th c-supply-data-table__th--right">
            {{ dataLabel }}
          </th>
          <th class="c-supply-data-table__th c-supply-data-table__th--right">등락률</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stock, index) in data" :key="index" class="c-supply-data-table__tr">
          <td class="c-supply-data-table__td">{{ stock.date }}</td>
          <td class="c-supply-data-table__td">
            <span class="c-supply-data-table__stock-name">{{ stock.stockName }}</span>
          </td>
          <td class="c-supply-data-table__td c-supply-data-table__td--right">
            <span class="c-supply-data-table__amount">
              {{ formatValue(stock) }}
            </span>
          </td>
          <td class="c-supply-data-table__td c-supply-data-table__td--right">
            <span
              class="c-supply-data-table__change"
              :class="stock.changeRate > 0 ? 'indicator--positive' : stock.changeRate < 0 ? 'indicator--negative' : 'text-slate-400'"
            >
              {{ stock.changeRate === 0 ? '-' : (stock.changeRate > 0 ? '+' : '') + stock.changeRate.toFixed(2) + '%' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SupplyDataTable',
  props: {
    title: { type: String, default: '' },
    data: { type: Array, required: true },
    valueType: { type: String, default: 'ratio' }, // 'ratio', 'amount', 'days'
    dataLabel: { type: String, required: true }
  },
  methods: {
    formatValue(stock) {
      if (this.valueType === 'amount') {
        return `${stock.netBuyAmount.toLocaleString()}억`
      } else if (this.valueType === 'days') {
        return `${stock.consecutiveDays}일`
      } else {
        return `${stock.buyRatio.toFixed(1)}%`
      }
    }
  }
}
</script>

<style src="@/assets/css/components/investment/supply-analysis/supply-table-components.css"></style>
