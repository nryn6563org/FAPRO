<!-- 공통 다이얼로그(모달) 컴포넌트 -->
<template>
  <div v-if="open" class="c-dialog">
    <!-- 배경(배경 클릭 시 닫기 기능) -->
    <div class="c-dialog__backdrop" @click="$emit('update:open', false)"></div>

    <!-- 다이얼로그 본문 영역 -->
    <div class="c-dialog__content" :class="contentClass">
       <slot></slot>
       <button
         class="c-dialog__close"
         @click="$emit('update:open', false)"
       >
         <X class="c-dialog__close-icon" />
         <span class="sr-only">닫기</span>
       </button>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue'
import { cn } from '@/utils/cn'

export default {
  name: 'Dialog',
  components: { X },
  props: {
    // 다이얼로그 노출 여부
    open: {
      type: Boolean,
      default: false
    },
    // 추가적인 CSS 클래스명
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 전달받은 클래스명과 기본 스타일 결합
    contentClass() {
      return cn(this.className)
    }
  }
}
</script>

<style src="@/assets/css/components/common/dialog.css"></style>
