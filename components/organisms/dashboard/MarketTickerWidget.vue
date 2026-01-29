<template>
  <div class="c-market-ticker">
    <div v-for="item in tickerData" :key="item.symbol" class="c-ticker-item">
      <span class="c-ticker-item__label">{{ item.label }}</span>
      <span class="c-ticker-item__value">{{ item.value.toLocaleString() }}</span>
      <span :class="['c-ticker-item__change', item.change >= 0 ? 'indicator--positive' : 'indicator--negative']">
        <component :is="item.change >= 0 ? 'TrendingUp' : 'TrendingDown'" class="w-3 h-3" />
        {{ item.changePercent.toFixed(2) }}%
      </span>
    </div>
  </div>
</template>

<script>
import { TrendingUp, TrendingDown } from 'lucide-vue'

export default {
  name: 'MarketTickerWidget',
  components: { TrendingUp, TrendingDown },
  data() {
    return {
      tickerData: [
        { label: 'KOSPI', symbol: 'KOSPI', value: 2580.42, change: 12.5, changePercent: 0.49 },
        { label: 'KOSDAQ', symbol: 'KOSDAQ', value: 870.15, change: -4.2, changePercent: -0.48 },
        { label: 'S&P 500', symbol: 'SPX', value: 4890.97, change: 25.1, changePercent: 0.51 },
        { label: 'NASDAQ', symbol: 'IXIC', value: 15451.31, change: 112.4, changePercent: 0.73 }
      ]
    }
  }
}
</script>

<style scoped>
.c-market-ticker {
    display: flex;
    overflow-x: auto;
    gap: 2rem;
    padding: 0.25rem 0;
}

.c-market-ticker::-webkit-scrollbar {
    display: none;
}

.c-ticker-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
}

.c-ticker-item__label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #64748b;
}

.c-ticker-item__value {
    font-size: 0.875rem;
    font-weight: 600;
}

.c-ticker-item__change {
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.125rem;
}
</style>
