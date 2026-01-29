<template>
  <div class="c-key-clients">
    <div v-for="client in keyClients" :key="client.id" class="c-key-client-item">
      <div class="c-key-client-item__avatar">{{ client.name[0] }}</div>
      <div class="c-key-client-item__info">
        <p class="c-key-client-item__name">{{ client.name }}</p>
        <p class="c-key-client-item__aum">AUM: {{ (client.aum / 100000000).toFixed(1) }}억</p>
      </div>
      <div :class="['c-key-client-item__returns', client.returns >= 0 ? 'indicator--positive' : 'indicator--negative']">
        {{ client.returns >= 0 ? '+' : '' }}{{ client.returns }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyClientsWidget',
  data() {
    return {
      keyClients: [
        { id: 1, name: '김영희', aum: 520000000, returns: 12.5 },
        { id: 2, name: '이철수', aum: 380000000, returns: -2.1 },
        { id: 3, name: '박민수', aum: 210000000, returns: 5.8 }
      ]
    }
  }
}
</script>

<style scoped>
.c-key-clients {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.c-key-client-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.c-key-client-item__avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
}

.c-key-client-item__info {
    flex: 1;
}

.c-key-client-item__name {
    font-size: 0.8125rem;
    font-weight: 600;
}

.c-key-client-item__aum {
    font-size: 0.6875rem;
    color: #94a3b8;
}

.c-key-client-item__returns {
    font-size: 0.8125rem;
    font-weight: 700;
}
</style>
