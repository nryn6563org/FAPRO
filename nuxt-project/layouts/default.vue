<template>
  <div class="l-default">
    <!-- Global Header -->
    <GlobalHeader 
      :isLoggedIn="isLoggedIn" 
      :currentTheme="currentTheme"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @logout="isLoggedIn = false"
      @login="isLoggedIn = true"
      @theme-change="handleThemeChange"
    />

    <!-- 레이아웃 전체 컨테이너 -->
    <div class="l-default__container">
    <!-- 사이드바: 내비게이션 메뉴 영역 -->
    <aside
      :class="[
        'l-sidebar',
        sidebarOpen ? 'l-sidebar--open' : 'l-sidebar--closed'
      ]"
    >
      <nav class="l-sidebar__nav">
        <div v-for="item in navItems" :key="item.id">
          <button
            @click="handleNavClick(item)"
            :class="[
              'l-sidebar__item',
              isActive(item.id) ? 'l-sidebar__item--active' : ''
            ]"
          >
            <component 
              :is="item.icon" 
              :class="[
                'l-sidebar__icon',
                isActive(item.id) ? 'l-sidebar__icon--active' : (currentTheme !== 'dark' ? item.color : 'l-sidebar__icon--inactive')
              ]" 
            />
            <span v-if="sidebarOpen" class="l-sidebar__text">{{ item.label }}</span>
            <template v-if="sidebarOpen && item.children">
              <ChevronDown v-if="expandedMenus.includes(item.id)" class="u-icon-sm-shrink-0" />
              <ChevronRight v-else class="u-icon-sm-shrink-0" />
            </template>
          </button>
          
          <!-- 서브메뉴 (계층형 내비게이션) -->
          <div v-if="item.children && sidebarOpen" :class="['l-sidebar__submenu', expandedMenus.includes(item.id) ? '' : 'l-sidebar__submenu--hidden']">
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
                    'u-icon-sm-shrink-0 transition-colors',
                     isActive(subItem.id) ? 'l-sidebar__subicon--active' : (currentTheme !== 'dark' ? subItem.color : 'l-sidebar__subicon--inactive')
                  ]" 
                />
                <span v-if="sidebarOpen" class="">{{ subItem.label }}</span>
              </button>
              
              <div v-if="subItem.children" :class="['l-sidebar__submenu', expandedMenus.includes(subItem.id) ? '' : 'l-sidebar__submenu--hidden']">
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
                        'u-icon-xs-shrink-0 transition-colors',
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

    <!-- 메인 콘텐츠 영역 -->
    <div class="l-main">
      <!-- 메인 섹션 상단 헤더 (검색 및 지수 정보) -->
      <header class="l-main__header">
        <div class="u-flex-col-gap-3">
          <!-- 사용자 환영 메시지 -->
          <div class="l-main__welcome">
            <div>
              <p class="u-text-lg-bold">안녕하세요! 김승원FA님, 오늘도 좋은 하루 보내세요!</p>
            </div>
            <div>
              <p class="u-text-xs-slate">2026년 1월 20일 화요일</p>
            </div>
          </div>
          
          <!-- 종목 검색 및 지수 요약 카드 -->
          <div class="u-flex-col-gap-3">
            <div class="l-main__search-wrapper">
              <Search class="l-main__search-icon" />
              <Input
                placeholder="종목명 또는 종목코드를 입력하세요."
                class="l-main__search-input"
              />
            </div>
            
             <!-- 지수 정보 미니 카드 목록 -->
             <div class="l-main__indices">
                <div v-for="index in headerIndices" :key="index.name" class="c-mini-card">
                    <div class="c-mini-card__content">
                        <div class="c-mini-card__header">
                           <p class="c-mini-card__title">{{ index.name }}</p>
                           <span :class="['c-mini-card__change', index.change >= 0 ? 'c-mini-card__change--up' : 'c-mini-card__change--down']">
                              {{ index.change >= 0 ? '+' : '' }}{{ index.change }}%
                           </span>
                        </div>
                        <p class="c-mini-card__value">{{ index.value.toLocaleString() }}</p>
                    </div>
                    
                    <!-- 지수 장식용 SVG 라인 (상승 시 적색, 하락 시 청색) -->
                    <div class="c-mini-card__chart">
                        <svg viewBox="0 0 100 40" class="u-full" preserveAspectRatio="none">
                            <path d="M0 30 Q 25 35, 50 20 T 100 10 V 40 H 0 Z" :fill="index.change >= 0 ? '#ef4444' : '#3b82f6'" />
                        </svg>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      <!-- 실제 페이지 내용이 렌더링되는 곳 -->
      <main class="l-main__content">
        <nuxt />
      </main>

       <!-- 페이지 하단 푸터 영역 -->
       <footer class="l-footer">
          <div class="l-footer__inner">
            <div class="u-flex-center-gap-6">
              <p>© 2026 RASSI FApro. All rights reserved.</p>
              <div class="l-footer__links">
                <a href="#" class="l-footer__link">이용약관</a>
                <a href="#" class="l-footer__link">개인정보처리방침</a>
                <a href="#" class="l-footer__link">고객센터</a>
              </div>
            </div>
            <div class="u-flex-center-gap-2">
              <span>고객문의: 1588-1234</span>
              <span>|</span>
              <span>support@rassi.co.kr</span>
            </div>
          </div>
       </footer>
    </div>
    </div>
  </div>
</template>


<script>
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
  LogIn
} from 'lucide-vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import GlobalHeader from '@/components/layout/GlobalHeader.vue';


export default {
  name: "DefaultLayout",
  components: {
    LayoutDashboard, Users, TrendingUp, MessageSquare, Settings, Bell, Search, Menu, X, Zap, ChevronDown, ChevronRight, FileText, BarChart3, TrendingDown, Layers, FileBarChart, ClipboardList, Lightbulb, CalendarDays, Star, PieChart, LogOut, LogIn,
    Button, Input, GlobalHeader
  },
  data() {
    return {
      // 상단 헤더 지수 정보
      headerIndices: [
        { name: 'KOSPI', value: 2567.89, change: 1.2 },
        { name: 'KOSDAQ', value: 756.32, change: -0.8 },
        { name: 'S&P 500', value: 4783.45, change: 0.5 },
        { name: 'NASDAQ', value: 15310.97, change: 0.9 },
        { name: 'USD/KRW', value: 1342.50, change: 0.3 },
      ],
      sidebarOpen: true,      // 사이드바 펼침/접힘 상태
      // 초기 확장 메뉴 (투자정보, 마켓정보, AI추천종목)
      expandedMenus: ['investment-info', 'market-info', 'ai-recommend'],
      isLoggedIn: true,       // 로그인 여부 (데모용)
      currentTheme: 'system', // 현재 테마 설정
      // 사이드바 내비게이션 아이템 정의 (계층 구조)
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
                { id: 'disclosure-analysis', label: '공시분석', icon: 'ClipboardList', route: '/investment/disclosure-analysis', color: 'text-cyan-500' },
              ]
            },
            {
              id: 'ai-recommend',
              label: 'AI추천종목',
              icon: 'Star',
              color: 'text-yellow-600',
              children: [
                { id: 'today-pick', label: '오늘의종목Pick', icon: 'Star', route: '/investment/today-pick', color: 'text-yellow-500' },
                { id: 'daily-stocks', label: '오늘의 종목 일자별 보기', icon: 'CalendarDays', route: '/investment/daily-stocks', color: 'text-orange-500' },
                { id: 'recommend-stocks', label: '추천종목', icon: 'Lightbulb', route: '/investment/recommend-stocks', color: 'text-amber-500' },
                { id: 'recommend-return', label: '추천종목수익률', icon: 'PieChart', route: '/investment/recommend-return', color: 'text-pink-500' },
              ]
            }
          ]
        },
        { id: 'trading-signals', label: 'AI매매시그널', icon: 'Zap', route: '/ai/signals', color: 'text-violet-600' },
        { id: 'chatbot', label: 'AI 챗봇', icon: 'MessageSquare', route: '/ai/assistant', color: 'text-fuchsia-600' },
        { id: 'settings', label: '설정', icon: 'Settings', route: '/settings', color: 'text-slate-600' },
      ]
    };
  },
  mounted() {
    this.initTheme();
  },
  methods: {
    // 초기 테마 설정 (로컬 스토리지 확인)
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.handleThemeChange(savedTheme);
        } else {
            this.handleThemeChange('system');
        }
    },
    // 다크 모드/라이트 모드 테마 변경 처리
    handleThemeChange(mode) {
        this.currentTheme = mode;
        localStorage.setItem('theme', mode);

        const html = document.documentElement;
        if (mode === 'dark') {
            html.classList.add('dark');
        } else if (mode === 'light') {
            html.classList.remove('dark');
        } else {
            // 시스템 설정에 따름
            localStorage.removeItem('theme'); 
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    },
    // 현재 경로가 내비게이션 아이템과 일치하는지 확인 (Active 상태 결정)
    isActive(itemId) {
      // 메뉴 트리에서 특정 ID 아이템 찾기 (재귀)
      const findItem = (items) => {
          for (const item of items) {
              if (item.id === itemId) return item;
              if (item.children) {
                  const found = findItem(item.children);
                  if (found) return found;
              }
          }
          return null;
      }
      const item = findItem(this.navItems);
      if (!item || !item.route) return false;
      
      if (item.route === '/') return this.$route.path === '/';
      return this.$route.path.startsWith(item.route);
    },
    // 내비게이션 아이템 클릭 시 라우팅 또는 메뉴 토글
    handleNavClick(item) {
      if (item.children) {
        this.toggleMenu(item.id);
      } else if (item.route) {
        this.$router.push(item.route);
      }
    },
    // 서브메뉴 펼침/접힘 토글
    toggleMenu(menuId) {
      if (this.expandedMenus.includes(menuId)) {
        this.expandedMenus = this.expandedMenus.filter(id => id !== menuId);
      } else {
        this.expandedMenus.push(menuId);
      }
    }
  }
};
</script>
<style src="@/assets/css/layouts/default.css"></style>
