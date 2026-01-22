<template>
  <div v-if="open" class="c-dialog">
    <!-- Backdrop -->
    <div class="c-dialog__backdrop" @click="$emit('update:open', false)"></div>
    
    <!-- Content -->
    <div class="c-dialog__content" :class="contentClass">
       <slot></slot>
       <button 
         class="c-dialog__close"
         @click="$emit('update:open', false)"
       >
         <X class="u-icon-sm" />
         <span class="sr-only">Close</span>
       </button>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue';
import { cn } from '@/utils/cn';

export default {
  name: "Dialog",
  components: { X },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    }
  },
  computed: {
    contentClass() {
        return cn(this.className);
    }
  }
};
</script>

<style src="@/assets/css/components/common/dialog.css"></style>

