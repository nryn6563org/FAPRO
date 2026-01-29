<template>
  <div class="c-widget__simple-wrapper">
    <div>
      <p class="c-widget__value">{{ widgetId === 'client-count' ? '247명' : '1,247억원' }}</p>
      <div class="c-widget__change c-widget__change--up">
        <TrendingUp class="c-widget__change-icon" />
        <span>{{ widgetId === 'client-count' ? '+12명 (이번 달)' : '+3.2% (전월 대비)' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp } from 'lucide-vue'

export default {
  name: 'SimpleStatWidget',
  components: {
    TrendingUp
  },
  props: {
    widgetId: {
      type: String,
      required: true
    }
  }
}
</script>


