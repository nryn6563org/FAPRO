<template>
  <div class="c-widget">
    <div class="c-widget__header">
      <div class="c-widget__header-inner">
        <div class="c-widget__title-wrapper">
            <component :is="icon" class="c-widget__icon" />
            <h3 class="c-widget__title">{{ title }}</h3>
        </div>
        <button v-if="isEditing" @click="$emit('remove')" class="c-widget__remove-btn">
            <X class="u-icon-sm" />
        </button>
      </div>
    </div>
    
    <div class="c-widget__content">
        <!-- Market Widgets (Line Chart) -->
        <div v-if="isMarketWidget" class="c-widget__market-wrapper">
            <div class="c-widget__value-area">
                <p class="c-widget__value">{{ marketData.value.toLocaleString() }}</p>
                <div class="c-widget__change" :class="isPositive ? 'c-widget__change--up' : 'c-widget__change--down'">
                    <component :is="isPositive ? 'TrendingUp' : 'TrendingDown'" class="u-icon-sm" />
                    <span>{{ isPositive ? '+' : '' }}{{ marketData.change.toFixed(2) }}</span>
                    <span>({{ isPositive ? '+' : '' }}{{ marketData.changePercent.toFixed(2) }}%)</span>
                </div>
            </div>
            <div class="u-flex-1-min-h-0-relative-w-full">
                <LineChart :chart-data="lineChartData" :options="lineChartOptions" class="u-full" />
            </div>
        </div>

        <!-- Revenue Widget (Bar Chart) -->
        <div v-else-if="widgetId === 'revenue'" class="c-widget__revenue-wrapper">
            <div class="c-widget__revenue-value">
                <p class="c-widget__value">52,400,000원</p>
                <div class="c-widget__change c-widget__change--up">
                    <TrendingUp class="u-icon-sm" />
                    <span>+8.5% (전월 대비)</span>
                </div>
            </div>
            <div class="c-widget__chart-area">
                <BarChart :chart-data="revenueChartData" :options="barChartOptions" class="u-full" />
            </div>
        </div>

        <!-- AI Issue Bubble (Bubble Chart) -->
        <div v-else-if="widgetId === 'ai-issue-bubble'" class="c-widget__bubble-wrapper">
             <div class="c-widget__chart-area">
                <BubbleChart :chart-data="scatterChartData" :options="scatterChartOptions" class="u-full" />
             </div>
              <div class="c-widget__bubble-legend">
                <div v-for="(color, category) in categoryColors" :key="category" class="c-widget__bubble-legend-item">
                    <div class="c-widget__bubble-dot" :style="{ backgroundColor: color }" />
                    <span class="c-widget__bubble-label">{{ getCategoryLabel(category) }}</span>
                </div>
             </div>
        </div>

        <!-- Client Count & AUM (Simple Text) -->
        <div v-else-if="widgetId === 'client-count' || widgetId === 'aum'" class="c-widget__simple-wrapper">
             <div>
                <p class="c-widget__value">{{ widgetId === 'client-count' ? '247명' : '1,247억원' }}</p>
                <div class="c-widget__change c-widget__change--up">
                  <TrendingUp class="u-icon-sm" />
                  <span>{{ widgetId === 'client-count' ? '+12명 (이번 달)' : '+3.2% (전월 대비)' }}</span>
                </div>
            </div>
        </div>

        <!-- Top Clients (List) -->
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
                        <div :class="['c-widget__tag', 
                            client.risk === 'high' ? 'c-widget__tag--high' :
                            client.risk === 'medium' ? 'c-widget__tag--medium' :
                            'c-widget__tag--low']">
                            {{ client.risk === 'high' ? '고위험' : client.risk === 'medium' ? '중위험' : '저위험' }}
                        </div>
                    </div>
                </div>
             </div>
        </div>
        
         <!-- News Widgets (List) -->
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

        <!-- Fallback -->
        <div v-else class="c-widget__fallback">
             <span class="c-widget__fallback-text">데이터 준비중: {{ widgetId }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { AVAILABLE_WIDGETS, mockMarketData, mockClientData, mockNews, mockAIIssueData } from '@/utils/dashboard-data';
import { X, TrendingUp, TrendingDown, Globe, DollarSign, Activity, Award, Wallet, Users, Briefcase, Calculator, Target, Newspaper, Building2, Sparkles, Lightbulb, Layers, FileBarChart, ClipboardList, Star, CalendarDays, PieChart } from 'lucide-vue';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import BubbleChart from '@/components/charts/BubbleChart';

export default {
  name: "Widget",
  components: {
    LineChart, BarChart, BubbleChart,
    X, TrendingUp, TrendingDown, Globe, DollarSign, Activity, Award, Wallet, Users, Briefcase, Calculator, Target, Newspaper, Building2, Sparkles, Lightbulb, Layers, FileBarChart, ClipboardList, Star, CalendarDays, PieChart
  },
  props: {
    widgetId: {
      type: String,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    size: {
      type: Object,
      default: () => ({ w: 1, h: 1 })
    }
  },
  data() {
    return {
       mockClientData,
       mockNews,
       categoryColors: {
            tech: '#3b82f6',
            auto: '#8b5cf6',
            energy: '#10b981',
            finance: '#f59e0b',
            realestate: '#ef4444',
            defense: '#06b6d4',
            bio: '#ec4899',
       }
    };
  },
  computed: {
    config() {
       return AVAILABLE_WIDGETS.find(w => w.id === this.widgetId);
    },
    title() {
       return this.config ? this.config.title : 'Unknown Widget';
    },
    icon() {
       return this.config ? this.config.icon : null;
    },
    isMarketWidget() {
        return this.widgetId in mockMarketData;
    },
    marketData() {
        return mockMarketData[this.widgetId] || { value: 0, change: 0, changePercent: 0 };
    },
    isPositive() {
        return this.marketData.change >= 0;
    },
    lineChartData() {
        if (!this.isMarketWidget) return null;
        // Generate random specific data for the chart to look realistic
        const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}일`);
        const data = Array.from({ length: 30 }, () => Math.random() * 1000 + 2000); // Simple random
        
        const color = this.isPositive ? '#10b981' : '#ef4444';
        
        return {
            labels,
            datasets: [
                {
                    label: 'Value',
                    borderColor: color,
                    backgroundColor: (ctx) => {
                       // Gradient would need context, but simple string color opacity for now
                       // Or we leave it transparent for line only, 
                       // but Recharts Area had gradient. Vue-Chartjs v3 gradient is possible via canvas script but complex.
                       // Let's use simple semi-transparent fill for now.
                       return this.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
                    },
                    borderWidth: 2,
                    data: data,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                }
            ]
        };
    },
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
                intersect: false,
            }
        };
    },
    revenueChartData() {
        return {
            labels: Array.from({length: 12}, (_, i) => `${i+1}월`),
            datasets: [
                {
                    label: 'Revenue',
                    backgroundColor: '#1e40af',
                    data: Array.from({ length: 12 }, () => Math.random() * 50 + 30)
                }
            ]
        };
    },
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
        };
    },
    scatterChartData() {
        // Transform mockAIIssueData for Chart.js v2 Scatter
        return {
            datasets: mockAIIssueData.map(item => ({
                label: item.keyword,
                data: [{
                    x: item.x,
                    y: item.y,
                    r: Math.sqrt(item.size) // Radius logic roughly equivalent
                }],
                backgroundColor: this.categoryColors[item.category] || '#6b7280',
                borderColor: this.categoryColors[item.category] || '#6b7280',
            }))
        };
    },
    scatterChartOptions() {
        return {
            maintainAspectRatio: false,
            responsive: true,
            legend: { display: false },
             scales: {
                xAxes: [{
                     scaleLabel: { display: true, labelString: '시간 흐름 →' },
                     gridLines: { color: '#e2e8f0' }
                }],
                yAxes: [{
                     scaleLabel: { display: true, labelString: '관심도 ↑' },
                     gridLines: { color: '#e2e8f0' }
                }]
            },
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        return dataset.label;
                    }
                }
            }
        };
    }
  },
  methods: {
      getCategoryLabel(cat) {
            const labels = {
                tech: '기술',
                auto: '자동차',
                energy: '에너지',
                finance: '금융',
                realestate: '부동산',
                defense: '방산',
                bio: '바이오'
            };
            return labels[cat] || cat;
      }
  }
};
</script>
<style src="@/assets/css/components/domain/dashboard/widget.css"></style>
