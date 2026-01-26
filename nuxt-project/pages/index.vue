<!-- 메인 대시보드 페이지: 사용자가 구성한 위젯 그리드를 표시 -->
<template>
  <CustomizableDashboard />
</template>

<script>
import CustomizableDashboard from '@/components/domain/dashboard/CustomizableDashboard.vue'

export default {
  name: 'IndexPage',
  components: {
    CustomizableDashboard
  }
}
</script>
