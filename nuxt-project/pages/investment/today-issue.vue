<!-- 오늘의 이슈 페이지: 실시간 시장 주요 뉴스 및 AI 이슈 분석 피드 제공 -->
<template>
  <div class="p-today-issue">
    <div class="c-page-header">
      <div class="c-page-header__inner">
        <div class="c-page-header__content">
          <h2 class="c-page-header__title">오늘의 이슈</h2>
          <p class="c-page-header__desc">AI가 분석한 오늘의 핵심 투자 이슈와 뉴스입니다.</p>
        </div>
      </div>
    </div>

    <!-- Issue Feed (2 columns on 1920x1080) -->
    <div class="p-today-issue__feed">
       <div v-for="issue in issues" :key="issue.id" class="c-issue-card">
          <div class="c-issue-card__image-box">
             <img src="https://images.unsplash.com/photo-1611974717537-43406f0e3868?auto=format&fit=crop&q=80&w=800" alt="issue image" class="c-issue-card__image" />
          </div>
          <div class="c-issue-card__content">
             <div class="c-issue-card__header">
                <span class="c-issue-card__category">{{ issue.category }}</span>
                <span class="c-issue-card__time">{{ issue.time }}</span>
             </div>
             <h3 class="c-issue-card__title">{{ issue.title }}</h3>
             <p class="c-issue-card__summary">{{ issue.summary }}</p>
             <div class="c-issue-card__footer">
                <div class="c-issue-card__author">
                   <div class="c-issue-card__author-avatar"></div>
                   <span class="c-issue-card__author-name">{{ issue.author }}</span>
                </div>
                <Button variant="outline" size="sm">자세히 보기</Button>
             </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

export default {
  name: "TodayIssue",
  components: { Button },
  data() {
    return {
      issues: [
        { id: 1, category: '반도체', time: '10분 전', title: '엔비디아 시가총액 1위 탈환, 하이닉스 수혜 기대', summary: '글로벌 AI 반도체 시장의 주도권 경쟁이 심화되는 가운데...', author: 'AI 분석가' },
        { id: 2, category: '금리/매크로', time: '1시간 전', title: '미 국채 금리 하락 안정세, 기술주 반등 서막?', summary: '시장 예상치를 하회하는 고용 지표 발표로 인해 금리 인하 기대감이...', author: '금융 이슈팀' }
      ]
    }
  }
}
</script>

<style src="@/assets/css/pages/today-issue.css"></style>
