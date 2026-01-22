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
                <div class="flex items-center gap-2">
                   <Sparkles class="w-5 h-5 text-blue-600" />
                   <h3 class="c-content-card__title">AI이슈포착</h3>
                   <span v-if="selectedKeyword" class="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{{ selectedKeyword }}</span>
                </div>
                <div class="c-content-card__subtitle">
                   {{ currentDate }}
                </div>
             </div>
        </div>
        <div class="c-content-card__body">
            <div class="l-analysis-grid l-analysis-grid--lg">
                <!-- Left: Bubble Chart -->
                <div class="relative">
                    <div class="flex items-center justify-center mb-4 gap-2">
                        <Button
                           v-for="tab in [{id:'domestic', label:'국내이슈포착'}, {id:'us', label:'미국이슈포착'}]"
                           :key="tab.id"
                           :variant="selectedTab === tab.id ? 'default' : 'outline'"
                           size="sm"
                           @click="changeTab(tab.id)"
                           :class="selectedTab === tab.id ? 'bg-blue-600 text-white' : ''"
                        >
                            {{ tab.label }}
                        </Button>
                    </div>

                    <div class="relative h-[500px] bg-slate-50 rounded-lg overflow-hidden">
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
                        <div class="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                             <div class="text-xs text-slate-600">
                                <div class="font-semibold">{{ currentDate }}</div>
                                <div class="text-slate-500">{{ currentTime }}</div>
                             </div>
                             <div class="w-px h-8 bg-slate-300"></div>
                             <button @click="handleRefresh" class="h-8 w-8 flex items-center justify-center hover:bg-blue-50 rounded-full">
                                <RefreshCw class="w-4 h-4 text-blue-600" />
                             </button>
                        </div>
                    </div>
                </div>

                <!-- Right: Chart and Analysis -->
                <div class="flex flex-col h-[500px] space-y-4">
                    <div class="flex-1 flex flex-col">
                         <div class="flex items-center justify-between mb-3">
                             <h3 class="font-semibold text-blue-600">
                                 {{ selectedKeyword }} 검색빈도 및 종목 누적 등락률
                             </h3>
                             <button class="text-xs text-slate-500 hover:text-slate-800">더보기 →</button>
                         </div>
                         <div class="flex-1 min-h-0 relative">
                             <LineChart v-if="chartDataConfig" :chart-data="chartDataConfig" :options="chartOptions" class="h-full w-full" />
                         </div>
                    </div>

                    <div class="flex-1 overflow-auto">
                        <h4 class="font-semibold mb-2">오늘의 주요 종목</h4>
                         <div class="space-y-2">
                            <div v-for="(stock, idx) in currentData.stocks" :key="idx" class="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                 <span class="font-medium">{{ stock.name }}</span>
                                 <span class="text-red-600 font-semibold">{{ stock.rate }}</span>
                            </div>
                         </div>
                    </div>

                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-1 flex items-center gap-2">
                            <FileText class="w-4 h-4" />
                            AI 뉴스 요약
                        </h4>
                        <h5 class="font-medium text-sm text-blue-900 mb-1">{{ currentData.news.title }}</h5>
                         <p class="text-xs text-slate-600 line-clamp-2">{{ currentData.news.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Issue List -->
    <div class="bg-white rounded-lg border shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4 text-blue-600">{{ selectedKeyword }} 관련 이슈</h3>
        <div class="space-y-4">
            <div v-for="issue in currentIssues" :key="issue.id" class="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                 <div class="flex items-start justify-between mb-2">
                     <div class="flex items-center gap-2">
                         <span class="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">{{ issue.date }}</span>
                         <h4 class="font-semibold text-lg">{{ issue.title }}</h4>
                     </div>
                     <span :class="['flex items-center text-sm font-bold', issue.trend === 'up' ? 'text-red-500' : 'text-blue-500']">
                        <component :is="issue.trend === 'up' ? 'TrendingUp' : 'TrendingDown'" class="w-4 h-4 mr-1" />
                        {{ issue.changeRate }}%
                     </span>
                 </div>
                 <p class="text-sm text-slate-700 font-medium mb-2">{{ issue.summary }}</p>
                 <p class="text-sm text-slate-500 line-clamp-2">{{ issue.newsContent }}</p>
                 <div class="mt-3 flex justify-end">
                     <Button variant="outline" size="sm" class="text-xs">
                        상세보기 <ChevronRight class="w-3 h-3 ml-1" />
                     </Button>
                 </div>
            </div>
        </div>

        <div class="flex justify-center mt-6 gap-2">
            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === 1"
                @click="currentPage--"
            >
                이전
            </Button>
            <span class="flex items-center px-4 text-sm text-slate-600">
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

