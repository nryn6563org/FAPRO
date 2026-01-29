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
      <defs>
        <filter id="bubble-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2" />
        </filter>
      </defs>

      <g
        v-for="bubble in bubbleNodes"
        :key="bubble.keyword"
        class="c-issue-bubble-map__bubble"
        :class="{'c-issue-bubble-map__bubble--active': selectedKeyword === bubble.keyword}"
        @click="$emit('select', bubble.keyword)"
      >
        <circle
          :cx="bubble.x"
          :cy="bubble.y"
          :r="bubble.r - 0.5"
          :fill="bubble.color"
          filter="url(#bubble-shadow)"
          class="c-issue-bubble-map__bubble-circle"
          :style="{ opacity: selectedKeyword === bubble.keyword ? '1' : '0.9' }"
        />
        <text
          :x="bubble.x"
          :y="bubble.y"
          text-anchor="middle"
          dominant-baseline="middle"
          class="c-issue-bubble-map__bubble-text"
          :style="{ fontSize: (bubble.size / 22) + 'px' }"
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
      lastUpdateTime: new Date(),
      bubbleNodes: [] // To store physics-calculated nodes
    }
  },
  watch: {
    selectedTab: {
      immediate: true,
      handler() {
        this.calculatePackedLayout()
      }
    },
    domesticBubbles: {
        deep: true,
        handler() { this.calculatePackedLayout() }
    },
    usBubbles: {
        deep: true,
        handler() { this.calculatePackedLayout() }
    }
  },
  computed: {
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
      this.calculatePackedLayout()
      this.$emit('refresh')
    },
    /**
     * Thinkpool-style Packed Bubble Logic
     * Rather than force simulation, we use a simple circular packing
     * to ensure bubbles cluster around center (50,50) without overlaps.
     */
    calculatePackedLayout() {
      const source = this.selectedTab === 'domestic' ? this.domesticBubbles : this.usBubbles
      if (!source || source.length === 0) return

      // Sort by size descending (largest in middle)
      const nodes = source.map((b, i) => ({
        ...b,
        index: i,
        r: (b.size / 14) + 1, // Add small padding
        x: 50,
        y: 50
      })).sort((a, b) => b.size - a.size)

      // Simple packing algorithm:
      // Place first (largest) node at center.
      // Place subsequent nodes by finding closest possible position to center that doesn't overlap.
      const packed = []
      nodes.forEach((node, i) => {
        if (i === 0) {
          node.x = 50
          node.y = 50
        } else {
          // Find optimal angle and distance
          let angle = 0
          let distance = nodes[0].r + node.r
          let found = false
          
          // Outer spiral search
          while (!found && distance < 100) {
            for (let step = 0; step < 12; step++) {
              const testAngle = angle + (step * Math.PI / 6)
              const tx = 50 + distance * Math.cos(testAngle)
              const ty = 50 + distance * Math.sin(testAngle)
              
              // Check collision
              const overlap = packed.some(p => {
                 const dx = tx - p.x
                 const dy = ty - p.y
                 const dist = Math.sqrt(dx*dx + dy*dy)
                 return dist < (p.r + node.r)
              })

              if (!overlap) {
                node.x = tx
                node.y = ty
                found = true
                break
              }
            }
            distance += 2
            angle += 0.5
          }
        }
        packed.push(node)
      })

      this.bubbleNodes = packed
    }
  }
}
</script>

<style src="@/assets/css/components/investment/today-issue/issue-bubble-map.css"></style>
