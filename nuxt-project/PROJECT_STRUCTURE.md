# 프로젝트 구조 (Project Structure)

이 문서는 FAPRO Nuxt.js 프로젝트의 폴더 구조와 각 페이지별 컴포넌트 의존성 트리를 설명합니다.

## 1. 디렉토리 구조 (Directory Overview)

- **`pages/`**: 라우팅에 매핑되는 페이지 파일들
- **`components/`**: 재사용 가능한 UI 컴포넌트들
- **`layouts/`**: 페이지의 기본 레이아웃 (default, empty 등)
- **`assets/`**: 정적 리소스 (CSS, 이미지, 아이콘 등)
- **`plugins/`**: Vue 플러그인 설정 (Swiper, Chart.js 등)
- **`store/`**: Vuex 상태 관리 (현재 비어있음)
- **`utils/`**: 공통 유틸리티 함수 및 Mock 데이터

---

## 2. 페이지 및 컴포넌트 트리 (Page & Component Tree)

각 페이지 파일과 해당 페이지에서 직접적으로 사용하는 주요 컴포넌트들의 트리 구조입니다.

### `pages/` (Root)

#### 🏠 `index.vue` (메인 대시보드)
- `components/domain/dashboard/CustomizableDashboard.vue`

#### 🔑 `login.vue` (로그인)
- Layout: `layouts/empty.vue`

#### 📝 `signup.vue` (회원가입)
- Layout: `layouts/empty.vue`

#### 🛠 `chart-verification.vue` (차트 검증용)
- `components/domain/MarketIndices`
- `components/domain/RecommendReturn`
- `components/domain/PriceAnalysis`
- `components/domain/ReportAnalysis`

### `pages/ai/` (AI 서비스)

#### 🤖 `assistant.vue` (AI 투자 비서)
- `components/common/Button.vue`
- `components/common/Input.vue`

#### 📡 `signals.vue` (AI 매매 시그널)
- `components/common/Button.vue`

### `pages/clients/` (고객 관리)

#### 👥 `index.vue` (고객 목록)
- `components/common/Button.vue`
- `components/common/Input.vue`
- `components/domain/clients/ClientRegisterModal.vue`
- `components/domain/clients/ClientDetailModal.vue`

### `pages/investment/` (투자 정보)

#### 📰 `today-issue.vue` (오늘의 이슈)
- `components/investment/today-issue/IssueHeader.vue`
- `components/investment/today-issue/IssueBubbleMap.vue`
- `components/investment/today-issue/IssueTrendChart.vue`
- `components/investment/today-issue/MajorStocksList.vue`
- `components/investment/today-issue/NewsSummary.vue`
- `components/investment/today-issue/IssueHistory.vue`

#### 📈 `recommend-stocks.vue` (추천 종목)
- `components/investment/recommend-stocks/RecommendStocksHeader.vue`
- `components/investment/recommend-stocks/RecommendHeroCard.vue`
- `components/investment/recommend-stocks/RecommendStockCard.vue`

#### 📊 `price-analysis.vue` (시세 분석)
- `components/investment/price-analysis/PriceAnalysisHeader.vue`
- `components/investment/price-analysis/IndexChartCard.vue`
- `components/investment/price-analysis/StatusFilterSection.vue`
- `components/investment/price-analysis/PriceStatusTable.vue`

#### 🔄 `supply-analysis.vue` (수급 분석)
- `components/investment/supply-analysis/SupplyAnalysisHeader.vue`
- `components/investment/supply-analysis/MarketSummarySection.vue`
- `components/investment/supply-analysis/SupplyTabNavigation.vue`
- `components/investment/supply-analysis/SupplyDataTable.vue`

#### 📑 `report-analysis.vue` (리포트 분석)
- `components/investment/report-analysis/ReportAnalysisHeader.vue`
- `components/investment/report-analysis/ReportFilterTabs.vue`
- `components/investment/report-analysis/ReportDataTable.vue`
- `components/domain/investment/ReportDetailModal.vue`

#### 🏭 `theme-sector.vue` (테마/업종)
- `components/investment/theme-sector/ThemeSectorHeader.vue`
- `components/investment/theme-sector/ThemeSectorTabs.vue`
- `components/investment/theme-sector/CategoryCard.vue`

### `pages/market/` (시장 정보)

#### 📉 `index.vue` (시장 지수)
- `components/domain/dashboard/IndexCard.vue`
- `components/charts/LineChart`

### `pages/settings/` (설정)

#### ⚙️ `index.vue` (설정 메인)
- `components/common/Button.vue`
- `components/common/Input.vue`

#### 💳 `plans.vue` (요금제)
- `lucide-vue` Icons (CheckCircle2)
