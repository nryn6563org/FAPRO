/**
 * Nuxt.js 설정 파일
 * Node.js 18 & Nuxt 2.15.8 호환성 최적화 버전
 */
export default {
  target: "static",

  head: {
    title: "RASSI FApro",
    htmlAttrs: {
      lang: "ko"
    },
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],
    link: [
      { rel: "icon", type: "image/x-icon", href: process.env.NODE_ENV === "production" ? "/FAPRO/favicon.ico" : "/favicon.ico" },
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" }
    ]
  },

  // 글로벌 CSS
  css: ["@/assets/css/main.css"],

  // 플러그인 설정
  plugins: [{ src: "@/plugins/vue-awesome-swiper", mode: "client" }],

  // 컴포넌트 자동 임포트 설정
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/common", pathPrefix: false },
    { path: "~/components/layout", pathPrefix: false },
    { path: "~/components/domain/dashboard", pathPrefix: false },
    { path: "~/components/charts", pathPrefix: false }
  ],

  // 빌드 모듈 (Tailwind를 모듈로 사용 시 여기에 '@nuxtjs/tailwindcss' 추가 가능)
  buildModules: ["@nuxtjs/tailwindcss"],

  // 앱 기능 확장 모듈
  modules: [],

  build: {
    publicPath: "/nuxt-project/",
    // CSS Source Map enabled for debugging
    cssSourceMap: true,
    postcss: {
      plugins: {
        "postcss-import": {},
        tailwindcss: {},
        autoprefixer: {},
        "postcss-custom-properties": false
      }
    },

    transpile: ["lucide-vue", "tailwind-merge", "clsx", "class-variance-authority", "echarts", "vue-echarts", "vue-demi", "zrender", "tslib"],
    babel: {
      // 파일 크기가 크더라도 압축 처리를 진행하여 경고를 제거합니다.
      compact: true
    },

    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      });
      config.resolve.alias.vue = "vue/dist/vue.common.js";
    }
  },

  router: {
    base: process.env.NODE_ENV === "production" ? "/FAPRO/" : "/"
  }
};
