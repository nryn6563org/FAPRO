<template>
  <div class="c-investment-widget">
    <div class="c-investment-widget__content">
      <p class="c-investment-widget__desc">
        {{ description }}
      </p>
      <div class="c-investment-widget__preview">
        <!-- Placeholder for chart or list preview -->
        <div class="c-investment-widget__placeholder">
          <component :is="icon" class="c-investment-widget__placeholder-icon" />
          <span>상세 분석 보기</span>
        </div>
      </div>
    </div>
    <div class="c-investment-widget__footer">
      <button @click="navigateToPage" class="c-investment-widget__link-btn">
        <span>페이지 이동</span>
        <ArrowRight class="c-investment-widget__icon-arrow" />
      </button>
    </div>
  </div>
</template>

<script>
import { ArrowRight, Lightbulb, TrendingUp, TrendingDown, Layers, FileBarChart, ClipboardList, Activity } from 'lucide-vue'

export default {
  name: 'InvestmentInfoWidget',
  components: {
    ArrowRight,
    Lightbulb, TrendingUp, TrendingDown, Layers, FileBarChart, ClipboardList, Activity
  },
  props: {
    widgetId: {
      type: String,
      required: true
    }
  },
  computed: {
    config() {
      const map = {
        'today-issue-widget': { desc: '오늘의 시장 주요 이슈를 히트맵으로 확인하세요.', icon: 'Lightbulb', route: '/investment/today-issue' },
        'price-analysis-widget': { desc: '종목별 시세 변동 추이와 기술적 지표 분석.', icon: 'TrendingUp', route: '/investment/price-analysis' },
        'supply-analysis-widget': { desc: '외국인/기관 수급 현황과 주가 상관관계 분석.', icon: 'TrendingDown', route: '/investment/supply-analysis' },
        'theme-sector-widget': { desc: '지금 뜨는 테마와 주도 업종 순위 확인.', icon: 'Layers', route: '/investment/theme-sector' },
        'report-analysis-widget': { desc: '증권사 발행 리포트와 목표가 변동 현황.', icon: 'FileBarChart', route: '/investment/report-analysis' },
        'disclosure-analysis-widget': { desc: '주요 기업 공시 사항과 핵심 요약 정보.', icon: 'ClipboardList', route: '/investment/disclosure-analysis' }
      }
      return map[this.widgetId] || { desc: '투자 정보를 확인하세요.', icon: 'Activity', route: '/market' }
    },
    description() {
      return this.config.desc
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

<style src="@/assets/css/components/domain/dashboard/widgets/investment-info.css"></style>
