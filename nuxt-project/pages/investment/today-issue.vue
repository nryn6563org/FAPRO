<template>
  <div class="p-investment">
    <div class="p-investment__header">
      <h2 class="p-investment__title">오늘의 이슈</h2>
      <p class="p-investment__desc">실시간으로 업데이트되는 주요 시장 이슈</p>
    </div>

    <!-- AI Issue Bubble Section -->
    <div class="c-content-card">
        <div class="c-content-card__header">
             <div class="c-content-card__header-content">
                <div class="u-flex-center-gap-2">
                   <Sparkles class="u-icon-md-blue" />
                   <h3 class="c-content-card__title">AI이슈포착</h3>
                   <span v-if="selectedKeyword" class="c-issue-keyword-badge">{{ selectedKeyword }}</span>
                </div>
                <div class="c-content-card__subtitle">
                   {{ currentDate }}
                </div>
             </div>
        </div>
        <div class="c-content-card__body">
            <div class="l-analysis-grid l-analysis-grid--lg">
                <!-- Left: Bubble Chart -->
                <div class="c-issue-bubble-section">
                    <div class="c-issue-bubble-tabs">
                        <Button
                           v-for="tab in [{id:'domestic', label:'국내이슈포착'}, {id:'us', label:'미국이슈포착'}]"
                           :key="tab.id"
                           :variant="selectedTab === tab.id ? 'default' : 'outline'"
                           size="sm"
                           @click="changeTab(tab.id)"
                           :class="selectedTab === tab.id ? 'c-tab-btn--active' : ''"
                        >
                            {{ tab.label }}
                        </Button>
                    </div>

                    <div class="c-issue-bubble-chart">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                            <g v-for="(bubble, idx) in currentBubbles" 
                               :key="idx" 
                               @click="handleKeywordChange(bubble.keyword)"
                               class="cursor-pointer hover:opacity-100 transition-opacity"
                               :style="{ opacity: selectedKeyword === bubble.keyword ? 1 : 0.85 }"
                            >
                                <circle
                                    :cx="bubble.x"
                                    :cy="bubble.y"
                                    :r="bubble.size / 14"
                                    :fill="bubble.color"
                                    :stroke="selectedKeyword === bubble.keyword ? '#1e40af' : 'none'"
                                    :stroke-width="selectedKeyword === bubble.keyword ? 0.5 : 0"
                                />
                                <text
                                    :x="bubble.x"
                                    :y="bubble.y"
                                    text-anchor="middle"
                                    dominant-baseline="middle"
                                    fill="white"
                                    :font-size="bubble.size / 24"
                                    font-weight="600"
                                    class="pointer-events-none select-none"
                                >
                                    {{ bubble.keyword }}
                                </text>
                            </g>
                        </svg>

                        <!-- Time & Refresh -->
                        <div class="c-issue-bubble-legend">
                             <div class="u-text-xs u-text-slate-600">
                                <div class="u-font-semibold">{{ currentDate }}</div>
                                <div class="u-text-slate-500">{{ currentTime }}</div>
                             </div>
                             <div class="u-divider-vertical"></div>
                             <button @click="handleRefresh" class="u-w-8 u-h-8 u-flex-center justify-center hover:bg-blue-50 rounded-full">
                                <RefreshCw class="u-icon-sm u-text-blue-600" />
                             </button>
                        </div>
                    </div>
                </div>

                <!-- Right: Chart and Analysis -->
                <div class="c-issue-right-panel">
                    <div class="u-flex-1 flex flex-col">
                         <div class="c-issue-chart-header">
                             <h3 class="u-font-semibold u-text-blue-600">
                                 {{ selectedKeyword }} 검색빈도 및 종목 누적 등락률
                             </h3>
                             <button class="u-text-xs-slate-500 u-hover-text-slate-800">더보기 →</button>
                         </div>
                         <div class="c-issue-chart-area">
                             <LineChart v-if="chartDataConfig" :chart-data="chartDataConfig" :options="chartOptions" class="u-full" />
                         </div>
                    </div>

                    <div class="c-issue-stock-section">
                        <h4 class="font-semibold mb-2">오늘의 주요 종목</h4>
                         <div class="c-issue-stock-list">
                            <div v-for="(stock, idx) in currentData.stocks" :key="idx" class="c-issue-stock-item">
                                 <span class="u-font-medium">{{ stock.name }}</span>
                                 <span class="u-text-issue-up">{{ stock.rate }}</span>
                            </div>
                         </div>
                    </div>

                    <div class="c-issue-news-box">
                        <h4 class="u-font-semibold u-text-blue-800 u-mb-1 u-flex-center-gap-2">
                            <FileText class="u-icon-sm" />
                            AI 뉴스 요약
                        </h4>
                        <h5 class="u-font-medium u-text-sm u-text-blue-900 u-mb-1">{{ currentData.news.title }}</h5>
                         <p class="u-text-summary">{{ currentData.news.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Issue List -->
    <div class="c-issue-list-card">
        <h3 class="c-issue-list-title">{{ selectedKeyword }} 관련 이슈</h3>
        <div class="space-y-4">
            <div v-for="issue in currentIssues" :key="issue.id" class="c-issue-list-item">
                 <div class="c-issue-list-item__header">
                     <div class="u-flex-center-gap-2">
                         <span class="c-issue-list-item__date">{{ issue.date }}</span>
                         <h4 class="font-semibold text-lg">{{ issue.title }}</h4>
                     </div>
                     <span :class="['u-flex-center u-text-sm u-font-bold', issue.trend === 'up' ? 'u-text-red-500' : 'u-text-blue-500']">
                        <component :is="issue.trend === 'up' ? 'TrendingUp' : 'TrendingDown'" class="u-icon-sm u-mr-1" />
                        {{ issue.changeRate }}%
                     </span>
                 </div>
                 <p class="u-text-sm u-text-slate-700 u-font-medium u-mb-2">{{ issue.summary }}</p>
                 <p class="u-text-summary">{{ issue.newsContent }}</p>
                 <div class="mt-3 flex justify-end">
                     <Button variant="outline" size="sm" class="u-text-xs">
                        상세보기 <ChevronRight class="u-icon-xs u-ml-1" />
                     </Button>
                 </div>
            </div>
        </div>

        <div class="c-issue-pagination">
            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === 1"
                @click="currentPage--"
            >
                이전
            </Button>
            <span class="u-flex-center u-px-4 u-text-sm u-text-slate-600">
                {{ currentPage }} / {{ totalPages }}
            </span>
             <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
            >
                다음
            </Button>
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
<style src="@/assets/css/pages/investment.css"></style>

