<template>
  <div class="c-todo">
    <div class="c-todo__calendar">
      <div class="c-todo__header">
        <h4 class="c-todo__month-title">{{ formattedMonth }}</h4>
        <div class="c-todo__nav">
          <button @click="prevMonth" class="c-todo__nav-btn">
            <ChevronLeft size="16" />
          </button>
          <button @click="nextMonth" class="c-todo__nav-btn">
            <ChevronRight size="16" />
          </button>
        </div>
      </div>

      <div class="c-todo__grid">
        <div v-for="day in weekDays" :key="day" class="c-todo__weekday">
          {{ day }}
        </div>
        <div
          v-for="{ date, isCurrentMonth, isToday } in calendarDays"
          :key="date.toISOString()"
          :class="[
            'c-todo__day',
            !isCurrentMonth && 'c-todo__day--other',
            isToday && 'c-todo__day--today',
            isSelected(date) && 'c-todo__day--selected'
          ]"
          @click="selectDate(date)"
        >
          {{ date.getDate() }}
          <div v-if="hasMemo(date)" class="c-todo__dot"></div>
        </div>
      </div>
    </div>

    <div class="c-todo__memo-area">
      <div class="c-todo__memo-header">
        <span class="c-todo__memo-date">{{ formattedSelectedDate }}</span>
        <div v-if="currentMemo" class="c-todo__memo-actions">
          <button @click="editMemo" class="c-todo__action-btn">
            <Pencil size="14" />
          </button>
          <button @click="deleteMemo" class="c-todo__action-btn">
            <Trash2 size="14" />
          </button>
        </div>
      </div>

      <div v-if="isEditingMemo" class="c-todo__input-group">
        <input
          v-model="memoInput"
          type="text"
          class="c-todo__input"
          placeholder="메모를 입력하세요..."
          @keyup.enter="saveMemo"
        />
        <button @click="saveMemo" class="c-todo__save-btn">저장</button>
      </div>
      <div v-else-if="currentMemo" class="c-todo__memo-content">
        {{ currentMemo }}
      </div>
      <div v-else class="c-todo__no-memo" @click="editMemo">
        클릭하여 메모를 추가하세요.
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-vue'

export default {
  name: 'TodoWidget',
  components: {
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2
  },
  props: {
    widgetId: {
      type: String,
      default: 'todo-widget'
    }
  },
  data() {
    const today = new Date()
    return {
      currentDate: new Date(today.getFullYear(), today.getMonth(), 1),
      selectedDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      weekDays: ['일', '월', '화', '수', '목', '금', '토'],
      memos: {
        // Sample data: YYYY-MM-DD format
        '2026-01-15': '삼성전자 실적 발표 확인',
        '2026-01-20': '고객 상담 준비 (이철수)',
        '2026-01-28': '주간 리포트 분석'
      },
      isEditingMemo: false,
      memoInput: ''
    }
  },
  computed: {
    formattedMonth() {
      return `${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월`
    },
    formattedSelectedDate() {
      const d = this.selectedDate
      return `${d.getMonth() + 1}월 ${d.getDate()}일`
    },
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDayOfMonth = new Date(year, month, 1)
      const lastDayOfMonth = new Date(year, month + 1, 0)
      
      const days = []
      
      // Days from previous month
      const startDay = firstDayOfMonth.getDay()
      for (let i = startDay; i > 0; i--) {
        const d = new Date(year, month, 1 - i)
        days.push({ date: d, isCurrentMonth: false, isToday: this.isToday(d) })
      }
      
      // Days of current month
      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const d = new Date(year, month, i)
        days.push({ date: d, isCurrentMonth: true, isToday: this.isToday(d) })
      }
      
      // Days from next month
      const endDay = lastDayOfMonth.getDay()
      for (let i = 1; i <= 6 - endDay; i++) {
        const d = new Date(year, month + 1, i)
        days.push({ date: d, isCurrentMonth: false, isToday: this.isToday(d) })
      }
      
      return days
    },
    currentMemo() {
      const key = this.getDateKey(this.selectedDate)
      return this.memos[key] || null
    }
  },
  methods: {
    isToday(date) {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    },
    isSelected(date) {
      return (
        date.getDate() === this.selectedDate.getDate() &&
        date.getMonth() === this.selectedDate.getMonth() &&
        date.getFullYear() === this.selectedDate.getFullYear()
      )
    },
    getDateKey(date) {
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    },
    hasMemo(date) {
      return !!this.memos[this.getDateKey(date)]
    },
    selectDate(date) {
      this.selectedDate = date
      this.isEditingMemo = false
    },
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
    editMemo() {
      this.memoInput = this.currentMemo || ''
      this.isEditingMemo = true
    },
    saveMemo() {
      const key = this.getDateKey(this.selectedDate)
      if (this.memoInput.trim()) {
        this.$set(this.memos, key, this.memoInput.trim())
      } else {
        this.$delete(this.memos, key)
      }
      this.isEditingMemo = false
    },
    deleteMemo() {
      const key = this.getDateKey(this.selectedDate)
      this.$delete(this.memos, key)
      this.isEditingMemo = false
    }
  }
}
</script>

<style src="@/assets/css/components/domain/dashboard/widgets/todo-widget.css" scoped></style>
