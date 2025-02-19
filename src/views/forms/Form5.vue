<template>
  <div>Form 5</div>
</template>

<script setup>
import { request } from "../../ServerFunc";
import { ref } from "vue";

const pre = ref("");

const fetchData = async () => {
  try {
    const data = await request("getData", { sheetID: "699957933", range: "A1:F10" });
    console.log(data);
    pre.value = data[4].Script;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

</script>
