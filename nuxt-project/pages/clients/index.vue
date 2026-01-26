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

    <!-- Client List Grid -->
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

    <!-- 모듈화된 팝업 컴포넌트 -->
    <ClientRegisterModal
      :open="isAddDialogOpen"
      @update:open="isAddDialogOpen = $event"
      @submit="handleRegisterSubmit"
    />

    <ClientDetailModal
      :open="selectedClient !== null"
      :client="selectedClient"
      @update:open="val => !val && (selectedClient = null)"
    />
  </div>
</template>

<script>
// Lucide Icons
import { Plus, Search, ArrowUpDown, Star, Phone, Calendar, FileText } from 'lucide-vue'

// Common Components
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'

// Modular Components
import ClientRegisterModal from '@/components/domain/clients/ClientRegisterModal.vue'
import ClientDetailModal from '@/components/domain/clients/ClientDetailModal.vue'

// Data Utility
import { mockClients, getRiskBadgeClass, getRiskLabel } from '@/utils/client-data'

export default {
  name: 'ClientManagement',
  components: {
    Button,
    Input,
    Plus,
    Search,
    ArrowUpDown,
    Star,
    Phone,
    Calendar,
    FileText,
    ClientRegisterModal,
    ClientDetailModal
  },
  data() {
    return {
      clients: mockClients,
      searchTerm: '',
      isAddDialogOpen: false,
      sortBy: 'aum',
      selectedClient: null,
      sortOptions: [
        { value: 'aum', label: '자산순' },
        { value: 'name', label: '이름순' },
        { value: 'lastContact', label: '최근상담순' },
        { value: 'returns', label: '수익률순' }
      ]
    }
  },
  computed: {
    filteredClients() {
      return this.clients
        .filter(client =>
          client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) { return -1 }
          if (!a.isFavorite && b.isFavorite) { return 1 }

          switch (this.sortBy) {
            case 'aum': return b.aum - a.aum
            case 'name': return a.name.localeCompare(b.name, 'ko')
            case 'lastContact': return new Date(b.lastContact) - new Date(a.lastContact)
            case 'returns': return b.returns - a.returns
            default: return 0
          }
        })
    }
  },
  methods: {
    getRiskBadgeClass,
    getRiskLabel,
    toggleFavorite(clientId) {
      this.clients = this.clients.map(c =>
        c.id === clientId ? { ...c, isFavorite: !c.isFavorite } : c
      )
    },
    handleRegisterSubmit() {
      // 등록 로직 (추후 실제 API 연동 가능)
      this.isAddDialogOpen = false
      alert('고객이 등록되었습니다.')
    }
  }
}
</script>

<style src="@/assets/css/pages/clients.css"></style>
