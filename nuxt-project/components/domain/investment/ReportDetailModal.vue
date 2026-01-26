<template>
  <Dialog
    :open="open"
    @update:open="$emit('update:open', $event)"
    className="c-dialog__content--xl"
  >
    <div v-if="report" class="m-report-detail">
      <!-- 헤더 영역 -->
      <header class="m-report-detail__header">
        <div class="m-report-detail__meta">
          <span class="m-report-detail__badge">{{ report.stockName }}</span>
          <span class="m-report-detail__source">{{ report.firm }} • {{ report.date }}</span>
        </div>
        <h2 class="m-report-detail__title">{{ report.title }}</h2>
      </header>

      <!-- 메인 콘텐츠 영역 -->
      <div class="m-report-detail__body">
        <div class="m-report-detail__summary-grid">
          <div class="m-report-detail__summary-item">
            <p class="m-report-detail__summary-label">목표주가</p>
            <p class="m-report-detail__summary-value">{{ formatPrice(report.targetPrice) }}</p>
          </div>
          <div class="m-report-detail__summary-item">
            <p class="m-report-detail__summary-label">투자의견</p>
            <p class="m-report-detail__summary-value m-report-detail__summary-value--rating">
              {{ report.rating }}
            </p>
          </div>
        </div>

        <div class="m-report-detail__analysis">
          <h4 class="m-report-detail__section-title">
            <span class="m-report-detail__section-indicator"></span>
            분석 포인트
          </h4>
          <p class="m-report-detail__content">
            {{ report.content || "상세 데이터 요약 정보를 불러오는 중입니다..." }}
          </p>
        </div>
      </div>

      <!-- 하단 액션 버튼 -->
      <footer class="m-report-detail__footer">
        <Button
          variant="outline"
          @click="$emit('update:open', false)"
          class="m-report-detail__btn-secondary"
        >
          취소
        </Button>
        <Button
          class="m-report-detail__btn-primary"
        >
          전체 리포트 보기
        </Button>
      </footer>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/components/common/Dialog.vue'
import Button from '@/components/common/Button.vue'

export default {
  name: 'ReportDetailModal',
  components: {
    Dialog,
    Button
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    report: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatPrice(value) {
      if (!value) { return '0원' }
      return value.toLocaleString() + '원'
    }
  }
}
</script>

<style scoped src="@/assets/css/components/domain/investment/report-detail-modal.css"></style>
