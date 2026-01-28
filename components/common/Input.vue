<!--
  공통 입력 필드 컴포넌트 (Input)
  - 사용자 입력을 받는 기본 Input UI입니다.
  - v-model을 지원하며, 타입(type) 지정이 가능합니다.
-->
<template>
  <input
    :type="type"
    :class="inputClass"
    :value="value"
    @input="$emit('input', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
import { cn } from '@/utils/cn'

export default {
  // 컴포넌트 이름: 공통 입력 필드
  name: 'Input',
  props: {
    // 입력 값 (v-model 바인딩)
    value: {
      type: [String, Number],
      default: ''
    },
    // 입력 태그의 타입 (text, password, email, number 등)
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    // 입력 필드 스타일 클래스 반환
    inputClass() {
      return cn('c-input')
    }
  }
}
</script>

<!-- 입력 필드 스타일 (CSS) -->
<style src="@/assets/css/components/common/input.css"></style>
