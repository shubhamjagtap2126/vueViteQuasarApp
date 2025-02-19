<template>
  <q-page padding>
    <q-table :columns="columns" :rows="filteredRows" row-key="name" :filter="filter" :separator="separator">
       <template v-slot:body-cell-serial="props" >
      {{ props.rowIndex + 1 }}  
    </template>
      <template v-slot:top-left="props">
        <q-input v-model="filter" label="Filter Table" class="q-mb-md q-mx-sm" outlined />
        <q-select v-model="selectedCategory" :options="categories" label="Filter by Category" class="q-mb-md q-mx-sm" outlined @update:model-value="applyCategoryFilter" />
      </template>
      <template v-slot:top-right="props">
        <q-btn label="CSV" icon="arrow_downward" color="primary" @click="exportTable('csv')" />
        <q-btn label="Excel" icon="download" color="green" @click="exportTable('xls')" />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// import { exportFile } from "@quasar/extras"; // Import Quasar's file export utility
import { Notify, exportFile } from "quasar";

const separator = ref("cell");
const filter = ref("");
const selectedCategory = ref(null);
const categories = ref(["All", "Category A", "Category B", "Category C"]); // Replace with your categories

const columns = ref([
  { name: 'serial', label: '#', field: 'serial', align: 'center' }, 
  { name: "name", label: "Name", field: "name", align: "left" },
  { name: "category", label: "Category", field: "category", align: "left" },
  { name: "age", label: "Age", field: "age", align: "right" },
  // ... other columns
]);

const rows = ref([
  { name: "John Doe", category: "Category A", age: 25 },
  { name: "Jane Smith", category: "Category B", age: 30 },
  { name: "Peter Jones", category: "Category A", age: 20 },
  { name: "Alice Johnson", category: "Category C", age: 35 },
  { name: "Bob Williams", category: "Category B", age: 28 },
  // ... more rows
]);

const filteredRows = computed(() => {
  const categoryFilter = selectedCategory.value === "All" || selectedCategory.value === null ? null : selectedCategory.value;

  return rows.value.filter((row) => {
    const nameMatch = row.name.toLowerCase().includes(filter.value.toLowerCase());
    const categoryMatch = categoryFilter ? row.category === categoryFilter : true;
    return nameMatch && categoryMatch;
  });
});

const applyCategoryFilter = () => {
  // The filteredRows computed property will automatically update
};

function wrapCsvValue(val) {
  const formatted = val === undefined || val === null ? "" : String(val);
  return `"${formatted.replace(/"/g, '""').replace(/\r\n|\r|\n/g, " ")}"`;
}

const exportTable = (format = "csv") => {
  try {
    const content = [columns.value.map((col) => wrapCsvValue(col.label))];

    // Use filteredRows directly:
    filteredRows.value.forEach((row) => {
      // <-- Key change: use filteredRows
      content.push(
        columns.value
          .map((col) => {
            const cellValue = typeof col.field === "function" ? col.field(row) : row[col.field === undefined ? col.name : col.field];
            return wrapCsvValue(cellValue);
          })
          .join(",")
      );
    });

    const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filename = `table_data_${formattedDate}.${format}`;
    const contentType = format === "csv" ? "text/csv" : "application/vnd.ms-excel";

    exportFile(filename, content.join("\r\n"), contentType);

    Notify.create({
      message: `File downloaded successfully (${format.toUpperCase()})`,
      color: "positive",
      position: "top-right",
    });
  } catch (error) {
    console.error("Error exporting table:", error);
    Notify.create({
      message: `Error downloading file (${format.toUpperCase()})`,
      color: "negative",
      position: "top-right",
    });
  }
};

onMounted(() => {
  // If you need to fetch categories from an API, do it here
  // For example:
  // fetch('/api/categories')
  //   .then(response => response.json())
  //   .then(data => categories.value = ['All', ...data]);
});
</script>
