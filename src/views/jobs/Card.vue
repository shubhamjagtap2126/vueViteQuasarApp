<script setup>
// import { defineProps } from 'vue';

defineProps({
  bg: { type: String, default: 'bg-teal-2'},
  title: { type: String, default: 'Title', required: true },
  description: { type: String, default: 'description', required: true },
  btn: { type: String, default: 'Button' },
  btnColor: { type: String, default: 'primary' },
  link: { type: String, default: '#', required: true },
});
</script>

<template>
  <q-card :class="`${bg}  q-my-sm`">
    <!-- <slot></slot> -->
    <q-card-section>
      <div class="text-h6">{{title}}</div>
      <div class="text-subtitle2">{{description}}</div>
    </q-card-section>
    <q-card-section>
      <q-btn :to="link" :color="btnColor" :label="btn" />
    </q-card-section>
  </q-card>
</template>
