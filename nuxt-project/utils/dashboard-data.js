/**
 * 대시보드 데이터 유틸리티
 * 위젯 정보, 시장 데이터, 고객 데이터 등의 모의 데이터를 정의합니다.
 */
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Newspaper, Globe, Building2, PieChart, Wallet, Target, Award, Calculator, Briefcase, Sparkles, Lightbulb, Layers, FileBarChart, ClipboardList, Star, CalendarDays } from 'lucide-vue'

// Widget Types
// 'kospi' | 'kosdaq' | ...

// 사용 가능한 위젯 목록
export const AVAILABLE_WIDGETS = [
  // Market Indices
  { id: 'kospi', title: 'KOSPI', category: '국내 지수', icon: TrendingUp, defaultSize: 'small' },
  { id: 'kosdaq', title: 'KOSDAQ', category: '국내 지수', icon: TrendingUp, defaultSize: 'small' },
  { id: 'sp500', title: 'S&P 500', category: '해외 지수', icon: Globe, defaultSize: 'small' },
  { id: 'nasdaq', title: 'NASDAQ', category: '해외 지수', icon: Globe, defaultSize: 'small' },
  { id: 'nikkei', title: 'NIKKEI', category: '해외 지수', icon: Globe, defaultSize: 'small' },
  { id: 'hangseng', title: 'HANG SENG', category: '해외 지수', icon: Globe, defaultSize: 'small' },

  // Exchange Rates
  { id: 'usd-krw', title: 'USD/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },
  { id: 'jpy-krw', title: 'JPY/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },
  { id: 'eur-krw', title: 'EUR/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },
  { id: 'cny-krw', title: 'CNY/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },

  // Commodities & Crypto
  { id: 'wti', title: 'WTI 유가', category: '원자재', icon: Activity, defaultSize: 'small' },
  { id: 'gold', title: '금', category: '원자재', icon: Award, defaultSize: 'small' },
  { id: 'bitcoin', title: 'Bitcoin', category: '가상자산', icon: Wallet, defaultSize: 'small' },
  { id: 'ethereum', title: 'Ethereum', category: '가상자산', icon: Wallet, defaultSize: 'small' },

  // Client & Business
  { id: 'client-count', title: '총 고객 수', category: '고객 정보', icon: Users, defaultSize: 'small' },
  { id: 'aum', title: 'AUM', category: '고객 정보', icon: Briefcase, defaultSize: 'small' },
  { id: 'revenue', title: '월간 수익', category: '고객 정보', icon: Calculator, defaultSize: 'medium' },
  { id: 'top-clients', title: '주요 고객', category: '고객 정보', icon: Target, defaultSize: 'medium' },

  // News
  { id: 'market-news', title: '시장 뉴스', category: '뉴스', icon: Newspaper, defaultSize: 'large' },
  { id: 'economy-news', title: '경제 뉴스', category: '뉴스', icon: Building2, defaultSize: 'large' },
  { id: 'ai-issue-bubble', title: 'AI 이슈 버블', category: '뉴스', icon: Sparkles, defaultSize: 'large' },

  // Investment Info - Market Info
  { id: 'today-issue-widget', title: '오늘의이슈', category: '투자정보', icon: Lightbulb, defaultSize: 'large' },
  { id: 'price-analysis-widget', title: '시세분석', category: '투자정보', icon: TrendingUp, defaultSize: 'large' },
  { id: 'supply-analysis-widget', title: '수급분석', category: '투자정보', icon: TrendingDown, defaultSize: 'large' },
  { id: 'theme-sector-widget', title: '테마/업종', category: '투자정보', icon: Layers, defaultSize: 'medium' },
  { id: 'report-analysis-widget', title: '리포트분석', category: '투자정보', icon: FileBarChart, defaultSize: 'large' },
  { id: 'disclosure-analysis-widget', title: '공시분석', category: '투자정보', icon: ClipboardList, defaultSize: 'large' },

  // Investment Info - AI Recommend
  { id: 'today-pick-widget', title: '오늘의종목Pick', category: 'AI추천', icon: Star, defaultSize: 'large' },
  { id: 'daily-stocks-widget', title: '종목 일자별보기', category: 'AI추천', icon: CalendarDays, defaultSize: 'large' },
  { id: 'recommend-stocks-widget', title: '추천종목', category: 'AI추천', icon: Lightbulb, defaultSize: 'large' },
  { id: 'recommend-return-widget', title: '추천종목수익률', category: 'AI추천', icon: PieChart, defaultSize: 'large' }
]

// 시장 지수 및 환율 모의 데이터
export const mockMarketData = {
  kospi: { value: 2547.82, change: 15.34, changePercent: 0.61 },
  kosdaq: { value: 742.15, change: -3.21, changePercent: -0.43 },
  sp500: { value: 4783.45, change: 23.45, changePercent: 0.49 },
  nasdaq: { value: 15043.97, change: 112.34, changePercent: 0.75 },
  nikkei: { value: 35577.11, change: -234.56, changePercent: -0.65 },
  hangseng: { value: 16034.32, change: 45.23, changePercent: 0.28 },
  'usd-krw': { value: 1334.5, change: 5.3, changePercent: 0.4 },
  'jpy-krw': { value: 905.23, change: -2.15, changePercent: -0.24 },
  'eur-krw': { value: 1452.8, change: 8.45, changePercent: 0.58 },
  'cny-krw': { value: 183.67, change: 0.92, changePercent: 0.5 },
  wti: { value: 72.45, change: 1.23, changePercent: 1.73 },
  gold: { value: 2043.5, change: -12.3, changePercent: -0.6 },
  bitcoin: { value: 43234.56, change: 1234.23, changePercent: 2.94 },
  ethereum: { value: 2234.45, change: -45.23, changePercent: -1.98 }
}

// 고객 정보 모의 데이터 (AUM 단위: 원, 수익 단위: 원)
export const mockClientData = [
  { name: '김영희', aum: 35000000000, revenue: 12500000, risk: 'medium' },
  { name: '이철수', aum: 28000000000, revenue: 9800000, risk: 'low' },
  { name: '박민수', aum: 22000000000, revenue: 7700000, risk: 'high' },
  { name: '정수진', aum: 18000000000, revenue: 6300000, risk: 'medium' },
  { name: '최동욱', aum: 15000000000, revenue: 5250000, risk: 'low' }
]

export const mockNews = [
  { title: '코스피, 외국인 매수세에 2,500선 회복', time: '10분 전', source: '연합뉴스' },
  { title: '미 연준, 금리 동결 시사... 증시 반등', time: '1시간 전', source: '한국경제' },
  { title: '삼성전자, 신규 AI 칩 공개 예정', time: '2시간 전', source: '매일경제' },
  { title: '달러-원 환율 1,330원대 중반 등락', time: '3시간 전', source: '서울경제' },
  { title: '비트코인, 4만 3천달러 돌파', time: '4시간 전', source: '블록미디어' }
]

export const mockAIIssueData = [
  { keyword: 'AI 반도체', x: 45, y: 75, size: 850, category: 'tech', change: 12.5, mentions: 2340 }
  // ... truncated ...
]
