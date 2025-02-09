import { defineStore } from "pinia";
import { ref, computed } from "vue"; // Import ref and computed

export const useCounterStore = defineStore("counter", () => {
  // State (using ref for primitive values)
  const count = ref(0);

  // Computed properties
  const doubleCount = computed(() => count.value * 2);

  // Actions (functions that modify state)
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  // Return what you want to expose (state and actions)
  return { count, doubleCount, increment, decrement };
});
