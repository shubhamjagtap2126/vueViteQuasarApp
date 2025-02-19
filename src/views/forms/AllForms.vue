<template>
  <div class="">
    <div class="q-mb-md chip">
      <q-scroll-area style="max-width: 100%; height: 40px">
        <div class="row no-wrap q-gutter-sm">
          <q-chip
            v-for="(chip, index) in chips"
            :key="index"
            clickable
            @click="selectChip(chip)"
            :color="selectedChip === chip ? 'primary' : 'secondary'" 
            text-color="white"
            :icon="chip.icon"
          >
            {{ chip.label }}
          </q-chip>
        </div>
      </q-scroll-area>
    </div>

    <div class="bg-gray-100" v-if="selectedComponent">  <component :is="selectedComponent" :data="selectedComponentData" />
    </div>

    <div v-else>
        <q-card>
            <q-card-section class="text-center">
                Please select a section from above
            </q-card-section>
        </q-card>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive,  defineAsyncComponent } from "vue";

// Define your components
const Form1 = defineAsyncComponent(() => import("./Form1.vue"));
const Form2 = defineAsyncComponent(() => import("./Form2.vue"));
const Form3 = defineAsyncComponent(() => import("./Form3.vue"));
const Form4 = defineAsyncComponent(() => import("./Form4.vue"));
const Form5 = defineAsyncComponent(() => import("./Form5.vue"));
const Auth = defineAsyncComponent(() => import("./Auth.vue"));

const chips = reactive([
  { label: "Form 1", icon: "home", component: Form1, data: { message: "Hello from Form 1" } },
  { label: "Form 2", icon: "settings", component: Form2, data: { count: 10 } },
  { label: "Form 3", icon: "info", component: Form3, data: { name: "User" } },
  { label: "Form 4", icon: "check_box", component: Form4, data: { name: "User" } },
  { label: "Form 5", icon: "app_registration", component: Form5, data: { name: "User" } },
  { label: "Auth", icon: "info", component: Auth, data: { name: "User" } },
]);

const selectedChip = ref(null);  // Keep track of the selected chip
const selectedComponent = ref(null); // Keep track of the component to render
const selectedComponentData = ref(null); // Keep track of the data for the component


const selectChip = (chip) => {
  selectedChip.value = chip;
  selectedComponent.value = chip.component;
  selectedComponentData.value = chip.data;
};

</script>

<style scoped>
/* ... your styles */
</style>