<!-- 고객 상세 정보 팝업: 고객의 자산 현황, 포트폴리오 비중, 상담 이력을 한눈에 파악 -->
<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)" class-name="c-dialog-detail">
    <div v-if="client" class="c-client-detail">
      <!-- 팝업 헤더: 프로필 요약 -->
      <div class="c-client-detail__header">
        <div class="c-client-detail__profile">
          <div class="c-client-detail__avatar">{{ client.name[0] }}</div>
          <div class="c-client-detail__info-group">
            <div class="c-client-detail__name-row">
              <h2 class="c-client-detail__name">{{ client.name }}</h2>
              <span :class="['c-client-detail__risk-badge', getRiskBadgeClass(client.riskProfile)]">
                {{ getRiskLabel(client.riskProfile) }}
              </span>
            </div>
            <p class="text-sm font-bold text-slate-400">가입일: {{ client.joinDate }}</p>
          </div>
        </div>
      </div>

      <!-- 상세 컨텐츠 영역 -->
      <div class="c-client-detail__content">
        <!-- 왼쪽 사이드바: 핵심 지표 및 연락처 -->
        <div class="c-client-detail__sidebar">
          <div class="c-client-detail__section-card">
            <h3 class="c-client-detail__section-title">
              <ActivityIcon class="w-4 h-4 text-blue-500" />
              핵심 자산 지표
            </h3>
            <div class="c-client-detail__metric-grid">
              <div class="c-client-detail__metric-box">
                <p class="c-client-detail__metric-label">운용자산 (AUM)</p>
                <p class="c-client-detail__metric-val">{{ (client.aum / 100000000).toFixed(0) }}억원</p>
              </div>
              <div class="c-client-detail__metric-box">
                <p class="c-client-detail__metric-label">누적 수익률</p>
                <p :class="['c-client-detail__metric-val', client.returns >= 0 ? 'indicator--positive' : 'indicator--negative']">
                  {{ client.returns >= 0 ? '+' : '' }}{{ client.returns }}%
                </p>
              </div>
            </div>
          </div>

          <div class="c-client-detail__section-card">
            <h3 class="c-client-detail__section-title">
              <ContactIcon class="w-4 h-4 text-indigo-500" />
              연락처 정보
            </h3>
            <div class="c-client-detail__contact-list">
              <div class="c-client-detail__contact-item">
                <MailIcon class="c-client-detail__contact-icon" />
                <span>{{ client.email }}</span>
              </div>
              <div class="c-client-detail__contact-item">
                <PhoneIcon class="c-client-detail__contact-icon" />
                <span>{{ client.phone }}</span>
              </div>
              <div class="c-client-detail__contact-item">
                <CalendarIcon class="c-client-detail__contact-icon" />
                <span>최근 상담: {{ client.lastContact }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 메인 영역: 포트폴리오 및 메모 -->
        <div class="c-client-detail__main">
          <div class="c-client-detail__section-card">
            <h3 class="c-client-detail__section-title">
              <PieChartIcon class="w-4 h-4 text-teal-500" />
              포트폴리오 비중
            </h3>

            <!-- 비중 시각화 바 -->
            <div class="c-portfolio-viz">
              <div class="c-portfolio-bar">
                <div class="c-portfolio-bar__segment segment--stocks" :style="{ width: client.portfolio.stocks + '%' }"></div>
                <div class="c-portfolio-bar__segment segment--bonds" :style="{ width: client.portfolio.bonds + '%' }"></div>
                <div class="c-portfolio-bar__segment segment--cash" :style="{ width: client.portfolio.cash + '%' }"></div>
                <div class="c-portfolio-bar__segment segment--alternatives" :style="{ width: client.portfolio.alternatives + '%' }"></div>
              </div>
              <div class="c-portfolio-legend">
                <div class="c-portfolio-legend__item">
                  <div class="c-portfolio-legend__dot segment--stocks"></div>
                  <span>주식 {{ client.portfolio.stocks }}%</span>
                </div>
                <div class="c-portfolio-legend__item">
                  <div class="c-portfolio-legend__dot segment--bonds"></div>
                  <span>채권 {{ client.portfolio.bonds }}%</span>
                </div>
                <div class="c-portfolio-legend__item">
                  <div class="c-portfolio-legend__dot segment--cash"></div>
                  <span>현금 {{ client.portfolio.cash }}%</span>
                </div>
                <div class="c-portfolio-legend__item">
                  <div class="c-portfolio-legend__dot segment--alternatives"></div>
                  <span>대체투자 {{ client.portfolio.alternatives }}%</span>
                </div>
              </div>
            </div>

            <!-- 자산 상세 탭 -->
            <div class="c-client-detail__tabs">
              <button
                v-for="tab in ['stocks', 'bonds', 'cash', 'alternatives']"
                :key="tab"
                :class="['c-client-detail__tab', activeTab === tab ? 'c-client-detail__tab--active' : '']"
                @click="activeTab = tab"
              >
                {{ getTabLabel(tab) }}
              </button>
            </div>

            <!-- 자산 리스트 테이블 -->
            <table class="c-asset-table">
              <thead>
                <tr>
                  <th class="c-asset-table__th">종목명</th>
                  <th class="c-asset-table__th c-asset-table__th--right">수익률</th>
                  <th class="c-asset-table__th c-asset-table__th--right">비중</th>
                  <th class="c-asset-table__th c-asset-table__th--right">편입일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in assetItems" :key="idx" class="c-asset-table__tr">
                  <td class="c-asset-table__td">{{ item.name }}</td>
                  <td :class="['c-asset-table__td c-asset-table__td--right', item.return.startsWith('+') ? 'indicator--positive' : 'indicator--negative']">
                    {{ item.return }}
                  </td>
                  <td class="c-asset-table__td c-asset-table__td--right">{{ item.weight }}</td>
                  <td class="c-asset-table__td c-asset-table__td--right text-slate-400">{{ item.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="c-client-detail__memo">
            {{ client.notes }}
          </div>
        </div>
      </div>

      <!-- 하단 액션 버튼 -->
      <div class="c-client-detail__footer">
        <Button variant="outline" class="c-client-detail__btn c-client-detail__btn--outline">
          <MessageSquareIcon class="w-4 h-4" />
          문자 발송
        </Button>
        <Button variant="outline" class="c-client-detail__btn c-client-detail__btn--outline">
          <MailIcon class="w-4 h-4" />
          이메일 발송
        </Button>
        <Button class="c-client-detail__btn c-client-detail__btn--primary">
          <FileTextIcon class="w-4 h-4" />
          AI 자산 제안서 생성
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import {
  XIcon,
  ActivityIcon,
  ContactIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  PieChartIcon,
  MessageSquareIcon,
  FileTextIcon
} from 'lucide-vue'
import Button from '@/components/atoms/Button.vue'
import Dialog from '@/components/molecules/Dialog.vue'
import { getRiskBadgeClass, getRiskLabel, getTabLabel, getPortfolioItems } from '@/utils/client-data'

export default {
  name: 'ClientDetailModal',
  components: {
    XIcon,
    ActivityIcon,
    ContactIcon,
    MailIcon,
    PhoneIcon,
    CalendarIcon,
    PieChartIcon,
    MessageSquareIcon,
    FileTextIcon,
    Button,
    Dialog
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    client: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTab: 'stocks'
    }
  },
  computed: {
    assetItems() {
      return getPortfolioItems(this.activeTab)
    }
  },
  methods: {
    getRiskBadgeClass,
    getRiskLabel,
    getTabLabel
  }
}
</script>

<style>@import '@/assets/css/components/organisms/client-detail-modal.css';</style>
