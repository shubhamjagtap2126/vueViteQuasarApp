<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
          Ticket Mania
        </q-toolbar-title>
        <div class="row q-gutter-sm">
          <q-btn label="Login" color="secondary" />
          <q-btn label="Admin" color="info" />
        </div>
      </q-toolbar>
    </q-header>

      <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" class="bg-grey-2" :width="200">
        <q-list>
          <q-item clickable v-ripple :to="{ name: 'home' }">
            <q-icon name="home" size="md" color="primary" class="q-mr-sm" />
            <q-item-section>Home</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'events' }">
            <q-icon name="event" size="md" color="primary" class="q-mr-sm" />
            <q-item-section>Events</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
          <router-view />
      </q-page-container>
    
    <q-footer elevated>
      <div class="q-pa-md text-center">&copy; 2024 Ticket Mania. All rights reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);
</script>
