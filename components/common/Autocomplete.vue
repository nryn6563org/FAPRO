<template>
  <div class="c-autocomplete" v-click-outside="close">
    <div class="c-autocomplete__input-wrapper">
      <slot name="icon"></slot>
      <input
        ref="input"
        type="text"
        :value="value"
        @input="onInput"
        @focus="onFocus"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc="close"
        :placeholder="placeholder"
        :class="inputClassName"
        autocomplete="off"
      />
    </div>

    <!-- Dropdown -->
    <transition name="fade">
      <div v-if="isOpen && (filteredSuggestions.length > 0 || showEmpty)" class="c-autocomplete__dropdown">
        <div class="c-autocomplete__list">
          <div
            v-for="(item, index) in filteredSuggestions"
            :key="item.id || index"
            class="c-autocomplete__item"
            :class="{ 'c-autocomplete__item--active': index === activeIndex }"
            @click="selectItem(item)"
            @mouseenter="activeIndex = index"
          >
            <slot name="item" :item="item">
              <span class="c-autocomplete__item-text">{{ item.name || item }}</span>
            </slot>
          </div>

          <div v-if="filteredSuggestions.length === 0 && showEmpty" class="c-autocomplete__no-results">
            결과가 없습니다.
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Autocomplete',
  props: {
    value: {
      type: String,
      default: ''
    },
    suggestions: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputClassName: {
      type: String,
      default: ''
    },
    showEmpty: {
      type: Boolean,
      default: false
    },
    filterFn: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      activeIndex: -1
    }
  },
  computed: {
    filteredSuggestions() {
      if (this.filterFn) {
        return this.filterFn(this.value, this.suggestions)
      }
      if (!this.value) return this.suggestions
      const query = this.value.toLowerCase()
      return this.suggestions.filter(s => {
        const text = (s.name || s).toLowerCase()
        return text.includes(query)
      })
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.isOpen = true
      this.activeIndex = -1
    },
    onFocus() {
      this.isOpen = true
    },
    onArrowDown() {
      if (!this.isOpen) {
        this.isOpen = true
        return
      }
      if (this.activeIndex < this.filteredSuggestions.length - 1) {
        this.activeIndex++
      }
    },
    onArrowUp() {
      if (this.activeIndex > 0) {
        this.activeIndex--
      }
    },
    onEnter() {
      if (this.activeIndex !== -1 && this.filteredSuggestions[this.activeIndex]) {
        this.selectItem(this.filteredSuggestions[this.activeIndex])
      } else {
        this.$emit('submit', this.value)
        this.close()
      }
    },
    selectItem(item) {
      const val = item.name || item
      this.$emit('input', val)
      this.$emit('select', item)
      this.close()
    },
    close() {
      this.isOpen = false
      this.activeIndex = -1
    }
  },
  directives: {
    'click-outside': {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>

<style src="@/assets/css/components/common/autocomplete.css"></style>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
