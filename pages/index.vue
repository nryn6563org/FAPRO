<!--
  메인 대시보드 페이지 (Index Page)
  - 애플리케이션의 진입점(Landing) 역할을 합니다.
  - 사용자가 자유롭게 구성할 수 있는 'CustomizableDashboard' 위젯 그리드를 표시합니다.
-->
<template>
  <!-- 사용자 정의 대시보드 컴포넌트 렌더링 -->
  <CustomizableDashboard />
</template>

<script>
import CustomizableDashboard from '@/components/domain/dashboard/CustomizableDashboard.vue'

export default {
  // 컴포넌트 이름: Nuxt 페이지 인덱스
  name: 'IndexPage',
  components: {
    // 대시보드 기능을 담당하는 핵심 컴포넌트
    CustomizableDashboard
  }
}
</script>
