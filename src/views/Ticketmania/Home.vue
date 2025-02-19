<template>
  <div class="q-pa-md">
    <div class="q-mb-md chip">
      <q-scroll-area style="max-width: 100%; height: 60px">
        <div class="row no-wrap q-gutter-sm">
          <q-chip
            v-for="(chip, index) in chips"
            :key="index"
            clickable
            size="md"
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

    <div v-if="selectedComponent">  <component :is="selectedComponent" :data="selectedComponentData" />
    </div>

    <div v-else>
      <AllEvents />
        <!-- <q-card>
            <q-card-section class="text-center">
                Please select a section from above
            </q-card-section>
        </q-card> -->
    </div>

  </div>
</template>

<script setup>
import { ref, reactive,  defineAsyncComponent } from "vue";

// Define your components
const AllEvents = defineAsyncComponent(() => import("./AllEvents.vue"));
// const Form2 = defineAsyncComponent(() => import("./Form2.vue"));
// const Form3 = defineAsyncComponent(() => import("./Form3.vue"));
// const Form4 = defineAsyncComponent(() => import("./Form4.vue"));

const chips = reactive([
  { label: "All Events", icon: "home", component: AllEvents, data: { message: "Hello from Form 1" } },
  { label: "Form 2", icon: "settings", component: "Form2", data: { count: 10 } },
  { label: "Form 3", icon: "info", component: "Form3", data: { name: "User" } },
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