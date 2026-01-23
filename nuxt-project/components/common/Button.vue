<!-- 공통 버튼 컴포넌트: 다양한 스타일과 크기를 지원하는 베이스 버튼 -->
<template>
  <component
    :is="as"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * 버튼 스타일 정의 (cva 사용)
 * - variant: 버튼의 테마 (기본, 파괴적, 아웃라인, 보조, 고스트, 링크)
 * - size: 버튼의 크기 (기본, 작게, 크게, 아이콘용)
 */
const buttonVariants = cva(
  "c-button",
  {
    variants: {
      variant: {
        default: "c-button--default",
        destructive: "c-button--destructive",
        outline: "c-button--outline",
        secondary: "c-button--secondary",
        ghost: "c-button--ghost",
        link: "c-button--link",
      },
      size: {
        default: "c-button--default-size",
        sm: "c-button--sm",
        lg: "c-button--lg",
        icon: "c-button--icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export default {
  name: "Button",
  props: {
    // 버튼의 테마 (default, destructive, outline, secondary, ghost, link)
    variant: {
      type: String,
      default: "default",
    },
    // 버튼의 크기 (default, sm, lg, icon)
    size: {
      type: String,
      default: "default",
    },
    // 렌더링할 HTML 태그 (기본값: button)
    as: {
      type: String,
      default: "button",
    },
  },
  computed: {
    // cva와 cn을 결합하여 최종 클래스명 생성
    buttonClass() {
      return cn(buttonVariants({ variant: this.variant, size: this.size }));
    },
  },
};
</script>

<style src="@/assets/css/components/common/button.css"></style>

