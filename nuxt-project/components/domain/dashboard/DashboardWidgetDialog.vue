<template>
  <Dialog :open="isOpen" @update:open="updateOpen" className="c-widget-dialog__dialog-content">
      <div class="c-widget-dialog">
          <!-- 좌측 사이드바: 카테고리 목록 -->
          <div class="c-widget-dialog__sidebar">
              <div class="c-widget-dialog__sidebar-header">
                  <h2 class="c-widget-dialog__sidebar-title">위젯 추가</h2>
                  <p class="c-widget-dialog__sidebar-desc">대시보드에 추가할 위젯을 선택하세요.</p>
              </div>
              <div class="c-widget-dialog__category-list">
                  <button
                      v-for="category in Object.keys(categorizedWidgets)"
                      :key="category"
                      @click="activeCategory = category"
                      :class="['c-widget-dialog__category-btn', activeCategory === category ? 'c-widget-dialog__category-btn--active' : '']"
                  >
                      <span>{{ category }}</span>
                      <span class="c-widget-dialog__category-count">
                          {{ categorizedWidgets[category].length }}
                      </span>
                  </button>
              </div>
              <div class="c-widget-dialog__footer">
                  <div class="c-widget-dialog__footer-actions">
                      <Button @click="closeDialog" variant="outline" class="c-widget-dialog__btn-cancel">
                          취소
                      </Button>
                      <Button @click="saveWidgets" class="c-widget-dialog__btn-apply">
                          적용하기
                      </Button>
                  </div>
              </div>
          </div>

          <!-- 우측 콘텐츠 영역: 위젯 그리드 -->
          <div class="c-widget-dialog__content">
              <div class="c-widget-dialog__content-header">
                   <h3 class="c-widget-dialog__content-title">
                      {{ activeCategory }}
                      <span class="c-widget-dialog__content-subtitle">카테고리 위젯 목록</span>
                   </h3>
                   <div class="c-widget-dialog__actions">
                       <div class="c-widget-dialog__search-wrapper">
                           <Search class="c-widget-dialog__search-icon" />
                           <input type="text" placeholder="위젯 검색..." class="c-widget-dialog__search-input" />
                       </div>
                   </div>
              </div>

              <div class="c-widget-dialog__grid-wrapper">
                  <div class="c-widget-dialog__grid">
                      <button
                          v-for="widget in categorizedWidgets[activeCategory]"
                          :key="widget.id"
                          @click="toggleTempWidget(widget.id)"
                          :class="[
                              'c-widget-card',
                              tempSelectedWidgets.includes(widget.id) ? 'c-widget-card--selected' : ''
                          ]"
                      >
                          <!-- 선택 체크박스 -->
                          <div :class="['c-widget-card__checkbox', tempSelectedWidgets.includes(widget.id) ? 'c-widget-card__checkbox--checked' : '']">
                              <Check v-if="tempSelectedWidgets.includes(widget.id)" class="c-widget-card__check-icon" />
                          </div>

                          <!-- 위젯 아이콘 -->
                          <div :class="['c-widget-card__icon-wrapper', tempSelectedWidgets.includes(widget.id) ? 'c-widget-card__icon-wrapper--selected' : '']">
                              <component :is="widget.icon" class="c-widget-card__icon" />
                          </div>

                          <!-- 위젯 정보 및 사이즈 선택 -->
                          <div class="c-widget-card__content">
                              <h4 :class="['c-widget-card__title', tempSelectedWidgets.includes(widget.id) ? 'c-widget-card__title--selected' : '']">{{ widget.title }}</h4>

                              <div class="c-widget-card__size-options" @click.stop>
                                  <div class="c-widget-card__size-control">
                                      <span class="c-widget-card__size-label">W</span>
                                      <select
                                          :value="getTempWidgetSize(widget.id).w"
                                          @change="updateWidgetSize(widget.id, 'w', $event.target.value)"
                                          class="c-widget-card__size-select"
                                      >
                                          <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
                                      </select>
                                  </div>
                                  <div class="c-widget-card__size-control">
                                      <span class="c-widget-card__size-label">H</span>
                                      <select
                                          :value="getTempWidgetSize(widget.id).h"
                                          @change="updateWidgetSize(widget.id, 'h', $event.target.value)"
                                          class="c-widget-card__size-select"
                                      >
                                          <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </Dialog>
</template>

<script>
import { Search, Check, TrendingUp, TrendingDown, Globe, DollarSign, Activity, Award, Wallet, Users, Briefcase, Calculator, Target, Newspaper, Building2, Sparkles, Lightbulb, Layers, FileBarChart, ClipboardList, Star, CalendarDays, PieChart } from 'lucide-vue'
import Dialog from '@/components/common/Dialog.vue'
import Button from '@/components/common/Button.vue'
import { AVAILABLE_WIDGETS } from '@/utils/dashboard-data'

export default {
  name: 'DashboardWidgetDialog',
  components: {
    Dialog,
    Button,
    Search,
    Check,
    // Icon imports for dynamic components
    TrendingUp,
    TrendingDown,
    Globe,
    DollarSign,
    Activity,
    Award,
    Wallet,
    Users,
    Briefcase,
    Calculator,
    Target,
    Newspaper,
    Building2,
    Sparkles,
    Lightbulb,
    Layers,
    FileBarChart,
    ClipboardList,
    Star,
    CalendarDays,
    PieChart
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    currentWidgets: {
      type: Array,
      default: () => []
    },
    currentWidgetSizes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeCategory: '국내 지수', // 현재 선택된 카테고리
      tempSelectedWidgets: [], // 다이얼로그에서 일시적으로 선택된 위젯 목록
      tempWidgetSizes: {} // 다이얼로그에서 일시적으로 변경된 위젯 크기 정보
    }
  },
  computed: {
    /**
         * AVAILABLE_WIDGETS 상수를 카테고리별로 그룹화
         */
    categorizedWidgets() {
      const acc = {}
      AVAILABLE_WIDGETS.forEach((widget) => {
        if (!acc[widget.category]) {
          acc[widget.category] = []
        }
        acc[widget.category].push(widget)
      })
      return acc
    }
  },
  watch: {
    /**
         * 다이얼로그가 열릴 때 현재 대시보드 상태를 임시 변수에 복사
         */
    isOpen(val) {
      if (val) {
        this.tempSelectedWidgets = [...this.currentWidgets]
        this.tempWidgetSizes = JSON.parse(JSON.stringify(this.currentWidgetSizes))
      }
    }
  },
  methods: {
    updateOpen(val) {
      this.$emit('update:open', val)
    },
    closeDialog() {
      this.$emit('close')
    },
    // 설정한 위젯 및 크기 정보를 부모 컴포넌트로 전달
    saveWidgets() {
      this.$emit('save', {
        widgets: this.tempSelectedWidgets,
        sizes: this.tempWidgetSizes
      })
    },
    // 임시 저장된 위젯 크기 반환 (기본값 2x1)
    getTempWidgetSize(widgetId) {
      return this.tempWidgetSizes[widgetId] || { w: 2, h: 1 }
    },
    // 위젯이 선택되었고 특정 크기인지 확인
    isWidgetSelectedAndSize(widgetId, layout) {
      if (!this.tempSelectedWidgets.includes(widgetId)) { return false }
      const size = this.getTempWidgetSize(widgetId)
      return size.w === layout.w && size.h === layout.h
    },
    // 위젯 크기 선택 처리
    selectWidgetSize(widgetId, layout) {
      if (!this.tempSelectedWidgets.includes(widgetId)) {
        this.tempSelectedWidgets.push(widgetId)
      }
      this.$set(this.tempWidgetSizes, widgetId, { w: layout.w, h: layout.h })
    },
    /**
         * 위젯의 가로(w) 또는 세로(h) 크기 업데이트
         */
    updateWidgetSize(widgetId, dimension, value) {
      const currentSize = this.getTempWidgetSize(widgetId)
      const newSize = { ...currentSize, [dimension]: parseInt(value) }

      this.$set(this.tempWidgetSizes, widgetId, newSize)

      if (!this.tempSelectedWidgets.includes(widgetId)) {
        this.tempSelectedWidgets.push(widgetId)
      }
    },
    /**
         * 위젯 선택 상태 토글
         */
    toggleTempWidget(widgetId) {
      if (this.tempSelectedWidgets.includes(widgetId)) {
        this.tempSelectedWidgets = this.tempSelectedWidgets.filter(w => w !== widgetId)
      } else {
        this.tempSelectedWidgets.push(widgetId)
        if (!this.tempWidgetSizes[widgetId]) {
          this.$set(this.tempWidgetSizes, widgetId, this.currentWidgetSizes[widgetId] || { w: 2, h: 1 })
        }
      }
    }
  }
}
</script>

<style src="@/assets/css/components/domain/dashboard/dashboard.css"></style>
