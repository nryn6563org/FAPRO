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
    variant: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "default",
    },
    as: {
      type: String,
      default: "button",
    },
  },
  computed: {
    buttonClass() {
      return cn(buttonVariants({ variant: this.variant, size: this.size }));
    },
  },
};
</script>

<style src="@/assets/css/components/common/button.css"></style>

