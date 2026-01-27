# 프로젝트 구조 및 아키텍처 (Project Structure & Architecture)

이 문서는 FAPRO Nuxt.js 프로젝트의 기술 스택, 폴더 구조, 컴포넌트 의존성, 사용된 라이브러리 및 스타일(CSS) 위치를 상세하게 기록한 문서입니다.

---

## 1. 기술 스택 (Tech Stack)

### Core
- **Framework**: [Nuxt.js v2.15](https://nuxtjs.org/)
- **Language**: JavaScript (ES6+)
- **State Management**: Vuex (구조 존재, 현재 로컬 state 위주 사용)

### Styling & UI
- **CSS Framework**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: `lucide-vue` (SVG 아이콘)
- **CSS Architecture**: BEM Naming + Utility-first (Tailwind `@apply`)
- **Utils**: `class-variance-authority` (Variant 관리), `clsx`, `tailwind-merge`

### Visualization & Interaction
- **Charts**: `chart.js` (Core), `vue-chartjs` (Vue Wrapper)
- **Drag & Drop**: `vuedraggable`
- **Carousel**: `swiper` + `vue-awesome-swiper`

---

## 2. 페이지 및 컴포넌트 상세 트리 (Detailed Component Tree)

각 페이지별로 사용된 컴포넌트, 차트 라이브러리, CSS 파일 위치를 상세히 기술합니다.

### 🏠 Main (Root)

#### `pages/index.vue` (메인 대시보드)
- **설명**: 앱 진입점, 위젯 기반 사용자 정의 대시보드
- **CSS**: 없음 (컴포넌트 스타일 의존)
- **주요 컴포넌트**:
  - `components/domain/dashboard/CustomizableDashboard.vue`
    - **기능**: 위젯 드래그앤드롭 배치
    - **CSS**: `assets/css/components/domain/dashboard/dashboard.css`
    - **라이브러리**: `vuedraggable` (DnD), `lucide-vue` (아이콘)
    - **Mock Data**: `utils/dashboard-data.js`

### 🤖 AI Service (`pages/ai/`)

#### `pages/ai/assistant.vue` (AI 투자 비서)
- **설명**: 챗봇 인터페이스를 통한 투자 질의응답
- **CSS**: `assets/css/pages/assistant.css`
- **주요 컴포넌트**:
  - `components/common/Button.vue`, `Input.vue`
  - **Icons**: `lucide-vue` (`Bot`, `User`, `Send` 등)
- **특이사항**: `Mock Data`를 통한 채팅 시뮬레이션 구현

#### `pages/ai/signals.vue` (AI 매매 시그널)
- **설명**: 실시간 매매 신호(매수/매도/보유) 및 신뢰도 시각화
- **CSS**: `assets/css/pages/signals.css`
- **라이브러리**: `lucide-vue` (`Zap`, `TrendingUp`, `TrendingDown` 등)
- **데이터 시각화**: CSS 기반 Progress Bar로 신뢰도(Confidence) 표현

### � Client Management (`pages/clients/`)

#### `pages/clients/index.vue` (고객 관리)
- **설명**: 고객 목록 조회, 검색, 필터링 및 상세 정보 모달
- **CSS**: `assets/css/pages/clients.css`
- **주요 컴포넌트**:
  - `components/domain/clients/ClientRegisterModal.vue` (신규 등록)
  - `components/domain/clients/ClientDetailModal.vue` (상세 정보)
- **라이브러리**: `lucide-vue` (`Star`, `Phone`, `Calendar` 등)

### 📈 Investment Info (`pages/investment/`)

#### `pages/investment/today-issue.vue` (오늘의 이슈)
- **설명**: 이슈 버블 맵 및 관련 종목/뉴스 분석
- **CSS**: `assets/css/pages/today-issue.css`
- **데이터 시각화 (Charts)**:
  1. `components/investment/today-issue/IssueBubbleMap.vue`
     - **Type**: Custom SVG Visualization (Packed Bubble Layout)
     - **Algorithm**: 물리 엔진 없이 중앙 집중형 원형 패킹 알고리즘 직접 구현
     - **CSS**: `assets/css/components/investment/today-issue/issue-bubble-map.css`
  2. `components/investment/today-issue/IssueTrendChart.vue`
     - **Type**: Line Chart (`vue-chartjs` -> `Line`)
     - **Library**: `chart.js`
     - **CSS**: `assets/css/components/investment/today-issue/issue-trend-chart.css`

#### `pages/investment/recommend-stocks.vue` (추천 종목)
- **설명**: 전략별(성장/가치/모멘텀 등) 추천 종목 카드 리스트
- **CSS**: `assets/css/pages/recommend-stocks.css`
- **주요 컴포넌트**:
  - `RecommendStockCard.vue`, `RecommendHeroCard.vue`
- **특이사항**: `recommend-stocks-data.js`에서 전략별 분류 데이터 로드

#### `pages/investment/price-analysis.vue` (시세 분석)
- **설명**: 주요 시장 지수 차트 및 종목 시세 현황 테이블
- **CSS**: `assets/css/pages/price-analysis.css`
- **데이터 시각화 (Charts)**:
  - `components/investment/price-analysis/IndexChartCard.vue`
    - **Type**: Area Chart (`components/charts/AreaChart.js` via `vue-chartjs`)
    - **Library**: `chart.js`
    - **CSS**: `assets/css/components/investment/price-analysis/index-chart-card.css`
- **그 외 컴포넌트**:
  - `PriceStatusTable.vue`: 시세 테이블 (`assets/css/components/investment/price-analysis/price-status-table.css`)

#### `pages/investment/supply-analysis.vue` (수급 분석)
- **설명**: 외국인/기관 수급 현황 및 연속 순매수 분석
- **CSS**: `assets/css/pages/supply-analysis.css`
- **주요 컴포넌트**:
  - `SupplyDataTable.vue`: 수급 데이터 테이블
    - **CSS**: `assets/css/components/investment/supply-analysis/supply-table-components.css`
  - `MarketSummarySection.vue`: 수급 요약 카드
    - **CSS**: `assets/css/components/investment/supply-analysis/market-summary-section.css`

#### `pages/investment/report-analysis.vue` (리포트 분석)
- **설명**: 증권사 리포트 목록 및 PDF 뷰어(모달)
- **CSS**: `assets/css/pages/report-analysis.css`
- **주요 컴포넌트**:
  - `ReportDataTable.vue`: 리포트 리스트
  - `ReportDetailModal.vue`: 리포트 상세 보기 (내용 요약 및 의견 제시)

#### `pages/investment/theme-sector.vue` (테마/업종)
- **설명**: 주도 테마 및 업종 카드 리스트
- **CSS**: `assets/css/pages/theme-sector.css`
- **주요 컴포넌트**:
  - `CategoryCard.vue`: 등락률 및 주도주 표시 카드

### 📊 Market Info (`pages/market/`)

#### `pages/market/index.vue` (시장 지수)
- **설명**: 국내외 지수, 환율, 원자재 상세 차트 대시보드
- **CSS**: `assets/css/pages/market.css`
- **데이터 시각화 (Charts)**:
  - `components/charts/LineChart.js`: 상세 라인 차트 (`vue-chartjs` Wrapper)
  - **Library**: `chart.js`

### ⚙️ Settings (`pages/settings/`)

#### `pages/settings/index.vue` (설정)
- **설명**: 프로필, 알림, 시스템 설정 관리
- **CSS**: `assets/css/pages/settings.css`
- **라이브러리**: `lucide-vue` 아이콘 활용

#### `pages/settings/plans.vue` (요금제)
- **설명**: 요금제 비교 및 결제 관리
- **CSS**: `assets/css/pages/plans.css`
- **라이브러리**: `lucide-vue` (`CheckCircle2`)

---

## 3. 디렉토리 구조 (Directory Structure)

### `assets/css/`
- **설계**: Tailwind CSS의 유틸리티와 커스텀 CSS를 조합하여 사용.
- **주요 파일**:
  - `main.css`: Tailwind Directive 및 전역 스타일
  - `design-system.css`: `:root` 변수, 컬러 시스템, 공통 타이포그래피
  - **구조**: 페이지별(`pages/*.css`) 및 컴포넌트별(`components/**/*.css`)로 분리하여 관리

### `utils/`
- `*-data.js` 파일들은 백엔드 API 연동 전 UI 개발을 위한 **Mock Data**를 포함하고 있습니다.
- `cn.js`: `clsx`와 `tailwind-merge`를 결합한 유틸리티 함수로, 복잡한 클래스 조건부 렌더링을 처리합니다.
