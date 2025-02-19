<template>
  <q-page class="q-pa-sm">
    <CardSocial icon_position="left" />

    <CardCharts />

    <div class="row q-col-gutter-sm q-py-sm">
      <TabSocial />
      <CardWithImage />
    </div>

    <div class="row q-col-gutter-sm q-pb-sm">
      <TodoList />

      <CardTimeLine />
    </div>

    <TableVisits />
  </q-page>
</template>

<script setup>

const CardSocial = import("../components/cards/CardSocial.vue");
const CardCharts = import("../components/cards/CardCharts.vue");
const TabSocial = import("../components/tabs/TabSocial.vue");
const CardWithImage = import("../components/cards/CardWithImage.vue");
const CardTimeLine = import("../components/cards/CardTimeLine.vue");
const TodoList = import("../components/list/TodoList.vue");
const TableVisits = import("../components/tables/TableVisits.vue");

</script>
