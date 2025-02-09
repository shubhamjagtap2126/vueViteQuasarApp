<template>
  <div>{{ componentName }}</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// Props (if needed)
// const props = defineProps({
//   // propName: {
//   //   type: String,
//   //   required: true,
//   // },
// });

// Data (using ref or reactive)
const count = ref(0);
const state = reactive({ message: 'Hello' });

// Computed properties
const doubledCount = computed(() => count.value * 2);

// Methods
const increment = () => {
  count.value++;
};

// Lifecycle hooks (e.g., onMounted)
onMounted(() => {
  console.log('Component mounted!');
});

</script>

<style scoped>
/* ... */
</style>