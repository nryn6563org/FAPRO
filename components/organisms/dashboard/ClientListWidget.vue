<template>
  <div class="c-widget__list-wrapper">
    <div class="c-widget__list">
      <div v-for="(client, idx) in mockClientData" :key="idx" class="c-widget__list-item">
        <div class="c-widget__client-info">
          <div class="c-widget__avatar">
            {{ client.name[0] }}
          </div>
          <div>
            <p class="c-widget__client-name">{{ client.name }}</p>
            <p class="c-widget__client-sub">{{ (client.aum / 100000000).toFixed(0) }}억원</p>
          </div>
        </div>
        <div class="c-widget__list-right">
          <p class="c-widget__client-name">{{ (client.revenue / 10000).toFixed(0) }}만원</p>
          <!-- 위험도 태그 -->
          <div :class="['c-widget__tag',
                            client.risk === 'high' ? 'c-widget__tag--high' :
                            client.risk === 'medium' ? 'c-widget__tag--medium' :
                            'c-widget__tag--low']">
            {{ client.risk === 'high' ? '고위험' : client.risk === 'medium' ? '중위험' : '저위험' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockClientData } from '@/utils/dashboard-data'

export default {
  name: 'ClientListWidget',
  data() {
    return {
      mockClientData
    }
  }
}
</script>


