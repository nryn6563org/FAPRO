<template>
  <Dialog :open="open" className="c-bulk-register-modal" @update:open="$emit('update:open', $event)">
    <div class="c-bulk-register">
      <div class="c-bulk-register__header">
        <h3 class="c-bulk-register__title">고객 한번에 등록</h3>
      </div>
      
      <div class="c-bulk-register__body">
        <!-- 1. 안내 배너 -->
        <div class="c-bulk-register__banner">
          <FileUp class="c-bulk-register__banner-icon" />
          <div class="c-bulk-register__banner-content">
            <p class="c-bulk-register__banner-title">Excel 또는 CSV 파일을 업로드하세요</p>
            <p class="c-bulk-register__banner-desc">파일에는 고객명, 연락처, 이메일, 투자성향, 자산 정보가 포함되어야 합니다.</p>
          </div>
        </div>

        <!-- 2. 샘플 다운로드 영역 -->
        <div class="c-bulk-register__sample">
          <div class="c-bulk-register__sample-info">
            <FileText class="c-bulk-register__sample-icon" />
            <span class="c-bulk-register__sample-text">샘플 파일이 필요하신가요?</span>
          </div>
          <Button variant="outline" size="sm" @click="downloadSample">
            샘플 다운로드
          </Button>
        </div>

        <!-- 3. 업로드 영역 (Drag & Drop) -->
        <div 
          class="c-bulk-register__dropzone"
          :class="{ 'c-bulk-register__dropzone--active': isDragging || selectedFile }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          @click="$refs.fileInput.click()"
        >
          <input 
            type="file" 
            ref="fileInput" 
            class="hidden" 
            accept=".xlsx,.xls,.csv" 
            @change="handleFileChange"
          />
          
          <div v-if="!selectedFile" class="c-bulk-register__upload-prompt">
            <Upload class="c-bulk-register__upload-icon" />
            <p class="c-bulk-register__upload-text">파일을 드래그하거나 클릭하여 선택하세요</p>
            <p class="c-bulk-register__upload-subtext">지원 형식: Excel (.xlsx, .xls), CSV (.csv)</p>
          </div>
          
          <div v-else class="c-bulk-register__file-info">
            <div class="c-bulk-register__file-avatar">
              <FileText class="c-bulk-register__file-type-icon" />
            </div>
            <div class="c-bulk-register__file-details">
              <p class="c-bulk-register__file-name">{{ selectedFile.name }}</p>
              <p class="c-bulk-register__file-size">{{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
            </div>
            <Button variant="ghost" size="sm" class="c-bulk-register__remove-btn" @click.stop="selectedFile = null">
              <X class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <!-- 4. 유의사항 영역 -->
        <div class="c-bulk-register__notice">
          <div class="c-bulk-register__notice-header">
            <AlertCircle class="c-bulk-register__notice-icon" />
            <span class="c-bulk-register__notice-title">주의사항</span>
          </div>
          <ul class="c-bulk-register__notice-list">
            <li>최대 1,000명까지 한 번에 등록할 수 있습니다.</li>
            <li>중복된 고객 정보는 자동으로 제외됩니다.</li>
            <li>필수 정보(고객명, 연락처)가 누락된 경우 해당 행은 건너뜁니다.</li>
          </ul>
        </div>
      </div>

      <div class="c-bulk-register__footer">
        <Button variant="outline" @click="$emit('update:open', false)">취소</Button>
        <Button :disabled="!selectedFile" @click="handleUpload">
          <Upload class="w-4 h-4 mr-2" />
          업로드
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { FileUp, FileText, Upload, AlertCircle, X } from 'lucide-vue'
import Dialog from '@/components/molecules/Dialog.vue'
import Button from '@/components/atoms/Button.vue'
import { validateBulkFile } from '@/utils/validation'

export default {
  name: 'BulkRegisterModal',
  components: {
    Dialog,
    Button,
    FileUp,
    FileText,
    Upload,
    AlertCircle,
    X
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedFile: null,
      isDragging: false
    }
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.processFile(file)
      }
    },
    handleDrop(e) {
      this.isDragging = false
      const file = e.dataTransfer.files[0]
      if (file) {
        this.processFile(file)
      }
    },
    processFile(file) {
      const result = validateBulkFile(file)
      if (result.isValid) {
        this.selectedFile = file
      } else {
        alert(result.error)
      }
    },
    downloadSample() {
      // 데모용 알림
      alert('샘플 파일(sample_clients.xlsx) 다운로드를 시작합니다.')
    },
    handleUpload() {
      if (!this.selectedFile) return
      
      // 실제 구현 시 여기서 API 호출
      this.$emit('submit', this.selectedFile)
      this.selectedFile = null
      this.$emit('update:open', false)
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/components/organisms/bulk-register-modal.css';
</style>
