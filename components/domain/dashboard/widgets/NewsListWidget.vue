<template>
  <div class="c-widget__news-wrapper">
    <div class="c-widget__news-list">
      <div v-for="(news, idx) in mockNews" :key="idx" class="c-widget__news-item">
        <p class="c-widget__news-title">{{ news.title }}</p>
        <div class="c-widget__news-meta">
          <span class="c-widget__news-source">{{ news.source }}</span>
          <span class="c-widget__news-divider">•</span>
          <span class="c-widget__news-time">{{ news.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockNews } from '@/utils/dashboard-data'

export default {
  name: 'NewsListWidget',
  data() {
    return {
      mockNews
    }
  }
}
</script>


