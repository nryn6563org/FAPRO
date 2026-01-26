<!--
  글로벌 헤더 컴포넌트 (GlobalHeader)
  - 애플리케이션 상단바 역할을 수행합니다.
  - 사이드바 토글 버튼, 브랜드 로고, 테마 설정, 사용자 정보 표시 및 로그아웃 기능을 포함합니다.
-->
<template>
  <header class="l-header">
    <!-- 좌측 영역: 사이드바 토글 및 브랜드 로고 -->
    <div class="l-header__left">
      <!-- 사이드바 접기/펼치기 버튼 -->
      <button
        @click="$emit('toggle-sidebar')"
        class="l-header__toggle-btn"
      >
        <Menu class="l-header__icon" />
      </button>

      <!-- 브랜드 로고 및 타이틀 -->
      <div class="l-header__brand">
        <div class="l-header__logo">
          <span class="l-header__logo-text">FA</span>
        </div>
        <div>
           <h1 class="l-header__title">RASSI FApro</h1>
        </div>
      </div>
    </div>

    <!-- 우측 영역: 테마 설정, 사용자 정보, 로그인/로그아웃 -->
    <div class="l-header__right">
       <!-- 테마 변경 버튼 및 드롭다운 메뉴 -->
       <div class="l-header__theme-wrapper">
          <button
             @click="toggleThemeMenu"
             class="l-header__theme-btn"
          >
             <!-- 현재 테마에 따른 아이콘 표시 -->
             <Sun v-if="currentTheme === 'light'" class="l-header__icon" />
             <Moon v-else-if="currentTheme === 'dark'" class="l-header__icon" />
             <Monitor v-else class="l-header__icon" />
          </button>

          <!-- 테마 선택 드롭다운 (Light / Dark / System) -->
          <div v-if="isThemeMenuOpen" class="l-header__theme-menu">
             <button @click="setTheme('light')" class="l-header__theme-item">
                <Sun class="l-header__icon--sm" /> Light
             </button>
             <button @click="setTheme('dark')" class="l-header__theme-item">
                <Moon class="l-header__icon--sm" /> Dark
             </button>
             <button @click="setTheme('system')" class="l-header__theme-item">
                <Monitor class="l-header__icon--sm" /> System
             </button>
          </div>
       </div>

       <!-- 로그인 상태일 때: 사용자 프로필 및 로그아웃 버튼 -->
       <div v-if="isLoggedIn" class="l-header__user-wrapper">
          <div class="l-header__user-info">
             <div class="l-header__user-text">
               <p class="l-header__user-name">김승원 FA</p>
               <p class="l-header__user-rank">프리미어 등급</p>
             </div>
             <div class="l-header__user-avatar">
                <User class="l-header__user-icon" />
             </div>
          </div>
          <button
            @click="$emit('logout')"
            class="l-header__logout-btn"
            title="로그아웃"
          >
            <LogOut class="l-header__icon" />
          </button>
       </div>

       <!-- 비로그인 상태일 때: 로그인 버튼 -->
       <div v-else class="l-header__login-wrapper">
          <button
             @click="$emit('login')"
             class="l-header__login-btn"
          >
             <LogIn class="l-header__icon--sm" />
             <span>로그인</span>
          </button>
       </div>
    </div>
  </header>
</template>

<script>
// 아이콘 컴포넌트 임포트 (Lucide Vue)
import { Menu, LogOut, LogIn, User, Sun, Moon, Monitor } from 'lucide-vue'

export default {
  // 컴포넌트 이름: 글로벌 헤더
  name: 'GlobalHeader',
  components: {
    // 사용된 아이콘 등록
    Menu, LogOut, LogIn, User, Sun, Moon, Monitor
  },
  props: {
    // 사용자 로그인 상태 여부
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    // 현재 적용된 테마 ('light' | 'dark' | 'system')
    currentTheme: {
      type: String,
      default: 'system'
    }
  },
  data() {
    return {
      // 테마 변경 메뉴 열림/닫힘 상태
      isThemeMenuOpen: false
    }
  },
  methods: {
    // 테마 메뉴 토글
    toggleThemeMenu() {
      this.isThemeMenuOpen = !this.isThemeMenuOpen
    },
    /**
     * 테마 설정 변경
     * @param {string} mode - 변경할 테마 모드
     * - 부모 컴포넌트(Layout)에게 'theme-change' 이벤트 전달
     */
    setTheme(mode) {
      this.$emit('theme-change', mode)
      this.isThemeMenuOpen = false
    }
  }
}
</script>

<!-- 헤더 스타일 (CSS) -->
<style src="@/assets/css/components/layout/header.css"></style>
