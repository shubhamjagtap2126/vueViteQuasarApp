<script setup>
import { ref, computed } from 'vue'

const tab = ref('mails')

const c = [
  { name: 'mails', icon: 'mail', label: 'Mails' },
  { name: 'alarms', icon: 'alarm', label: 'Alarms' },
  { name: 'movies', icon: 'movie', label: 'Movies' },
  { name: 'photos', icon: 'photo', label: 'Photos' },
  { name: 'videos', icon: 'slow_motion_video', label: 'Videos' },
  { name: 'addressbook', icon: 'people', label: 'Address Book' }
]

import { useJasonData } from '../store/Store';
const tabs = useJasonData().data
// console.log(tabs.homeTabList);


</script>


<template>
  <q-page>

    <!-- Tabs -->
    <q-toolbar class="bg-white text-black shadow-2" style="max-height: 60px">
      <!-- <q-btn flat label="Homepage" />
      <q-space /> -->
      <!--  -->
      <q-tabs v-model="tab" active-bg-color="blue" active-color="white" inline-label outside-arrows mobile-arrows
        shrink>
        <q-tab v-for="tab in tabs.homeTabList" :key="tab.name" v-bind="tab" />
      </q-tabs>
    </q-toolbar>



    <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up" class="q-my-md q-mx-md">
      <q-tab-panel name="mails">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, cupiditate porro veniam asperiores hic eum,
        amet
      </q-tab-panel>

      <q-tab-panel name="alarms">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>
