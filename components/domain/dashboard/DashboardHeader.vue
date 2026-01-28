<!--
  대시보드 헤더 컴포넌트 (DashboardHeader)
  - 대시보드의 제목과 설명을 표시합니다.
  - 우측 상단에 '위젯 편집' 및 '정보 추가' 버튼을 제공합니다.
-->
<template>
  <div class="c-dashboard-header">
    <div class="c-dashboard-header__content">
      <h2 class="c-dashboard-header__title">MY DASHBOARD</h2>
      <p class="c-dashboard-header__desc">
        필요한 정보만 선택하여 나만의 대시보드를 구성하세요. 
        정보 추가를 선택하여 자주 보는 정보를 추가하고, 드래그&드롭으로 위치를 변경할 수 있습니다.
      </p>
    </div>
    
    <!-- 우측 상단 액션 버튼 그룹 -->
    <div class="c-dashboard-header__actions">
      <!-- 위젯 편집 버튼: 편집 모드가 아닐 때 노출, 클릭 시 부모에게 'edit' 이벤트 전달 -->
      <Button 
        v-if="!isEditing" 
        variant="outline" 
        class="c-dashboard-header__btn-edit" 
        @click="$emit('edit')"
      >
           <Edit class="c-dashboard-header__icon" />
           대시보드 편집
      </Button>

      <!-- 정보 추가 버튼: 편집 모드가 아닐 때 노출, 클릭 시 부모에게 'add' 이벤트 전달 -->
      <Button 
        v-if="!isEditing" 
        class="c-dashboard-header__btn-add" 
        @click="$emit('add')"
      >
        <Plus class="c-dashboard-header__icon" />
        정보추가
      </Button>
    </div>
  </div>
</template>

<script>
// 아이콘 및 공통 버튼 컴포넌트 임포트
import { Edit, Plus } from 'lucide-vue'
import Button from '@/components/common/Button.vue'

export default {
  // 컴포넌트 이름: 대시보드 헤더
  name: 'DashboardHeader',
  components: {
    Button,
    Edit,
    Plus
  },
  props: {
    // 편집 모드 활성화 여부 (편집 중에는 버튼 숨김 처리)
    isEditing: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<!-- 대시보드 공통 스타일 사용 -->
<style src="@/assets/css/components/domain/dashboard/dashboard.css"></style>
