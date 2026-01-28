<template>
  <div class="p-plans">
    <!-- 0. [DEBUGGER] 플랜 상태 시뮬레이터 (개발용, 배포 시 제거) -->
    <div class="p-plans__debugger">
      <div class="p-plans__debugger-title">테스트 도구 (삭제 가능)</div>
      <div class="p-plans__debugger-btns">
        <button @click="setUserState(null)" :class="{ active: !userPlan }">플랜 없음</button>
        <button @click="setUserState('basic', 'monthly')" :class="{ active: userPlan === 'basic' && billingCycle === 'monthly' }">월간 베이직</button>
        <button @click="setUserState('plus', 'monthly')" :class="{ active: userPlan === 'plus' && billingCycle === 'monthly' }">월간 플러스</button>
        <button @click="setUserState('basic', 'yearly')" :class="{ active: userPlan === 'basic' && billingCycle === 'yearly' }">연간 베이직</button>
        <button @click="setUserState('plus', 'yearly')" :class="{ active: userPlan === 'plus' && billingCycle === 'yearly' }">연간 플러스</button>
      </div>
    </div>

    <div class="p-plans__inner">
      <!-- 1. 헤더 섹션 -->
      <header class="p-plans__header">
        <h1 class="p-plans__title">플랜 업그레이드</h1>
        <p class="p-plans__subtitle">RASSI FApro의 강력한 기능을 활용하세요</p>
        
        <!-- 결제 주기 토글 (월간/연간) -->
        <div class="p-plans__toggle-wrapper">
          <div class="p-plans__toggle">
            <button 
              :class="['p-plans__toggle-btn', billingCycle === 'monthly' ? 'p-plans__toggle-btn--active' : '']"
              @click="billingCycle = 'monthly'"
            >
              월간
            </button>
            <button 
              :class="['p-plans__toggle-btn', billingCycle === 'yearly' ? 'p-plans__toggle-btn--active' : '']"
              @click="billingCycle = 'yearly'"
            >
              연간
            </button>
          </div>
        </div>

        <!-- 현재 이용중인 플랜 상태 배너 -->
        <div v-if="userPlan" class="p-plans__status-banner">
          <span class="p-plans__status-icon">✨</span>
          현재 이용중: <strong>{{ userPlan === 'basic' ? '베이직' : '플러스' }} 플랜 ({{ billingCycle === 'monthly' ? '월간' : '연간' }})</strong>
        </div>
        <div v-else class="p-plans__status-banner p-plans__status-banner--none">
          <span class="p-plans__status-icon">🔒</span>
          현재 이용중인 플랜이 없습니다.
        </div>
      </header>

      <!-- 2. 플랜 목록 그리드 -->
      <div class="p-plans__grid">
        <!-- 베이직 플랜 카드 -->
        <div :class="['c-plan-card', userPlan === 'basic' ? 'c-plan-card--active' : '']">
          <div v-if="userPlan === 'basic'" class="c-plan-card__badge c-plan-card__badge--dimmed">현재 플랜</div>
          <div class="c-plan-card__content">
            <header class="c-plan-card__header">
              <h2 class="c-plan-card__title">베이직</h2>
              <p class="c-plan-card__subtitle">BASIC</p>
              <div class="c-plan-card__price">
                <span class="c-plan-card__amount">{{ billingCycle === 'monthly' ? '10만원' : '100만원' }}</span>
                <span class="c-plan-card__period">/ {{ billingCycle === 'monthly' ? '월' : '년' }}</span>
              </div>
              <p v-if="billingCycle === 'yearly'" class="c-plan-card__promo">연간 결제 시 2개월 무료!</p>
              <p class="c-plan-card__desc">기본적인 FA 업무를 위한 필수 기능</p>
            </header>

            <ul class="c-plan-card__features">
              <li v-for="feature in basicFeatures" :key="feature" class="c-plan-card__feature">
                <CheckCircle2 class="c-plan-card__feature-icon" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <button v-if="userPlan === 'basic'" disabled class="c-plan-card__btn c-plan-card__btn--disabled">현재 이용중인 플랜</button>
            <button v-else class="c-plan-card__btn">베이직 선택</button>
            <p class="c-plan-card__note">이 플랜은 결제를 보관할 수 있습니다. <a href="#">자세한 내용 보기</a></p>
          </div>
        </div>

        <!-- 플러스 플랜 카드 (강조됨) -->
        <div :class="['c-plan-card', userPlan === 'plus' ? 'c-plan-card--active' : 'c-plan-card--highlighted']">
          <div v-if="userPlan === 'plus'" class="c-plan-card__badge c-plan-card__badge--dimmed">현재 플랜</div>
          <div v-else class="c-plan-card__badge c-plan-card__badge--primary">권장</div>
          
          <div class="c-plan-card__content">
            <header class="c-plan-card__header">
              <h2 class="c-plan-card__title">플러스</h2>
              <p class="c-plan-card__subtitle">PLUS</p>
              <div class="c-plan-card__price">
                <span class="c-plan-card__amount">{{ billingCycle === 'monthly' ? '15만원' : '150만원' }}</span>
                <span class="c-plan-card__period">/ {{ billingCycle === 'monthly' ? '월' : '년' }}</span>
              </div>
              <p v-if="billingCycle === 'yearly'" class="c-plan-card__promo">연간 결제 시 2개월 무료!</p>
              <p class="c-plan-card__desc">모든 기능을 제한없이 이용</p>
            </header>

            <ul class="c-plan-card__features">
              <li v-for="feature in plusFeatures" :key="feature" class="c-plan-card__feature">
                <CheckCircle2 class="c-plan-card__feature-icon c-plan-card__feature-icon--primary" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <button v-if="userPlan === 'plus'" disabled class="c-plan-card__btn c-plan-card__btn--disabled">현재 이용중인 플랜</button>
            <button v-else class="c-plan-card__btn c-plan-card__btn--primary">플러스로 업그레이드</button>
            <p class="c-plan-card__note">무제한 사용 적격자는 오늘날 번지 정책합니다. <a href="#">결제 전 도움말 보기</a></p>
          </div>
        </div>
      </div>

      <!-- 3. 자주 묻는 질문(FAQ) 섹션 -->
      <section class="p-plans__faq">
        <h2 class="p-plans__faq-title">자주 묻는 질문</h2>
        <div class="p-plans__faq-list">
          <div v-for="faq in faqs" :key="faq.q" class="c-faq-item">
            <p class="c-faq-item__q"><strong>Q. {{ faq.q }}</strong></p>
            <p class="c-faq-item__a">A. {{ faq.a }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { CheckCircle2 } from 'lucide-vue'

export default {
  // 컴포넌트 이름: 요금제 안내 페이지
  name: 'PlansPage',
  components: {
    CheckCircle2
  },
  data() {
    return {
      userPlan: 'basic', // 현재 사용자 플랜: null | 'basic' | 'plus'
      billingCycle: 'monthly', // 결제 주기: 'monthly' | 'yearly'
      basicFeatures: [
        '기본 시장 지수 조회',
        '일일 종목 정보 제공',
        '기본 차트 분석',
        '월 50건 AI 챗봇 이용',
        '고객 관리 (최대 100명)',
        '기본 리포트 열람',
        '이메일 고객 지원'
      ],
      plusFeatures: [
        '실시간 시장 지수 및 알림',
        '전체 종목 정보 무제한',
        '고급 차트 분석 및 테크니컬 지표',
        '무제한 AI 챗봇 이용',
        '고객 관리 무제한',
        'AI 매매 시그널 실시간 제공',
        '프리미엄 리포트 및 분석 자료',
        '테마/업종 분석 심화',
        '공시 알림 및 스크리닝',
        '전담 고객 지원 (우선 응대)',
        'API 연동 지원'
      ],
      faqs: [
        {
          q: '플랜 변경은 언제든지 가능한가요?',
          a: '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 즉시 적용됩니다.'
        },
        {
          q: '결제 방법은 무엇이 있나요?',
          a: '신용카드, 계좌이체, 무통장입금을 지원합니다.'
        },
        {
          q: '환불 정책은 어떻게 되나요?',
          a: '서비스 이용 7일 이내 전액 환불이 가능합니다. 이후에는 남은 기간에 대해 비례 환불됩니다.'
        }
      ]
    }
  },
  methods: {
    // 사용자 플랜 상태 변경 (테스트용)
    setUserState(plan, cycle) {
      this.userPlan = plan
      if (cycle) this.billingCycle = cycle
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/plans.css';
</style>
