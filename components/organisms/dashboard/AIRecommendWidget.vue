<template>
  <div class="c-ai-widget">
    <div class="c-ai-widget__header-info">
      <div v-if="config.badge" class="c-ai-widget__badge">
        <Sparkles class="w-3 h-3 mr-1" />
        {{ config.badge }}
      </div>
      <span class="c-ai-widget__date">{{ currentDate }} 기준</span>
    </div>

    <div class="c-ai-widget__content">
      <div class="c-ai-widget__preview">
         <div class="c-ai-widget__placeholder">
            <component :is="icon" class="c-ai-widget__placeholder-icon" />
            <p class="mt-2">{{ config.desc }}</p>
         </div>
      </div>
    </div>

    <div class="c-ai-widget__footer">
       <button @click="navigateToPage" class="c-ai-widget__action-btn">
          상세 보기
       </button>
    </div>
  </div>
</template>

<script>
import { Sparkles, Star, CalendarDays, Lightbulb, PieChart, Zap } from 'lucide-vue'

export default {
  name: 'AIRecommendWidget',
  components: {
    Sparkles, Star, CalendarDays, Lightbulb, PieChart, Zap
  },
  props: {
    widgetId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString()
    }
  },
  computed: {
    config() {
      const map = {
        'today-pick-widget': { badge: 'AI Strong Buy', desc: '오늘의 최우선 추천 종목을 확인하세요.', icon: 'Star', route: '/investment/recommend-stocks' },
        'daily-stocks-widget': { badge: 'Daily Report', desc: '일자별 추천 종목 성과 리포트.', icon: 'CalendarDays', route: '/investment/recommend-stocks' },
        'recommend-stocks-widget': { badge: 'AI Strategy', desc: '전략별 AI 추천 종목 리스트.', icon: 'Lightbulb', route: '/investment/recommend-stocks' },
        'recommend-return-widget': { badge: 'Performance', desc: '추천 종목의 누적 수익률 현황.', icon: 'PieChart', route: '/investment/recommend-stocks' }
      }
      return map[this.widgetId] || { badge: 'AI Info', desc: 'AI 분석 정보를 확인하세요.', icon: 'Zap', route: '/ai/signals' }
    },
    icon() {
      return this.config.icon
    }
  },
  methods: {
    navigateToPage() {
      if (this.config.route) {
        this.$router.push(this.config.route)
      }
    }
  }
}
</script>

<style src="@/assets/css/components/organisms/dashboard/ai-recommend.css"></style>
