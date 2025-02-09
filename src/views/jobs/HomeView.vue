<script setup>
import Hero from './Hero.vue';
import Card from './Card.vue';
import JobListings from './JobListings.vue';
</script>

<template>
  <Hero bg="bg-green-6" />

  <div class="row justify-center items-center">
    <Card class="" title="For Developers" description="Browse our Vue jobs and start your career today"
      btn="Browse Jobs"></Card>
      
    <Card bg="bg-light-blue-2" btn="Post Jobs" btnColor="blue"
      description="Create our Vue jobs and start your career today" title="For Company"></Card>
  </div>

  <JobListings limit="3" :showButton="true" />
</template>
