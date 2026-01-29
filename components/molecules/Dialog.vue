<!--
  공통 다이얼로그(모달) 컴포넌트 (Dialog)
  - 웹사이트 전역에서 사용되는 팝업 UI입니다.
  - 배경 클릭 시 닫기, 닫기 버튼, 슬롯(Slot)을 통한 콘텐츠 주입 기능을 제공합니다.
-->
<template>
  <transition name="zoom">
    <div v-if="open" class="c-dialog">
      <!-- 배경(Backdrop): 클릭 시 모달 닫힘 ($emit 'update:open') -->
      <div class="c-dialog__backdrop" @click="$emit('update:open', false)"></div>

      <!-- 다이얼로그 본문 영역: 실제 콘텐츠 표시 -->
      <div class="c-dialog__content" :class="contentClass">
         <!-- 슬롯: 부모 컴포넌트에서 전달한 내용 렌더링 -->
         <slot></slot>
         
         <!-- 닫기 버튼: 우측 상단 X 아이콘 -->
         <button
           class="c-dialog__close"
           @click="$emit('update:open', false)"
         >
           <X class="c-dialog__close-icon" />
           <span class="sr-only">닫기</span>
         </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { X } from 'lucide-vue'
import { cn } from '@/utils/cn'

export default {
  // 컴포넌트 이름: 공통 다이얼로그
  name: 'Dialog',
  components: { X },
  props: {
    // 다이얼로그 표시 여부 (Sync Modifier 사용 가능)
    open: {
      type: Boolean,
      default: false
    },
    // 추가적인 사용자 정의 CSS 클래스
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 기본 스타일과 사용자 클래스를 병합
    contentClass() {
      return cn(this.className)
    }
  },
  mounted() {
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    handleKeydown(e) {
      if (e.key === 'Escape' && this.open) {
        this.$emit('update:open', false)
      }
    }
  }
}
</script>

<!-- 다이얼로그 스타일 (CSS) -->
<style src="@/assets/css/components/molecules/dialog.css"></style>
