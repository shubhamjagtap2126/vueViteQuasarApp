<template>
  <q-page class="q-pa-md">
    <div class="">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>

    <div class="bg-white mt-6 max-w-4xl mx-auto">
      <div class="row q-gutter-md flex-center justify-center">
        <q-card v-for="(event, index) in events" :key="index" width="300px" class="col-xs-4 col-sm-4 col-md-3 col-lg-2">
          <!-- <router-link :to="{ name: 'SingleEvent', params: { id: event.id } }"> -->
          <q-card-section horizontal>
            <q-img class="col" :src="event.image" height="200px" width="200px" fit="cover" />
            <!-- <q-card-section>
                <div class="text-h6">{{ event.title }}</div>
                <div class="text-subtitle1">{{ event.date }}</div>
              </q-card-section> -->
            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="accent" icon="bookmark" />
              <q-btn flat round color="primary" icon="share" @click="share(event)" />
              <q-btn flat round color="primary" icon="more_horiz" :to="{ name: 'SingleEvent', params: { id: event.id } }" />
            </q-card-actions>
          </q-card-section>
          <!-- </router-link> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const slide = ref(1);
const autoplay = ref(true);

const images = ref([
  { image: "https://cdn.quasar.dev/img/mountains.jpg", caption: "Image 1", style: { objectFit: "cover" } },
  { image: "https://cdn.quasar.dev/img/parallax1.jpg", caption: "Image 2", style: { objectFit: "cover" } },
  { image: "https://cdn.quasar.dev/img/parallax2.jpg", caption: "Image 3", style: { objectFit: "cover" } },
  { image: "https://cdn.quasar.dev/img/parallax1.jpg", caption: "Image 2", style: { objectFit: "cover" } },
  { image: "https://cdn.quasar.dev/img/mountains.jpg", caption: "Image 1", style: { objectFit: "cover" } },
  { image: "https://cdn.quasar.dev/img/parallax2.jpg", caption: "Image 3", style: { objectFit: "cover" } },
  { image: "https://cdn.quasar.dev/img/parallax1.jpg", caption: "Image 2", style: { objectFit: "cover" } },
  // ... more images
]);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    throw new Error("Min value must be less than or equal to max value.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const events = ref([
  {
    id: 1,
    image: `https://picsum.photos/200/300`,
    title: "Event 1",
    date: "2024-03-15",
  },
  {
    id: 2,
    image: `https://picsum.photos/200/301`,
    title: "Event 2",
    date: "2024-03-22",
  },
  {
    id: getRandomInt(1, 1000),
    image: `https://picsum.photos/200/310`,
    title: "Event 3",
    date: "2024-03-29",
  },
  {
    id: getRandomInt(1, 1000),
    image: `https://picsum.photos/200/302`,
    title: "Event 1",
    date: "2024-03-15",
  },
  {
    id: getRandomInt(1, 1000),
    image: `https://picsum.photos/200/320`,
    title: "Event 2",
    date: "2024-03-22",
  },
  {
    id: getRandomInt(1, 1000),
    image: `https://picsum.photos/200/393`,
    title: "Event 3",
    date: "2024-03-29",
  },
  {
    id: getRandomInt(1, 1000),
    image: `https://picsum.photos/200/309`,
    title: "Event 1",
    date: "2024-03-15",
  },
  // ... more events
]);
</script>
<!-------------------------------  CSS  ------------------------------------->

<style scoped></style>
