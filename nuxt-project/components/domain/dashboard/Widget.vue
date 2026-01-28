<!--
  위젯 컨테이너 컴포넌트 (Widget)
  - 대시보드의 각 그리드 아이템 내부에 표시되는 실제 콘텐츠입니다.
  - widgetId에 따라 다른 유형의 차트나 데이터를 렌더링합니다.
  - (시장 지수, 매출Bar, AI 이슈Bubble, 고객 리스트 등 다양한 위젯 타입 지원)
-->
<template>
  <div class="c-widget">
    <!-- 위젯 헤더: 아이콘, 제목, 삭제 버튼 -->
    <div class="c-widget__header">
      <div class="c-widget__header-inner">
        <div class="c-widget__title-wrapper">
            <component :is="icon" class="c-widget__icon" />
            <h3 class="c-widget__title">{{ title }}</h3>
        </div>
        <!-- 편집 모드일 때만 삭제 버튼 노출 -->
        <button v-if="isEditing" @click="$emit('remove')" class="c-widget__remove-btn">
            <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="c-widget__content">
        <!-- 1. 시장 지수 위젯 (값 + 라인 차트) -->
        <div v-if="isMarketWidget" class="c-widget__market-wrapper">
            <!-- 좌측: 현재가 및 등락률 -->
            <div class="c-widget__value-area">
                <p class="c-widget__value">{{ marketData.value.toLocaleString() }}</p>
                <div class="c-widget__change" :class="isPositive ? 'c-widget__change--up' : 'c-widget__change--down'">
                    <component :is="isPositive ? 'TrendingUp' : 'TrendingDown'" class="w-4 h-4" />
                    <span>{{ isPositive ? '+' : '' }}{{ marketData.change.toFixed(2) }}</span>
                    <span>({{ isPositive ? '+' : '' }}{{ marketData.changePercent.toFixed(2) }}%)</span>
                </div>
            </div>
            <!-- 우측: 미니 라인 차트 -->
            <div class="c-widget__chart-container">
                <LineChart :chart-data="lineChartData" :options="lineChartOptions" class="w-full h-full" />
            </div>
        </div>

        <!-- 2. 매출 위젯 (막대 차트) -->
        <div v-else-if="widgetId === 'revenue'" class="c-widget__revenue-wrapper">
            <div class="c-widget__revenue-value">
                <p class="c-widget__value">52,400,000원</p>
                <div class="c-widget__change c-widget__change--up">
                    <TrendingUp class="w-4 h-4" />
                    <span>+8.5% (전월 대비)</span>
                </div>
            </div>
            <div class="c-widget__chart-area">
                <BarChart :chart-data="revenueChartData" :options="barChartOptions" class="w-full h-full" />
            </div>
        </div>

        <!-- 3. AI 이슈 버블 (버블 차트) -->
        <div v-else-if="widgetId === 'ai-issue-bubble'" class="c-widget__bubble-wrapper">
             <div class="c-widget__chart-area">
                <BubbleChart :chart-data="scatterChartData" :options="scatterChartOptions" class="w-full h-full" />
             </div>
             <!-- 범례 -->
              <div class="c-widget__bubble-legend">
                <div v-for="(color, category) in categoryColors" :key="category" class="c-widget__bubble-legend-item">
                    <div class="c-widget__bubble-dot" :style="{ backgroundColor: color }" />
                    <span class="c-widget__bubble-label">{{ getCategoryLabel(category) }}</span>
                </div>
             </div>
        </div>

        <!-- 4. 단순 수치 표시 위젯 (고객 수, AUM) -->
        <div v-else-if="widgetId === 'client-count' || widgetId === 'aum'" class="c-widget__simple-wrapper">
             <div>
                <p class="c-widget__value">{{ widgetId === 'client-count' ? '247명' : '1,247억원' }}</p>
                <div class="c-widget__change c-widget__change--up">
                  <TrendingUp class="w-4 h-4" />
                  <span>{{ widgetId === 'client-count' ? '+12명 (이번 달)' : '+3.2% (전월 대비)' }}</span>
                </div>
            </div>
        </div>

        <!-- 5. 주요 고객 목록 (리스트 형태) -->
        <div v-else-if="widgetId === 'top-clients'" class="c-widget__list-wrapper">
             <div class="c-widget__list">
                <div v-for="(client, idx) in mockClientData" :key="idx" class="c-widget__list-item">
                    <div class="c-widget__client-info">
                        <div class="c-widget__avatar">
                            {{ client.name[0] }}
                        </div>
                        <div>
                           <p class="c-widget__client-name">{{ client.name }}</p>
                           <p class="c-widget__client-sub">{{ (client.aum / 100000000).toFixed(0) }}억원</p>
                        </div>
                    </div>
                    <div class="c-widget__list-right">
                        <p class="c-widget__client-name">{{ (client.revenue / 10000).toFixed(0) }}만원</p>
                        <!-- 위험도 태그 -->
                        <div
 :class="['c-widget__tag',
                            client.risk === 'high' ? 'c-widget__tag--high' :
                            client.risk === 'medium' ? 'c-widget__tag--medium' :
                            'c-widget__tag--low']">
                            {{ client.risk === 'high' ? '고위험' : client.risk === 'medium' ? '중위험' : '저위험' }}
                        </div>
                    </div>
                </div>
             </div>
        </div>

         <!-- 6. 뉴스 위젯 (텍스트 목록) -->
        <div v-else-if="widgetId === 'market-news' || widgetId === 'economy-news'" class="c-widget__news-wrapper">
            <div class="c-widget__news-list">
               <div v-for="(news, idx) in mockNews" :key="idx" class="c-widget__news-item">
                  <p class="c-widget__news-title">{{ news.title }}</p>
                  <div class="c-widget__news-meta">
                     <span class="c-widget__news-source">{{ news.source }}</span>
                     <span class="c-widget__news-divider">•</span>
                     <span class="c-widget__news-time">{{ news.time }}</span>
                  </div>
               </div>
            </div>
        </div>

        <!-- 예외 처리: 데이터가 없는 경우 -->
        <div v-else class="c-widget__fallback">
             <span class="c-widget__fallback-text">데이터 준비중: {{ widgetId }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { X, TrendingUp, TrendingDown, Globe, DollarSign, Activity, Award, Wallet, Users, Briefcase, Calculator, Target, Newspaper, Building2, Sparkles, Lightbulb, Layers, FileBarChart, ClipboardList, Star, CalendarDays, PieChart } from 'lucide-vue'
import { AVAILABLE_WIDGETS, mockMarketData, mockClientData, mockNews, mockAIIssueData } from '@/utils/dashboard-data'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import BubbleChart from '@/components/charts/BubbleChart'

export default {
  // 컴포넌트 이름: 대시보드 위젯 컨테이너
  name: 'Widget',
  components: {
    LineChart,
    BarChart,
    BubbleChart,
    X,
    TrendingUp,
    TrendingDown,
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
    PieChart
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
  data() {
    return {
      mockClientData,
      mockNews,
      // 카테고리별 색상 매핑 (AI 이슈 버블 차트용)
      categoryColors: {
        tech: '#3b82f6',     // 기술
        auto: '#8b5cf6',     // 자동차
        energy: '#10b981',   // 에너지
        finance: '#f59e0b',  // 금융
        realestate: '#ef4444', // 부동산
        defense: '#06b6d4',  // 방산
        bio: '#ec4899'       // 바이오
      }
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
    },
    // 시장 데이터 매핑
    marketData() {
      return mockMarketData[this.widgetId] || { value: 0, change: 0, changePercent: 0 }
    },
    // 상승 여부 (양수일 경우 true)
    isPositive() {
      return this.marketData.change >= 0
    },
    /**
     * 라인 차트 데이터 구성 (지수용)
     */
    lineChartData() {
      if (!this.isMarketWidget) { return null }
      
      // 데모를 위한 랜덤 데이터 생성
      const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}일`)
      const data = Array.from({ length: 30 }, () => Math.random() * 1000 + 2000)

      // 상승/하락 색상 결정
      const color = this.isPositive ? '#10b981' : '#ef4444'

      return {
        labels,
        datasets: [
          {
            label: 'Value',
            borderColor: color,
            backgroundColor: () => {
              // 배경색을 반투명하게 설정
              return this.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
            },
            borderWidth: 2,
            data,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 4
          }
        ]
      }
    },
    // 라인 차트 옵션 (축 및 그리드 숨김으로 미니멀하게 표시)
    lineChartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      }
    },
    // 매출 막대 차트 데이터 구성
    revenueChartData() {
      return {
        labels: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
        datasets: [
          {
            label: 'Revenue',
            backgroundColor: '#1e40af',
            data: Array.from({ length: 12 }, () => Math.random() * 50 + 30)
          }
        ]
      }
    },
    // 막대 차트 옵션
    barChartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: false },
        scales: {
          xAxes: [{
            gridLines: { display: false }
          }],
          yAxes: [{
            ticks: { display: false },
            gridLines: { display: false }
          }]
        }
      }
    },
    // AI 이슈 버블 차트 데이터 구성
    scatterChartData() {
      return {
        datasets: mockAIIssueData.map(item => ({
          label: item.keyword,
          data: [{
            x: item.x,
            y: item.y,
            r: Math.sqrt(item.size) // 버블 크기 계산
          }],
          backgroundColor: this.categoryColors[item.category] || '#6b7280',
          borderColor: this.categoryColors[item.category] || '#6b7280'
        }))
      }
    },
    // 버블 차트 옵션
    scatterChartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: false },
        scales: {
          xAxes: [{
            scaleLabel: { display: true, labelString: '시간 흐름 →' },
            gridLines: { color: '#717478' }
          }],
          yAxes: [{
            scaleLabel: { display: true, labelString: '관심도 ↑' },
            gridLines: { color: '#717478' }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex]
              return dataset.label
            }
          }
        }
      }
    }
  },
  methods: {
    // 카테고리 영문명을 한글로 변환
    getCategoryLabel(cat) {
      const labels = {
        tech: '기술',
        auto: '자동차',
        energy: '에너지',
        finance: '금융',
        realestate: '부동산',
        defense: '방산',
        bio: '바이오'
      }
      return labels[cat] || cat
    }
  }
}
</script>
<!-- 위젯 스타일 사용 -->
<style src="@/assets/css/components/domain/dashboard/widget.css"></style>
