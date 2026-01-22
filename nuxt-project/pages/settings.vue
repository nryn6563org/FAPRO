<template>
  <div class="p-settings">
    <div class="p-settings__header">
      <h2 class="p-settings__title">설정</h2>
      <p class="p-settings__desc">앱 설정을 관리하세요</p>
    </div>

    <div class="p-settings__grid">
      <!-- Sidebar Navigation -->
      <div class="p-settings__sidebar">
         <button 
           v-for="tab in tabs" 
           :key="tab.id"
           @click="activeTab = tab.id"
           :class="['p-settings__nav-btn', activeTab === tab.id ? 'p-settings__nav-btn--active' : '']"
         >
            <component :is="tab.icon" class="p-settings__nav-icon" />
            {{ tab.label }}
         </button>
      </div>

      <!-- Content Area -->
      <div class="p-settings__content">
         <!-- Profile Section -->
         <div v-if="activeTab === 'profile'" class="p-settings__card">
             <div class="p-settings__profile-header">
                 <div class="p-settings__profile-avatar">
                     FA
                 </div>
                 <div>
                     <h3 class="p-settings__profile-name">김승원 FA</h3>
                     <p class="p-settings__profile-role">프리미어 등급</p>
                     <Button variant="outline" size="sm" class="p-settings__profile-btn">프로필 사진 변경</Button>
                 </div>
             </div>
             
             <div class="p-settings__card-body">
                 <div class="p-settings__form-grid">
                     <div class="p-settings__form-group">
                        <label class="p-settings__label">이름</label>
                        <Input value="김승원" />
                     </div>
                     <div class="p-settings__form-group">
                        <label class="p-settings__label">직책</label>
                        <Input value="Senior FA" />
                     </div>
                 </div>
                 <div class="p-settings__form-group">
                    <label class="p-settings__label">이메일</label>
                    <Input value="sw.kim@rassi.co.kr" />
                 </div>
                 <div class="p-settings__form-group">
                    <label class="p-settings__label">연락처</label>
                    <Input value="010-1234-5678" />
                 </div>
             </div>
             
             <div class="p-settings__actions">
                 <Button class="bg-blue-600 hover:bg-blue-700">변경사항 저장</Button>
             </div>
         </div>

         <!-- Notifications Section -->
         <div v-if="activeTab === 'notifications'" class="p-settings__card">
             <h3 class="p-settings__card-title">알림 설정</h3>
             
             <div class="p-settings__card-body">
                 <div v-for="noti in notificationSettings" :key="noti.id" class="p-settings__noti-item">
                     <div>
                         <p class="p-settings__noti-label">{{ noti.label }}</p>
                         <p class="p-settings__noti-desc">{{ noti.desc }}</p>
                     </div>
                     <div 
                        @click="noti.enabled = !noti.enabled"
                        :class="['p-settings__toggle', noti.enabled ? 'p-settings__toggle--active' : '']"
                     >
                          <div :class="['p-settings__toggle-handle', noti.enabled ? 'p-settings__toggle-handle--active' : '']" />
                     </div>
                 </div>
             </div>
         </div>

         <!-- System Section -->
         <div v-if="activeTab === 'system'" class="p-settings__card">
             <h3 class="p-settings__card-title">시스템 정보</h3>
             
             <div class="p-settings__card-body">
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
                     <span class="p-settings__info-value p-settings__info-value--active">연결됨 (RASSI API)</span>
                 </div>
             </div>
             
             <div class="p-settings__footer-actions">
                 <Button variant="outline" class="p-settings__danger-btn">
                     캐시 삭제 및 초기화
                 </Button>
             </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User, Bell, Shield, Info, Smartphone } from 'lucide-vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';

export default {
    name: 'SettingsPage',
    components: {
        Button, Input,
        User, Bell, Shield, Info, Smartphone
    },
    data() {
        return {
            activeTab: 'profile',
            tabs: [
                { id: 'profile', label: '프로필 설정', icon: 'User' },
                { id: 'notifications', label: '알림 설정', icon: 'Bell' },
                { id: 'security', label: '보안 및 로그인', icon: 'Shield' },
                { id: 'system', label: '시스템 정보', icon: 'Info' },
            ],
            notificationSettings: [
                { id: 'push', label: '푸시 알림', desc: '주요 시장 이슈 및 AI 매매신호 알림', enabled: true },
                { id: 'email', label: '이메일 리포트', desc: '일일/주간 시장 분석 리포트 수신', enabled: true },
                { id: 'marketing', label: '마케팅 정보', desc: '새로운 기능 및 프로모션 안내', enabled: false },
                { id: 'sound', label: '알림음', desc: '앱 사용 중 알림음 재생', enabled: true },
            ]
        };
    }
}
</script>

<style src="@/assets/css/pages/settings.css"></style>
