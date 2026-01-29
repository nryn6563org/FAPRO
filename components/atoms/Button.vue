<!--
  공통 버튼 컴포넌트 (Button)
  - 프로젝트 전반에서 사용되는 기본 버튼 UI입니다.
  - 'variant'와 'size' props를 통해 다양한 스타일과 크기를 지원합니다.
  - CVA(Class Variance Authority)를 사용하여 스타일 변형을 체계적으로 관리합니다.
-->
<template>
  <component
    :is="as"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <!-- 버튼 내부 콘텐츠 (텍스트, 아이콘 등) -->
    <slot />
  </component>
</template>

<script>
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

/**
 * 버튼 스타일 변형 정의 (CVA)
 * - base: 모든 버튼에 공통으로 적용되는 기본 클래스
 * - variants: 속성별 스타일 (variant, size)
 */
const buttonVariants = cva(
  'c-button', // 기본 클래스 (button.css 참조)
  {
    variants: {
      // 스타일 테마 (Visual Style)
      variant: {
        default: 'c-button--default',       // 기본: 주요 동작 (Primary)
        destructive: 'c-button--destructive', // 파괴적 동작 (삭제 등)
        outline: 'c-button--outline',       // 테두리만 있는 스타일
        secondary: 'c-button--secondary',   // 보조 동작
        ghost: 'c-button--ghost',           // 배경 없는 스타일 (호버 시 표시)
        link: 'c-button--link'              // 하이퍼링크 스타일
      },
      // 크기 (Size)
      size: {
        default: 'c-button--default-size', // 기본 크기
        sm: 'c-button--sm',                // 작은 크기
        lg: 'c-button--lg',                // 큰 크기
        icon: 'c-button--icon'             // 아이콘 전용 (정사각형)
      }
    },
    // 기본값 설정
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export default {
  // 컴포넌트 이름: 공통 버튼
  name: 'Button',
  props: {
    // 버튼 스타일 테마 ('default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link')
    variant: {
      type: String,
      default: 'default'
    },
    // 버튼 크기 ('default' | 'sm' | 'lg' | 'icon')
    size: {
      type: String,
      default: 'default'
    },
    // 렌더링할 HTML 태그 (기본: 'button', 링크일 경우 'a' 등 사용 가능)
    as: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    // 최종 적용될 클래스 계산 (CVA + Tailwind Merge)
    buttonClass() {
      return cn(buttonVariants({ variant: this.variant, size: this.size }))
    }
  }
}
</script>

<!-- 버튼 스타일 (CSS) -->
<style src="@/assets/css/components/atoms/button.css"></style>
