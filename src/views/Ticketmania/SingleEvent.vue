<template>
  <div>
    <h1>Event Details</h1>
    <p>ID: {{ id }}</p> 
    <!-- <p>Title: {{ event.title }}</p>
    <p>Date: {{ event.date }}</p>
    <p>Location: {{ event.location }}</p> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id); // Get ID from route params
const event = ref({});

// onMounted(async () => {
//     try {
//         const events = await fetchEvents(); // Assuming you have this function available
//         const foundEvent = events.data.find(e => e.id === parseInt(id.value));
//         if (foundEvent) {
//             event.value = foundEvent;
//         } else {
//             // Handle event not found (e.g., redirect, show message)
//             console.error('Event not found');
//         }
//     } catch (error) {
//         console.error('Error fetching event details:', error);
//     }
// });

// async function fetchEvents() {
//   // Replace this with your actual API call or data fetching logic.
//   const res = await fetch('/api/events'); // Replace with your API endpoint
//   if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(`${res.status} ${res.statusText}: ${errorData.message}`);
//     }
//   return res.json();
// }
</script>