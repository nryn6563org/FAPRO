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
- **주요 컴포넌트**:
  - `components/organisms/dashboard/CustomizableDashboard.vue`
    - **기능**: 위젯 드래그앤드롭 배치
    - **내부 컴포넌트**: `Widget.vue`, `DashboardHeader.vue`, `DashboardWidgetDialog.vue`
    - **위젯 목록**: `MarketIndexWidget`, `MarketTickerWidget`, `RevenueWidget`, `KeyClientsWidget` 등 (모두 `organisms/dashboard` 위치)
    - **CSS**: `assets/css/components/domain/dashboard/dashboard.css`
    - **라이브러리**: `vuedraggable` (DnD)

### 👥 Client Management (`pages/clients/`)

#### `pages/clients/index.vue` (고객 관리)
- **설명**: 고객 목록 조회, 검색, 필터링 및 상세 정보 모달
- **주요 컴포넌트**:
  - `components/molecules/Autocomplete.vue` (AI 고객 검색)
  - `components/organisms/ClientRegisterModal.vue` (신규 등록)
  - `components/organisms/ClientDetailModal.vue` (상세 정보)
  - `components/organisms/BulkRegisterModal.vue` (대량 고객 등록 [NEW])
- **Validation**: `utils/validation.js`

#### `pages/clients/consultation-notes.vue` [NEW]
- **설명**: 고객 상담 내역 기록 및 관리 페이지
- **CSS**: `assets/css/pages/consultation-notes.css`
- **Mock Data**: `utils/notes-data.js`

### 📈 Market Info (`pages/market/`)

#### `pages/market/breaking-news.vue` [NEW]
- **설명**: 시장 속보 및 AI 분석 결과 제공
- **CSS**: `assets/css/pages/breaking-news.css`
- **Mock Data**: `utils/news-data.js`

### ✅ Tasks (`pages/tasks/`)

#### `pages/tasks/today.vue` [NEW]
- **설명**: 캘린더 기반의 오늘 할 일 및 업무 메모 관리 페이지
- **CSS**: `assets/css/pages/todo-today.css`
- **Mock Data**: `utils/todo-data.js`

---

## 3. 디렉토리 구조 (Directory Structure - Atomic Design)

### `components/`
- **`atoms/`**: 가장 작은 단위의 컴포넌트 (Button, Input, Badge 등)
- **`molecules/`**: 2개 이상의 아톰이 조합된 컴포넌트 (Autocomplete, Dialog 등)
- **`organisms/`**: 복잡한 비즈니스 로직을 포함하는 유기체 단위 컴포넌트
  - `dashboard/`: 대시보드 관련 핵심 컴포넌트 및 위젯들
  - `investment/`: 투자 정보 관련 복잡한 패널 및 모달들
  - `GlobalHeader.vue`: 전역 헤더

### `assets/css/`
- **설계**: Tailwind CSS의 유틸리티와 커스텀 CSS를 조합하여 사용.
- **주요 파일**:
  - `main.css`: 전역 스타일 및 Tailwind 세팅
  - `design-system.css`: 디자인 토큰 (변수, 컬러, 타이포그래피)
  - **구조**: `pages/` 및 `components/` 하위 경로에 대응하는 CSS 파일 관리

### `utils/`
- `validation.js`: 폼 및 데이터 유효성 검증 로직
- `*-data.js`: UI 개발 및 테스트를 위한 모의 데이터 세트
- `cn.js`: Tailwind 클래스 병합 유틸리티
