<!-- 설정 페이지: 프로필, 알림, 시스템 정보 등 앱 환경설정 관리 -->
<template>
  <div class="p-settings">
    <div class="c-page-header">
      <h2 class="c-page-header__title">설정</h2>
      <p class="c-page-header__desc">앱 환경 및 개인정보를 관리하세요</p>
    </div>

    <div class="p-settings__layout">
      <!-- Sidebar Navigation -->
      <div class="p-settings__sidebar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="p-settings__nav-item"
            :class="activeTab === tab.id ? 'p-settings__nav-item--active' : 'p-settings__nav-item--inactive'"
          >
             <component :is="tab.icon" class="w-5 h-5" />
             {{ tab.label }}
          </button>
      </div>

      <!-- Content Area -->
      <div class="p-settings__content">
         <!-- Profile Section -->
         <div v-if="activeTab === 'profile'" class="p-settings__section-card">
             <div class="p-settings__profile-header">
                 <div class="p-settings__avatar">FA</div>
                 <div class="p-settings__profile-info">
                     <h3>김승원 FA</h3>
                     <p>프리미어 등급 브로커</p>
                 </div>
                 <Button variant="outline" size="sm" style="margin-left: auto">프로필 사진 변경</Button>
             </div>

             <div class="p-settings__form-body">
                 <div class="p-settings__form-grid">
                     <div class="p-settings__form-field">
                        <label class="p-settings__label">이름</label>
                        <Input value="김승원" />
                     </div>
                     <div class="p-settings__form-field">
                        <label class="p-settings__label">직책</label>
                        <Input value="Senior FA" />
                     </div>
                 </div>
                 <div class="p-settings__form-field">
                    <label class="p-settings__label">이메일</label>
                    <Input value="sw.kim@rassi.co.kr" />
                 </div>
                 <div class="p-settings__form-field">
                    <label class="p-settings__label">연락처</label>
                    <Input value="010-1234-5678" />
                 </div>

                 <div class="p-settings__actions">
                     <Button class="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900">변경사항 저장</Button>
                 </div>
             </div>
         </div>

         <!-- Notifications Section -->
         <div v-if="activeTab === 'notifications'" class="p-settings__section-card" style="padding: 1.5rem">
             <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">알림 설정</h3>

             <div class="p-settings__noti-list">
                 <div v-for="noti in notificationSettings" :key="noti.id" class="p-settings__noti-item">
                     <div>
                         <p class="p-settings__noti-title">{{ noti.label }}</p>
                         <p class="p-settings__noti-desc">{{ noti.desc }}</p>
                     </div>
                     <div
                        @click="noti.enabled = !noti.enabled"
                        class="p-settings__switch"
                        :class="noti.enabled ? 'p-settings__switch--on' : 'p-settings__switch--off'"
                     >
                          <div class="p-settings__switch-dot" />
                     </div>
                 </div>
             </div>
         </div>

         <!-- System Section -->
         <div v-if="activeTab === 'system'" class="p-settings__section-card" style="padding: 1.5rem">
             <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">시스템 정보</h3>

             <div class="p-settings__info-list">
                 <div class="p-settings__info-row">
                     <span class="p-settings__info-label">앱 버전</span>
                     <span class="p-settings__info-value">v1.2.0</span>
                 </div>
                 <div class="p-settings__info-row">
                     <span class="p-settings__info-label">빌드 번호</span>
                     <span class="p-settings__info-value">20260120-RC1</span>
                 </div>
                  <div class="p-settings__info-row">
                     <span class="p-settings__info-label">데이터 소스</span>
                     <span class="p-settings__info-value--active">
                        <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        연결됨 (RASSI API)
                     </span>
                 </div>
             </div>

             <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                 <Button variant="outline" class="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/10">
                     캐시 삭제 및 초기화
                 </Button>
             </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User, Bell, Shield, Info, Smartphone } from 'lucide-vue'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'

export default {
  name: 'SettingsPage',
  components: {
    Button,
    Input,
    User,
    Bell,
    Shield,
    Info,
    Smartphone
  },
  data() {
    return {
      // 현재 활성화된 탭 ID
      activeTab: 'profile',
      // 설정 네비게이션 탭 구성
      tabs: [
        { id: 'profile', label: '프로필 설정', icon: 'User' },
        { id: 'notifications', label: '알림 설정', icon: 'Bell' },
        { id: 'security', label: '보안 및 로그인', icon: 'Shield' },
        { id: 'system', label: '시스템 정보', icon: 'Info' }
      ],
      // 알림 항목별 설정 상태
      notificationSettings: [
        { id: 'push', label: '푸시 알림', desc: '주요 시장 이슈 및 AI 매매신호 알림', enabled: true },
        { id: 'email', label: '이메일 리포트', desc: '일일/주간 시장 분석 리포트 수신', enabled: true },
        { id: 'marketing', label: '마케팅 정보', desc: '새로운 기능 및 프로모션 안내', enabled: false },
        { id: 'sound', label: '알림음', desc: '앱 사용 중 알림음 재생', enabled: true }
      ]
    }
  }
}
</script>

<style src="@/assets/css/pages/settings.css"></style>
