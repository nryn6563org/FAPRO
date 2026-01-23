<template>
  <div class="p-clients">
    <div class="p-clients__header">
      <div class="p-clients__header-info">
        <h2 class="p-clients__title">고객 관리</h2>
        <p class="p-clients__subtitle">총 {{ clients.length }}명의 고객을 관리하고 있습니다</p>
      </div>
      <Button class="p-clients__add-btn" @click="isAddDialogOpen = true">
        <Plus class="p-clients__add-icon" />
        신규 고객 등록
      </Button>
    </div>

    <!-- Search and Filters -->
    <div class="p-clients__search-box">
      <div class="p-clients__search-header">
        <h3 class="p-clients__search-title">AI고객검색</h3>
        <p class="p-clients__search-desc">(검색예시: 원전 관련 종목을 매도했고, 보유 현금이 5천만원 이상인 고객 찾아줘)</p>
      </div>
      <div class="p-clients__search-form">
        <div class="p-clients__search-field">
          <Search class="p-clients__search-field-icon" />
          <Input
            placeholder="AI에게 원하는 고객군을 대화로 찾아보세요."
            v-model="searchTerm"
            class="p-clients__search-input"
          />
        </div>
        <Button class="p-clients__search-btn">
          <Search class="p-clients__search-btn-icon" />
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
        <div class="p-clients__sort-description">
          <ArrowUpDown class="p-clients__sort-icon" />
          <span class="p-clients__sort-label">정렬:</span>
        </div>
        <div class="p-clients__sort-btn-group">
           <Button
             v-for="option in sortOptions" :key="option.value" 
             :variant="sortBy === option.value ? 'default' : 'outline'"
             size="sm"
             class="p-clients__sort-btn"
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
             <div class="c-client-card__header-top">
                <div class="c-client-card__profile">
                   <div class="c-client-card__avatar">
                      {{ client.name[0] }}
                   </div>
                   <div class="c-client-card__name-wrapper">
                      <h3 class="c-client-card__name">{{ client.name }}</h3>
                      <span :class="['c-client-card__risk-badge', getRiskBadgeClass(client.riskProfile)]">
                        {{ getRiskLabel(client.riskProfile) }}
                      </span>
                   </div>
                </div>
                <button 
                  class="c-client-card__favorite-btn"
                  @click.stop="toggleFavorite(client.id)"
                >
                   <Star :class="['c-client-card__favorite-icon', client.isFavorite ? 'c-client-card__favorite-icon--active' : '']" />
                </button>
             </div>
          </div>
          <div class="c-client-card__body">
             <div class="c-client-card__metrics">
                <div class="c-client-card__metric-item">
                   <p class="c-client-card__metric-label">운용자산(AUM)</p>
                   <p class="c-client-card__metric-value">{{ (client.aum / 100000000).toFixed(0) }}억원</p>
                </div>
                <div class="c-client-card__metric-item">
                   <p class="c-client-card__metric-label">수익률</p>
                   <p :class="['c-client-card__return-rate', client.returns >= 0 ? 'indicator--positive' : 'indicator--negative']">
                      {{ client.returns >= 0 ? '+' : '' }}{{ client.returns }}%
                   </p>
                </div>
             </div>
             
             <div class="c-client-card__info-list">
                <div class="c-client-card__info-item">
                    <Phone class="c-client-card__info-icon" />
                    <span class="c-client-card__info-text">{{ client.phone }}</span>
                </div>
                <div class="c-client-card__info-item">
                    <Calendar class="c-client-card__info-icon" />
                    <span class="c-client-card__info-text">상담: {{ client.lastContact }}</span>
                </div>
             </div>

             <div class="c-client-card__footer">
                <Button variant="outline" size="sm" class="c-client-card__details-btn" @click.stop="selectedClient = client">
                    <FileText class="c-client-card__details-icon" />
                    상세보기
                </Button>
             </div>
          </div>
       </div>
    </div>

    <!-- Add Client Dialog (Simplified) -->
    <Dialog :open.sync="isAddDialogOpen" className="c-dialog-add">
       <div class="c-add-client-form">
          <div class="c-add-client-form__header">
             <h3 class="c-add-client-form__title">신규 고객 등록</h3>
          </div>
          <div class="c-add-client-form__grid">
             <div class="c-add-client-form__field">
                <label class="c-add-client-form__label">고객명</label>
                <Input placeholder="홍길동" class="c-add-client-form__input" />
             </div>
             <div class="c-add-client-form__field">
                <label class="c-add-client-form__label">연락처</label>
                <Input placeholder="010-0000-0000" class="c-add-client-form__input" />
             </div>
             <div class="c-add-client-form__field c-add-client-form__field--full">
                <label class="c-add-client-form__label">메모</label>
                <Input placeholder="특이사항을 입력하세요" class="c-add-client-form__input" />
             </div>
          </div>
          <div class="c-add-client-form__footer">
             <Button variant="outline" @click="isAddDialogOpen = false" class="c-add-client-form__btn">취소</Button>
             <Button @click="isAddDialogOpen = false" class="c-add-client-form__btn">등록</Button>
          </div>
       </div>
    </Dialog>

    <!-- Client Detail Dialog -->
    <Dialog :open="selectedClient !== null" @update:open="(val) => !val && (selectedClient = null)" className="c-dialog-detail">
       <div v-if="selectedClient" class="c-client-detail">
           <!-- Body (Grid Layout) -->
           <div class="c-client-detail__body">
                <!-- Left Column: Profile, Stats, Contact -->
                <div class="c-client-detail__sidebar">
                    <!-- Profile Header (Card) -->
                    <div class="c-client-detail__profile-card">
                        <div class="c-client-detail__avatar">
                           {{ selectedClient.name[0] }}
                        </div>
                        <div class="c-client-detail__profile-info">
                           <!-- Badge First (Stacked) -->
                           <span :class="['c-client-detail__risk-badge', getRiskBadgeClass(selectedClient.riskProfile)]">
                            {{ getRiskLabel(selectedClient.riskProfile) }}
                           </span>
                           <h2 class="c-client-detail__name">{{ selectedClient.name }}</h2>
                        </div>
                    </div>

                    <!-- Metrics (Row of Cards) -->
                    <div class="c-client-detail__metrics">
                        <div class="c-client-detail__metric-card">
                             <div class="c-client-detail__metric-group">
                                <p class="c-client-detail__metric-label">운용자산(AUM)</p>
                                <p class="c-client-detail__metric-value">{{ (selectedClient.aum / 100000000).toFixed(0) }}억원</p>
                             </div>
                        </div>
                        <div class="c-client-detail__metric-card">
                             <div class="c-client-detail__metric-group">
                                <p class="c-client-detail__metric-label">수익률</p>
                                <p :class="['c-client-detail__metric-value', selectedClient.returns >= 0 ? 'indicator--positive' : 'indicator--negative']">
                                  {{ selectedClient.returns >= 0 ? '+' : '' }}{{ selectedClient.returns }}%
                                </p>
                             </div>
                        </div>
                    </div>

                    <!-- Contact Info (Card) -->
                    <div class="c-client-detail__contact-card">
                        <h3 class="c-client-detail__section-title">연락처 정보</h3>
                        <div class="c-client-detail__contact-list">
                            <div class="c-client-detail__contact-item">
                                <Mail class="c-client-detail__contact-icon" />
                                <span class="c-client-detail__contact-text">{{ selectedClient.email }}</span>
                            </div>
                            <div class="c-client-detail__contact-item">
                                <Phone class="c-client-detail__contact-icon" />
                                <span class="c-client-detail__contact-text">{{ selectedClient.phone }}</span>
                            </div>
                            <div class="c-client-detail__contact-item">
                                <Calendar class="c-client-detail__contact-icon" />
                                <span class="c-client-detail__contact-text">가입일: {{ selectedClient.joinDate }}</span>
                            </div>
                            <div class="c-client-detail__contact-item">
                                <Calendar class="c-client-detail__contact-icon" />
                                <span class="c-client-detail__contact-text">최근 상담: {{ selectedClient.lastContact }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Portfolio, Memo -->
                <div class="c-client-detail__main">
                    <!-- Portfolio Configuration (Card) -->
                    <div class="c-client-detail__portfolio-section">
                        <h3 class="c-client-detail__section-title">포트폴리오 구성</h3>
                        <div class="c-client-detail__portfolio-content">
                            <!-- Horizontal Bar -->
                            <div class="c-portfolio-bar">
                                <div class="c-portfolio-bar__segment c-portfolio-bar__segment--stocks" :style="{ width: selectedClient.portfolio.stocks + '%' }" :title="'주식 ' + selectedClient.portfolio.stocks + '%'"></div>
                                <div class="c-portfolio-bar__segment c-portfolio-bar__segment--bonds" :style="{ width: selectedClient.portfolio.bonds + '%' }" :title="'채권 ' + selectedClient.portfolio.bonds + '%'"></div>
                                <div class="c-portfolio-bar__segment c-portfolio-bar__segment--cash" :style="{ width: selectedClient.portfolio.cash + '%' }" :title="'현금 ' + selectedClient.portfolio.cash + '%'"></div>
                                <div class="c-portfolio-bar__segment c-portfolio-bar__segment--alternatives" :style="{ width: selectedClient.portfolio.alternatives + '%' }" :title="'대체투자 ' + selectedClient.portfolio.alternatives + '%'"></div>
                            </div>
                            <!-- Legend -->
                            <div class="c-portfolio-legend">
                                <div class="c-portfolio-legend__item">
                                    <div class="c-portfolio-legend__dot c-portfolio-legend__dot--stocks"></div>
                                    <span class="c-portfolio-legend__text">주식 {{ selectedClient.portfolio.stocks }}%</span>
                                </div>
                                <div class="c-portfolio-legend__item">
                                    <div class="c-portfolio-legend__dot c-portfolio-legend__dot--bonds"></div>
                                    <span class="c-portfolio-legend__text">채권 {{ selectedClient.portfolio.bonds }}%</span>
                                </div>
                                <div class="c-portfolio-legend__item">
                                    <div class="c-portfolio-legend__dot c-portfolio-legend__dot--cash"></div>
                                    <span class="c-portfolio-legend__text">현금 {{ selectedClient.portfolio.cash }}%</span>
                                </div>
                                <div class="c-portfolio-legend__item">
                                    <div class="c-portfolio-legend__dot c-portfolio-legend__dot--alternatives"></div>
                                    <span class="c-portfolio-legend__text">대체투자 {{ selectedClient.portfolio.alternatives }}%</span>
                                </div>
                            </div>

                            <!-- Tabs -->
                            <div class="c-client-detail__portfolio-tabs">
                                <div class="c-client-detail__tab-list">
                                    <button 
                                        v-for="tab in ['stocks', 'bonds', 'cash', 'alternatives']" 
                                        :key="tab"
                                        :class="['c-client-detail__tab-button', activeTab === tab ? 'c-client-detail__tab-button--active' : '']"
                                        @click="activeTab = tab"
                                    >
                                        {{ getTabLabel(tab) }}
                                    </button>
                                </div>

                                <div class="c-client-detail__tab-content">
                                    <!-- TABLE Refactor -->
                                    <table class="c-portfolio-table">
                                        <thead>
                                            <tr class="c-portfolio-table__header">
                                                <th class="c-portfolio-table__th c-portfolio-table__th--left">{{ activeTab === 'bonds' ? '채권명' : '종목명' }}</th>
                                                <th class="c-portfolio-table__th c-portfolio-table__th--right">수익률</th>
                                                <th class="c-portfolio-table__th c-portfolio-table__th--right">비중</th>
                                                <th class="c-portfolio-table__th c-portfolio-table__th--right">편입일</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, idx) in getPortfolioItems(activeTab)" :key="idx" class="c-portfolio-table__row">
                                                <td class="c-portfolio-table__td c-portfolio-table__td--name">{{ item.name }}</td>
                                                <td :class="['c-portfolio-table__td c-portfolio-table__td--right c-portfolio-table__td--return', item.return.startsWith('+') ? 'indicator--positive' : 'indicator--negative']">{{ item.return }}</td>
                                                <td :class="['c-portfolio-table__td c-portfolio-table__td--right c-portfolio-table__td--weight', 'c-portfolio-table__td--weight-' + activeTab]">{{ item.weight }}</td>
                                                <td class="c-portfolio-table__td c-portfolio-table__td--right c-portfolio-table__td--date">{{ item.date }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Notes (Card) -->
                     <div class="c-client-detail__notes-section">
                        <h3 class="c-client-detail__section-title">메모</h3>
                        <p class="c-client-detail__notes-text">{{ selectedClient.notes }}</p>
                     </div>
                </div>
           </div>

           <!-- Footer (New) -->
           <div class="c-client-detail__footer">
                <Button variant="outline" class="c-client-detail__action-button">
                    <MessageSquare class="c-client-detail__action-icon" />
                    문자 보내기
                </Button>
                <Button variant="outline" class="c-client-detail__action-button">
                    <Mail class="c-client-detail__action-icon" />
                    이메일 보내기
                </Button>
                <Button class="c-client-detail__action-button c-client-detail__action-button--primary">
                    <FileText class="c-client-detail__action-icon" />
                    제안서 만들기
                </Button>
           </div>
       </div>
    </Dialog>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import Dialog from '@/components/common/Dialog.vue';
import { Plus, Search, ArrowUpDown, Star, Phone, Calendar, FileText, Mail, X, MessageSquare } from 'lucide-vue';

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
    Plus, Search, ArrowUpDown, Star, Phone, Calendar, FileText, Mail, X, MessageSquare
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
    getRiskBadgeClass(risk) {
      switch (risk) {
        case 'conservative': return 'client-badge-risk--low';
        case 'moderate': return 'client-badge-risk--mid';
        case 'aggressive': return 'client-badge-risk--high';
        default: return '';
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
