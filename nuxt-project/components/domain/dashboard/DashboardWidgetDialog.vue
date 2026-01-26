<!--
  대시보드 위젯 추가/편집 다이얼로그 (DashboardWidgetDialog)
  - 사용 가능한 모든 위젯을 카테고리별로 탐색하고 선택할 수 있는 팝업입니다.
  - 위젯 선택(체크) 및 크기(W, H) 설정을 지원합니다.
  - 선택 사항을 임시 저장하고 '적용하기' 버튼 클릭 시 부모 컴포넌트에 반영합니다.
-->
<template>
  <Dialog :open="isOpen" @update:open="updateOpen" className="c-widget-dialog__dialog-content">
      <div class="c-widget-dialog">
          <!-- 좌측 사이드바: 위젯 카테고리 메뉴 -->
          <div class="c-widget-dialog__sidebar">
              <div class="c-widget-dialog__sidebar-header">
                  <h2 class="c-widget-dialog__sidebar-title">위젯 추가</h2>
                  <p class="c-widget-dialog__sidebar-desc">대시보드에 추가할 위젯을 선택하세요.</p>
              </div>

              <!-- 카테고리 목록 리스트 -->
              <div class="c-widget-dialog__category-list">
                  <button
                      v-for="category in Object.keys(categorizedWidgets)"
                      :key="category"
                      @click="activeCategory = category"
                      :class="['c-widget-dialog__category-btn', activeCategory === category ? 'c-widget-dialog__category-btn--active' : '']"
                  >
                      <span>{{ category }}</span>
                      <!-- 해당 카테고리에 속한 위젯 수 표시 -->
                      <span class="c-widget-dialog__category-count">
                          {{ categorizedWidgets[category].length }}
                      </span>
                  </button>
              </div>

              <!-- 하단 액션 버튼 (취소/적용) -->
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

          <!-- 우측 콘텐츠 영역: 선택된 카테고리의 위젯 목록 그리드 -->
          <div class="c-widget-dialog__content relative">
              <!-- 콘텐츠 헤더: 카테고리명 및 검색/편집 버튼 -->
              <div class="c-widget-dialog__content-header">
                   <h3 class="c-widget-dialog__content-title">
                      {{ activeCategory }}
                      <span class="c-widget-dialog__content-subtitle">카테고리 위젯 목록</span>
                   </h3>
                   <div class="c-widget-dialog__actions flex items-center gap-3">
                       <!-- 위젯 편집 모드 토글 버튼 -->
                       <Button
                           v-if="!isEditMode"
                           @click="enterEditMode"
                           variant="outline"
                           size="sm"
                           class="flex items-center gap-2 px-3 h-10 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                       >
                           <Settings class="w-4 h-4 text-slate-500" />
                           <span class="text-xs font-bold text-slate-600 dark:text-slate-300">위젯 편집</span>
                       </Button>

                       <div class="c-widget-dialog__search-wrapper">
                           <Search class="c-widget-dialog__search-icon" />
                           <input type="text" placeholder="위젯 검색..." class="c-widget-dialog__search-input" />
                       </div>
                   </div>
              </div>

              <!-- 위젯 카드 그리드 -->
              <div class="c-widget-dialog__grid-wrapper">
                  <div class="c-widget-dialog__grid pb-20"> <!-- 하단 여백 추가 (편집 바 공간 확보) -->
                      <button
                          v-for="widget in categorizedWidgets[activeCategory]"
                          :key="widget.id"
                          @click="toggleTempWidget(widget.id)"
                          :class="[
                              'c-widget-card',
                              tempSelectedWidgets.includes(widget.id) ? 'c-widget-card--selected' : ''
                          ]"
                      >
                          <!-- 선택 체크박스 (좌측 상단) -->
                          <div :class="['c-widget-card__checkbox', tempSelectedWidgets.includes(widget.id) ? 'c-widget-card__checkbox--checked' : '']">
                              <Check v-if="tempSelectedWidgets.includes(widget.id)" class="c-widget-card__check-icon" />
                          </div>

                          <!-- 위젯 아이콘 -->
                          <div :class="['c-widget-card__icon-wrapper', tempSelectedWidgets.includes(widget.id) ? 'c-widget-card__icon-wrapper--selected' : '']">
                              <component :is="widget.icon" class="c-widget-card__icon" />
                          </div>

                          <!-- 위젯 정보 및 크기 설정 컨트롤 -->
                          <div class="c-widget-card__content w-full">
                              <h4 :class="['c-widget-card__title', tempSelectedWidgets.includes(widget.id) ? 'c-widget-card__title--selected' : '']">{{ widget.title }}</h4>

                              <!-- 크기 조절 옵션 (가로 W, 세로 H) - 편집 모드일 때만 표시 -->
                              <div v-if="isEditMode" class="c-widget-card__size-options" @click.stop>
                                  <div class="c-widget-card__size-control">
                                      <span class="c-widget-card__size-label">W</span>
                                      <!-- 가로 크기 선택 셀렉트 박스 -->
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
                                      <!-- 세로 크기 선택 셀렉트 박스 -->
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

              <!-- 편집 모드 하단 플로팅 바 -->
              <div v-if="isEditMode" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl">
                  <span class="text-sm font-bold mr-2">위젯 크기 편집 중</span>
                  <button
                      @click="cancelEditMode"
                      class="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold transition-colors"
                  >
                      취소
                  </button>
                  <button
                      @click="saveEditMode"
                      class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                      <Save class="w-3 h-3" />
                      저장
                  </button>
              </div>
          </div>
      </div>
  </Dialog>
</template>

<script>
// 필요한 아이콘 및 컴포넌트 임포트
import { Search, Check, TrendingUp, TrendingDown, Globe, DollarSign, Activity, Award, Wallet, Users, Briefcase, Calculator, Target, Newspaper, Building2, Sparkles, Lightbulb, Layers, FileBarChart, ClipboardList, Star, CalendarDays, PieChart, Settings, X, Save } from 'lucide-vue'
import Dialog from '@/components/common/Dialog.vue'
import Button from '@/components/common/Button.vue'
import { AVAILABLE_WIDGETS } from '@/utils/dashboard-data'

export default {
  // 컴포넌트 이름: 위젯 설정 다이얼로그
  name: 'DashboardWidgetDialog',
  components: {
    Dialog,
    Button,
    Search,
    Check,
    Settings,
    X,
    Save,
    // 동적 컴포넌트 매핑을 위한 아이콘 등록
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
    // 다이얼로그 노출 여부
    isOpen: {
      type: Boolean,
      required: true
    },
    // 현재 대시보드에 적용된 위젯 목록 (ID 배열)
    currentWidgets: {
      type: Array,
      default: () => []
    },
    // 현재 위젯들의 크기 설정 정보
    currentWidgetSizes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeCategory: '국내 지수', // 현재 활성화된 카테고리 탭
      tempSelectedWidgets: [], // 임시 선택된 위젯 ID 목록
      tempWidgetSizes: {}, // 임시 변경된 위젯 크기 정보
      isEditMode: false, // 위젯 크기 편집 모드 활성화 여부
      editModeSnapshot: null // 편집 모드 진입 시점의 크기 정보 스냅샷 (취소 시 복구용)
    }
  },
  computed: {
    /**
     * 사용 가능한 전체 위젯 목록(AVAILABLE_WIDGETS)을 카테고리별로 그룹화하여 반환
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
     * 다이얼로그가 열릴 때(isOpen=true), 현재 상태를 임시 변수에 복사
     * (사용자가 취소를 누를 경우를 대비하여 원본을 보존)
     */
    isOpen(val) {
      if (val) {
        this.tempSelectedWidgets = [...this.currentWidgets]
        this.tempWidgetSizes = JSON.parse(JSON.stringify(this.currentWidgetSizes))
        this.isEditMode = false
      }
    }
  },
  methods: {
    // 부모에게 다이얼로그 닫기 요청 (Sync)
    updateOpen(val) {
      this.$emit('update:open', val)
    },
    // 취소 버튼 클릭 시 닫기
    closeDialog() {
      this.$emit('close')
    },
    /**
     * 적용하기 버튼 클릭 핸들러
     * 임시 저장된 위젯 목록과 크기 정보를 부모에게 전달하여 저장
     */
    saveWidgets() {
      this.$emit('save', {
        widgets: this.tempSelectedWidgets,
        sizes: this.tempWidgetSizes
      })
    },
    /**
     * 특정 위젯의 임시 저장된 크기 반환
     * 설정된 값이 없으면 기본값 { w: 2, h: 1 } 반환
     */
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
     * @param {string} widgetId - 대상 위젯 ID
     * @param {string} dimension - 'w'(가로) 또는 'h'(세로)
     * @param {string} value - 변경할 값 (문자열로 들어오므로 정수 변환 필요)
     */
    updateWidgetSize(widgetId, dimension, value) {
      const currentSize = this.getTempWidgetSize(widgetId)
      const newSize = { ...currentSize, [dimension]: parseInt(value) }

      this.$set(this.tempWidgetSizes, widgetId, newSize)

      // 크기를 변경하면 자동으로 해당 위젯을 선택 상태로 변경
      if (!this.tempSelectedWidgets.includes(widgetId)) {
        this.tempSelectedWidgets.push(widgetId)
      }
    },
    /**
     * 위젯 선택 상태 토글 (체크박스/카드 클릭 시)
     */
    toggleTempWidget(widgetId) {
      if (this.tempSelectedWidgets.includes(widgetId)) {
        // 이미 선택된 경우 제거
        this.tempSelectedWidgets = this.tempSelectedWidgets.filter(w => w !== widgetId)
      } else {
        // 선택되지 않은 경우 추가하고, 크기 정보가 없으면 기본값 설정
        this.tempSelectedWidgets.push(widgetId)
        if (!this.tempWidgetSizes[widgetId]) {
          this.$set(this.tempWidgetSizes, widgetId, this.currentWidgetSizes[widgetId] || { w: 2, h: 1 })
        }
      }
    },
    /**
     * 편집 모드 진입
     * 현재 사이즈 정보를 스냅샷으로 저장
     */
    enterEditMode() {
      this.editModeSnapshot = JSON.parse(JSON.stringify(this.tempWidgetSizes))
      this.isEditMode = true
    },
    /**
     * 편집 내용 저장 및 모드 종료
     */
    saveEditMode() {
      this.editModeSnapshot = null
      this.isEditMode = false
    },
    /**
     * 편집 취소 및 초기화
     * 스냅샷으로 사이즈 정보 복구
     */
    cancelEditMode() {
      if (this.editModeSnapshot) {
        this.tempWidgetSizes = JSON.parse(JSON.stringify(this.editModeSnapshot))
      }
      this.editModeSnapshot = null
      this.isEditMode = false
    }
  }
}
</script>

<!-- 대시보드 스타일 사용 -->
<style src="@/assets/css/components/domain/dashboard/dashboard.css"></style>
