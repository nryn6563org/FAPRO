<template>
  <div class="p-breaking-news">
    <div class="c-page-header">
      <h1 class="c-page-header__title">뉴스속보</h1>
      <p class="c-page-header__desc">실시간으로 업데이트되는 주요 시장 뉴스를 확인하세요.</p>
    </div>

    <!-- 카테고리 탭 -->
    <div class="c-news-tabs">
      <button 
        v-for="cat in categories" 
        :key="cat.id" 
        class="c-news-tab"
        :class="{ 'c-news-tab--active': activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        {{ cat.label }}
      </button>
    </div>

    <div class="c-investment-container">
      <div class="c-news-list">
        <div v-for="news in filteredNews" :key="news.id" class="c-news-item">
          <div class="c-news-item__top">
            <span v-if="news.isNew" class="c-news-badge c-news-badge--new">NEW</span>
            <span v-if="news.isAI" class="c-news-badge c-news-badge--ai">
              <Sparkles class="c-news-badge--ai-icon" />
              AI분석
            </span>
            <span class="c-news-item__source">{{ news.source }}</span>
            <span class="c-news-item__time">{{ news.time }}</span>
          </div>
          <h3 class="c-news-item__title">{{ news.title }}</h3>
          <div class="c-news-item__tags">
            <span v-for="tag in news.tags" :key="tag" class="c-news-item__tag">#{{ tag }}</span>
          </div>
        </div>
      </div>

      <div v-if="filteredNews.length === 0" class="flex items-center justify-center py-20 text-slate-400">
        해당 카테고리에 뉴스가 없습니다.
      </div>
    </div>
  </div>
</template>

<script>
import { Sparkles } from 'lucide-vue'
import { NEWS_CATEGORIES, mockNews } from '@/utils/news-data'

export default {
  name: 'BreakingNewsPage',
  components: {
    Sparkles
  },
  data() {
    return {
      categories: NEWS_CATEGORIES,
      allNews: mockNews,
      activeCategory: 'all'
    }
  },
  computed: {
    filteredNews() {
      if (this.activeCategory === 'all') return this.allNews
      return this.allNews.filter(news => news.category === this.activeCategory)
    }
  },
  head() {
    return {
      title: '뉴스속보 - RASSI FApro',
      link: [
        { rel: 'stylesheet', href: '@/assets/css/pages/market/breaking-news.css' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/market/breaking-news.css';
</style>
