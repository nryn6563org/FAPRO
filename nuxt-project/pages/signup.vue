<template>
  <div class="p-signup">
    <div class="p-signup__bg"></div>
    
    <main class="p-signup__container">
      <div class="p-signup__card">
        <header class="p-signup__header">
          <h1 class="p-signup__title">회원가입</h1>
          <p class="p-signup__subtitle">RASSI FApro의 회원이 되어보세요</p>
        </header>

        <form class="p-signup__form" @submit.prevent="handleSignup">
          <!-- 아이디 입력 필드 -->
          <div class="p-signup__field">
            <label for="username" class="p-signup__label">아이디</label>
            <div class="p-signup__input-group">
              <input 
                id="username"
                v-model="form.username"
                type="text" 
                placeholder="아이디를 입력하세요" 
                class="p-signup__input"
                :disabled="isIdChecked"
                required
              >
              <button 
                type="button" 
                :class="['p-signup__check-btn', { 'p-signup__check-btn--success': isIdChecked }]"
                @click="checkDuplicate"
              >
                {{ isIdChecked ? '완료' : '중복확인' }}
              </button>
            </div>
            <p v-if="!isIdChecked" class="p-signup__hint">6~20자 영문, 숫자 조합으로 입력하세요.</p>
          </div>

          <!-- 비밀번호 입력 필드 -->
          <div class="p-signup__field">
            <label for="password" class="p-signup__label">비밀번호</label>
            <input 
              id="password"
              v-model="form.password"
              type="password" 
              placeholder="비밀번호를 입력하세요" 
              class="p-signup__input"
              required
            >
            <p class="p-signup__hint">8자 이상 영문, 숫자, 특수문자를 혼용하세요.</p>
          </div>

          <!-- 비밀번호 확인 입력 필드 -->
          <div class="p-signup__field">
            <label for="passwordConfirm" class="p-signup__label">비밀번호 확인</label>
            <input 
              id="passwordConfirm"
              v-model="form.passwordConfirm"
              type="password" 
              placeholder="비밀번호를 다시 입력하세요" 
              class="p-signup__input"
              required
            >
          </div>

          <!-- 이름 입력 필드 -->
          <div class="p-signup__field">
            <label for="name" class="p-signup__label">성함</label>
            <input 
              id="name"
              v-model="form.name"
              type="text" 
              placeholder="성함을 입력하세요" 
              class="p-signup__input"
              required
            >
          </div>

          <!-- 휴대폰 번호 입력 필드 -->
          <div class="p-signup__field">
            <label for="phoneNumber" class="p-signup__label">휴대폰 번호</label>
            <div class="p-signup__input-group">
              <input 
                id="phoneNumber"
                v-model="form.phoneNumber"
                type="tel" 
                placeholder="숫자만 입력하세요" 
                class="p-signup__input"
                :disabled="isPhoneVerified"
                required
              >
              <button 
                v-if="!isPhoneVerified"
                type="button" 
                class="p-signup__check-btn" 
                @click="sendVerificationCode"
              >
                {{ codeSent ? '재전송' : '인증번호 전송' }}
              </button>
              <div v-else class="p-signup__check-btn p-signup__check-btn--success flex items-center justify-center">
                <span>완료</span>
              </div>
            </div>
          </div>

          <!-- 인증번호 입력 필드 (조건부 렌더링) -->
          <div v-if="codeSent && !isPhoneVerified" class="p-signup__field">
            <label for="verificationCode" class="p-signup__label">인증번호</label>
            <div class="p-signup__input-group">
              <input 
                id="verificationCode"
                v-model="form.verificationCode"
                type="text" 
                placeholder="인증번호 6자리를 입력하세요" 
                class="p-signup__input"
                required
              >
              <button type="button" class="p-signup__check-btn" @click="verifyCode">확인</button>
            </div>
          </div>

          <!-- 이메일 입력 필드 -->
          <div class="p-signup__field">
            <label for="email" class="p-signup__label">이메일</label>
            <input 
              id="email"
              v-model="form.email"
              type="email" 
              placeholder="이메일을 입력하세요" 
              class="p-signup__input"
              required
            >
            <p v-if="emailError" class="p-signup__hint p-signup__hint--error">{{ emailError }}</p>
          </div>

          <button type="submit" class="p-signup__submit-btn">가입하기</button>
        </form>

        <footer class="p-signup__footer">
          이미 계정이 있으신가요?
          <nuxt-link to="/login" class="p-signup__login-link">로그인</nuxt-link>
        </footer>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  // 컴포넌트 이름: 회원가입 페이지
  name: 'SignupPage',
  layout: 'empty',
  data() {
    return {
      codeSent: false,
      isIdChecked: false,
      isPhoneVerified: false,
      emailError: '',
      form: {
        username: '',
        name: '',
        phoneNumber: '',
        verificationCode: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  methods: {
    checkDuplicate() {
      if (!this.form.username) {
        alert('아이디를 입력해주세요.')
        return
      }
      this.isIdChecked = true
      alert('사용 가능한 아이디입니다.')
    },
    sendVerificationCode() {
      if (!this.form.phoneNumber) {
        alert('휴대폰 번호를 입력해주세요.')
        return
      }
      this.codeSent = true
      alert('인증번호가 전송되었습니다.')
    },
    verifyCode() {
      if (!this.form.verificationCode) {
        alert('인증번호를 입력해주세요.')
        return
      }
      this.isPhoneVerified = true
      alert('인증이 완료되었습니다.')
    },
    handleSignup() {
      // 에러 메시지 초기화
      this.emailError = ''

      if (!this.isIdChecked) {
        alert('아이디 중복확인을 해주세요.')
        return
      }
      if (!this.isPhoneVerified) {
        alert('휴대폰 인증을 해주세요.')
        return
      }
      
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.form.email)) {
        this.emailError = '올바른 이메일 형식이 아닙니다.'
        return
      }

      // 회원가입 로직 실행 (유효성 검사 통과 후)
      if (this.form.password !== this.form.passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/signup.css';
</style>
