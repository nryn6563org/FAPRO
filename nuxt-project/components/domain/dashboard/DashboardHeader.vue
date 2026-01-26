<template>
  <div class="c-dashboard-header">
    <div class="c-dashboard-header__content">
      <h2 class="c-dashboard-header__title">MY DASHBOARD</h2>
      <p class="c-dashboard-header__desc">필요한 정보만 선택하여 나만의 대시보드를 구성하세요. 정보 추가를 선택하여, 자주 보는 정보를 추가하고, 정보 카드 위에 마우스를 올려 드래그&드롭으로 위치 변경 할 수 있습니다.</p>
    </div>
    <!-- 우측 상단 액션 버튼들 -->
    <div class="c-dashboard-header__actions">
      <!-- 위젯 편집 버튼 (편집 모드가 아닐 때 노출) -->
      <Button v-if="!isEditing" variant="outline" class="c-dashboard-header__btn-edit" @click="$emit('edit')">
           <Edit class="c-dashboard-header__icon" />
           위젯 편집
      </Button>
      <!-- 정보 추가 버튼 (편집 모드가 아닐 때 노출) -->
      <Button v-if="!isEditing" class="c-dashboard-header__btn-add" @click="$emit('add')">
        <Plus class="c-dashboard-header__icon" />
        정보추가
      </Button>
    </div>
  </div>
</template>

<script>
import { Edit, Plus } from 'lucide-vue'
import Button from '@/components/common/Button.vue'

export default {
  name: 'DashboardHeader',
  components: {
    Button,
    Edit,
    Plus
  },
  props: {
    isEditing: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style src="@/assets/css/components/domain/dashboard/dashboard.css"></style>
