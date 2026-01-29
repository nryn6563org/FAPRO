<template>
  <div class="p-signals">
    <div class="p-signals__header">
      <div class="c-page-header">
        <h2 class="c-page-header__title">AI 매매 시그널</h2>
        <p class="c-page-header__desc">실시간 AI 기반 매매 신호 및 투자 추천</p>
      </div>
      <div class="p-signals__header-actions">
        <Button variant="outline" size="sm" class="p-signals__filter-btn">
          <FilterIcon class="p-signals__icon-filter" />
          필터 설정
        </Button>
      </div>
    </div>

    <!-- 첫 번째 행: 현황 및 최근 내역 -->
    <div class="p-signals__top-grid">
      <div class="p-signals__status-card c-content-card">
        <h3 class="p-signals__card-title">오늘의 AI매매신호 현황</h3>
        <div class="p-signals__status-visual">
          <div class="p-signals__status-circle p-signals__status-circle--buy">
            <span class="p-signals__status-label">매수</span>
            <span class="p-signals__status-value">10종목</span>
          </div>
          <div class="p-signals__status-circle p-signals__status-circle--sell">
            <span class="p-signals__status-label">매도</span>
            <span class="p-signals__status-value">47종목</span>
          </div>
        </div>
        <div class="p-signals__countdown">
          AI의 다음 신호 발생일까지 <span class="p-signals__countdown-time">10분05초</span>
        </div>
        <div class="p-signals__status-banner">
          02:45 새로운 <span class="p-signals__status-highlight">매수신호</span>가 3종목에서 발생
        </div>
      </div>

      <div class="p-signals__recent-card c-content-card">
        <div class="p-signals__recent-header">
          <h3 class="p-signals__card-title">최근 AI매매신호 내역</h3>
          <span class="p-signals__recent-subtitle">최근 매도 종목</span>
        </div>
        <div class="p-signals__recent-list">
          <div v-for="item in recentSignals" :key="item.name" class="p-signals__recent-item">
            <div class="p-signals__recent-info">
              <div class="p-signals__recent-name-group">
                <span class="p-signals__stock-name">{{ item.name }}</span>
                <Info class="p-signals__icon-info" />
              </div>
              <div class="p-signals__recent-type">최근 {{ item.type }} 종목</div>
            </div>
            <span class="p-signals__profit-value" :class="item.profit > 0 ? 'p-signals__profit-value--up' : 'p-signals__profit-value--down'">
              +{{ item.profit }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 두 번째 행: 종목 카테고리 그리드 -->
    <div class="p-signals__category-grid">
      <!-- 인기 종목 -->
      <div class="p-signals__category-card c-content-card">
        <h3 class="p-signals__card-title">지금 인기 종목들은</h3>
        <div class="p-signals__stock-list">
          <div v-for="stock in popularStocks" :key="stock.name" class="p-signals__stock-item">
            <div class="p-signals__stock-info">
              <div class="p-signals__stock-icon p-signals__stock-icon--ai">
                AI
              </div>
              <div class="p-signals__stock-name-group">
                <div class="p-signals__stock-title">{{ stock.name }}</div>
                <div class="p-signals__stock-status">{{ stock.status }}</div>
              </div>
            </div>
            <div class="p-signals__stock-data">
              <div class="p-signals__stock-profit" :class="stock.profit > 0 ? 'p-signals__stock-profit--up' : 'p-signals__stock-profit--down'">
                +{{ stock.profit }}%
              </div>
              <div class="p-signals__stock-details">{{ stock.date }} {{ stock.type }} {{ formatPrice(stock.price) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 매수 후 급등 종목 -->
      <div class="p-signals__category-card c-content-card">
        <h3 class="p-signals__card-title">매수 후 급등 종목</h3>
        <div class="p-signals__stock-list">
          <div v-for="stock in spikedStocks" :key="stock.name" class="p-signals__stock-item">
            <div class="p-signals__stock-info">
              <div class="p-signals__stock-icon p-signals__stock-icon--hot">
                HOT
              </div>
              <div class="p-signals__stock-name-group">
                <div class="p-signals__stock-title">{{ stock.name }}</div>
                <div class="p-signals__stock-status">실시간 급등중</div>
              </div>
            </div>
            <div class="p-signals__stock-data">
              <div class="p-signals__stock-profit p-signals__stock-profit--up">
                +{{ stock.profit }}%
              </div>
              <div class="p-signals__stock-details">{{ stock.date }} 매수</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 수익률 상위 종목 -->
      <div class="p-signals__category-card c-content-card">
        <h3 class="p-signals__card-title">수익률 상위 종목 (최근 12개월)</h3>
        <div class="p-signals__stock-list">
          <div v-for="stock in topPerformanceStocks" :key="stock.name" class="p-signals__stock-item">
            <div class="p-signals__stock-info">
              <div class="p-signals__stock-icon p-signals__stock-icon--top">
                TOP
              </div>
              <div class="p-signals__stock-name-group">
                <div class="p-signals__stock-title">{{ stock.name }}</div>
                <div class="p-signals__stock-status">보유기간 {{ stock.period }}</div>
              </div>
            </div>
            <div class="p-signals__stock-data">
              <div class="p-signals__stock-profit p-signals__stock-profit--best">
                +{{ stock.maxProfit }}%
              </div>
              <div class="p-signals__stock-details">최고 수익기록</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 세 번째 행: 실시간 피드 -->
    <div class="p-signals__feed-grid">
      <!-- 오늘 발생한 매수신호 -->
      <div class="p-signals__feed-card">
        <div class="p-signals__feed-header p-signals__feed-header--buy">
          오늘 발생한 AI매수신호
        </div>
        <div class="p-signals__feed-content">
          <p class="p-signals__feed-summary">현재 매수 신호 발생 종목 총 <span class="p-signals__feed-count p-signals__feed-count--buy">67</span> 종목</p>
          <div class="p-signals__feed-list">
            <div v-for="(signal, idx) in buySignals" :key="idx" class="p-signals__feed-item p-signals__feed-item--buy">
              <div class="p-signals__feed-time">
                <div class="p-signals__time-label">
                  <Clock class="p-signals__icon-clock" />
                  {{ signal.time }}
                </div>
                <div class="p-signals__time-dot"></div>
              </div>
              <div class="p-signals__feed-box">
                <div class="p-signals__feed-stock">
                  <div class="p-signals__stock-avatar p-signals__stock-avatar--buy">
                    <Zap class="p-signals__icon-zap p-signals__icon-zap--buy" />
                  </div>
                  <div class="p-signals__stock-main">
                    <div class="p-signals__stock-name">{{ signal.name }}</div>
                    <div class="p-signals__stock-code">{{ signal.code }}</div>
                  </div>
                </div>
                <div class="p-signals__feed-action p-signals__feed-action--buy">
                  <span class="p-signals__action-badge p-signals__action-badge--buy">매수</span>
                  <span class="p-signals__action-price">{{ formatPrice(signal.price) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오늘 발생한 매도신호 -->
      <div class="p-signals__feed-card">
        <div class="p-signals__feed-header p-signals__feed-header--sell">
          오늘 발생한 AI매도신호
        </div>
        <div class="p-signals__feed-content">
          <p class="p-signals__feed-summary">현재 매도 신호 발생 종목 총 <span class="p-signals__feed-count p-signals__feed-count--sell">45</span> 종목</p>
          <div class="p-signals__feed-list">
            <div v-for="(signal, idx) in sellSignals" :key="idx" class="p-signals__feed-item p-signals__feed-item--sell">
              <div class="p-signals__feed-time">
                <div class="p-signals__time-label">
                  <Clock class="p-signals__icon-clock" />
                  {{ signal.time }}
                </div>
                <div class="p-signals__time-dot"></div>
              </div>
              <div class="p-signals__feed-box">
                <div class="p-signals__feed-stock">
                  <div class="p-signals__stock-avatar p-signals__stock-avatar--sell">
                    <Zap class="p-signals__icon-zap p-signals__icon-zap--sell" />
                  </div>
                  <div class="p-signals__stock-main">
                    <div class="p-signals__stock-name">{{ signal.name }}</div>
                    <div class="p-signals__stock-code">{{ signal.code }}</div>
                  </div>
                </div>
                <div class="p-signals__feed-action p-signals__feed-action--sell">
                  <span class="p-signals__action-badge p-signals__action-badge--sell">매도</span>
                  <span class="p-signals__action-price">{{ formatPrice(signal.price) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Info, Filter as FilterIcon, Zap, TrendingUp, TrendingDown, Clock, ChevronRight } from 'lucide-vue'
import Button from '@/components/atoms/Button.vue'

export default {
  name: 'TradingSignals',
  components: {
    Button,
    Search,
    Info,
    FilterIcon,
    Zap,
    TrendingUp,
    TrendingDown,
    Clock,
    ChevronRight
  },
  data() {
    return {
      recentSignals: [
        { name: '베노티엠알', profit: 38.35, type: '매도' },
        { name: '이엔시스', profit: 35.65, type: '매수' },
        { name: '라온텍', profit: 35.52, type: '매도' }
      ],
      popularStocks: [
        { name: '한국전력', status: '관망중', date: '01/22', type: '매도', price: 61400, profit: 23.73 },
        { name: '현대차', status: '관망중', date: '01/22', type: '매수', price: 552000, profit: 83.54 },
        { name: '삼성중공업', status: '관망중', date: '01/20', type: '매도', price: 30600, profit: 13.33 },
        { name: '삼성전자', status: '보유중', date: '12/22', type: '매수', price: 110300, profit: 38.44 },
        { name: '미래에셋증권', status: '보유중', date: '12/18', type: '매수', price: 22600, profit: 51.88 }
      ],
      spikedStocks: [
        { name: 'LG전자', date: '01/22', profit: 28.15 },
        { name: '포스코', date: '01/20', profit: 45.28 },
        { name: '기아', date: '01/18', profit: 18.92 },
        { name: '네이버', date: '01/15', profit: 52.67 },
        { name: '카카오', date: '01/12', profit: 35.42 }
      ],
      topPerformanceStocks: [
        { name: '실룽필산', maxProfit: 314.39, period: '9일' },
        { name: '영일구축', maxProfit: 306.72, period: '106일' },
        { name: '계양전기', maxProfit: 183.28, period: '44일' },
        { name: '녹십자홀딩스2우', maxProfit: 176.92, period: '11일' },
        { name: '계양전기우', maxProfit: 164.54, period: '44일' }
      ],
      buySignals: [
        { time: '5분전', name: '크리스탈지노믹스', code: '030790', price: 85.3 },
        { time: '12분전', name: '펩트론', code: '081930', price: 23500 },
        { time: '25분전', name: 'HANA금융22호', code: '417100', price: 15400 }
      ],
      sellSignals: [
        { time: '3분전', name: '쿠콘', code: '294570', price: 34500 },
        { time: '8분전', name: '와이즈버즈', code: '227140', price: 27850 },
        { time: '16분전', name: '에이비엘바이오', code: '298380', price: 7190 }
      ]
    }
  },
  methods: {
    formatPrice(price) {
      if (typeof price === 'number') {
        return price.toLocaleString() + '원'
      }
      return price
    }
  }
}
</script>

<style src="@/assets/css/pages/signals.css"></style>
