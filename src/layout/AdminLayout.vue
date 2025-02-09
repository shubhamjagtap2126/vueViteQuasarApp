<template>

    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <!-- lHh Lpr lff | hHh lpR lFf -->
      <q-header elevated class="bg-cyan-8">

        <!--  -->
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Admin Dashboard</q-toolbar-title>
          <span class="text-subtitle1" side>{{ timeStamp }}</span>
        </q-toolbar>
      </q-header>

      <!--  -->
      <q-drawer v-model="drawer" show-if-above :width="150" :breakpoint="540">

        <!--  -->
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Shubham Jagtap</div>
            <div>@sjapp</div>
          </div>
        </q-img>

        <!--  -->
        <q-scroll-area  style="height: calc(100% - 150px); margin-top: 150px; border-right: 2px solid #ddd">
          <q-list>
            <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
          </q-list>
        </q-scroll-area>

      </q-drawer>

      <!--  -->
      <q-page-container>
          <router-view />
      </q-page-container>

    </q-layout>

</template>

<script setup>
import { ref, watch } from 'vue';
import EssentialLink from '../components/EssentialLink.vue'

const drawer = ref(false)

watch(drawer, (newValue) => {
  // console.log('Drawer state changed to:', newValue);
  // Perform any other actions based on the drawer state change
});


import { date } from 'quasar'
const stamp = Date.now()
const timeStamp = ref(date.formatDate(stamp, 'DD MMM YYYY'))

const linksList = [
  { icon: 'home', label: 'Home', separator: true, link: "home" },
  { icon: 'apps', label: 'Apps', separator: true, link: "apps" },
  { icon: 'delete', label: 'Trash', separator: false, link: "delete" },
  { icon: 'error', label: 'Error', separator: false, link: "error" },
  { icon: 'settings', label: 'Settings', separator: false, link: "settings" },
  { icon: 'feedback', label: 'Feedback', separator: false, link: "feedbacks" },
  { icon: 'help', iconColor: 'primary', label: 'Help', separator: false, link: "help" }
]
</script>
