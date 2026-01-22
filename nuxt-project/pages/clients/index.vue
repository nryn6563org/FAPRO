<template>
  <div class="p-clients">
    <div class="p-clients__header">
      <div>
        <h2 class="p-clients__title">고객 관리</h2>
        <p class="p-clients__subtitle">총 {{ clients.length }}명의 고객을 관리하고 있습니다</p>
      </div>
      <Button class="u-gap-2" @click="isAddDialogOpen = true">
        <Plus class="u-icon-sm" />
        신규 고객 등록
      </Button>
    </div>

    <!-- Search and Filters -->
    <div class="p-clients__search-box">
      <div class="u-mb-4">
        <h3 class="p-clients__search-title">AI고객검색</h3>
        <p class="p-clients__search-desc">(검색예시: 원전 관련 종목을 매도했고, 보유 현금이 5천만원 이상인 고객 찾아줘)</p>
      </div>
      <div class="p-clients__search-form">
        <div class="p-clients__search-input-wrapper">
          <Search class="p-clients__search-icon" />
          <Input
            placeholder="AI에게 원하는 고객군을 대화로 찾아보세요."
            v-model="searchTerm"
            class="p-clients__search-input"
          />
        </div>
        <Button class="u-w-40 u-gap-2">
          <Search class="u-icon-sm u-mr-2" />
          검색
        </Button>
      </div>
    </div>

    <!-- Sort Buttons -->
    <div class="p-clients__sort-bar">
      <div class="p-clients__count">
        <span>검색된 고객 {{ filteredClients.length }}명</span>
      </div>
      <div class="p-clients__sort-actions">
        <div class="p-clients__sort-label">
          <ArrowUpDown class="p-clients__sort-icon" />
          <span class="font-medium">정렬:</span>
        </div>
        <div class="p-clients__sort-btn-group">
           <Button v-for="option in sortOptions" :key="option.value" 
             :variant="sortBy === option.value ? 'default' : 'outline'"
             size="sm"
             class="u-text-sm"
             @click="sortBy = option.value"
           >
             {{ option.label }}
           </Button>
        </div>
      </div>
    </div>

    <!-- Client List -->
    <div class="p-clients__grid">
       <div v-for="client in filteredClients" :key="client.id" class="c-client-card">
          <div class="c-client-card__header">
             <div class="c-client-card__top">
                <div class="c-client-card__info">
                   <div class="c-client-card__avatar">
                      {{ client.name[0] }}
                   </div>
                   <div>
                      <h3 class="c-client-card__name">{{ client.name }}</h3>
                      <span :class="['c-client-card__badge', getRiskBadgeColor(client.riskProfile)]">
                        {{ getRiskLabel(client.riskProfile) }}
                      </span>
                   </div>
                </div>
                <button 
                  class="c-client-card__fav-btn"
                  @click.stop="toggleFavorite(client.id)"
                >
                   <Star :class="['c-client-card__fav-icon', client.isFavorite ? 'c-client-card__fav-icon--active' : '']" />
                </button>
             </div>
          </div>
          <div class="c-client-card__body">
             <div class="c-client-card__stats">
                <div class="u-space-y-1">
                   <p class="c-client-card__stat-label">운용자산(AUM)</p>
                   <p class="c-client-card__stat-val">{{ (client.aum / 100000000).toFixed(0) }}억원</p>
                </div>
                <div class="u-space-y-1">
                   <p class="c-client-card__stat-label">수익률</p>
                   <p :class="['c-client-card__returns', client.returns >= 0 ? 'u-text-green-600' : 'u-text-red-600']">
                      {{ client.returns >= 0 ? '+' : '' }}{{ client.returns }}%
                   </p>
                </div>
             </div>
             
             <div class="c-client-card__contact">
                <div class="c-client-card__contact-row">
                    <Phone class="u-icon-xs" />
                    <span class="u-truncate">{{ client.phone }}</span>
                </div>
                <div class="c-client-card__contact-row">
                    <Calendar class="u-icon-xs" />
                    <span class="u-truncate">상담: {{ client.lastContact }}</span>
                </div>
             </div>

             <div class="c-client-card__actions">
                <Button variant="outline" size="sm" class="u-flex-1 u-text-xs" @click="selectedClient = client">
                    <FileText class="u-icon-xs u-mr-1" />
                    상세보기
                </Button>
             </div>
          </div>
       </div>
    </div>

    <!-- Add Client Dialog (Simplified) -->
    <Dialog :open.sync="isAddDialogOpen" className="c-dialog-add">
       <div class="p-clients__add-dialog">
          <div class="u-mb-4">
             <h3 class="u-text-lg-semibold">신규 고객 등록</h3>
          </div>
          <div class="p-clients__form-grid">
             <div class="p-clients__form-group">
                <label class="p-clients__form-label">고객명</label>
                <Input placeholder="홍길동" />
             </div>
             <div class="p-clients__form-group">
                <label class="p-clients__form-label">연락처</label>
                <Input placeholder="010-0000-0000" />
             </div>
             <div class="u-col-span-2 p-clients__form-group">
                <label class="p-clients__form-label">메모</label>
                <Input placeholder="특이사항을 입력하세요" />
             </div>
          </div>
          <div class="p-clients__dialog-footer">
             <Button variant="outline" @click="isAddDialogOpen = false">취소</Button>
             <Button @click="isAddDialogOpen = false">등록</Button>
          </div>
       </div>
    </Dialog>

    <!-- Client Detail Dialog -->
    <Dialog :open="selectedClient !== null" @update:open="(val) => !val && (selectedClient = null)" className="c-dialog-detail">
       <div v-if="selectedClient" class="c-client-detail">
           <!-- Header -->
           <div class="c-client-detail__header">
               <div class="c-client-detail__header-content">
                   <div class="c-client-detail__avatar">
                      {{ selectedClient.name[0] }}
                   </div>
                   <div class="c-client-detail__name-group">
                      <h2 class="c-client-detail__name">{{ selectedClient.name }}</h2>
                       <span :class="['c-client-detail__badge', getRiskBadgeColor(selectedClient.riskProfile)]">
                        {{ getRiskLabel(selectedClient.riskProfile) }}
                       </span>
                   </div>
               </div>
           </div>
           
           <div class="c-client-detail__body">
                <!-- Metrics -->
                <div class="c-client-detail__metrics">
                    <div class="c-client-detail__metric-card">
                         <div class="u-space-y-1">
                            <p class="c-client-detail__metric-label">운용자산(AUM)</p>
                            <p class="c-client-detail__metric-val">{{ (selectedClient.aum / 100000000).toFixed(0) }}억원</p>
                         </div>
                    </div>
                    <div class="c-client-detail__metric-card">
                         <div class="u-space-y-1">
                            <p class="c-client-detail__metric-label">수익률</p>
                            <p :class="['c-client-detail__metric-val', selectedClient.returns >= 0 ? 'u-text-green-600' : 'u-text-red-600']">
                              {{ selectedClient.returns >= 0 ? '+' : '' }}{{ selectedClient.returns }}%
                            </p>
                         </div>
                    </div>
                </div>
           </div>
       </div>
    </Dialog>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import Dialog from '@/components/common/Dialog.vue';
import { Plus, Search, ArrowUpDown, Star, Phone, Calendar, FileText, Mail, X } from 'lucide-vue';

// Mock Data
const mockClients = [
  {
    id: '1',
    name: '김영희',
    email: 'younghee.kim@example.com',
    phone: '010-1234-5678',
    aum: 35000000000,
    riskProfile: 'moderate',
    joinDate: '2023-03-15',
    lastContact: '2026-01-18',
    portfolio: { stocks: 45, bonds: 35, cash: 15, alternatives: 5 },
    returns: 12.5,
    notes: '안정적 투자 선호, 분기별 리밸런싱 요청',
    isFavorite: true
  },
  {
    id: '2',
    name: '이철수',
    email: 'cheolsoo.lee@example.com',
    phone: '010-2345-6789',
    aum: 28000000000,
    riskProfile: 'conservative',
    joinDate: '2022-11-20',
    lastContact: '2026-01-15',
    portfolio: { stocks: 30, bonds: 50, cash: 18, alternatives: 2 },
    returns: 8.3,
    notes: '은퇴 준비 고객, 안전자산 위주',
    isFavorite: false
  },
  {
      id: '3',
      name: '박민수',
      email: 'minsoo.park@example.com',
      phone: '010-3456-7890',
      aum: 22000000000,
      riskProfile: 'aggressive',
      joinDate: '2024-05-10',
      lastContact: '2026-01-19',
      portfolio: { stocks: 70, bonds: 10, cash: 10, alternatives: 10 },
      returns: 18.7,
      notes: '적극적 투자 성향, 테크 섹터 관심 높음',
      isFavorite: true
  },
  {
      id: '4',
      name: '정수진',
      email: 'soojin.jung@example.com',
      phone: '010-4567-8901',
      aum: 18000000000,
      riskProfile: 'moderate',
      joinDate: '2023-08-22',
      lastContact: '2026-01-17',
      portfolio: { stocks: 50, bonds: 30, cash: 15, alternatives: 5 },
      returns: 10.2,
      notes: '자녀 교육비 준비 중, 중기 투자 계획',
      isFavorite: false
  },
  {
      id: '5',
      name: '최동욱',
      email: 'dongwook.choi@example.com',
      phone: '010-5678-9012',
      aum: 15000000000,
      riskProfile: 'conservative',
      joinDate: '2024-01-15',
      lastContact: '2026-01-16',
      portfolio: { stocks: 35, bonds: 45, cash: 18, alternatives: 2 },
      returns: 7.8,
      notes: '안정적 배당 수익 선호',
      isFavorite: true
  }
];

export default {
  name: "ClientManagement",
  components: {
    Button, Input, Dialog,
    Plus, Search, ArrowUpDown, Star, Phone, Calendar, FileText, Mail, X
  },
  data() {
    return {
      clients: mockClients,
      searchTerm: '',
      isAddDialogOpen: false,
      sortBy: 'aum',
      selectedClient: null,
      activeTab: 'stocks',
      sortOptions: [
        { value: 'aum', label: '자산순' },
        { value: 'name', label: '이름순' },
        { value: 'lastContact', label: '최근상담순' },
        { value: 'returns', label: '수익률순' },
      ]
    };
  },
  computed: {
    filteredClients() {
       return this.clients
        .filter(client => 
           client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            
            switch (this.sortBy) {
                case 'aum': return b.aum - a.aum;
                case 'name': return a.name.localeCompare(b.name, 'ko');
                case 'lastContact': return new Date(b.lastContact) - new Date(a.lastContact);
                case 'returns': return b.returns - a.returns;
                default: return 0;
            }
        });
    }
  },
  methods: {
    toggleFavorite(clientId) {
      this.clients = this.clients.map(c => 
         c.id === clientId ? { ...c, isFavorite: !c.isFavorite } : c
      );
    },
    getRiskBadgeColor(risk) {
      switch (risk) {
        case 'conservative': return 'u-badge-conservative';
        case 'moderate': return 'u-badge-moderate';
        case 'aggressive': return 'u-badge-aggressive';
        default: return 'bg-slate-100 text-slate-700 border-slate-200';
      }
    },
    getRiskLabel(risk) {
       const map = { conservative: '안정형', moderate: '중립형', aggressive: '공격형' };
       return map[risk] || risk;
    },
    getTabLabel(tab) {
        const map = { stocks: '주식', bonds: '채권', cash: '현금', alternatives: '대체투자' };
        return map[tab] || tab;
    }
  }
};
</script>

<style src="@/assets/css/pages/clients.css"></style>
