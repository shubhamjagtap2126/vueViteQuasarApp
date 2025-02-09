<script setup>
// import { defineProps } from 'vue';

defineProps({
  bg: { type: String, default: 'bg-teal-5', },
  title: { type: String, default: 'Become a Vue Dev', },
  subtitle: { type: String, default: 'Find the Vue job that fits your skills and needs', },
});
</script>

<template>
  <section :class="`${bg} q-pa-md`">
    <div class="text-center">
      <p class="text-h4 text-white text-bold">
        {{ title }}
      </p>
      <p class="text-white text-italic">
        {{ subtitle }}
      </p>
    </div>
  </section>

</template>
