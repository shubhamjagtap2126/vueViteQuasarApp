<script setup>
import { ref } from 'vue'
import Todos from './Todos.vue'
import MoneyBalls from './MoneyBalls.vue'
import AllForms from '../forms/AllForms.vue';
import JobsView from '../jobs/HomeView.vue';


const tab = ref('forms')

const appsTabsList = [
  { name: 'todos', icon: 'add_task', label: 'Todos' },
  { name: 'moneyBalls', icon: 'savings', label: 'MoneyBalls' },
  { name: 'forms', icon: 'description', label: 'Forms' },
  { name: 'jobs', icon: 'savings', label: 'Jobs' },
  { name: 'videos', icon: 'slow_motion_video', label: 'Videos' },
  { name: 'addressbook', icon: 'people', label: 'Address Book' }
]


import { useJasonData } from '../../store/Store';
const tabs = useJasonData().data
// console.log(tabs.appsTabsList);

// console.log(tabs(state => state.appsTabsList));

</script>


<template>
  <q-page>

    <!-- Tabs -->
    <q-toolbar class="bg-green-300 text-black shadow-2" style="max-height: 60px">
      <q-tabs v-model="tab" active-bg-color="white" active-color="green" inline-label outside-arrows mobile-arrows
        shrink>
        <q-tab v-for="tab in tabs.appsTabsList" :key="tab.name" v-bind="tab" />
      </q-tabs>
    </q-toolbar>

    <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up" >

      <!-- ************ ----------------------------- Component -------------------------**********-->
      <q-tab-panel name="todos">
        <Todos />
      </q-tab-panel>

      <!------------------------------- Component ------------------------------------->
      <q-tab-panel name="moneyBalls">
        <MoneyBalls />
      </q-tab-panel>

      <!------------------------------- Component ------------------------------------->
      <q-tab-panel name="forms">
        <AllForms />
      </q-tab-panel>

      <!------------------------------- Component ------------------------------------->
      <q-tab-panel name="jobs">
        <JobsView />
      </q-tab-panel>

    </q-tab-panels>

  </q-page>
</template>
