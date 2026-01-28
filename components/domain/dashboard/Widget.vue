<template>
  <div class="c-widget" :class="{ 'c-widget--editing': isEditing }">
    <!-- 위젯 헤더: 아이콘, 제목, 삭제 버튼 -->
    <div class="c-widget__header">
      <div class="c-widget__header-inner">
        <div class="c-widget__title-wrapper">
            <component :is="icon" class="c-widget__icon" />
            <h3 class="c-widget__title">{{ title }}</h3>
        </div>
        <!-- 편집 모드일 때만 삭제 버튼 노출 -->
        <button v-if="isEditing" @click="$emit('remove')" class="c-widget__remove-btn">
            <X class="c-widget__remove-icon" />
        </button>
      </div>
    </div>

    <div class="c-widget__content">
        <!-- 1. 시장 지수 위젯 -->
        <MarketIndexWidget 
          v-if="isMarketWidget" 
          :widgetId="widgetId" 
        />

        <!-- 2. 매출 위젯 -->
        <RevenueWidget 
          v-else-if="widgetId === 'revenue'" 
        />

        <!-- 3. AI 이슈 버블 -->
        <AIIssueBubbleWidget 
          v-else-if="widgetId === 'ai-issue-bubble'" 
        />

        <!-- 4. 단순 수치 표시 위젯 (고객 수, AUM) -->
        <SimpleStatWidget 
          v-else-if="widgetId === 'client-count' || widgetId === 'aum'" 
          :widgetId="widgetId" 
        />

        <!-- 5. 주요 고객 목록 -->
        <ClientListWidget 
          v-else-if="widgetId === 'top-clients'" 
        />

         <!-- 6. 뉴스 위젯 -->
        <NewsListWidget 
          v-else-if="widgetId === 'market-news' || widgetId === 'economy-news'" 
        />

        <!-- 예외 처리: 데이터가 없는 경우 -->
        <div v-else class="c-widget__fallback">
             <span class="c-widget__fallback-text">데이터 준비중: {{ widgetId }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { X, Globe, DollarSign, Activity, Award, Wallet, Users, Briefcase, Calculator, Target, Newspaper, Building2, Sparkles, Lightbulb, Layers, FileBarChart, ClipboardList, Star, CalendarDays, PieChart } from 'lucide-vue'
import { AVAILABLE_WIDGETS, mockMarketData } from '@/utils/dashboard-data'

// 하위 컴포넌트 임포트
import MarketIndexWidget from './widgets/MarketIndexWidget.vue'
import RevenueWidget from './widgets/RevenueWidget.vue'
import AIIssueBubbleWidget from './widgets/AIIssueBubbleWidget.vue'
import SimpleStatWidget from './widgets/SimpleStatWidget.vue'
import ClientListWidget from './widgets/ClientListWidget.vue'
import NewsListWidget from './widgets/NewsListWidget.vue'

export default {
  // 컴포넌트 이름: 대시보드 위젯 컨테이너
  name: 'Widget',
  components: {
    X,
    Globe,
    DollarSign,
    Activity,
    Award,
    Wallet,
    Users,
    Briefcase,
    Calculator,
    Target,
    Newspaper,
    Building2,
    Sparkles,
    Lightbulb,
    Layers,
    FileBarChart,
    ClipboardList,
    Star,
    CalendarDays,
    PieChart,
    MarketIndexWidget,
    RevenueWidget,
    AIIssueBubbleWidget,
    SimpleStatWidget,
    ClientListWidget,
    NewsListWidget
  },
  props: {
    // 위젯 식별자 (ID)
    widgetId: {
      type: String,
      required: true
    },
    // 편집 모드 여부
    isEditing: {
      type: Boolean,
      default: false
    },
    // 위젯 크기 정보 (grid span용)
    size: {
      type: Object,
      default: () => ({ w: 1, h: 1 })
    }
  },
  computed: {
    // 위젯 설정 정보 조회
    config() {
      return AVAILABLE_WIDGETS.find(w => w.id === this.widgetId)
    },
    // 위젯 제목
    title() {
      return this.config ? this.config.title : 'Unknown Widget'
    },
    // 위젯 아이콘
    icon() {
      return this.config ? this.config.icon : null
    },
    // 시장 지수 위젯인지 여부 확인
    isMarketWidget() {
      return this.widgetId in mockMarketData
    }
  }
}
</script>

<style src="@/assets/css/components/domain/dashboard/widget.css"></style>
