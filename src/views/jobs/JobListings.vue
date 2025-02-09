<script setup>
import { RouterLink } from 'vue-router';
import JobListing from './JobListing.vue';
import { reactive, onMounted } from 'vue';
import  axios from 'axios';
// import jobs from './jobs.json'



defineProps({
  limit: Number,
  showButton: { type: Boolean, default: false, },
});

const state = reactive({ jobs: [], isLoading: true, });
// console.log(jobs);


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/jobs');
    state.jobs = response.data;
    console.log(state.jobs);
    // console.log(response.data);

  } catch (error) {
    console.error('Error fetching jobs', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="q-bg-blue px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h4 class="text-bold text-blue-8 text-center">
        Browse Jobs
      </h4>
      <!-- Show loading spinner while loading is true -->

      <!-- Shoe job listing when done loading -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View All
      Jobs</RouterLink>
  </section>
</template>
