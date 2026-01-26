<template>
  <header class="l-header">
    <!-- 좌측: 로고 및 사이드바 토글 버튼 -->
    <div class="l-header__left">
      <button
        @click="$emit('toggle-sidebar')"
        class="l-header__toggle-btn"
      >
        <Menu class="l-header__icon" />
      </button>

      <div class="l-header__brand">
        <div class="l-header__logo">
          <span class="l-header__logo-text">FA</span>
        </div>
        <div>
           <h1 class="l-header__title">RASSI FApro</h1>
        </div>
      </div>
    </div>

    <!-- 우측: 테마 설정, 사용자 정보 및 로그아웃/로그인 버튼 -->
    <div class="l-header__right">
       <!-- 테마 전환 버튼 (Light/Dark/System) -->
       <div class="l-header__theme-wrapper">
          <button
             @click="toggleThemeMenu"
             class="l-header__theme-btn"
          >
             <Sun v-if="currentTheme === 'light'" class="l-header__icon" />
             <Moon v-else-if="currentTheme === 'dark'" class="l-header__icon" />
             <Monitor v-else class="l-header__icon" />
          </button>

          <!-- 테마 선택 드롭다운 메뉴 -->
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

       <!-- Logged In State -->
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

       <!-- 비로그인 상태 (로그인 유도 버튼) -->
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
import { Menu, LogOut, LogIn, User, Sun, Moon, Monitor } from 'lucide-vue'

export default {
  name: 'GlobalHeader',
  components: {
    Menu, LogOut, LogIn, User, Sun, Moon, Monitor
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    currentTheme: {
      type: String,
      default: 'system'
    }
  },
  data() {
    return {
      isThemeMenuOpen: false
    }
  },
  methods: {
    toggleThemeMenu() {
      this.isThemeMenuOpen = !this.isThemeMenuOpen
    },
    setTheme(mode) {
      this.$emit('theme-change', mode)
      this.isThemeMenuOpen = false
    }
  }
}
</script>

<style src="@/assets/css/components/layout/header.css"></style>
