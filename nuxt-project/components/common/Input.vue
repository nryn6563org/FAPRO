<!-- 공통 입력 필드 컴포넌트: 표준화된 스타일의 Input 요소 -->
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
import { cn } from "@/utils/cn";

export default {
  name: "Input",
  props: {
    // 입력 값 (v-model 연동)
    value: {
      type: [String, Number],
      default: "",
    },
    // 입력 타입 (text, password, email 등)
    type: {
      type: String,
      default: "text",
    },
  },
  computed: {
    // 입력 필드 기본 클래스 적용
    inputClass() {
      return cn("c-input");
    },
  },
};
</script>

<style src="@/assets/css/components/common/input.css"></style>
