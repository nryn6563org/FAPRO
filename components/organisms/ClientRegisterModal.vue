<!-- 신규 고객 등록 팝업: 고객 정보 입력을 위한 고품질 폼 디자인 -->
<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)" class-name="c-dialog-register">
    <div class="c-client-register">
      <!-- 팝업 헤더 -->
      <div class="c-client-register__header">
        <h3 class="c-client-register__title">신규 고객 등록</h3>
      </div>

      <!-- 입력 그리드 -->
      <div class="c-client-register__form">
        <div class="c-client-register__field">
          <label class="c-client-register__label">고객명</label>
          <Input placeholder="홍길동" class="c-client-register__input" />
        </div>
        <div class="c-client-register__field">
          <label class="c-client-register__label">연락처</label>
          <Input placeholder="010-0000-0000" class="c-client-register__input" />
        </div>
        <div class="c-client-register__field">
          <label class="c-client-register__label">이메일</label>
          <Input placeholder="example@email.com" class="c-client-register__input" />
        </div>
        <div class="c-client-register__field">
          <label class="c-client-register__label">투자 성향</label>
          <select class="c-client-register__input c-client-register__select">
            <option value="" disabled selected>선택하세요</option>
            <option value="conservative">안정형</option>
            <option value="moderate">중립형</option>
            <option value="aggressive">공격형</option>
          </select>
        </div>
        <div class="c-client-register__field">
          <label class="c-client-register__label">초기 자산</label>
          <Input type="number" placeholder="0" class="c-client-register__input c-client-register__input--right" />
        </div>
        <div class="c-client-register__field c-client-register__field--full">
          <label class="c-client-register__label">메모 (특이사항)</label>
          <textarea
            class="c-client-register__input c-client-register__textarea"
            placeholder="고객의 성향이나 특이사항을 입력하세요."
          ></textarea>
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="c-client-register__footer">
        <Button
          variant="outline"
          class="c-client-register__btn c-client-register__btn--cancel"
          @click="$emit('update:open', false)"
        >
          취소
        </Button>
        <Button
          class="c-client-register__btn c-client-register__btn--submit"
          @click="$emit('submit')"
        >
          등록
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { XIcon } from 'lucide-vue'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import Dialog from '@/components/molecules/Dialog.vue'

export default {
  name: 'ClientRegisterModal',
  components: {
    XIcon,
    Button,
    Input,
    Dialog
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style src="@/assets/css/components/organisms/client-register-modal.css"></style>
