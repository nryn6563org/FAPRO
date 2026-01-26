<!-- AI 이슈 포착 버블 맵: 시장 이슈를 시각적으로 시각화하여 제공 -->
<template>
  <div class="c-issue-bubble-map">
    <!-- 상단 탭 메뉴 -->
    <div class="c-issue-bubble-map__tab-menu">
      <button
        class="c-issue-bubble-map__tab-btn"
        :class="selectedTab === 'domestic' ? 'c-issue-bubble-map__tab-btn--active' : 'c-issue-bubble-map__tab-btn--inactive'"
        @click="changeTab('domestic')"
      >
        국내이슈포착
      </button>
      <button
        class="c-issue-bubble-map__tab-btn"
        :class="selectedTab === 'us' ? 'c-issue-bubble-map__tab-btn--active' : 'c-issue-bubble-map__tab-btn--inactive'"
        @click="changeTab('us')"
      >
        미국이슈포착
      </button>
    </div>

    <!-- 버블 맵 SVG -->
    <svg
      class="c-issue-bubble-map__svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        v-for="(bubble, idx) in currentBubbles"
        :key="idx"
        class="c-issue-bubble-map__bubble"
        :class="{'c-issue-bubble-map__bubble--active': selectedKeyword === bubble.keyword}"
        @click="$emit('select', bubble.keyword)"
      >
        <circle
          :cx="bubble.x"
          :cy="bubble.y"
          :r="bubble.size / 14"
          :fill="bubble.color"
          class="c-issue-bubble-map__bubble-circle"
          :style="{ opacity: selectedKeyword === bubble.keyword ? '1' : '0.85' }"
        />
        <text
          :x="bubble.x"
          :y="bubble.y"
          text-anchor="middle"
          dominant-baseline="middle"
          class="c-issue-bubble-map__bubble-text"
          :style="{ fontSize: (bubble.size / 24) + 'px' }"
        >
          {{ bubble.keyword }}
        </text>
      </g>
    </svg>

    <!-- 하단 업데이트 정보 -->
    <div class="c-issue-bubble-map__info">
      <div class="c-issue-bubble-map__time-box">
        <span class="c-issue-bubble-map__update-date">{{ updateInfo.date }}</span>
        <span class="c-issue-bubble-map__update-time">{{ updateInfo.time }}</span>
      </div>
      <div class="c-issue-bubble-map__divider"></div>
      <button class="c-issue-bubble-map__refresh-btn" @click="refresh">
        <RefreshCwIcon class="c-issue-bubble-map__refresh-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { RefreshCwIcon } from 'lucide-vue'

export default {
  name: 'IssueBubbleMap',
  components: {
    RefreshCwIcon
  },
  props: {
    selectedKeyword: {
      type: String,
      required: true
    },
    domesticBubbles: {
      type: Array,
      required: true
    },
    usBubbles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTab: 'domestic',
      lastUpdateTime: new Date()
    }
  },
  computed: {
    currentBubbles() {
      return this.selectedTab === 'domestic' ? this.domesticBubbles : this.usBubbles
    },
    updateInfo() {
      const date = this.lastUpdateTime
      return {
        date: `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`,
        time: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
      }
    }
  },
  methods: {
    changeTab(tab) {
      this.selectedTab = tab
      const initialKeyword = tab === 'domestic' ? '원전' : '금시장'
      this.$emit('select', initialKeyword)
    },
    refresh() {
      this.lastUpdateTime = new Date()
      this.$emit('refresh')
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-issue/issue-bubble-map.css"></style>
