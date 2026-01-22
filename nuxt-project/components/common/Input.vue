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
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  computed: {
    inputClass() {
      return cn("c-input");
    },
  },
};
</script>

<style src="@/assets/css/components/common/input.css"></style>
