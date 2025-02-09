<template>
  <div class="{{ viewName }}-view">
    <h1>{{ viewDisplayName }}</h1>
    <{{ componentName }} />
  </div>
</template>

<script setup>
import {{ componentName }} from '@/components/{{ componentName }}.vue';

// ... other view logic
</script>

<style scoped>
/* ... */
</style>