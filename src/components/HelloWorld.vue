<script setup>
import { ref } from 'vue'

import {useCounterStore} from '@/store/counter.js'

const counterStore = useCounterStore()

defineProps({
  msg: String,
})

// const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <p>count is {{ counterStore.count }}</p>
     <p>Double Count: {{ counterStore.doubleCount }}</p>
    <q-btn type="button" @click="counterStore.decrement">-</q-btn>
    <q-btn type="button" @click="counterStore.increment">+</q-btn>
  

  </div>
</template>

<style scoped>

</style>
