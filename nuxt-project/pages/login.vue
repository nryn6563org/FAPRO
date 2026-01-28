<template>
  <!-- 로그인 페이지 컨테이너 -->
  <div class="p-login">
    <div class="p-login__bg"></div>
    
    <main class="p-login__container">
      <div class="p-login__card">
        <!-- 필요시 닫기 버튼 추가 (현재 디자인에서는 독립형 로그인 페이지라 미사용) -->
        
        <header class="p-login__header">
          <div class="p-login__logo-box">
            <span class="p-login__logo-text">RASSI</span>
            <span class="p-login__logo-subtext">FApro</span>
          </div>
          <p class="p-login__subtitle">증권사 FA를 위한 전문 플랫폼</p>
        </header>

        <form class="p-login__form" @submit.prevent="handleLogin">
          <div class="p-login__field">
            <label for="username" class="p-login__label">아이디</label>
            <input 
              id="username"
              v-model="username"
              type="text" 
              placeholder="아이디를 입력하세요" 
              class="p-login__input"
            >
          </div>

          <div class="p-login__field">
            <label for="password" class="p-login__label">비밀번호</label>
            <div class="p-login__input-wrapper">
              <input 
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="비밀번호를 입력하세요" 
                class="p-login__input"
              >
              <button 
                type="button" 
                class="p-login__toggle-password"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'icon-eye-off' : 'icon-eye'"></i>
              </button>
            </div>
          </div>

          <div class="p-login__options">
            <label class="p-login__checkbox-label">
              <input v-model="saveId" type="checkbox" class="p-login__checkbox">
              <span>아이디 저장</span>
            </label>
            <label class="p-login__checkbox-label">
              <input v-model="stayLoggedIn" type="checkbox" class="p-login__checkbox">
              <span>로그인 유지</span>
            </label>
          </div>

          <button type="submit" class="p-login__submit-btn">로그인</button>
        </form>

        <div class="p-login__divider">
          <span>또는</span>
        </div>

        <nav class="p-login__links">
          <a href="#" class="p-login__link">아이디 찾기</a>
          <span class="p-login__link-divider"></span>
          <a href="#" class="p-login__link">비밀번호 찾기</a>
        </nav>

        <nuxt-link to="/signup" class="p-login__signup-btn text-center">회원가입</nuxt-link>

        <footer class="p-login__footer">
          &copy; 2024 RASSI FApro. All rights reserved.
        </footer>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  // 컴포넌트 이름: 로그인 페이지
  name: 'LoginPage',
  layout: 'empty', // 빈 레이아웃 사용 (헤더/사이드바 없음)
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      saveId: false,
      stayLoggedIn: false
    }
  },
  methods: {
    handleLogin() {
      // 실제 인증 로직 연동 전, 대시보드로 리다이렉트 처리
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/login.css';
</style>
