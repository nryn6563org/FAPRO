<!-- 추천 수익률 페이지: 과거 추천 종목들의 성과 및 수익률 현황 분석 제공 -->
<template>
  <div class="p-recommend-return">
    <div class="c-page-header">
      <div class="c-page-header__inner">
        <div class="c-page-header__content">
          <h2 class="c-page-header__title">추천 수익률</h2>
          <p class="c-page-header__desc">추천 종목의 과거 성과 및 실시간 수익률 현황입니다.</p>
        </div>
      </div>
    </div>

    <!-- Performance Overview (1920x1080 Styled) -->
    <div class="p-recommend-return__overview">
       <div class="p-recommend-return__stat-box">
          <p class="p-recommend-return__stat-label">누적 수익률</p>
          <div class="p-recommend-return__stat-value indicator--positive">+142.8%</div>
          <p class="p-recommend-return__stat-subtext">서비스 런칭 이후 (2023.01 ~)</p>
       </div>
       <div class="p-recommend-return__stat-box">
          <p class="p-recommend-return__stat-label">승률 (Win Rate)</p>
          <div class="p-recommend-return__stat-value">72.4%</div>
          <p class="p-recommend-return__stat-subtext">추천 대비 목표가 도달 비중</p>
       </div>
       <div class="p-recommend-return__stat-box">
          <p class="p-recommend-return__stat-label">평균 보유 기간</p>
          <div class="p-recommend-return__stat-value">18일</div>
          <p class="p-recommend-return__stat-subtext">추천일로부터 수익 실현까지</p>
       </div>
    </div>

    <!-- Performance Table Section -->
    <div class="p-recommend-return__table-section">
      <div class="p-recommend-return__section-header">
         <h3 class="p-recommend-return__section-title">종목별 성과 현황</h3>
      </div>

      <div class="p-recommend-return__table-container">
         <table class="p-recommend-return__table">
            <thead>
               <tr>
                  <th class="p-recommend-return__th">추천일</th>
                  <th class="p-recommend-return__th">종목명</th>
                  <th class="p-recommend-return__th p-recommend-return__th--right">매수가</th>
                  <th class="p-recommend-return__th p-recommend-return__th--right">매도가(현재가)</th>
                  <th class="p-recommend-return__th p-recommend-return__th--right">수익률</th>
                  <th class="p-recommend-return__th">상태</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(stock, idx) in performanceList" :key="idx" class="p-recommend-return__tr">
                  <td class="p-recommend-return__td">{{ stock.date }}</td>
                  <td class="p-recommend-return__td">
                    <span class="p-recommend-return__stock-name">{{ stock.name }}</span>
                  </td>
                  <td class="p-recommend-return__td p-recommend-return__td--right">{{ stock.buyPrice.toLocaleString() }}</td>
                  <td class="p-recommend-return__td p-recommend-return__td--right">{{ stock.sellPrice.toLocaleString() }}</td>
                  <td class="p-recommend-return__td p-recommend-return__td--right">
                     <span class="p-recommend-return__yield-chip" :class="stock.yield > 0 ? 'p-recommend-return__yield-chip--positive' : 'p-recommend-return__yield-chip--negative'">
                        {{ stock.yield > 0 ? '+' : '' }}{{ stock.yield }}%
                     </span>
                  </td>
                  <td class="p-recommend-return__td">
                    <span class="status-badge" :class="stock.status === '완료' ? 'status-badge--success' : 'status-badge--info'">
                       {{ stock.status }}
                    </span>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

export default {
  name: "RecommendReturn",
  components: {
    Button
  },
  data() {
    return {
      performanceList: [
        { date: '2024.01.05', name: '삼성전자', buyPrice: 71000, sellPrice: 74500, yield: 4.9, status: '완료' },
        { date: '2024.01.02', name: 'SK하이닉스', buyPrice: 138000, sellPrice: 145000, yield: 5.1, status: '완료' },
        { date: '2023.12.20', name: '현대차', buyPrice: 195000, sellPrice: 240000, yield: 23.1, status: '완료' },
        { date: '2024.01.15', name: 'LIG넥스원', buyPrice: 130000, sellPrice: 125000, yield: -3.8, status: '보유' },
        { date: '2024.01.10', name: '기아', buyPrice: 95000, sellPrice: 110000, yield: 15.8, status: '완료' }
      ]
    }
  }
}
</script>

<style src="@/assets/css/pages/recommend-return.css"></style>
