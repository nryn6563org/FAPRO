export default {
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "RASSI FApro",
    htmlAttrs: {
      lang: "ko"
    },
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/common", pathPrefix: false },
    { path: "~/components/layout", pathPrefix: false },
    { path: "~/components/domain/dashboard", pathPrefix: false },
    { path: "~/components/charts", pathPrefix: false }
  ],

  // ✅ @nuxt/postcss8 모듈 제거 (Nuxt 내장 버전 사용)
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["lucide-vue", "tailwind-merge", "clsx", "class-variance-authority"],
    // ✅ PostCSS 구조 변경
    postcss: {
      postcssOptions: {
        preset: {
          features: {
            "is-pseudo-class": false
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
        type: "javascript/auto"
      });
    }
  },
  router: {
    base: "/FAPRO/"
  }
};
