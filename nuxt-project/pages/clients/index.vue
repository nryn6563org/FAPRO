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
       <div v-for="client in filteredClients" :key="client.id" class="c-client-card" @click="selectedClient = client">
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
                <Button variant="outline" size="sm" class="u-flex-1 u-text-xs" @click.stop="selectedClient = client">
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

                <!-- Contact Info -->
                <div class="c-client-detail__section">
                    <h3 class="c-client-detail__section-title">연락처 정보</h3>
                    <div class="c-client-detail__contact-list">
                        <div class="c-client-detail__contact-item">
                            <Mail class="u-icon-sm u-text-slate-500" />
                            <span>{{ selectedClient.email }}</span>
                        </div>
                        <div class="c-client-detail__contact-item">
                            <Phone class="u-icon-sm u-text-slate-500" />
                            <span>{{ selectedClient.phone }}</span>
                        </div>
                        <div class="c-client-detail__contact-item">
                            <Calendar class="u-icon-sm u-text-slate-500" />
                            <span>가입일: {{ selectedClient.joinDate }}</span>
                        </div>
                        <div class="c-client-detail__contact-item">
                            <Calendar class="u-icon-sm u-text-slate-500" />
                            <span>최근 상담: {{ selectedClient.lastContact }}</span>
                        </div>
                    </div>
                </div>

                <!-- Portfolio Configuration -->
                <div class="c-client-detail__section">
                    <h3 class="c-client-detail__section-title">포트폴리오 구성</h3>
                    <div class="u-space-y-4">
                        <!-- Horizontal Bar -->
                        <div class="c-client-detail__portfolio-bar">
                            <div class="u-bg-blue-500" :style="{ width: selectedClient.portfolio.stocks + '%' }" :title="'주식 ' + selectedClient.portfolio.stocks + '%'"></div>
                            <div class="u-bg-green-500" :style="{ width: selectedClient.portfolio.bonds + '%' }" :title="'채권 ' + selectedClient.portfolio.bonds + '%'"></div>
                            <div class="u-bg-yellow-500" :style="{ width: selectedClient.portfolio.cash + '%' }" :title="'현금 ' + selectedClient.portfolio.cash + '%'"></div>
                            <div class="u-bg-purple-500" :style="{ width: selectedClient.portfolio.alternatives + '%' }" :title="'대체투자 ' + selectedClient.portfolio.alternatives + '%'"></div>
                        </div>
                        <!-- Legend -->
                        <div class="c-client-detail__legend">
                            <div class="c-client-detail__legend-item">
                                <div class="c-client-detail__legend-dot u-bg-blue-500"></div>
                                <span class="u-text-sm">주식 {{ selectedClient.portfolio.stocks }}%</span>
                            </div>
                            <div class="c-client-detail__legend-item">
                                <div class="c-client-detail__legend-dot u-bg-green-500"></div>
                                <span class="u-text-sm">채권 {{ selectedClient.portfolio.bonds }}%</span>
                            </div>
                            <div class="c-client-detail__legend-item">
                                <div class="c-client-detail__legend-dot u-bg-yellow-500"></div>
                                <span class="u-text-sm">현금 {{ selectedClient.portfolio.cash }}%</span>
                            </div>
                            <div class="c-client-detail__legend-item">
                                <div class="c-client-detail__legend-dot u-bg-purple-500"></div>
                                <span class="u-text-sm">대체투자 {{ selectedClient.portfolio.alternatives }}%</span>
                            </div>
                        </div>

                        <!-- Tabs -->
                        <div class="c-client-detail__tabs">
                            <div class="c-client-detail__tab-list">
                                <button 
                                    v-for="tab in ['stocks', 'bonds', 'cash', 'alternatives']" 
                                    :key="tab"
                                    :class="['c-client-detail__tab-btn', activeTab === tab ? 'c-client-detail__tab-btn--active' : '']"
                                    @click="activeTab = tab"
                                >
                                    {{ getTabLabel(tab) }}
                                </button>
                            </div>

                            <div class="u-mt-4">
                                <div class="c-client-detail__table-header">
                                    <div>{{ activeTab === 'bonds' ? '채권명' : '종목명' }}</div>
                                    <div class="u-text-right">수익률</div>
                                    <div class="u-text-right">비중</div>
                                    <div class="u-text-right">편입일</div>
                                </div>
                                <div class="c-client-detail__table-body">
                                    <div v-for="(item, idx) in getPortfolioItems(activeTab)" :key="idx" class="c-client-detail__table-row">
                                        <div class="u-font-medium">{{ item.name }}</div>
                                        <div :class="['u-text-right u-font-medium', item.return.startsWith('+') ? 'u-text-green-600' : 'u-text-red-600']">{{ item.return }}</div>
                                        <div :class="['u-text-right', activeTab === 'cash' ? 'u-text-yellow-600' : activeTab === 'alternatives' ? 'u-text-purple-600' : (activeTab === 'bonds' ? 'u-text-green-600' : 'u-text-blue-600')]">{{ item.weight }}</div>
                                        <div class="u-text-right u-text-slate-500">{{ item.date }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notes -->
                 <div class="c-client-detail__section">
                    <h3 class="c-client-detail__section-title">메모</h3>
                    <p class="u-text-slate-700">{{ selectedClient.notes }}</p>
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

// Full Mock Data
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
  },
  {
    id: '6',
    name: '송미경',
    email: 'mikyung.song@example.com',
    phone: '010-6789-0123',
    aum: 42000000000,
    riskProfile: 'aggressive',
    joinDate: '2023-06-12',
    lastContact: '2026-01-20',
    portfolio: { stocks: 65, bonds: 20, cash: 10, alternatives: 5 },
    returns: 15.3,
    notes: '해외주식 투자 비중 확대 희망',
    isFavorite: false
  },
  {
    id: '7',
    name: '강준호',
    email: 'junho.kang@example.com',
    phone: '010-7890-1234',
    aum: 31000000000,
    riskProfile: 'moderate',
    joinDate: '2023-09-05',
    lastContact: '2026-01-19',
    portfolio: { stocks: 48, bonds: 32, cash: 15, alternatives: 5 },
    returns: 11.8,
    notes: 'ESG 투자에 관심 많음',
    isFavorite: true
  },
  {
    id: '8',
    name: '윤지혜',
    email: 'jihye.yoon@example.com',
    phone: '010-8901-2345',
    aum: 26000000000,
    riskProfile: 'conservative',
    joinDate: '2024-02-28',
    lastContact: '2026-01-18',
    portfolio: { stocks: 28, bonds: 52, cash: 18, alternatives: 2 },
    returns: 6.9,
    notes: '주택 구입 자금 준비 중',
    isFavorite: false
  },
  {
    id: '9',
    name: '임태양',
    email: 'taeyang.lim@example.com',
    phone: '010-9012-3456',
    aum: 38000000000,
    riskProfile: 'aggressive',
    joinDate: '2022-12-10',
    lastContact: '2026-01-17',
    portfolio: { stocks: 72, bonds: 12, cash: 8, alternatives: 8 },
    returns: 20.1,
    notes: '바이오/헬스케어 섹터 집중 투자',
    isFavorite: true
  },
  {
    id: '10',
    name: '한소영',
    email: 'soyoung.han@example.com',
    phone: '010-0123-4567',
    aum: 29000000000,
    riskProfile: 'moderate',
    joinDate: '2023-04-18',
    lastContact: '2026-01-16',
    portfolio: { stocks: 52, bonds: 28, cash: 15, alternatives: 5 },
    returns: 13.2,
    notes: '연금 저축 계좌 추가 개설 필요',
    isFavorite: false
  },
  {
    id: '11',
    name: '오성민',
    email: 'seongmin.oh@example.com',
    phone: '010-1357-2468',
    aum: 19000000000,
    riskProfile: 'conservative',
    joinDate: '2024-07-22',
    lastContact: '2026-01-15',
    portfolio: { stocks: 32, bonds: 48, cash: 18, alternatives: 2 },
    returns: 7.2,
    notes: '보수적 자산 배분 선호',
    isFavorite: true
  },
  {
    id: '12',
    name: '서현우',
    email: 'hyunwoo.seo@example.com',
    phone: '010-2468-1357',
    aum: 45000000000,
    riskProfile: 'aggressive',
    joinDate: '2023-01-30',
    lastContact: '2026-01-20',
    portfolio: { stocks: 68, bonds: 15, cash: 10, alternatives: 7 },
    returns: 17.9,
    notes: '반도체 업종 비중 높음',
    isFavorite: false
  },
  {
    id: '13',
    name: '권나영',
    email: 'nayoung.kwon@example.com',
    phone: '010-3690-2581',
    aum: 24000000000,
    riskProfile: 'moderate',
    joinDate: '2023-11-08',
    lastContact: '2026-01-19',
    portfolio: { stocks: 46, bonds: 34, cash: 16, alternatives: 4 },
    returns: 9.8,
    notes: '배당주 중심 포트폴리오 구성',
    isFavorite: true
  },
  {
    id: '14',
    name: '조재훈',
    email: 'jaehun.cho@example.com',
    phone: '010-4812-3690',
    aum: 33000000000,
    riskProfile: 'aggressive',
    joinDate: '2024-03-14',
    lastContact: '2026-01-18',
    portfolio: { stocks: 75, bonds: 8, cash: 12, alternatives: 5 },
    returns: 22.4,
    notes: '신재생 에너지 섹터 관심',
    isFavorite: false
  },
  {
    id: '15',
    name: '배수진',
    email: 'soojin.bae@example.com',
    phone: '010-5924-3681',
    aum: 27000000000,
    riskProfile: 'moderate',
    joinDate: '2023-07-25',
    lastContact: '2026-01-17',
    portfolio: { stocks: 49, bonds: 31, cash: 15, alternatives: 5 },
    returns: 11.3,
    notes: '글로벌 분산투자 선호',
    isFavorite: true
  },
  {
    id: '16',
    name: '신도현',
    email: 'dohyun.shin@example.com',
    phone: '010-6147-2583',
    aum: 21000000000,
    riskProfile: 'conservative',
    joinDate: '2024-05-19',
    lastContact: '2026-01-16',
    portfolio: { stocks: 33, bonds: 47, cash: 18, alternatives: 2 },
    returns: 8.1,
    notes: '안정적 수익 추구, 위험 회피 성향',
    isFavorite: false
  },
  {
    id: '17',
    name: '홍지우',
    email: 'jiwoo.hong@example.com',
    phone: '010-7258-3694',
    aum: 36000000000,
    riskProfile: 'aggressive',
    joinDate: '2022-10-05',
    lastContact: '2026-01-20',
    portfolio: { stocks: 70, bonds: 13, cash: 10, alternatives: 7 },
    returns: 19.6,
    notes: '테마주 단기 매매 선호',
    isFavorite: true
  },
  {
    id: '18',
    name: '남궁민',
    email: 'min.namgung@example.com',
    phone: '010-8369-1470',
    aum: 30000000000,
    riskProfile: 'moderate',
    joinDate: '2023-12-20',
    lastContact: '2026-01-19',
    portfolio: { stocks: 51, bonds: 29, cash: 15, alternatives: 5 },
    returns: 12.7,
    notes: '퇴직연금 자산배분 컨설팅 진행 중',
    isFavorite: false
  },
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
    },
    getPortfolioItems(tab) {
        // Mock data for tab content
        const items = {
            stocks: [
                { name: '삼성전자', return: '+12.5%', weight: '30%', date: '2024.03.15' },
                { name: 'SK하이닉스', return: '+28.3%', weight: '20%', date: '2024.05.20' },
                { name: 'NAVER', return: '+8.7%', weight: '15%', date: '2024.08.10' },
                { name: 'LG에너지솔루션', return: '-3.2%', weight: '10%', date: '2024.11.05' },
                { name: '현대차', return: '+5.1%', weight: '5%', date: '2025.01.12' },
            ],
            bonds: [
                { name: '국고채권 10년', return: '+3.2%', weight: '40%', date: '2023.06.10' },
                { name: '회사채 AA+', return: '+4.5%', weight: '30%', date: '2023.09.22' },
                { name: '국고채권 5년', return: '+2.8%', weight: '20%', date: '2024.02.15' },
                { name: '통안채 3년', return: '+2.1%', weight: '10%', date: '2024.07.30' },
            ],
            cash: [
                { name: 'CMA 통장', return: '+2.5%', weight: '65%', date: '2023.03.15' },
                { name: 'MMF', return: '+2.8%', weight: '35%', date: '2024.01.10' },
            ],
            alternatives: [
                 { name: '글로벌 부동산 펀드', return: '+6.8%', weight: '50%', date: '2023.11.20' },
                 { name: '금 ETF', return: '+11.3%', weight: '30%', date: '2024.04.15' },
                 { name: '원자재 펀드', return: '-1.5%', weight: '20%', date: '2024.09.08' },
            ]
        };
        return items[tab] || [];
    }
  }
};
</script>

<style src="@/assets/css/pages/clients.css"></style>
