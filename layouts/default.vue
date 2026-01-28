<!--
  Nuxt.js 기본 레이아웃 (Default Layout)

  [구조 설명]
  1. GlobalHeader: 상단 고정 헤더 (로그인, 테마 설정 등)
  2. Sidebar (Aside): 좌측 접이식 내비게이션 메뉴
  3. Main Content: 실제 페이지 콘텐츠가 표시되는 영역 (<nuxt />)
  4. Footer: 하단 정보 및 링크 영역

  [주요 기능]
  - 반응형 사이드바 토글 (Expanded/Collapsed)
  - 다크모드/라이트모드 테마 전환
  - 현재 페이지 경로에 따른 메뉴 활성화 (Active State)
  - 계층형(3단) 서브메뉴 지원
-->
<template>
  <div class="l-default">
    <!-- 1. 글로벌 헤더 컴포넌트: 상단 내비게이션 및 사용자 제어 -->
    <GlobalHeader
      :isLoggedIn="isLoggedIn"
      :currentTheme="currentTheme"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @logout="isLoggedIn = false"
      @login="$router.push('/login')"
      @theme-change="handleThemeChange"
    />

    <!-- 레이아웃 전체 컨테이너 (Flex Layout) -->
    <div class="l-default__container">
      <!-- 2. 사이드바: 내비게이션 메뉴 영역 -->
      <aside
        :class="[
          'l-sidebar',
          sidebarOpen ? 'l-sidebar--open' : 'l-sidebar--closed'
        ]"
      >
        <div class="l-sidebar__header">
          <button
            @click="$router.push('/settings/plans')"
            class="l-sidebar__upgrade-btn"
          >
            <Crown class="l-sidebar__upgrade-icon" />
            <span v-if="sidebarOpen" class="l-sidebar__upgrade-text">플랜 업그레이드</span>
          </button>
        </div>

        <nav class="l-sidebar__nav">
          <!-- 1차 메뉴 반복 렌더링 -->
          <div v-for="item in navItems" :key="item.id">
            <button
              @click="handleNavClick(item)"
              :class="[
                'l-sidebar__item',
                isActive(item.id) ? 'l-sidebar__item--active' : ''
              ]"
            >
              <!-- 메뉴 아이콘 (Lucide Icon) -->
              <component
                :is="item.icon"
                :class="[
                  'l-sidebar__icon',
                  isActive(item.id) ? 'l-sidebar__icon--active' : (currentTheme !== 'dark' ? item.color : 'l-sidebar__icon--inactive')
                ]"
              />
              <!-- 메뉴 라벨 (사이드바 열림 상태일 때만 표시) -->
              <span v-if="sidebarOpen" class="l-sidebar__text">{{ item.label }}</span>
              
              <!-- 하위 메뉴 화살표 표시 -->
              <template v-if="sidebarOpen && item.children">
                <ChevronDown v-if="expandedMenus.includes(item.id)" class="l-sidebar__chevron-icon" />
                <ChevronRight v-else class="l-sidebar__chevron-icon" />
              </template>
            </button>

            <!-- 2차 메뉴 (서브메뉴) 계층형 내비게이션 -->
            <div 
              v-if="item.children && sidebarOpen" 
              :class="['l-sidebar__submenu', expandedMenus.includes(item.id) ? '' : 'l-sidebar__submenu--hidden']"
            >
              <div v-for="subItem in item.children" :key="subItem.id">
                <button
                  @click="handleNavClick(subItem)"
                  :class="[
                    'l-sidebar__subitem',
                    isActive(subItem.id) ? 'l-sidebar__subitem--active' : ''
                  ]"
                >
                  <component
                    :is="subItem.icon"
                    :class="[
                      'l-sidebar__subicon',
                       isActive(subItem.id) ? 'l-sidebar__subicon--active' : (currentTheme !== 'dark' ? subItem.color : 'l-sidebar__subicon--inactive')
                    ]"
                  />
                  <span v-if="sidebarOpen" class="">{{ subItem.label }}</span>
                </button>

                <!-- 3차 메뉴 (서브-서브메뉴) -->
                <div 
                  v-if="subItem.children" 
                  :class="['l-sidebar__submenu', expandedMenus.includes(subItem.id) ? '' : 'l-sidebar__submenu--hidden']"
                >
                  <div v-for="subSubItem in subItem.children" :key="subSubItem.id">
                     <button
                      @click="handleNavClick(subSubItem)"
                      :class="[
                        'l-sidebar__subitem',
                        isActive(subSubItem.id) ? 'l-sidebar__subitem--active' : ''
                      ]"
                    >
                      <component
                        :is="subSubItem.icon"
                        :class="[
                          'l-sidebar__subsubicon',
                          isActive(subSubItem.id) ? 'l-sidebar__subicon--active' : (currentTheme !== 'dark' ? subSubItem.color : 'l-sidebar__subicon--inactive')
                        ]"
                      />
                      <span v-if="sidebarOpen">{{ subSubItem.label }}</span>
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <!-- 3. 메인 콘텐츠 영역 -->
      <div class="l-main">
        <!-- 메인 섹션 상단 헤더 (검색 및 지수 정보) -->
        <header v-if="!$route.path.includes('/settings/plans')" class="l-main__header">
          <div class="l-main__header-inner">
            <!-- 사용자 환영 메시지 및 날짜 -->
            <div class="l-main__welcome">
              <div>
                <p class="l-main__welcome-title">안녕하세요! 김승원FA님, 오늘도 좋은 하루 보내세요!</p>
              </div>
              <div>
                <p class="l-main__welcome-date">2026년 1월 20일 화요일</p>
              </div>
            </div>

            <!-- 종목 검색바 및 시장 지수 요약 카드 -->
            <div class="l-main__search-indices-wrapper">
              <div class="l-main__search-wrapper" @click="isIndexModalOpen = true">
                <Search class="l-main__search-icon" />
                <Input
                  readonly
                  placeholder="종목명 또는 종목코드를 입력하세요."
                  class="l-main__search-input"
                />
              </div>

               <!-- 지수 정보 미니 카드 목록 (KOSPI, KOSDAQ 등) -->
               <div class="l-main__indices">
                  <div 
                    v-for="index in displayedIndices" 
                    :key="index.id" 
                    :class="['c-mini-card', getIndexClass(index.name)]"
                  >
                      <div class="c-mini-card__content">
                          <!-- 지수 명칭 및 등락률 -->
                          <div class="c-mini-card__header">
                             <p class="c-mini-card__title">{{ index.name }}</p>
                             <span :class="['c-mini-card__change', index.change >= 0 ? 'c-mini-card__change--up' : 'c-mini-card__change--down']">
                                {{ index.change >= 0 ? '+' : '' }}{{ index.change }}%
                             </span>
                          </div>
                          <!-- 지수 가격 -->
                          <p class="c-mini-card__value">{{ index.value.toLocaleString() }}</p>
                      </div>


                      <!-- 지수 장식용 SVG 미니 차트 (상승 시 적색, 하락 시 청색) -->
                      <div class="c-mini-card__chart">
                          <svg viewBox="0 0 100 40" class="c-mini-card__chart-svg" preserveAspectRatio="none">
                              <path d="M0 30 Q 25 35, 50 20 T 100 10 V 40 H 0 Z" :fill="index.change >= 0 ? '#ef4444' : '#3b82f6'" />
                          </svg>
                      </div>

                      <!-- [NEW] 삭제 마스킹 (호버 시 노출) -->
                      <div class="c-mini-card__mask" @click.stop="removeIndex(index.id)">
                          <Trash2 class="c-mini-card__delete-icon" />
                      </div>
                  </div>
                  
                   <!-- 추가 버튼 (Add Button) -->
                   <div class="c-mini-card c-mini-card--add" @click="isIndexModalOpen = true">
                       <Plus class="c-mini-card__add-icon" />
                   </div>
               </div>
            </div>
          </div>
        </header>

        <!-- 실제 Nuxt 페이지 콘텐츠 렌더링 위치 -->
        <main class="l-main__content">
          <nuxt />
        </main>

         <!-- 4. 페이지 하단 푸터 영역 -->
         <footer class="l-footer">
            <div class="l-footer__inner">
              <div class="l-footer__copyright-wrapper">
                <p>© 2026 RASSI FApro. All rights reserved.</p>
                <div class="l-footer__links">
                  <a href="#" class="l-footer__link">이용약관</a>
                  <a href="#" class="l-footer__link">개인정보처리방침</a>
                  <a href="#" class="l-footer__link">고객센터</a>
                </div>
              </div>
              <div class="l-footer__contact-wrapper">
                <span>고객문의: 1588-1234</span>
                <span>|</span>
                <span>support@rassi.co.kr</span>
              </div>
            </div>
         </footer>
      </div>
    </div>
    
    <!-- 지수 선택 모달 -->
    <IndexSelectionDialog
      :is-open="isIndexModalOpen"
      :available-indices="allIndices"
      :current-selected-ids="selectedIndexIds"
      @update:open="isIndexModalOpen = $event"
      @close="isIndexModalOpen = false"
      @save="handleIndexSave"
    />

    <!-- 삭제 확인 다이얼로그 -->
    <Dialog :open="isDeleteConfirmOpen" className="c-dialog--small" @update:open="isDeleteConfirmOpen = $event">
      <div class="c-dialog-content">
        <h3 class="c-dialog-title">삭제 확인</h3>
        <p class="c-dialog-desc">선택한 지수를 화면에서 삭제하시겠습니까?</p>
        <div class="c-dialog-actions">
          <Button variant="outline" @click="cancelDelete">취소</Button>
          <Button @click="confirmDelete" class="c-dialog-btn-delete">삭제</Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
// 아이콘 라이브러리 (Lucide Vue)
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Zap,
  ChevronDown,
  ChevronRight,
  FileText,
  BarChart3,
  TrendingDown,
  Layers,
  FileBarChart,
  ClipboardList,
  Lightbulb,
  CalendarDays,
  Star,
  PieChart,
  LogOut,
  LogIn,
  Crown,
  Plus,
  Trash2
} from 'lucide-vue'
// 공통 컴포넌트 임포트
// 공통 컴포넌트 임포트
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import IndexSelectionDialog from '@/components/domain/dashboard/IndexSelectionDialog.vue'
import Dialog from '@/components/common/Dialog.vue'

export default {
  name: 'DefaultLayout',
  components: {
    // 사용된 아이콘 컴포넌트 등록
    LayoutDashboard,
    Users,
    TrendingUp,
    MessageSquare,
    Settings,
    Bell,
    Search,
    Menu,
    X,
    Zap,
    ChevronDown,
    ChevronRight,
    FileText,
    BarChart3,
    TrendingDown,
    Layers,
    FileBarChart,
    ClipboardList,
    Lightbulb,
    CalendarDays,
    Star,
    PieChart,
    LogOut,
    LogIn,
    Crown,
    Plus,
    Trash2,
    // UI 컴포넌트 등록
    Button,
    Input,
    GlobalHeader,
    IndexSelectionDialog,
    Dialog
  },
  data() {
    return {
      // 지수 선택 모달 상태
      isIndexModalOpen: false,
      
      // 전체 사용 가능 지수 목록 (ID 포함)
      allIndices: [
        { id: 'kospi', name: 'KOSPI', value: 2567.89, change: 1.2, category: '국내지수' },
        { id: 'kosdaq', name: 'KOSDAQ', value: 756.32, change: -0.8, category: '국내지수' },
        { id: 'sp500', name: 'S&P 500', value: 4783.45, change: 0.5, category: '해외지수' },
        { id: 'nasdaq', name: 'NASDAQ', value: 15310.97, change: 0.9, category: '해외지수' },
        { id: 'usdkrw', name: 'USD/KRW', value: 1342.50, change: 0.3, category: '환율' },
        { id: 'kospi200', name: 'KOSPI 200', value: 342.50, change: 1.1, category: '국내지수' },
        { id: 'dow', name: 'Dow Jones', value: 38001.81, change: 0.4, category: '해외지수' },
        { id: 'jpykrw', name: 'JPY/KRW', value: 905.20, change: -0.2, category: '환율' }
      ],
      
      // 현재 선택된 지수들의 ID 목록 (기본값 설정)
      selectedIndexIds: ['kospi', 'kosdaq', 'sp500', 'nasdaq', 'usdkrw'],

      // 삭제 확인 모달 상태
      isDeleteConfirmOpen: false,
      indexToDelete: null,

      sidebarOpen: true, // 사이드바 펼침(true)/접힘(false) 상태
      // 초기 확장 메뉴 설정 (투자정보, 마켓정보, AI추천종목을 기본으로 펼침)
      expandedMenus: ['investment-info', 'market-info', 'ai-recommend'],
      isLoggedIn: true, // 로그인 여부 (데모용)
      currentTheme: 'system', // 현재 테마 설정 ('light' | 'dark' | 'system')
      // 사이드바 내비게이션 아이템 정의 (계층 구조)
      // navItems -> children -> children 구조로 최대 3 depth 지원
      navItems: [
        { id: 'dashboard', label: '대시보드', icon: 'LayoutDashboard', route: '/', color: 'text-blue-600' },
        { id: 'clients', label: '고객 관리', icon: 'Users', route: '/clients', color: 'text-indigo-600' },
        { id: 'market', label: '시장 지수', icon: 'TrendingUp', route: '/market', color: 'text-rose-600' },
        {
          id: 'investment-info',
          label: '투자정보',
          icon: 'FileText',
          color: 'text-green-600',
          children: [
            {
              id: 'market-info',
              label: '마켓정보',
              icon: 'BarChart3',
              color: 'text-emerald-600',
              children: [
                { id: 'today-issue', label: '오늘의이슈', icon: 'Lightbulb', route: '/investment/today-issue', color: 'text-amber-500' },
                { id: 'price-analysis', label: '시세분석', icon: 'TrendingUp', route: '/investment/price-analysis', color: 'text-red-500' },
                { id: 'supply-analysis', label: '수급분석', icon: 'TrendingDown', route: '/investment/supply-analysis', color: 'text-blue-500' },
                { id: 'theme-sector', label: '테마/업종', icon: 'Layers', route: '/investment/theme-sector', color: 'text-purple-500' },
                { id: 'report-analysis', label: '리포트분석', icon: 'FileBarChart', route: '/investment/report-analysis', color: 'text-teal-500' },
                { id: 'disclosure-analysis', label: '공시분석', icon: 'ClipboardList', route: '/investment/disclosure-analysis', color: 'text-cyan-500' }
              ]
            },
            {
              id: 'ai-recommend',
              label: 'AI추천종목',
              icon: 'Star',
              color: 'text-yellow-600',
              children: [
                { id: 'today-pick', label: '오늘의종목Pick', icon: 'Star', route: '/investment/today-pick', color: 'text-yellow-500' },
                { id: 'recommend-stocks', label: '추천종목', icon: 'Lightbulb', route: '/investment/recommend-stocks', color: 'text-amber-500' }
              ]
            }
          ]
        },
        { id: 'trading-signals', label: 'AI매매시그널', icon: 'Zap', route: '/ai/signals', color: 'text-violet-600' },
        { id: 'chatbot', label: 'AI 챗봇', icon: 'MessageSquare', route: '/ai/assistant', color: 'text-fuchsia-600' },
        { id: 'settings', label: '설정', icon: 'Settings', route: '/settings', color: 'text-slate-600' }
      ]
    }
  },
  mounted() {
    this.initTheme() // 컴포넌트 마운트 시 저장된 테마 불러오기
  },
  watch: {
    $route() {
      // 페이지 이동 시 메인 콘텐츠 영역 스크롤 최상단으로 이동
      this.$nextTick(() => {
        const contentArea = this.$el.querySelector('.l-main__content')
        if (contentArea) {
          contentArea.scrollTop = 0
        }
      })
    }
  },
  methods: {
    /**
     * 초기 테마 설정 함수
     * 로컬 스토리지에서 테마 값을 확인하고 적용합니다.
     * 값이 없으면 기본값인 'system'을 사용합니다.
     */
    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.handleThemeChange(savedTheme)
      } else {
        this.handleThemeChange('system')
      }
    },
    /**
     * 테마 변경 핸들러
     * @param {string} mode - 'dark', 'light', 'system' 중 하나
     * - HTML 태그에 'dark' 클래스를 추가/제거하여 Tailwind 다크 모드 제어
     * - 로컬 스토리지에 사용자 설정을 저장
     */
    handleThemeChange(mode) {
      this.currentTheme = mode
      localStorage.setItem('theme', mode)

      const html = document.documentElement
      if (mode === 'dark') {
        html.classList.add('dark')
      } else if (mode === 'light') {
        html.classList.remove('dark')
      } else {
        // 시스템 설정 따름: OS 설정이 다크 모드인지 확인
        localStorage.removeItem('theme')
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
      }
    },
    /**
     * 현재 메뉴 활성화 상태 확인
     * @param {string} itemId - 메뉴 아이템 ID
     * @returns {boolean} - 현재 경로가 해당 아이템(또는 하위)에 속하면 true
     */
    isActive(itemId) {
      // 메뉴 트리에서 재귀적으로 아이템 검색
      const findItem = (items) => {
        for (const item of items) {
          if (item.id === itemId) { return item }
          if (item.children) {
            const found = findItem(item.children)
            if (found) { return found }
          }
        }
        return null
      }
      const item = findItem(this.navItems)
      if (!item || !item.route) { return false }

      // 루트 경로 예외 처리
      if (item.route === '/') { return this.$route.path === '/' }
      // 현재 경로가 메뉴 경로로 시작하는지 확인 (서브 라우트 포함)
      return this.$route.path.startsWith(item.route)
    },
    /**
     * 내비게이션 아이템 클릭 핸들러
     * @param {object} item - 클릭된 메뉴 아이템 객체
     * - 하위 메뉴가 있으면 토글
     * - 링크가 있으면 라우팅 이동
     */
    handleNavClick(item) {
      if (item.children) {
        this.toggleMenu(item.id)
      } else if (item.route) {
        this.$router.push(item.route)
      }
    },
    /**
     * 메뉴 펼침/접힘 토글 함수
     * @param {string} menuId - 토글할 메뉴 ID
     */
    toggleMenu(menuId) {
      if (this.expandedMenus.includes(menuId)) {
        this.expandedMenus = this.expandedMenus.filter(id => id !== menuId)
      } else {
        this.expandedMenus.push(menuId)
      }
    },
    
    /**
     * 지수 선택 저장 핸들러
     * @param {Array} newSelectedIds - 새로 선택된 지수들의 ID 목록
     */
    handleIndexSave(newSelectedIds) {
      this.selectedIndexIds = newSelectedIds
      this.isIndexModalOpen = false
    },

    /**
     * 메인화면 지수 카드 삭제 핸들러 (컨펌 모달 오픈)
     */
    removeIndex(id) {
      this.indexToDelete = id
      this.isDeleteConfirmOpen = true
    },

    confirmDelete() {
      if (this.indexToDelete) {
        this.selectedIndexIds = this.selectedIndexIds.filter(itemId => itemId !== this.indexToDelete)
        this.indexToDelete = null
      }
      this.isDeleteConfirmOpen = false
    },

    cancelDelete() {
      this.indexToDelete = null
      this.isDeleteConfirmOpen = false
    },


    /**
     * 지수 이름에 따른 동적 클래스 반환 (KOSPI, KOSDAQ 배경색)
     */
    getIndexClass(name) {
      if (name === 'KOSPI') return 'c-mini-card--kospi'
      if (name === 'KOSDAQ') return 'c-mini-card--kosdaq'
      return ''
    }
  },
  computed: {
    // 선택된 ID에 해당하는 지수 객체들만 필터링하여 반환
    displayedIndices() {
        // 선택된 ID 순서대로 정렬하거나, 전체 목록 순서를 따르거나 선택 가능.
        // 여기서는 전체 목록 순서 유지하면서 필터링
        return this.allIndices.filter(index => this.selectedIndexIds.includes(index.id))
    }
  }
}
</script>
<style src="@/assets/css/layouts/default.css"></style>
