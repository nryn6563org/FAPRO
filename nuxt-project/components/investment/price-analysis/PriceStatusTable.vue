<!-- 시세 현황 테이블: 선택된 필터에 따른 종목별 시세 및 이슈 정보 목록 제공 -->
<template>
  <table class="c-price-status-table">
    <thead class="c-price-status-table__thead">
      <tr>
        <th class="c-price-status-table__th">날짜/시간</th>
        <th class="c-price-status-table__th">종목명</th>
        <th class="c-price-status-table__th c-price-status-table__th--right">현재가</th>
        <th class="c-price-status-table__th c-price-status-table__th--right">등락률</th>
        <th class="c-price-status-table__th">이슈내용</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(stock, index) in data" :key="index" class="c-price-status-table__tr">
        <td class="c-price-status-table__td">{{ stock.date }} {{ stock.time }}</td>
        <td class="c-price-status-table__td">
          <span class="c-price-status-table__stock-name">{{ stock.stockName }}</span>
        </td>
        <td class="c-price-status-table__td c-price-status-table__td--right">
          {{ stock.currentPrice === 0 ? '-' : stock.currentPrice.toLocaleString() }}
        </td>
        <td class="c-price-status-table__td c-price-status-table__td--right">
          <span
            class="c-price-status-table__change"
            :class="stock.changeRate > 0 ? 'indicator--positive' : stock.changeRate < 0 ? 'indicator--negative' : 'text-slate-400'"
          >
            {{ stock.changeRate === 0 ? '-' : (stock.changeRate > 0 ? '+' : '') + stock.changeRate.toFixed(2) + '%' }}
          </span>
        </td>
        <td class="c-price-status-table__td">
          <p class="c-price-status-table__issue" :title="stock.issueContent">
            {{ stock.issueContent }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'PriceStatusTable',
  props: {
    data: { type: Array, required: true }
  }
}
</script>

<style src="@/assets/css/components/investment/price-analysis/status-components.css"></style>
