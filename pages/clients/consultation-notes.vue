<template>
  <div class="p-clients-notes">
    <div class="c-page-header">
      <h1 class="c-page-header__title">고객상담노트</h1>
      <p class="c-page-header__desc">고객과의 상담 내역을 관리하고 기록합니다.</p>
    </div>

    <!-- 검색 및 필터 -->
    <div class="c-notes-actions">
      <div class="c-notes-search">
        <Search class="c-notes-search-icon" />
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="고객명 또는 제목으로 검색..." 
          class="c-notes-search-input"
        />
      </div>
      <Button class="flex items-center gap-2">
        <Plus class="w-4 h-4" />
        새 상담 기록
      </Button>
    </div>

    <div class="c-investment-container">
      <table class="c-notes-table">
        <thead>
          <tr>
            <th style="width: 120px;">일자</th>
            <th style="width: 100px;">고객명</th>
            <th style="width: 80px;">구분</th>
            <th>상담 제목 및 내용</th>
            <th style="width: 100px;">작업</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in filteredNotes" :key="note.id">
            <td class="c-notes-table__date">{{ note.date }}</td>
            <td class="c-notes-table__client">{{ note.clientName }}</td>
            <td>
              <span :class="['c-notes-badge', getBadgeClass(note.type)]">
                {{ note.type }}
              </span>
            </td>
            <td>
              <p class="c-notes-table__title">{{ note.title }}</p>
              <p class="c-notes-table__content">{{ note.content }}</p>
            </td>
            <td>
              <div class="c-notes-table__actions">
                <button class="c-notes-action-btn" title="수정">
                  <Edit2 class="w-4 h-4" />
                </button>
                <button class="c-notes-action-btn c-notes-action-btn--delete" title="삭제">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredNotes.length === 0" class="flex items-center justify-center py-20 text-slate-400">
        검색 결과가 없습니다.
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Plus, Edit2, Trash2 } from 'lucide-vue'
import { mockNotes } from '@/utils/notes-data'
import Button from '@/components/atoms/Button.vue'

export default {
  name: 'ConsultationNotesPage',
  components: {
    Search,
    Plus,
    Edit2,
    Trash2,
    Button
  },
  data() {
    return {
      searchTerm: '',
      notes: mockNotes
    }
  },
  computed: {
    filteredNotes() {
      if (!this.searchTerm) return this.notes
      const term = this.searchTerm.toLowerCase()
      return this.notes.filter(note => 
        note.clientName.toLowerCase().includes(term) || 
        note.title.toLowerCase().includes(term)
      )
    }
  },
  methods: {
    getBadgeClass(type) {
      if (type === '방문') return 'c-notes-badge--visit'
      if (type === '유선') return 'c-notes-badge--call'
      if (type === '메일') return 'c-notes-badge--mail'
      return ''
    }
  },
  head() {
    return {
      title: '고객상담노트 - RASSI FApro'
    }
  }
}
</script>

<style scoped src="@/assets/css/pages/clients/consultation-notes.css"></style>
