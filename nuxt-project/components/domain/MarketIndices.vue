<template>
  <div class="space-y-6">
    <div class="c-page-header">
      <h2 class="c-page-header__title">시장 지수</h2>
      <p class="c-page-header__desc">실시간 국내외 주요 지수와 환율 정보</p>
    </div>

    <!-- Tabs -->
    <div class="space-y-6">
      <div class="flex space-x-1 rounded-lg bg-slate-100 p-1 w-full lg:w-auto lg:inline-flex">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'flex-1 lg:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all',
            activeTab === tab.value
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-500 hover:text-slate-900'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Domestic Indices -->
      <div v-if="activeTab === 'domestic'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="index in domesticIndices"
            :key="index.name"
            class="c-content-card p-6"
          >
            <div class="space-y-4">
              <div>
                <h3 class="text-base font-semibold">{{ index.name }}</h3>
                <p class="text-2xl font-bold mt-2">
                  {{ formatNumber(index.value) }}
                </p>
                <div 
                  class="flex items-center gap-1 mt-2"
                  :class="index.change >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  <component :is="index.change >= 0 ? 'TrendingUp' : 'TrendingDown'" class="w-4 h-4" />
                  <span class="font-medium">
                    {{ index.change >= 0 ? '+' : '' }}{{ index.change.toFixed(2) }}
                  </span>
                  <span class="text-sm">
                    ({{ index.change >= 0 ? '+' : '' }}{{ index.changePercent.toFixed(2) }}%)
                  </span>
                </div>
              </div>

              <div class="h-24 relative">
                <area-chart
                  :chart-data="getSparklineData(index)"
                  :options="sparklineOptions"
                  :gradient-color="index.change >= 0 ? '#10b981' : '#ef4444'"
                  :height="96"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Chart -->
        <div class="c-content-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold">상세 차트</h3>
            <div class="flex gap-2">
              <button
                v-for="idx in domesticIndices"
                :key="idx.name"
                @click="selectedDomestic = idx.name"
                :class="[
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  selectedDomestic === idx.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                ]"
              >
                {{ idx.name }}
              </button>
            </div>
          </div>
          <div class="h-80 relative">
             <line-chart
              :chart-data="getDetailChartData(domesticIndices.find(i => i.name === selectedDomestic))"
              :options="detailChartOptions"
              :height="320"
            />
          </div>
        </div>
      </div>

       <!-- International Indices -->
      <div v-if="activeTab === 'international'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="index in internationalIndices"
            :key="index.name"
             class="c-content-card p-6"
          >
            <div class="space-y-4">
              <div>
                <h3 class="text-base font-semibold">{{ index.name }}</h3>
                <p class="text-2xl font-bold mt-2">
                  {{ formatNumber(index.value) }}
                </p>
                <div 
                  class="flex items-center gap-1 mt-2"
                  :class="index.change >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                   <component :is="index.change >= 0 ? 'TrendingUp' : 'TrendingDown'" class="w-4 h-4" />
                  <span class="font-medium">
                    {{ index.change >= 0 ? '+' : '' }}{{ index.change.toFixed(2) }}
                  </span>
                  <span class="text-sm">
                    ({{ index.change >= 0 ? '+' : '' }}{{ index.changePercent.toFixed(2) }}%)
                  </span>
                </div>
              </div>
              <div class="h-24 relative">
                <area-chart
                  :chart-data="getSparklineData(index)"
                  :options="sparklineOptions"
                  :gradient-color="index.change >= 0 ? '#10b981' : '#ef4444'"
                  :height="96"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Chart -->
        <div class="c-content-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold">상세 차트</h3>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="idx in internationalIndices"
                :key="idx.name"
                @click="selectedInternational = idx.name"
                :class="[
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  selectedInternational === idx.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                ]"
              >
                {{ idx.name }}
              </button>
            </div>
          </div>
          <div class="h-80 relative">
            <line-chart
              :chart-data="getDetailChartData(internationalIndices.find(i => i.name === selectedInternational))"
              :options="detailChartOptions"
              :height="320"
            />
          </div>
        </div>
      </div>

       <!-- Exchange Rates -->
      <div v-if="activeTab === 'forex'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="rate in exchangeRates"
            :key="rate.name"
             class="c-content-card p-6"
          >
             <div class="space-y-4">
              <div>
                <h3 class="text-base font-semibold">{{ rate.name }}</h3>
                <p class="text-2xl font-bold mt-2">
                  {{ formatNumber(rate.value) }}
                </p>
                <div 
                  class="flex items-center gap-1 mt-2"
                  :class="rate.change >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                   <component :is="rate.change >= 0 ? 'TrendingUp' : 'TrendingDown'" class="w-4 h-4" />
                  <span class="font-medium">
                    {{ rate.change >= 0 ? '+' : '' }}{{ rate.change.toFixed(2) }}
                  </span>
                  <span class="text-sm">
                    ({{ rate.change >= 0 ? '+' : '' }}{{ rate.changePercent.toFixed(2) }}%)
                  </span>
                </div>
              </div>
              <div class="h-24 relative">
                <area-chart
                  :chart-data="getSparklineData(rate)"
                  :options="sparklineOptions"
                  :gradient-color="rate.change >= 0 ? '#10b981' : '#ef4444'"
                  :height="96"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Commodities -->
      <div v-if="activeTab === 'commodities'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="commodity in commodities"
            :key="commodity.name"
             class="c-content-card p-6"
          >
            <div class="space-y-4">
              <div>
                <h3 class="text-base font-semibold">{{ commodity.name }}</h3>
                 <p class="text-2xl font-bold mt-2">
                  {{ formatNumber(commodity.value) }}
                </p>
                <p v-if="commodity.unit" class="text-xs text-slate-500 mt-1">{{ commodity.unit }}</p>
                 <div 
                  class="flex items-center gap-1 mt-2"
                  :class="commodity.change >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                   <component :is="commodity.change >= 0 ? 'TrendingUp' : 'TrendingDown'" class="w-4 h-4" />
                  <span class="font-medium">
                    {{ commodity.change >= 0 ? '+' : '' }}{{ commodity.change.toFixed(2) }}
                  </span>
                  <span class="text-sm">
                    ({{ commodity.change >= 0 ? '+' : '' }}{{ commodity.changePercent.toFixed(2) }}%)
                  </span>
                </div>
              </div>
              <div class="h-24 relative">
                <area-chart
                  :chart-data="getSparklineData(commodity)"
                  :options="sparklineOptions"
                  :gradient-color="commodity.change >= 0 ? '#10b981' : '#ef4444'"
                  :height="96"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp, TrendingDown } from 'lucide-vue';
import AreaChart from '@/components/charts/AreaChart';
import LineChart from '@/components/charts/LineChart';

// Generate mock data helper
const generateChartData = (baseValue, volatility = 50) => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}일`,
    value: baseValue + (Math.random() - 0.5) * volatility * 2,
  }));
};

export default {
  name: 'MarketIndices',
  components: {
    TrendingUp,
    TrendingDown,
    AreaChart,
    LineChart
  },
  data() {
    return {
      activeTab: 'domestic',
      selectedDomestic: 'KOSPI',
      selectedInternational: 'S&P 500',
      tabs: [
        { value: 'domestic', label: '국내 지수' },
        { value: 'international', label: '해외 지수' },
        { value: 'forex', label: '환율' },
        { value: 'commodities', label: '원자재' }
      ],
      sparklineOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          xAxes: [{ display: false }],
          yAxes: [{ display: false, ticks: { beginAtZero: false } }]
        },
        elements: {
          point: { radius: 0 },
          line: { borderWidth: 2 }
        },
        tooltips: {
            enabled: false
        },
        layout: {
            padding: { left: 0, right: 0, top: 0, bottom: 0 }
        }
      },
      detailChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
            xAxes: [{
                gridLines: { display: false },
                ticks: { fontSize: 12 }
            }],
            yAxes: [{
                gridLines: { borderDash: [4, 4], color: '#e2e8f0' },
                ticks: { fontSize: 12 }
            }]
        },
        elements: {
            point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
            line: { tension: 0.4 }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        }
      },
      domesticIndices: [
        { name: 'KOSPI', value: 2547.82, change: 15.34, changePercent: 0.61, chartData: generateChartData(2547, 30) },
        { name: 'KOSDAQ', value: 742.15, change: -3.21, changePercent: -0.43, chartData: generateChartData(742, 15) },
        { name: 'KOSPI 200', value: 341.23, change: 2.15, changePercent: 0.63, chartData: generateChartData(341, 8) },
      ],
      internationalIndices: [
        { name: 'S&P 500', value: 4783.45, change: 23.45, changePercent: 0.49, chartData: generateChartData(4783, 60) },
        { name: 'NASDAQ', value: 15043.97, change: 112.34, changePercent: 0.75, chartData: generateChartData(15043, 200) },
        { name: 'DOW JONES', value: 37863.22, change: -45.12, changePercent: -0.12, chartData: generateChartData(37863, 150) },
        { name: 'NIKKEI 225', value: 35577.11, change: -234.56, changePercent: -0.65, chartData: generateChartData(35577, 300) },
        { name: 'HANG SENG', value: 16034.32, change: 45.23, changePercent: 0.28, chartData: generateChartData(16034, 150) },
        { name: 'FTSE 100', value: 7672.45, change: 18.90, changePercent: 0.25, chartData: generateChartData(7672, 80) },
      ],
      exchangeRates: [
        { name: 'USD/KRW', value: 1334.50, change: 5.30, changePercent: 0.40, chartData: generateChartData(1334, 10) },
        { name: 'JPY/KRW', value: 905.23, change: -2.15, changePercent: -0.24, chartData: generateChartData(905, 8) },
        { name: 'EUR/KRW', value: 1452.80, change: 8.45, changePercent: 0.58, chartData: generateChartData(1452, 12) },
        { name: 'CNY/KRW', value: 183.67, change: 0.92, changePercent: 0.50, chartData: generateChartData(183, 3) },
      ],
      commodities: [
        { name: 'WTI 유가', value: 72.45, change: 1.23, changePercent: 1.73, unit: 'USD/barrel', chartData: generateChartData(72, 5) },
        { name: '금', value: 2043.50, change: -12.30, changePercent: -0.60, unit: 'USD/oz', chartData: generateChartData(2043, 20) },
        { name: '은', value: 23.45, change: 0.34, changePercent: 1.47, unit: 'USD/oz', chartData: generateChartData(23, 1) },
        { name: '구리', value: 3.82, change: -0.05, changePercent: -1.29, unit: 'USD/lb', chartData: generateChartData(3.8, 0.1) },
      ]
    };
  },
  methods: {
    formatNumber(val) {
      return val.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    getSparklineData(item) {
        if (!item || !item.chartData) return {};
        const labels = item.chartData.map(d => d.date);
        const data = item.chartData.map(d => d.value);
        const color = item.change >= 0 ? '#10b981' : '#ef4444';
        
        return {
            labels,
            datasets: [
                {
                    data,
                    borderColor: color,
                    borderWidth: 2,
                    backgroundColor: null, // Initial background, AreaChart mixin handles gradient
                    fill: true,
                    pointRadius: 0
                }
            ]
        };
    },
    getDetailChartData(item) {
        if (!item || !item.chartData) return {};
        const labels = item.chartData.map(d => d.date);
        const data = item.chartData.map(d => d.value);
        
        return {
            labels,
            datasets: [
                {
                    label: item.name,
                    data,
                    borderColor: '#1e40af', // Blue-800
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }
            ]
        };
    }
  }
};
</script>
