<!-- 카테고리 카드: 개별 테마 또는 업종의 상세 정보와 상위 종목 목록 제공 -->
<template>
  <div class="c-category-card">
    <!-- 카드 헤더: 아이콘, 이름, 종목수, 수익률 -->
    <div class="c-category-card__header">
      <div class="c-category-card__info">
        <div
          class="c-category-card__icon-wrapper"
          :class="isPositive ? 'c-category-card__icon-wrapper--positive' : 'c-category-card__icon-wrapper--negative'"
        >
          <LayersIcon class="c-category-card__icon" />
        </div>
        <div class="c-category-card__title-group">
          <h3 class="c-category-card__name">{{ item.name }}</h3>
          <span class="c-category-card__count">{{ item.stockCount }}개 종목</span>
        </div>
      </div>
      <div
        class="c-category-card__yield"
        :class="isPositive ? 'indicator--positive' : 'indicator--negative'"
      >
        <TrendingUpIcon v-if="isPositive" class="w-5 h-5" />
        <TrendingDownIcon v-else class="w-5 h-5" />
        {{ isPositive ? '+' : '' }}{{ item.change }}%
      </div>
    </div>

    <!-- 종목 리스트 테이블 -->
    <div class="c-category-card__table-wrapper">
      <table class="c-category-card__table">
        <thead>
          <tr>
            <th class="c-category-card__th">종목명</th>
            <th class="c-category-card__th c-category-card__th--right">현재가</th>
            <th class="c-category-card__th c-category-card__th--right">등락률</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(stock, idx) in item.topStocks.slice(0, 10)"
            :key="idx"
            class="c-category-card__tr"
          >
            <td class="c-category-card__td">
              <div class="c-category-card__stock-info">
                <div
                  class="c-category-card__stock-logo"
                  :class="getStockColor(stock.name)"
                >
                  {{ stock.name.charAt(0) }}
                </div>
                <span class="c-category-card__stock-name" :title="stock.name">
                  {{ stock.name }}
                </span>
              </div>
            </td>
            <td class="c-category-card__td c-category-card__td--right">
              {{ stock.currentPrice.toLocaleString() }}
            </td>
            <td
              class="c-category-card__td c-category-card__td--right"
              :class="stock.changeRate > 0 ? 'indicator--positive' : stock.changeRate < 0 ? 'indicator--negative' : 'text-slate-400'"
            >
              {{ stock.changeRate > 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { LayersIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-vue'

export default {
  name: 'CategoryCard',
  components: {
    LayersIcon,
    TrendingUpIcon,
    TrendingDownIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPositive() {
      return this.item.change >= 0
    }
  },
  methods: {
    getStockColor(name) {
      const colors = [
        'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
        'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
        'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
        'bg-cyan-500', 'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500'
      ]
      const index = name.charCodeAt(0) % colors.length
      return colors[index]
    }
  }
}
</script>

<style src="@/assets/css/components/investment/theme-sector/category-card.css"></style>
