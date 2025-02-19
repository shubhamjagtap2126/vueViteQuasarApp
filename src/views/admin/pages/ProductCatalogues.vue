<template>
  <q-page class="q-pa-sm">
    <div>
      <q-card class="no-border no-shadow bg-transparent">
        <q-card-section class="q-pa-sm">
          <q-input rounded v-model="search" outlined placeholder="Search Product">
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="(item, item_index) in data">
        <CardProduct :data="item" :key="item_index"/>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {ref} from 'vue';

const data = ref([
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 2,
    amount: '$30',
    img: new URL("https://picsum.photos/200/302", import.meta.url),
    chip: 'Discount 90%',
    chip_color: 'grey-4',
    chip_class: 'text-blue absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
    amount: '$15',
    img: new URL('https://picsum.photos/200/302', import.meta.url),
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 1,
    amount: '$50',
    img: new URL('https://picsum.photos/200/302', import.meta.url),
    chip: 'Sold Out',
    chip_color: 'grey-8',
    chip_class: 'text-white absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 5,
    amount: '$70',
    img: new URL('https://picsum.photos/200/302', import.meta.url),
    chip: 'Discount 50%',
    chip_color: 'grey-4',
    chip_class: 'text-blue absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 2,
    amount: '$50',
    img: new URL('https://picsum.photos/200/302', import.meta.url),
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
    amount: '$30',
    img: new URL('https://picsum.photos/200/302', import.meta.url),
  },
]);

const search = ref('');
const CardProduct= import('../components/cards/CardProduct.vue')
</script>

<style scoped></style>
