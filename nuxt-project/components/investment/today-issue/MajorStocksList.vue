<!-- 주요 종목 리스트: 현재 선택된 이슈와 관련된 주요 종목 정보 제공 -->
<template>
  <div class="c-major-stocks">
    <h4 class="c-major-stocks__title">주요종목</h4>
    <div class="c-major-stocks__list">
      <div v-for="(stock, index) in stocks" :key="index" class="c-major-stocks__item">
        <span class="c-major-stocks__name">{{ stock.name }}</span>
        <span class="c-major-stocks__rate">{{ stock.rate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MajorStocksList',
  props: {
    stocks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-issue/issue-info.css"></style>
