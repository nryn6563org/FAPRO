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
      <div class="l-header__brand" @click="gotoMain">
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
       <div class="l-header__actions-group">
          <!-- 테마 변경 버튼 및 드롭다운 메뉴 -->
          <div class="l-header__theme-wrapper">
             <button
                @click="toggleThemeMenu"
                class="l-header__theme-btn u-tooltip"
                data-tooltip="테마 변경"
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

          <!-- 언어/자동번역 버튼 및 드롭다운 (일시 숨김) -->
          <!-- <div class="l-header__lang-wrapper">
             <button
                @click="toggleLangMenu"
                :class="['l-header__lang-btn u-tooltip', isTranslated ? 'l-header__lang-btn--active' : '']"
                :data-tooltip="isTranslated ? '언어 선택 (번역 중)' : '자동 번역'"
             >
                <Globe class="l-header__icon" />
             </button>

             <div v-if="isLangMenuOpen" class="l-header__lang-menu">
                <button @click="selectLanguage('ko')" class="l-header__lang-item">
                   <span class="l-header__lang-flag">🇰🇷</span> 한국어
                </button>
                <button @click="selectLanguage('en')" class="l-header__lang-item">
                   <span class="l-header__lang-flag">🇺🇸</span> English
                </button>
                <button @click="selectLanguage('ja')" class="l-header__lang-item">
                   <span class="l-header__lang-flag">🇯🇵</span> 日本語
                </button>
                <button @click="selectLanguage('zh-CN')" class="l-header__lang-item">
                   <span class="l-header__lang-flag">🇨🇳</span> 简体中文
                </button>
             </div>
          </div> -->
       </div>

       <!-- 구글 번역 엘리먼트 (아이콘 클릭 시 트리거 되도록 최적화 가능) -->
       <div id="google_translate_element" style="display: none;"></div>

       <!-- 로그인 상태일 때: 사용자 프로필 및 로그아웃 버튼 -->
       <div v-if="isLoggedIn" class="l-header__user-wrapper">
          <div class="l-header__user-info u-cursor-pointer" @click="$router.push('/settings')">
             <div class="l-header__user-text">
               <p class="l-header__user-name">김승원 FA</p>
               <p class="l-header__user-rank">베이직 플랜</p>
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
import { Menu, LogOut, LogIn, User, Sun, Moon, Monitor, Globe } from 'lucide-vue'

export default {
  // 컴포넌트 이름: 글로벌 헤더
  name: 'GlobalHeader',
  components: {
    // 사용된 아이콘 등록
    Menu, LogOut, LogIn, User, Sun, Moon, Monitor, Globe
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
      isThemeMenuOpen: false,
      // 언어 선택 메뉴 열림/닫힘 상태
      isLangMenuOpen: false,
      // 자동 번역 활성화 여부
      isTranslated: false
    }
  },
  mounted() {
    // 구글 번역 스크립트 로드
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        // eslint-disable-next-line no-undef
        new google.translate.TranslateElement({
          pageLanguage: 'ko',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element')
      }
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.head.appendChild(script)
    }
  },
  methods: {
    // 테마 메뉴 토글
    toggleThemeMenu() {
      this.isThemeMenuOpen = !this.isThemeMenuOpen
      this.isLangMenuOpen = false // 다른 메뉴 닫기
    },
    // 언어 메뉴 토글
    toggleLangMenu() {
      this.isLangMenuOpen = !this.isLangMenuOpen
      this.isThemeMenuOpen = false // 다른 메뉴 닫기
    },
    /**
     * 특정 언어로 번역 수행
     * @param {string} langCode - 대상 언어 코드 (ko, en, ja, zh-CN)
     */
    selectLanguage(langCode) {
      this.isLangMenuOpen = false
      this.isTranslated = langCode !== 'ko'

      // 구글 번역 위젯의 콤보박스를 찾아 값을 변경하고 이벤트를 발생시킵니다.
      const combo = document.querySelector('.goog-te-combo')
      if (combo) {
        combo.value = langCode
        combo.dispatchEvent(new Event('change'))
      } else {
        // 위젯이 아직 로드되지 않았거나 찾을 수 없는 경우 경고 (실제로는 mounted에서 로드함)
        console.warn('Google Translate widget not found')
      }
    },
    /**
     * 테마 설정 변경
     * @param {string} mode - 변경할 테마 모드
     * - 부모 컴포넌트(Layout)에게 'theme-change' 이벤트 전달
     */
    setTheme(mode) {
      this.$emit('theme-change', mode)
      this.isThemeMenuOpen = false
    },
    gotoMain() {
      this.$router.push('/')
    }
  }
}
</script>

<!-- 헤더 스타일 (CSS) -->
<style src="@/assets/css/components/layout/header.css"></style>
