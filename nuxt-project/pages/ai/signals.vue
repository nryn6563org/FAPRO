<template>
  <div class="p-signals">
    <div class="p-signals__header-group">
      <div class="c-page-header">
        <h2 class="c-page-header__title">AI 매매 시그널</h2>
        <p class="c-page-header__desc">실시간 AI 기반 매매 신호 및 투자 추천</p>
      </div>
      <Button variant="outline" size="sm" class="gap-2">
        <Filter class="w-4 h-4" />
        필터 설정
      </Button>
    </div>

    <!-- 요약 카드 영역 (전체, 매수, 매도, 보유) -->
    <div class="p-signals__summary-grid">
      <div class="p-signals__summary-card p-signals__summary-card--total">
        <div>
          <p class="p-signals__summary-label">전체 시그널</p>
          <p class="p-signals__summary-value">{{ signals.length }}</p>
        </div>
        <div class="p-signals__summary-icon-box bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300">
          <Zap class="w-5 h-5" />
        </div>
      </div>

      <div class="p-signals__summary-card">
        <div>
          <p class="p-signals__summary-label">매수 시그널</p>
          <p class="p-signals__summary-value" style="color: var(--red-500)">{{ counts.buy }}</p>
        </div>
        <div class="p-signals__summary-icon-box bg-red-50 dark:bg-red-900/20 text-red-500">
          <TrendingUp class="w-5 h-5" />
        </div>
      </div>

      <div class="p-signals__summary-card">
        <div>
          <p class="p-signals__summary-label">매도 시그널</p>
          <p class="p-signals__summary-value" style="color: var(--blue-500)">{{ counts.sell }}</p>
        </div>
        <div class="p-signals__summary-icon-box bg-blue-50 dark:bg-blue-900/20 text-blue-500">
          <TrendingDown class="w-5 h-5" />
        </div>
      </div>

      <div class="p-signals__summary-card">
        <div>
          <p class="p-signals__summary-label">보유 시그널</p>
          <p class="p-signals__summary-value" style="color: var(--slate-400)">{{ counts.hold }}</p>
        </div>
        <div class="p-signals__summary-icon-box bg-slate-50 dark:bg-slate-800/50 text-slate-400">
          <Target class="w-5 h-5" />
        </div>
      </div>
    </div>

    <!-- 필터 탭 (전체/매수/매도/보유) -->
    <div class="p-signals__filter-nav">
       <button
          v-for="tab in filters" :key="tab.value"
          @click="filter = tab.value"
          class="p-signals__filter-btn"
          :class="filter === tab.value ? 'p-signals__filter-btn--active' : ''"
       >
          {{ tab.label }}
       </button>
    </div>

    <!-- 시그널 리스트 영역 -->
    <div class="p-signals__list">
       <div
         v-for="signal in filteredSignals" :key="signal.id"
         class="p-signals__item"
       >
          <!-- 왼쪽 패널: 종목 정보 및 시그널 뱃지 -->
          <div class="p-signals__info-panel">
             <div class="p-signals__stock-header">
                <div class="p-signals__stock-icon" :class="getSignalBadgeClass(signal.type)">
                   <component :is="getSignalIcon(signal.type)" class="w-6 h-6" />
                </div>
                <div>
                   <h3 class="p-signals__ticker">{{ signal.ticker }}</h3>
                   <div class="p-signals__badge-group">
                      <span class="p-signals__badge" :class="getSignalTextClass(signal.type)">
                         {{ getSignalLabel(signal.type) }}
                      </span>
                      <span class="p-signals__badge bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                         {{ getStrengthLabel(signal.strength) }}
                      </span>
                   </div>
                   <p class="text-xs text-slate-500 mt-1">{{ signal.name }}</p>
                </div>
             </div>
             <div class="p-signals__timestamp-row">
                <div class="flex items-center gap-1">
                   <Clock class="w-3.5 h-3.5" />
                   {{ signal.timestamp }}
                </div>
                <div class="px-2 py-0.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold">
                   {{ signal.timeframe }}
                </div>
             </div>
          </div>

          <!-- 오른쪽 패널: 가격 정보 및 상세 분석 -->
          <div class="p-signals__data-panel">
              <div class="p-signals__price-grid">
                 <div>
                    <p class="p-signals__price-label">현재가</p>
                    <p class="p-signals__price-value">{{ formatPrice(signal.price) }}</p>
                 </div>
                 <div>
                    <p class="p-signals__price-label">목표가</p>
                    <p class="p-signals__price-value indicator--positive">{{ formatPrice(signal.targetPrice) }}</p>
                 </div>
                 <div>
                    <p class="p-signals__price-label">손절가</p>
                    <p class="p-signals__price-value indicator--negative">{{ formatPrice(signal.stopLoss) }}</p>
                 </div>
              </div>

              <div class="p-signals__confidence-section">
                  <div class="p-signals__confidence-header">
                     <span class="p-signals__confidence-label">AI 신뢰도</span>
                     <span class="p-signals__confidence-label" style="font-family: monospace">{{ signal.confidence }}%</span>
                  </div>
                  <div class="p-signals__confidence-bar-bg">
                     <div
                        class="h-full rounded-full transition-all duration-500"
                        :class="signal.confidence >= 80 ? 'bg-red-500' : signal.confidence >= 60 ? 'bg-orange-500' : 'bg-blue-500'"
                        :style="{ width: signal.confidence + '%' }"
                     ></div>
                  </div>
              </div>

              <div class="p-signals__analysis-box">
                 <p class="p-signals__reason">💡 {{ signal.reason }}</p>
                 <div class="p-signals__tag-group">
                    <span v-for="(indicator, idx) in signal.indicators" :key="idx" class="p-signals__tag">
                       #{{ indicator }}
                    </span>
                 </div>
              </div>

             <div class="p-signals__actions">
                <Button variant="outline" size="sm" class="gap-1">
                   상세 분석 <ChevronRight class="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" class="gap-1 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                   <CheckCircle2 class="w-3.5 h-3.5" /> 시그널 적용
                </Button>
             </div>
          </div>
       </div>

       <div v-if="filteredSignals.length === 0" class="c-content-card p-12 text-center text-slate-500">
           <AlertTriangle class="w-12 h-12 mx-auto mb-4 text-slate-300" />
           <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">시그널이 없습니다</h3>
           <p>해당 필터에 맞는 매매 시그널이 없습니다</p>
       </div>
    </div>
  </div>
</template>

<script>
import { Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Clock, Target, AlertTriangle, CheckCircle2, ChevronRight, Filter } from 'lucide-vue'
import Button from '@/components/common/Button.vue'

const mockSignals = [
  {
    id: '1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    type: 'buy',
    strength: 'strong',
    price: 185.50,
    targetPrice: 200.00,
    stopLoss: 178.00,
    confidence: 87,
    reason: 'RSI 과매도 구간 진입, MACD 골든크로스 형성, 거래량 급증',
    timestamp: '2026-01-20 09:30',
    timeframe: '일봉',
    indicators: ['RSI', 'MACD', 'Volume']
  },
  {
    id: '2',
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    type: 'sell',
    strength: 'moderate',
    price: 248.30,
    targetPrice: 235.00,
    stopLoss: 255.00,
    confidence: 72,
    reason: '저항선 도달, 상대적 강도 약화, 매도 거래량 증가',
    timestamp: '2026-01-20 10:15',
    timeframe: '일봉',
    indicators: ['Support/Resistance', 'RSI', 'Volume']
  },
  {
    id: '3',
    ticker: '삼성전자',
    name: 'Samsung Electronics',
    type: 'buy',
    strength: 'strong',
    price: 72500,
    targetPrice: 78000,
    stopLoss: 69000,
    confidence: 91,
    reason: '이동평균선 상향 돌파, 외국인 순매수 지속, 기관 매수세 강화',
    timestamp: '2026-01-20 11:00',
    timeframe: '일봉',
    indicators: ['MA', 'Foreign/Institution', 'Volume']
  },
  {
    id: '4',
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    type: 'buy',
    strength: 'moderate',
    price: 520.80,
    targetPrice: 550.00,
    stopLoss: 505.00,
    confidence: 78,
    reason: '볼린저밴드 하단 터치 후 반등, AI 섹터 모멘텀 강화',
    timestamp: '2026-01-20 11:30',
    timeframe: '4시간봉',
    indicators: ['Bollinger Bands', 'Sector Analysis']
  },
  {
    id: '5',
    ticker: 'SK하이닉스',
    name: 'SK Hynix',
    type: 'hold',
    strength: 'weak',
    price: 145000,
    targetPrice: 148000,
    stopLoss: 142000,
    confidence: 55,
    reason: '횡보 구간, 추세 불명확, 추가 신호 대기 필요',
    timestamp: '2026-01-20 12:00',
    timeframe: '일봉',
    indicators: ['Trend', 'Volume']
  }
]

export default {
  name: 'TradingSignals',
  components: {
    Button,
    Zap,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Target,
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    Filter
  },
  data() {
    return {
      signals: mockSignals,
      filter: 'all',
      filters: [
        { value: 'all', label: '전체' },
        { value: 'buy', label: '매수' },
        { value: 'sell', label: '매도' },
        { value: 'hold', label: '보유' }
      ]
    }
  },
  computed: {
    filteredSignals() {
      return this.filter === 'all' ? this.signals : this.signals.filter(s => s.type === this.filter)
    },
    counts() {
      return {
        buy: this.signals.filter(s => s.type === 'buy').length,
        sell: this.signals.filter(s => s.type === 'sell').length,
        hold: this.signals.filter(s => s.type === 'hold').length
      }
    }
  },
  methods: {
    formatPrice(price) {
      if (typeof price === 'number' && price > 1000) { return price.toLocaleString() + '원' }
      return '$' + price.toFixed(2)
    },
    getSignalBadgeClass(type) {
      switch (type) {
        case 'buy': return 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        case 'sell': return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
        case 'hold': return 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800/50 dark:text-slate-500 dark:border-slate-700'
        default: return ''
      }
    },
    getSignalTextClass(type) {
      switch (type) {
        case 'buy': return 'text-red-500 bg-red-50 dark:bg-red-900/20'
        case 'sell': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
        case 'hold': return 'text-slate-500 bg-slate-50 dark:bg-slate-800/50'
        default: return ''
      }
    },
    getSignalIcon(type) {
      switch (type) {
        case 'buy': return 'ArrowUpRight'
        case 'sell': return 'ArrowDownRight'
        default: return 'Target'
      }
    },
    getSignalLabel(type) {
      switch (type) {
        case 'buy': return '매수'
        case 'sell': return '매도'
        case 'hold': return '보유'
        default: return ''
      }
    },
    getStrengthLabel(strength) {
      switch (strength) {
        case 'strong': return '강'
        case 'moderate': return '중'
        case 'weak': return '약'
        default: return ''
      }
    }
  }
}
</script>

<style src="@/assets/css/pages/signals.css"></style>
