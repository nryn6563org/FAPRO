<template>
  <div class="p-ai">
    <div class="u-flex-between-mb-6">
      <div class="p-ai__header u-flex-mb-0">
        <h2 class="p-ai__title">AI 매매 시그널</h2>
        <p class="p-ai__desc">실시간 AI 기반 매매 신호 및 투자 추천</p>
      </div>
      <Button class="u-gap-2">
        <Filter class="u-icon-sm" />
        필터 설정
      </Button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="c-signal-summary">
        <div>
          <p class="c-signal-summary__label">전체 시그널</p>
          <p class="c-signal-summary__value">{{ signals.length }}</p>
        </div>
        <div class="c-signal-summary__icon-wrapper c-signal-summary__icon-wrapper--blue">
          <Zap class="c-signal-summary__icon u-text-blue" />
        </div>
      </div>

      <div class="c-signal-summary">
        <div>
          <p class="c-signal-summary__label">매수 시그널</p>
          <p class="c-signal-summary__value u-text-up">{{ counts.buy }}</p>
        </div>
        <div class="c-signal-summary__icon-wrapper c-signal-summary__icon-wrapper--green">
          <TrendingUp class="c-signal-summary__icon u-text-up" />
        </div>
      </div>

      <div class="c-signal-summary">
        <div>
          <p class="c-signal-summary__label">매도 시그널</p>
          <p class="c-signal-summary__value u-text-down">{{ counts.sell }}</p>
        </div>
        <div class="c-signal-summary__icon-wrapper c-signal-summary__icon-wrapper--red">
          <TrendingDown class="c-signal-summary__icon u-text-down" />
        </div>
      </div>

      <div class="c-signal-summary">
        <div>
          <p class="c-signal-summary__label">보유 시그널</p>
          <p class="c-signal-summary__value u-text-yellow">{{ counts.hold }}</p>
        </div>
        <div class="c-signal-summary__icon-wrapper c-signal-summary__icon-wrapper--yellow">
          <Target class="c-signal-summary__icon u-text-yellow" />
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="c-signal-filter">
      <div class="c-signal-filter__tabs">
         <button v-for="tab in filters" :key="tab.value"
            @click="filter = tab.value"
            :class="['c-signal-filter__tab-btn', 
              filter === tab.value ? 'c-signal-filter__tab-btn--active' : ''
            ]"
         >
            {{ tab.label }}
         </button>
      </div>
    </div>

    <!-- Signals List -->
    <div class="l-signals-list">
       <div v-for="signal in filteredSignals" :key="signal.id" class="c-signal-card">
          <div class="c-signal-card__header">
             <div class="c-signal-card__info-wrapper">
                <div :class="['c-signal-card__type-icon-wrapper', getSignalColor(signal.type)]">
                   <component :is="getSignalIcon(signal.type)" class="c-signal-card__type-icon" />
                </div>
                <div>
                   <div class="c-signal-card__ticker-row">
                      <h3 class="c-signal-card__ticker">{{ signal.ticker }}</h3>
                      <span :class="['c-signal-card__badge', getSignalColor(signal.type)]">
                         {{ getSignalLabel(signal.type) }}
                      </span>
                      <span :class="['c-signal-card__badge', getStrengthColor(signal.strength)]">
                         {{ getStrengthLabel(signal.strength) }}
                      </span>
                   </div>
                   <p class="c-signal-card__name">{{ signal.name }}</p>
                </div>
             </div>
             <div class="c-signal-card__meta">
                <div class="c-signal-card__timestamp">
                   <Clock class="u-icon-sm" />
                   {{ signal.timestamp }}
                </div>
                <p class="c-signal-card__timeframe">{{ signal.timeframe }}</p>
             </div>
          </div>

          <div class="c-signal-card__body">
             <!-- Price Info -->
             <div class="c-signal-card__price-grid">
                <div>
                   <p class="c-signal-card__price-label">현재가</p>
                   <p class="c-signal-card__price-val">{{ formatPrice(signal.price) }}</p>
                </div>
                <div>
                   <p class="c-signal-card__price-label">목표가</p>
                   <p class="c-signal-card__price-val u-text-up">{{ formatPrice(signal.targetPrice) }}</p>
                </div>
                <div>
                   <p class="c-signal-card__price-label">손절가</p>
                   <p class="c-signal-card__price-val u-text-down">{{ formatPrice(signal.stopLoss) }}</p>
                </div>
             </div>

             <!-- Confidence -->
             <div class="c-signal-card__confidence-section">
                <div class="c-signal-card__confidence-row">
                   <span class="u-text-sm-slate-600">신뢰도</span>
                   <div class="c-signal-card__progress-wrapper">
                      <div class="c-signal-card__progress-bar">
                         <div 
                           :class="['c-signal-card__progress-fill', signal.confidence >= 80 ? 'u-bg-up' : signal.confidence >= 60 ? 'u-bg-yellow' : 'u-bg-down']"
                           :style="{ width: signal.confidence + '%' }"
                         ></div>
                      </div>
                      <span class="u-text-sm-bold">{{ signal.confidence }}%</span>
                   </div>
                </div>

                <div>
                   <p class="c-signal-card__reason-label">분석 근거</p>
                   <p class="c-signal-card__reason-text">{{ signal.reason }}</p>
                </div>

                <div class="c-signal-card__indicator-list">
                   <span v-for="(indicator, idx) in signal.indicators" :key="idx" class="c-signal-card__indicator">
                      {{ indicator }}
                   </span>
                </div>
             </div>

            <!-- Actions -->
            <div class="c-signal-card__actions">
               <Button class="c-signal-card__btn">
                  <CheckCircle2 class="u-icon-sm" />
                  시그널 적용
               </Button>
               <Button variant="outline" class="c-signal-card__btn">
                  상세 분석
                  <ChevronRight class="u-icon-sm" />
               </Button>
            </div>
          </div>
       </div>

       <div v-if="filteredSignals.length === 0" class="c-signal-empty">
           <AlertTriangle class="c-signal-empty__icon" />
           <h3 class="c-signal-empty__title">시그널이 없습니다</h3>
           <p class="c-signal-empty__desc">해당 필터에 맞는 매매 시그널이 없습니다</p>
       </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Clock, Target, AlertTriangle, CheckCircle2, ChevronRight, Filter } from 'lucide-vue';

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
];

export default {
  name: "TradingSignals",
  components: {
    Button,
    Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Clock, Target, AlertTriangle, CheckCircle2, ChevronRight, Filter
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
          return this.filter === 'all' ? this.signals : this.signals.filter(s => s.type === this.filter);
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
          if (typeof price === 'number' && price > 1000) return price.toLocaleString() + '원';
          return '$' + price.toFixed(2);
      },
      getSignalColor(type) {
        switch (type) {
            case 'buy': return 'c-signal-card__badge--buy';
            case 'sell': return 'c-signal-card__badge--sell';
            case 'hold': return 'c-signal-card__badge--hold';
            default: return 'c-signal-card__badge--default';
        }
      },
      getSignalIcon(type) {
          switch (type) {
              case 'buy': return 'ArrowUpRight';
              case 'sell': return 'ArrowDownRight';
              default: return 'Target';
          }
      },
      getSignalLabel(type) {
          switch (type) {
            case 'buy': return '매수';
            case 'sell': return '매도';
            case 'hold': return '보유';
            default: return '';
          }
      },
      getStrengthColor(strength) {
          switch (strength) {
            case 'strong': return 'c-signal-card__badge--strong';
            case 'moderate': return 'c-signal-card__badge--moderate';
            default: return 'c-signal-card__badge--weak';
          }
      },
      getStrengthLabel(strength) {
        switch (strength) {
            case 'strong': return '강';
            case 'moderate': return '중';
            case 'weak': return '약';
            default: return '';
          }
      }
  }
};
</script>
<style src="@/assets/css/pages/ai.css"></style>

