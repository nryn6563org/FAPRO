<!--
  사용자 정의 대시보드 컴포넌트 (CustomizableDashboard)
  - 사용자가 위젯을 추가, 삭제, 이동(Drag & Drop)할 수 있는 대시보드입니다.
  - vuedraggable을 사용하여 그리드 내 위젯 이동 기능을 구현합니다.
  - 위젯별 크기(w, h)를 설정하여 다양한 레이아웃을 지원합니다.
-->
<template>
  <div class="c-dashboard">
    <!-- 대시보드 헤더: 편집 모드 전환 및 위젯 추가 버튼 포함 -->
    <DashboardHeader
        :isEditing="isEditing"
        @edit="handleEditMode"
        @add="handleOpenDialog"
    />

    <!-- 편집 모드 플로팅 바 (상단 고정) -->
    <div v-if="isEditing" class="c-dashboard__edit-bar">
        <span class="c-dashboard__edit-label">위젯 편집 모드</span>
        <div class="c-dashboard__edit-actions">
            <!-- 취소 버튼: 편집 전 상태로 복구 -->
            <button @click="handleCancelEdit" class="c-dashboard__edit-btn-cancel">
                취소
            </button>
            <!-- 저장 버튼: 변경 사항 확정 -->
            <button @click="handleSaveEdit" class="c-dashboard__edit-btn-save">
                저장 완료
            </button>
        </div>
    </div>

    <!-- 위젯 선택 다이얼로그 (모달) -->
    <DashboardWidgetDialog
        :isOpen="isDialogOpen"
        :currentWidgets="widgets"
        :currentWidgetSizes="widgetSizes"
        @update:open="isDialogOpen = $event"
        @close="handleCancelDialog"
        @save="handleSaveWidgets"
    />

    <!-- 위젯 그리드 영역 (Draggable 적용) -->
    <!-- ghost-class: 드래그 중인 항목의 스타일 클래스 -->
    <draggable
        v-model="widgets"
        class="c-dashboard__grid"
        :disabled="!isEditing"
        ghost-class="ghost-card"
        :force-fallback="true"
        :fallback-on-body="true"
        @start="onDragStart"
        @end="onDragEnd"
    >
        <!-- 각 위젯 아이템 -->
        <div
            v-for="widgetId in widgets"
            :key="widgetId"
            :class="['c-dashboard__grid-item', getWidgetGridClass(widgetId)]"
        >
            <div class="c-dashboard__grid-item-inner">
                 <!-- 드래그 핸들: 편집 모드에서만 노출, 이 영역을 잡고 이동 가능 -->
                 <div
                    v-if="isEditing"
                    class="c-dashboard__drag-handle"
                    title="드래그하여 이동"
                 >
                    <GripVertical class="c-dashboard__drag-icon" />
                 </div>

                 <!-- 실제 위젯 콘텐츠 컴포넌트 -->
                 <Widget
                    :widgetId="widgetId"
                    :isEditing="isEditing"
                    :size="widgetSizes[widgetId] || { w: 1, h: 1 }"
                    @remove="removeWidget(widgetId)"
                 />
            </div>
        </div>
    </draggable>

    <!-- 빈 상태 (Empty State): 위젯이 하나도 없을 때 노출 -->
    <div v-if="widgets.length === 0" class="c-dashboard__empty">
        <div class="c-dashboard__empty-content">
            <Settings class="c-dashboard__empty-icon" />
            <h3 class="c-dashboard__empty-title">위젯을 추가해주세요</h3>
            <p class="c-dashboard__empty-desc">
            "정보추가" 버튼을 눌러 원하는 정보를 선택하세요
            </p>
            <Button @click="handleOpenDialog" class="c-dashboard__btn-add">
            <Plus class="c-dashboard__btn-icon" />
            정보추가하기
            </Button>
        </div>
    </div>
  </div>
</template>

<script>
// 라이브러리 및 컴포넌트 임포트
import draggable from 'vuedraggable'
import { Settings, GripVertical, Plus } from 'lucide-vue'
import Button from '@/components/common/Button.vue'
import Widget from '@/components/domain/dashboard/Widget.vue'
import DashboardHeader from '@/components/domain/dashboard/DashboardHeader.vue'
import DashboardWidgetDialog from '@/components/domain/dashboard/DashboardWidgetDialog.vue'

export default {
  // 컴포넌트 이름: 사용자 정의 대시보드
  name: 'CustomizableDashboard',
  components: {
    draggable,
    Button,
    Widget,
    DashboardHeader,
    DashboardWidgetDialog,
    Settings,
    GripVertical,
    Plus
  },
  data() {
    return {
      // 초기 위젯 ID 목록 (순서대로 렌더링됨)
      widgets: [
        'kospi', 'kosdaq', 'sp500', 'nasdaq', 'usd-krw',
        'client-count', 'aum', 'revenue', 'top-clients', 'market-news'
      ],
      isDialogOpen: false, // 위젯 추가 다이얼로그 표시 여부
      isEditing: false, // 편집 모드 활성화 여부
      originalWidgets: [], // 편집 취소 시 복구를 위한 백업 데이터
      drag: false, // 드래그 중 상태 플래그
      // 위젯별 크기 설정 (Grid Span)
      // w: 가로 차지 칸 수 (Col Span)
      // h: 세로 차지 칸 수 (Row Span)
      widgetSizes: {
        kospi: { w: 2, h: 1 },
        kosdaq: { w: 2, h: 1 },
        sp500: { w: 2, h: 1 },
        nasdaq: { w: 2, h: 1 },
        'usd-krw': { w: 2, h: 1 },
        'client-count': { w: 2, h: 1 },
        aum: { w: 2, h: 1 },
        revenue: { w: 2, h: 2 },
        'top-clients': { w: 2, h: 2 },
        'market-news': { w: 2, h: 2 },
        'ai-issue-bubble': { w: 2, h: 2 },
        'economy-news': { w: 2, h: 2 }
      }
    }
  },
  methods: {
    /**
     * 위젯 그리드 클래스 생성
     * @param {string} widgetId - 위젯 ID
     * @returns {string} - CSS 클래스 (예: c-dashboard__grid-item--w-2)
     */
    getWidgetGridClass(widgetId) {
      const size = this.widgetSizes[widgetId] || { w: 1, h: 1 }
      return `c-dashboard__grid-item--w-${size.w} c-dashboard__grid-item--h-${size.h}`
    },
    // 편집 모드 시작: 현재 상태 백업 후 편집 모드 활성화
    handleEditMode() {
      this.originalWidgets = [...this.widgets]
      this.isEditing = true
    },
    // 편집 저장: 단순히 편집 모드 종료 (실제 API 연동 시 여기서 저장 로직 수행)
    handleSaveEdit() {
      this.isEditing = false
    },
    // 편집 취소: 백업된 상태로 복구하고 편집 모드 종료
    handleCancelEdit() {
      this.widgets = [...this.originalWidgets]
      this.isEditing = false
    },
    // 위젯 추가 다이얼로그 열기
    handleOpenDialog() {
      this.isDialogOpen = true
    },
    // 다이얼로그 닫기
    handleCancelDialog() {
      this.isDialogOpen = false
    },
    handleSaveWidgets({ widgets, sizes }) {
      this.widgets = [...widgets]
      this.widgetSizes = { ...this.widgetSizes, ...sizes }
      this.isDialogOpen = false
    },
    /**
     * 위젯 삭제 핸들러
     * @param {string} widgetId - 삭제할 위젯 ID
     */
    removeWidget(widgetId) {
      this.widgets = this.widgets.filter(w => w !== widgetId)
    },
    // 드래그 시작 시 텍스트 선택 방지
    onDragStart() {
      this.drag = true
      document.body.style.userSelect = 'none'
    },
    // 드래그 종료 시 텍스트 선택 복구
    onDragEnd() {
      this.drag = false
      document.body.style.userSelect = ''
    }
  }
}
</script>

<!-- 대시보드 스타일 (CSS) -->
<style src="@/assets/css/components/domain/dashboard/dashboard.css"></style>
