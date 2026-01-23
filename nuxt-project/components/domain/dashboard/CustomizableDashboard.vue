<template>
  <div class="c-dashboard">
    <!-- 대시보드 헤더 -->
    <DashboardHeader 
        :isEditing="isEditing" 
        @edit="handleEditMode" 
        @add="handleOpenDialog" 
    />

    <!-- 편집 모드 플로팅 바 -->
    <div v-if="isEditing" class="c-dashboard__edit-bar">
        <span class="c-dashboard__edit-label">위젯 편집 모드</span>
        <button @click="handleCancelEdit" class="c-dashboard__edit-btn-cancel">
            취소
        </button>
        <button @click="handleSaveEdit" class="c-dashboard__edit-btn-save">
            저장 완료
        </button>
    </div>

    <!-- 위젯 선택 다이얼로그 -->
    <DashboardWidgetDialog 
        :isOpen="isDialogOpen"
        :currentWidgets="widgets"
        :currentWidgetSizes="widgetSizes"
        @update:open="isDialogOpen = $event"
        @close="handleCancelDialog"
        @save="handleSaveWidgets"
    />

    <!-- 위젯 카드들이 배치되는 그리드 (Draggable 적용) -->
    <draggable
        v-model="widgets"
        class="c-dashboard__grid"
        :disabled="!isEditing"
        ghost-class="ghost-card"
        @start="drag=true"
        @end="drag=false"
    >
        <div 
            v-for="widgetId in widgets" 
            :key="widgetId"
            :class="['c-dashboard__grid-item', getWidgetGridClass(widgetId)]"
        >
            <div class="c-dashboard__grid-item-inner">
                 <!-- 드래그 핸들 (편집 모드에서만 보임) -->
                 <div
                    v-if="isEditing"
                    class="c-dashboard__drag-handle"
                    title="드래그하여 이동"
                 >
                    <GripVertical class="c-dashboard__drag-icon" />
                 </div>
                 
                 <!-- 실제 위젯 콘텐츠 -->
                 <Widget 
                    :widgetId="widgetId" 
                    :isEditing="isEditing"
                    :size="widgetSizes[widgetId] || { w: 1, h: 1 }"
                    @remove="removeWidget(widgetId)" 
                 />
            </div>
        </div>
    </draggable>

    <!-- 빈 상태 (위젯이 없을 때) -->
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
import draggable from 'vuedraggable';
import { Settings, GripVertical, Plus } from 'lucide-vue';
import Button from '@/components/common/Button.vue';
import Widget from '@/components/domain/dashboard/Widget.vue';
import DashboardHeader from '@/components/domain/dashboard/DashboardHeader.vue';
import DashboardWidgetDialog from '@/components/domain/dashboard/DashboardWidgetDialog.vue';

export default {
  name: "CustomizableDashboard",
  components: {
    draggable,
    Button,
    Widget,
    DashboardHeader,
    DashboardWidgetDialog,
    Settings, GripVertical, Plus
  },
  data() {
    return {
      // 초기 위젯 목록
      widgets: [
        'kospi', 'kosdaq', 'sp500', 'nasdaq', 'usd-krw',
        'client-count', 'aum', 'revenue', 'top-clients', 'market-news',
      ],
      isDialogOpen: false,  // 위젯 추가 다이얼로그 노출 여부
      isEditing: false,    // 편집 모드 활성화 여부
      originalWidgets: [], // 편집 취소 시 복구를 위한 백업 데이터
      drag: false,         // 드래그 상태 플래그
      // 위젯별 크기 설정 (w: 가로 칸 수, h: 세로 칸 수)
      widgetSizes: {
        'kospi': { w: 2, h: 1 },
        'kosdaq': { w: 2, h: 1 },
        'sp500': { w: 2, h: 1 },
        'nasdaq': { w: 2, h: 1 },
        'usd-krw': { w: 2, h: 1 },
        'client-count': { w: 2, h: 1 },
        'aum': { w: 2, h: 1 },
        'revenue': { w: 2, h: 2 },
        'top-clients': { w: 2, h: 2 },
        'market-news': { w: 2, h: 2 },
        'ai-issue-bubble': { w: 2, h: 2 },
        'economy-news': { w: 2, h: 2 },
      }
    };
  },
  methods: {
    /**
     * 위젯 ID에 따른 그리드 클래스 반환 (가로/세로 크기 결정)
     */
    getWidgetGridClass(widgetId) {
       const size = this.widgetSizes[widgetId] || { w: 1, h: 1 };
       return `c-dashboard__grid-item--w-${size.w} c-dashboard__grid-item--h-${size.h}`;
    },
    // 편집 모드 진입 (현재 상태 백업)
    handleEditMode() {
        this.originalWidgets = [...this.widgets];
        this.isEditing = true;
    },
    // 편집 사항 저장
    handleSaveEdit() {
        this.isEditing = false;
    },
    // 편집 모드 취소 (이전 상태로 복구)
    handleCancelEdit() {
        this.widgets = [...this.originalWidgets];
        this.isEditing = false;
    },
    // 위젯 추가 다이얼로그 열기
    handleOpenDialog() {
       this.isDialogOpen = true;
    },
    // 다이얼로그 닫기
    handleCancelDialog() {
       this.isDialogOpen = false;
    },
    /**
     * 다이얼로그에서 선택된 위젯 목록 저장
     */
    handleSaveWidgets({ widgets, sizes }) {
       this.widgets = [...widgets];
       this.widgetSizes = { ...this.widgetSizes, ...sizes };
       this.isDialogOpen = false;
    },
    /**
     * 특정 위젯 삭제
     */
    removeWidget(widgetId) {
       this.widgets = this.widgets.filter(w => w !== widgetId);
    }
  }
};
</script>

<style src="@/assets/css/components/domain/dashboard/dashboard.css"></style>
