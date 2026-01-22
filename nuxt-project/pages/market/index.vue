<template>
  <div class="p-market">
    <div class="p-market__header">
        <h2 class="p-market__title">시장 지수</h2>
        <p class="p-market__desc">실시간 국내외 주요 지수와 환율 정보</p>
    </div>

    <!-- Tabs Container -->
    <div class="l-p-market__stack">
        <!-- Tabs Header -->
        <div class="p-market__tabs">
            <button 
                v-for="tab in tabs" 
                :key="tab.value"
                @click="activeTab = tab.value"
                :class="['p-market__tab-btn', activeTab === tab.value ? 'p-market__tab-btn--active' : '']"
            >
                {{ tab.label }}
            </button>
        </div>

        <!-- Domestic Content -->
        <div v-if="activeTab === 'domestic'" class="l-p-market__stack">
             <div class="p-market__indices-grid">
                <IndexCard v-for="index in domesticIndices" :key="index.name" v-bind="index" />
             </div>
             
             <!-- Detailed Chart -->
             <div class="c-market-chart">
                 <div class="c-market-chart__header">
                     <h3 class="c-market-chart__title">상세 차트</h3>
                     <div class="c-market-chart__actions">
                         <button 
                             v-for="idx in domesticIndices" 
                             :key="idx.name"
                             @click="selectedDomestic = idx.name"
                             :class="['c-market-chart__action-btn', selectedDomestic === idx.name ? 'c-market-chart__action-btn--active' : '']"
                         >
                            {{ idx.name }}
                         </button>
                     </div>
                 </div>
                 <div class="c-market-chart__body">
                     <LineChart v-if="selectedDomesticData" :chart-data="getDetailedChartData(selectedDomesticData)" :options="detailedChartOptions" class="c-market-chart__canvas" />
                 </div>
             </div>
        </div>

        <!-- International Content -->
        <div v-if="activeTab === 'international'" class="l-p-market__stack">
             <div class="p-market__indices-grid--international">
                <IndexCard v-for="index in internationalIndices" :key="index.name" v-bind="index" />
             </div>
             
             <!-- Detailed Chart -->
             <div class="c-market-chart">
                 <div class="c-market-chart__header">
                     <h3 class="c-market-chart__title">상세 차트</h3>
                     <div class="c-market-chart__actions">
                         <button 
                             v-for="idx in internationalIndices" 
                             :key="idx.name"
                             @click="selectedInternational = idx.name"
                             :class="['c-market-chart__action-btn', selectedInternational === idx.name ? 'c-market-chart__action-btn--active' : '']"
                         >
                            {{ idx.name }}
                         </button>
                     </div>
                 </div>
                 <div class="c-market-chart__body">
                       <LineChart v-if="selectedInternationalData" :chart-data="getDetailedChartData(selectedInternationalData)" :options="detailedChartOptions" class="c-market-chart__canvas" />
                 </div>
             </div>
        </div>

        <!-- Forex Content -->
        <div v-if="activeTab === 'forex'" class="l-p-market__stack">
             <div class="p-market__indices-grid--forex">
                <IndexCard v-for="rate in exchangeRates" :key="rate.name" v-bind="rate" />
             </div>
        </div>

        <!-- Commodities Content -->
        <div v-if="activeTab === 'commodities'" class="l-p-market__stack">
             <div class="p-market__indices-grid--commodities">
                <IndexCard v-for="commodity in commodities" :key="commodity.name" v-bind="commodity" />
             </div>
        </div>
    </div>
  </div>
</template>


<script>
import IndexCard from '@/components/domain/dashboard/IndexCard.vue';
import LineChart from '@/components/charts/LineChart';

const generateChartData = (baseValue, volatility = 50) => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}일`,
    value: baseValue + (Math.random() - 0.5) * volatility * 2,
  }));
};

export default {
  name: "MarketPage",
  components: {
    IndexCard, LineChart
  },
  data() {
      // Static Data Creation
      const domesticIndices = [
        { name: 'KOSPI', value: 2547.82, change: 15.34, changePercent: 0.61, chartData: generateChartData(2547, 30) },
        { name: 'KOSDAQ', value: 742.15, change: -3.21, changePercent: -0.43, chartData: generateChartData(742, 15) },
        { name: 'KOSPI 200', value: 341.23, change: 2.15, changePercent: 0.63, chartData: generateChartData(341, 8) },
      ];
      const internationalIndices = [
        { name: 'S&P 500', value: 4783.45, change: 23.45, changePercent: 0.49, chartData: generateChartData(4783, 60) },
        { name: 'NASDAQ', value: 15043.97, change: 112.34, changePercent: 0.75, chartData: generateChartData(15043, 200) },
        { name: 'DOW JONES', value: 37863.22, change: -45.12, changePercent: -0.12, chartData: generateChartData(37863, 150) },
        { name: 'NIKKEI 225', value: 35577.11, change: -234.56, changePercent: -0.65, chartData: generateChartData(35577, 300) },
        { name: 'HANG SENG', value: 16034.32, change: 45.23, changePercent: 0.28, chartData: generateChartData(16034, 150) },
        { name: 'FTSE 100', value: 7672.45, change: 18.90, changePercent: 0.25, chartData: generateChartData(7672, 80) },
      ];
      const exchangeRates = [
        { name: 'USD/KRW', value: 1334.50, change: 5.30, changePercent: 0.40, chartData: generateChartData(1334, 10) },
        { name: 'JPY/KRW', value: 905.23, change: -2.15, changePercent: -0.24, chartData: generateChartData(905, 8) },
        { name: 'EUR/KRW', value: 1452.80, change: 8.45, changePercent: 0.58, chartData: generateChartData(1452, 12) },
        { name: 'CNY/KRW', value: 183.67, change: 0.92, changePercent: 0.50, chartData: generateChartData(183, 3) },
      ];
       const commodities = [
        { name: 'WTI 유가', value: 72.45, change: 1.23, changePercent: 1.73, unit: 'USD/barrel', chartData: generateChartData(72, 5) },
        { name: '금', value: 2043.50, change: -12.30, changePercent: -0.60, unit: 'USD/oz', chartData: generateChartData(2043, 20) },
        { name: '은', value: 23.45, change: 0.34, changePercent: 1.47, unit: 'USD/oz', chartData: generateChartData(23, 1) },
        { name: '구리', value: 3.82, change: -0.05, changePercent: -1.29, unit: 'USD/lb', chartData: generateChartData(3.8, 0.1) },
      ];

      return {
        activeTab: 'domestic',
        tabs: [
            { value: 'domestic', label: '국내 지수' },
            { value: 'international', label: '해외 지수' },
            { value: 'forex', label: '환율' },
            { value: 'commodities', label: '원자재' }
        ],
        domesticIndices,
        internationalIndices,
        exchangeRates,
        commodities,
        selectedDomestic: 'KOSPI',
        selectedInternational: 'S&P 500',
      };
  },
  computed: {
    selectedDomesticData() {
        return this.domesticIndices.find(idx => idx.name === this.selectedDomestic);
    },
    selectedInternationalData() {
        return this.internationalIndices.find(idx => idx.name === this.selectedInternational);
    },
    detailedChartOptions() {
        return {
            maintainAspectRatio: false,
            responsive: true,
            legend: { display: false },
            scales: {
                xAxes: [{ 
                    gridLines: { color: '#e2e8f0' },
                    ticks: { fontSize: 12 } 
                }],
                yAxes: [{ 
                    gridLines: { color: '#e2e8f0' },
                    ticks: { fontSize: 12 } 
                }]
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            }
        };
    }
  },
  methods: {
      getDetailedChartData(data) {
          if (!data || !data.chartData) return {};
          return {
              labels: data.chartData.map(d => d.date),
              datasets: [
                  {
                      label: data.name,
                      borderColor: '#1e40af',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      data: data.chartData.map(d => d.value),
                      fill: false, // Line only for detailed chart, per source
                      lineTension: 0.4,
                      pointRadius: 0,
                      pointHoverRadius: 4
                  }
              ]
          };
      }
  }
};
</script>
<style src="@/assets/css/pages/market.css"></style>

