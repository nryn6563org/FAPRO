<template>
  <div class="p-tasks-today">
    <div class="c-page-header">
      <h1 class="c-page-header__title">오늘 할 일</h1>
      <p class="c-page-header__desc">오늘의 일정과 업무 리스트를 관리합니다.</p>
    </div>

    <div class="c-investment-container">
      <div class="c-todo-calendar">
        <!-- 1. 달력 헤머 (월 이동) -->
        <div class="c-calendar-header">
          <div class="c-calendar-nav">
             <Button variant="outline" size="sm" @click="changeMonth(-1)">
               <ChevronLeft class="w-4 h-4" />
             </Button>
             <h2 class="c-calendar-current">{{ currentYear }}년 {{ currentMonth + 1 }}월</h2>
             <Button variant="outline" size="sm" @click="changeMonth(1)">
               <ChevronRight class="w-4 h-4" />
             </Button>
          </div>
          <Button variant="outline" size="sm" @click="goToToday">오늘</Button>
        </div>

        <!-- 2. 달력 그리드 -->
        <div class="c-calendar-grid">
          <div 
            v-for="(day, index) in weekDays" 
            :key="day" 
            :class="['c-calendar-day-head', index === 0 ? 'c-calendar-day-head--sun' : index === 6 ? 'c-calendar-day-head--sat' : '']"
          >
            {{ day }}
          </div>
          
          <div 
            v-for="date in calendarDays" 
            :key="date.key"
            :class="[
              'c-calendar-day',
              !date.isCurrentMonth ? 'c-calendar-day--outside' : '',
              date.isToday ? 'c-calendar-day--today' : '',
              selectedDate === date.fullDate ? 'c-calendar-day--selected' : ''
            ]"
            @click="selectDate(date.fullDate)"
          >
            <span class="c-calendar-day__number">{{ date.day }}</span>
            <div v-if="hasMemo(date.fullDate)" class="c-calendar-day__memo-dot"></div>
          </div>
        </div>

        <!-- 3. 메모 상세 영역 -->
        <div v-if="selectedDate" class="c-todo-memo-detail">
          <div class="c-todo-memo-header">
            <h3 class="c-todo-memo-title">{{ selectedDate }} 업무 메모</h3>
            <div class="flex gap-2">
              <Button v-if="getMemo(selectedDate)" variant="ghost" size="sm" class="text-red-500" @click="deleteMemo(selectedDate)">삭제</Button>
              <Button variant="outline" size="sm" @click="isEditing = true">편집</Button>
            </div>
          </div>
          
          <div v-if="getMemo(selectedDate)" class="c-todo-memo-content">
            {{ getMemo(selectedDate).content }}
          </div>
          <div v-else class="c-todo-memo-empty">
            작성된 메모가 없습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeft, ChevronRight, Search, Plus, Sparkles } from 'lucide-vue'
import Button from '@/components/atoms/Button.vue'
import { mockMemos } from '@/utils/todo-data'

export default {
  name: 'TodoTodayPage',
  components: {
    ChevronLeft,
    ChevronRight,
    Button
  },
  data() {
    const today = new Date()
    return {
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth(),
      selectedDate: today.toISOString().split('T')[0],
      memos: mockMemos,
      weekDays: ['일', '월', '화', '수', '목', '금', '토'],
      isEditing: false
    }
  },
  computed: {
    calendarDays() {
      const days = []
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay()
      const lastDateOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
      
      // 저번달 날짜들
      const lastDateOfPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate()
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const day = lastDateOfPrevMonth - i
        days.push({
          day,
          isCurrentMonth: false,
          fullDate: `${this.currentYear}-${String(this.currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          key: `prev-${day}`
        })
      }
      
      // 이번달 날짜들
      const todayStr = new Date().toISOString().split('T')[0]
      for (let i = 1; i <= lastDateOfMonth; i++) {
        const fullDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        days.push({
          day: i,
          isCurrentMonth: true,
          isToday: fullDate === todayStr,
          fullDate,
          key: `curr-${i}`
        })
      }
      
      // 다음달 날짜들 (42칸 맞추기)
      const remainingSlots = 42 - days.length
      for (let i = 1; i <= remainingSlots; i++) {
        days.push({
          day: i,
          isCurrentMonth: false,
          fullDate: `${this.currentYear}-${String(this.currentMonth + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
          key: `next-${i}`
        })
      }
      
      return days
    }
  },
  methods: {
    changeMonth(delta) {
      let newMonth = this.currentMonth + delta
      let newYear = this.currentYear
      
      if (newMonth < 0) {
        newMonth = 11
        newYear--
      } else if (newMonth > 11) {
        newMonth = 0
        newYear++
      }
      
      this.currentMonth = newMonth
      this.currentYear = newYear
    },
    goToToday() {
      const today = new Date()
      this.currentYear = today.getFullYear()
      this.currentMonth = today.getMonth()
      this.selectedDate = today.toISOString().split('T')[0]
    },
    selectDate(date) {
      this.selectedDate = date
    },
    hasMemo(date) {
      return this.memos.some(m => m.date === date)
    },
    getMemo(date) {
      return this.memos.find(m => m.date === date)
    },
    deleteMemo(date) {
      if (confirm('메모를 삭제하시겠습니까?')) {
        this.memos = this.memos.filter(m => m.date !== date)
      }
    }
  },
  head() {
    return {
      title: '오늘 할 일 - RASSI FApro'
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/tasks/today.css';
</style>
