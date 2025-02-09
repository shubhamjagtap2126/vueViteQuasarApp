<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <!-- lHh Lpr lff | hHh lpR lFf -->
    <q-header elevated class="bg-cyan-8">
      <!--  -->
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title
          >{{ `Welcome ${authStore.user.name}` }}
          <span class="text-subtitle1" side>{{ timeStamp }}</span>
        </q-toolbar-title>
        <q-btn @click="authStore.logout" color="primary">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <!--  -->
    <q-drawer v-model="drawer" show-if-above :width="150" :breakpoint="540">
      <!--  -->
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ `Hello ${authStore.user.name}` }}</div>
          <div>{{ `${authStore.user.email}` }}</div>
        </div>
      </q-img>

      <!--  -->
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 2px solid #ddd">
        <q-list>
          <q-item v-for="link in linksList" :key="link.name" :to="{ name: link.link }"clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ link.name }}</q-item-label>
            </q-item-section>

            <q-item-section side v-if="link.separator">
              <q-separator />
            </q-item-section>
          </q-item>
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
import { ref, watch } from "vue";
import EssentialLink from "../components/EssentialLink.vue";
import { useAuthStore } from "../store/Store";
const authStore = useAuthStore();

const drawer = ref(false);

watch(drawer, (newValue) => {
  // console.log('Drawer state changed to:', newValue);
  // Perform any other actions based on the drawer state change
});

import { date } from "quasar";
const stamp = Date.now();
const timeStamp = ref(date.formatDate(stamp, "DD MMM YYYY"));

const linksList = [
  { icon: "home", name: "Home", separator: true, link: "AuthHome" },
  { icon: "apps", name: "Apps", separator: true, link: "AppPage" },
  { icon: "delete", name: "Trash", separator: false, link: "delete" },
  { icon: "error", name: "Error", separator: false, link: "error" },
  { icon: "settings", name: "Settings", separator: false, link: "settings" },
  { icon: "feedback", name: "Feedback", separator: false, link: "feedbacks" },
  { icon: "help", name: "Help", separator: false, link: "help" },
];
</script>
