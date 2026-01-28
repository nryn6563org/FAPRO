<!--
  지수 선택 다이얼로그 (IndexSelectionDialog)
  - 헤더에 표시할 지수/환율 정보를 사용자가 직접 선택할 수 있는 팝업
  - 간소화된 디자인: 480px 너비, 검색 중심
-->
<template>
  <Dialog :open="isOpen" @update:open="updateOpen" className="c-index-dialog__content">
    <div id="index-selection-modal" class="c-index-dialog">
      <!-- 헤더 & 검색 -->
      <div class="c-index-dialog__header">
        <h2 class="c-index-dialog__title">관심 종목 및 지수 추가</h2>
        <div class="c-index-dialog__search-box">
              <Autocomplete
                v-model="searchQuery"
                :suggestions="availableIndices"
                placeholder="지수 또는 종목명 검색"
                inputClassName="c-index-dialog__search-input"
                @select="toggleIndex($event.id)"
              >
                <template #icon>
                  <Search class="c-index-dialog__search-icon" />
                </template>
                <template #item="{ item }">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-bold">{{ item.name }}</span>
                    <span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{{ item.category }}</span>
                  </div>
                </template>
              </Autocomplete>
        </div>
      </div>



      <!-- 푸터 -->
      <div class="c-index-dialog__footer">
        <div class="c-index-dialog__actions">
          <Button @click="closeDialog" variant="outline" class="c-index-dialog__btn">취소</Button>
          <Button @click="saveSelection" class="c-index-dialog__btn">저장</Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { Check, Search, Plus } from 'lucide-vue'
import Dialog from '@/components/common/Dialog.vue'
import Button from '@/components/common/Button.vue'
import Autocomplete from '@/components/common/Autocomplete.vue'

export default {
  name: 'IndexSelectionDialog',
  components: {
    Dialog,
    Button,
    Autocomplete,
    Check,
    Search,
    Plus
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    availableIndices: {
      type: Array,
      default: () => []
    },
    currentSelectedIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedIds: [],
      searchQuery: ''
    }
  },
  computed: {
      filteredIndices() {
          if (!this.searchQuery) return this.availableIndices
          const query = this.searchQuery.toLowerCase()
          return this.availableIndices.filter(index => 
            index.name.toLowerCase().includes(query) || 
            index.category.toLowerCase().includes(query)
          )
      }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.selectedIds = [...this.currentSelectedIds]
        this.searchQuery = ''
      }
    }
  },
  methods: {
    updateOpen(val) {
      this.$emit('update:open', val)
    },
    closeDialog() {
      this.$emit('close')
    },
    toggleIndex(id) {
      if (this.selectedIds.includes(id)) {
        // 이미 선택된 경우 아무 동작 안 함 (자동완성에서 선택 시 삭제 방지)
        return
      } else {
        if (this.selectedIds.length >= 5) {
          alert('최대 5개까지만 선택할 수 있습니다.')
          return
        }
        this.selectedIds.push(id)
      }
    },
    saveSelection() {
      this.$emit('save', this.selectedIds)
    }
  }
}
</script>

<style src="@/assets/css/components/domain/dashboard/index-dialog.css"></style>
