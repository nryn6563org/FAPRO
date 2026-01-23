<template>
  <div class="p-today-issue">
    <div class="c-page-header">
      <h2 class="c-page-header__title">오늘의 이슈</h2>
      <p class="c-page-header__desc">실시간으로 업데이트되는 시장 주요 이슈</p>
    </div>

    <!-- AI Issue Capture Section -->
    <div class="p-today-issue__capture-card l-section-gap">
      <div class="p-today-issue__capture-header">
        <div class="p-today-issue__capture-title-group">
          <Sparkles class="p-today-issue__capture-icon" />
          <h3 class="p-today-issue__capture-title">AI 이슈 포착</h3>
          <span v-if="selectedKeyword" class="p-today-issue__keyword-tag">{{ selectedKeyword }}</span>
        </div>
        <div class="p-today-issue__metadata">
          {{ currentDate }}
        </div>
      </div>

      <div class="p-today-issue__capture-layout">
        <!-- Left: Bubble Chart Visual -->
        <div class="p-today-issue__bubble-panel">
          <div class="p-today-issue__bubble-nav l-tab-gap">
             <Button
                v-for="tab in [{id:'domestic', label:'국내'}, {id:'us', label:'미국'}]"
                :key="tab.id"
                @click="changeTab(tab.id)"
                :class="selectedTab === tab.id ? 'investment-tab-trigger--active' : 'investment-tab-trigger--inactive'"
             >
                {{ tab.label }} 이슈
             </Button>
          </div>

          <div class="p-today-issue__bubble-field">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <g
                v-for="(bubble, idx) in currentBubbles" 
                :key="idx" 
                @click="handleKeywordChange(bubble.keyword)"
                class="c-bubble-group"
                :style="{ opacity: selectedKeyword === bubble.keyword ? 1 : 0.8 }"
              >
                <circle
                  :cx="bubble.x"
                  :cy="bubble.y"
                  :r="bubble.size / 14"
                  :fill="bubble.color"
                  :stroke="selectedKeyword === bubble.keyword ? '#2563eb' : 'none'"
                  stroke-width="0.5"
                />
                <text
                  :x="bubble.x"
                  :y="bubble.y"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  fill="white"
                  :font-size="bubble.size / 24"
                  font-weight="700"
                  class="p-today-issue__bubble-text"
                >
                  {{ bubble.keyword }}
                </text>
              </g>
            </svg>

            <div class="p-today-issue__legend">
              <div class="p-today-issue__timestamp">
                <span class="p-today-issue__timestamp-date">{{ currentDate }}</span>
                <span class="p-today-issue__timestamp-time">{{ currentTime }} 기준</span>
              </div>
              <button @click="handleRefresh" class="p-today-issue__refresh-btn" title="새로고침">
                <RefreshCw class="p-today-issue__refresh-icon" />
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Detail Panel -->
        <div class="p-today-issue__detail-panel">
          <div class="p-today-issue__chart-card">
            <div class="p-today-issue__chart-header">
              <span class="p-today-issue__chart-label">{{ selectedKeyword }} 트렌드 분석</span>
              <button class="p-today-issue__chart-link">데이터 상세보기 →</button>
            </div>
            <div class="p-today-issue__chart-canvas">
               <LineChart v-if="chartDataConfig" :chart-data="chartDataConfig" :options="chartOptions" />
            </div>
          </div>

          <div class="p-today-issue__stock-section">
            <h4 class="p-today-issue__section-title">실시간 연관 종목</h4>
            <div class="p-today-issue__stock-grid">
              <div v-for="(stock, idx) in currentData.stocks" :key="idx" class="p-today-issue__stock-item">
                <span>{{ stock.name }}</span>
                <span class="indicator--positive">{{ stock.rate }}</span>
              </div>
            </div>
          </div>

          <div class="p-today-issue__briefing-card">
            <h4 class="p-today-issue__briefing-title">
              <FileText class="p-today-issue__briefing-icon" />
              AI 실시간 브리핑
            </h4>
            <div class="p-today-issue__briefing-headline">{{ currentData.news.title }}</div>
            <p class="p-today-issue__briefing-content">{{ currentData.news.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom: Issue Feed Section -->
    <div class="c-content-card p-today-issue__feed-card">
      <h3 class="p-today-issue__feed-title l-tab-gap">
        <span>{{ selectedKeyword }} 히스토리</span>
      </h3>
      <div class="p-today-issue__feed-list">
        <div v-for="issue in currentIssues" :key="issue.id" class="p-today-issue__feed-item group">
          <div class="p-today-issue__feed-item-header">
            <div class="p-today-issue__feed-item-meta">
              <span class="p-today-issue__feed-item-date">{{ issue.date }}</span>
              <h4 class="p-today-issue__feed-item-title">{{ issue.title }}</h4>
            </div>
            <div class="p-today-issue__feed-item-trend" :class="issue.trend === 'up' ? 'indicator--positive' : 'indicator--negative'">
              <component :is="issue.trend === 'up' ? 'TrendingUp' : 'TrendingDown'" class="p-today-issue__trend-icon" />
              <span>{{ issue.changeRate }}%</span>
            </div>
          </div>
          <div class="p-today-issue__feed-item-summary">{{ issue.summary }}</div>
          <p class="p-today-issue__feed-item-desc">{{ issue.newsContent }}</p>
          <div class="p-today-issue__feed-item-actions">
            <Button variant="outline" size="sm" class="p-today-issue__feed-btn">
              이슈 분석 리포트 <ChevronRight class="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="p-today-issue__pagination">
        <Button variant="outline" size="sm" :disabled="currentPage === 1" @click="currentPage--" class="p-today-issue__page-btn">이전</Button>
        <span class="p-today-issue__page-info">{{ currentPage }} / {{ totalPages }}</span>
        <Button variant="outline" size="sm" :disabled="currentPage === totalPages" @click="currentPage++" class="p-today-issue__page-btn">다음</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { Sparkles, RefreshCw, TrendingUp, TrendingDown, ChevronRight, FileText } from 'lucide-vue';
import LineChart from '@/components/charts/LineChart';

// Data from original file (Simplified)
const aiBubbles = [
  { keyword: '원전', size: 120, color: 'rgb(244, 67, 54)', x: 35, y: 45 },
  { keyword: '우주항공', size: 100, color: 'rgb(244, 67, 54)', x: 55, y: 45 },
  { keyword: '화장품', size: 90, color: 'rgb(244, 67, 54)', x: 25, y: 30 },
  { keyword: '전선', size: 85, color: 'rgb(244, 67, 54)', x: 45, y: 30 },
  { keyword: 'STO', size: 75, color: 'rgb(244, 67, 54)', x: 20, y: 50 },
  { keyword: '방산', size: 70, color: 'rgb(244, 67, 54)', x: 25, y: 60 },
  { keyword: '전력설비', size: 75, color: 'rgb(244, 67, 54)', x: 45, y: 60 },
  { keyword: '특목', size: 60, color: 'rgb(255, 138, 128)', x: 65, y: 30 },
  { keyword: '반도체', size: 55, color: 'rgb(255, 138, 128)', x: 70, y: 45 },
  { keyword: '바이오', size: 50, color: 'rgb(255, 205, 210)', x: 30, y: 70 },
  { keyword: '자동차', size: 55, color: 'rgb(255, 205, 210)', x: 50, y: 15 },
  { keyword: '제약', size: 45, color: 'rgb(255, 205, 210)', x: 60, y: 15 },
  { keyword: '금융', size: 40, color: 'rgb(255, 205, 210)', x: 40, y: 15 },
  { keyword: '보험', size: 35, color: 'rgb(255, 205, 210)', x: 15, y: 15 },
  { keyword: '정보통신', size: 25, color: 'rgb(99, 180, 255)', x: 25, y: 75 },
  { keyword: '엔터', size: 25, color: 'rgb(99, 180, 255)', x: 18, y: 40 },
  { keyword: '유통', size: 18, color: 'rgb(171, 215, 255)', x: 12, y: 35 },
  { keyword: '통신', size: 18, color: 'rgb(171, 215, 255)', x: 10, y: 55 },
];

const usAiBubbles = [
  { keyword: '금시장', size: 130, color: 'rgb(244, 67, 54)', x: 40, y: 50 },
  { keyword: '시장진입', size: 110, color: 'rgb(244, 67, 54)', x: 60, y: 50 },
  { keyword: '렌탈수요', size: 85, color: 'rgb(99, 135, 220)', x: 35, y: 25 },
  { keyword: '주택시장', size: 80, color: 'rgb(99, 135, 220)', x: 20, y: 40 },
  { keyword: 'AI전력', size: 70, color: 'rgb(99, 135, 220)', x: 70, y: 35 },
  { keyword: '클라우드', size: 65, color: 'rgb(99, 135, 220)', x: 15, y: 60 },
  { keyword: '자율주행', size: 42, color: 'rgb(99, 135, 220)', x: 70, y: 70 },
];

const keywordDataMap = {
  '원전': {
    chartData: [
      { date: '12/22', value: 18, 보성파워텍: 22, 우리기술: 19 },
      { date: '12/29', value: 21, 보성파워텍: 24, 우리기술: 20 },
      { date: '01/06', value: 24, 보성파워텍: 28, 우리기술: 23 },
      { date: '01/12', value: 48, 보성파워텍: 58, 우리기술: 45 },
      { date: '01/16', value: 84, 보성파워텍: 93, 우리기술: 78 },
    ],
    stocks: [
      { name: '보성파워텍', rate: '↑30%' },
      { name: '우리기술', rate: '↑29.97%' },
      { name: '일진파워', rate: '↑29.96%' },
    ],
    news: {
      title: '한-스웨덴, SMR 등 원전 개발·연구 협력',
      content: '우리나라와 스웨덴이 소형모듈원자로(SMR) 등 원전 개발·연구 협력 가능성을 타진하기로 했다.'
    },
    relatedIssues: [1, 2, 3]
  },
  // Add other mock data logic fallback
  'default': {
     chartData: [
        { date: '12/22', value: 20 }, { date: '12/29', value: 25 }, { date: '01/06', value: 30 },
        { date: '01/12', value: 45 }, { date: '01/16', value: 60 }
     ],
     stocks: [
        { name: '관련주 A', rate: '↑10%' }, { name: '관련주 B', rate: '↑5%' }
     ],
     news: {
         title: '관련 뉴스 제목입니다', content: '관련 뉴스 내용입니다...'
     },
     relatedIssues: [1]
  }
};

const allIssues = [
  {
    id: 1,
    date: '01/20',
    title: '한-스웨덴 SMR 공동개발 MOU 체결',
    trend: 'up',
    changeRate: 18.5,
    summary: '우리나라와 스웨덴이 소형모듈원자로(SMR) 협력 가능성 타진.',
    newsContent: '상세 내용...'
  },
  {
    id: 2,
    date: '01/19',
    title: '체코 원전 수주 확정',
    trend: 'up',
    changeRate: 22.3,
    summary: '체코 원전 수주 확정 소식에 관련 기업 주가 급등.',
    newsContent: '상세 내용...'
  },
  {
      id: 3,
      date: '01/18',
      title: 'SMR 개발 가속화',
      trend: 'up',
      changeRate: 16.2,
      summary: '원전 생태계 확장 기대.',
      newsContent: '상세 내용...'
  }
];

export default {
  name: "TodayIssue",
  components: {
    Button,
    Sparkles, RefreshCw, TrendingUp, TrendingDown, ChevronRight, FileText,
    LineChart
  },
  data() {
    return {
      selectedKeyword: '원전',
      currentPage: 1,
      lastUpdateTime: new Date(),
      selectedTab: 'domestic',
      itemsPerPage: 5,
      aiBubbles,
      usAiBubbles
    };
  },
  computed: {
    currentBubbles() {
        return this.selectedTab === 'domestic' ? this.aiBubbles : this.usAiBubbles;
    },
    currentData() {
        return keywordDataMap[this.selectedKeyword] || keywordDataMap['default'];
    },
    filteredIssues() {
        const issues = this.currentData.relatedIssues 
            ? allIssues.filter(issue => this.currentData.relatedIssues.includes(issue.id))
            : allIssues;
        return issues;
    },
    totalPages() {
        return Math.ceil(this.filteredIssues.length / this.itemsPerPage);
    },
    currentIssues() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredIssues.slice(start, start + this.itemsPerPage);
    },
    currentDate() {
        return this.lastUpdateTime.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    },
    currentTime() {
         return this.lastUpdateTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    },
    chartDataConfig() {
        if (!this.currentData.chartData) return null;
        // Transform data for chart.js
        // Assuming value is the main metric
        return {
            labels: this.currentData.chartData.map(d => d.date),
            datasets: [
                {
                    label: '검색빈도',
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    data: this.currentData.chartData.map(d => d.value),
                    fill: false
                }
            ]
        };
    },
    chartOptions() {
        return {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{ gridLines: { display: false } }],
                yAxes: [{ gridLines: { borderDash: [2, 2] } }]
            },
            legend: { display: false }
        };
    }
  },
  methods: {
    handleKeywordChange(keyword) {
        this.selectedKeyword = keyword;
        this.currentPage = 1;
    },
    handleRefresh() {
        this.lastUpdateTime = new Date();
    },
    changeTab(tab) {
        this.selectedTab = tab;
        this.selectedKeyword = tab === 'domestic' ? '원전' : '금시장';
        this.currentPage = 1;
    }
  }
};
</script>
<style src="@/assets/css/pages/today-issue.css"></style>

