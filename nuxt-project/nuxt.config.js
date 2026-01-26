/**
 * Nuxt.js 설정 파일
 * 앱의 전역 설정, 헤더, CSS, 빌드 옵션 등을 정의합니다.
 */
export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'RASSI FApro',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }, { name: 'format-detection', content: 'telephone=no' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/vue-awesome-swiper', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/components/common', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/domain/dashboard', pathPrefix: false },
    { path: '~/components/charts', pathPrefix: false }
  ],

  // ✅ @nuxt/postcss8 모듈 제거 (Nuxt 내장 버전 사용)
  // 빌드 모듈 설정: 개발 및 빌드 단계에서 사용되는 모듈
  buildModules: [],

  // 모듈 설정: 앱의 기능을 확장하는 외부 모듈
  modules: [],

  // 빌드 설정: Webpack 및 PostCSS 관련 최적화 옵션
  build: {
    transpile: ['lucide-vue', 'tailwind-merge', 'clsx', 'class-variance-authority'],
    // ✅ PostCSS 구조 변경
    postcss: {
      postcssOptions: {
        preset: {
          features: {
            'is-pseudo-class': false
          }
        },
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    },
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      })
    }
  },
  router: {
    base: '/FAPRO/'
  }
}
