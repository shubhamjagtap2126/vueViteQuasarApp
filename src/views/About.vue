<template>
  <q-page class="bg-gray-100 p-8">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <p class="text-3xl font-bold mb-4 text-center">Realtime Spreadsheet Data</p>
      <div>
        <q-dialog v-model="showDialog">
          <q-card style="width: 400px">
            <q-card-section>
              <div class="text-h6">Add New Data</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form @submit.prevent="submitData">
                <q-input v-model="newData.col1" label="Column 1" required />
                <q-input v-model="newData.col2" label="Column 2" required />
              </q-form>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn label="Submit" color="primary" type="submit" @click="submitData" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-btn label="Add Data" @click="showDialog = true" class="mt-4" />
      </div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div class="q-pt-md" v-else>
        <q-table :columns="columns" :rows="rows" row-key="id" :visible-columns="visibleColumns" :filter="filter" :separator="separator" class="table-data">
          <template v-slot:top-right>
            <q-select
              v-model="visibleColumns"
              :display-value="$q.lang.table.columns"
              :options="columns"
              class="q-mr-md"
              option-value="name"
              style="min-width: 150px"
              dense
              emit-value
              map-options
              multiple
              options-cover
              options-dense
              outlined
            />
            <q-input dense debounce="500" v-model="filter" placeholder="Search" />
            <q-btn color="primary" icon-right="archive" label="Export" no-caps @click="exportTable" />
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { Notify, exportFile } from "quasar";
import { request } from "../ServerFunc";
// import * as exportFromJson from "export-from-json";

const visibleColumns = ref(["District", "Center", "Person", "Contact", "Feedback", "Counts", "fileNames", "Files"]);
const rows = ref([]);
const columns = ref([
  { name: "District", label: "District", field: "District", sortable: true },
  { name: "Center", label: "Center", field: "Center", sortable: true },
  { name: "Person", label: "Person", field: "Person" },
  { name: "Contact", label: "Contact", field: "Contact" },
  { name: "Feedback", label: "Feedback", field: "Feedback" },
  { name: "Counts", label: "Counts", field: "Counts" },
  { name: "fileNames", label: "File Names", field: "fileNames" }, // For array of names
  { name: "Files", label: "Files", field: "Files" },
]);

const loading = ref(true);
const error = ref(null);
const showDialog = ref(false);
const newData = reactive({ col1: "", col2: "" });
const filter = ref(""); // For the search filter
const separator = ref("Cell");

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  try {
    const data = await request("getData", { sheetID: "0", range: "B:I" });
    const data2 = await request("getData", { wBook:"libwBook", sheetID: "811583667", range: "B5:B15" });
    console.log("Response from getData:", data.slice(0, 6));
    console.log("Response from getData:", data2);

    if (data && Array.isArray(data)) {
      // Check if data exists and is an array
      rows.value = data; // Correct way to update the rows: replace the whole array
    } else {
      console.error("Invalid data received:", data);
      error.value = "Invalid data received from server.";
    }
    loading.value = false;
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = "Error fetching data.";
    loading.value = false;
  }
};

const submitData = async () => {
  try {
    const data = await request("postData", { sheetID: "699957933", data: newData });
    console.log("Response from getData:", data); // Check this!
    // rows.value = data;
    loading.value = false;
    newData.value = { col1: "", col2: "" };
    showDialog.value = false;
  } catch (err) {
    console.log(err);
  }
};

// const exportTable = () => {
//   const data = rows.value;
//   const fileName = `table_data_${new Date().toISOString().slice(0, 10)}.xls`; // Dynamic filename
//   const exportType = "xlsx";

//   exportFromJson({ data, fileName, exportType });
//   Notify.create({
//     message: "File download successfully",
//     color: "positive",
//     icon: "completed",
//     position: "top-right",
//   });
// };

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;
  formatted = formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')
  return `"${formatted}"`;
}
const exportTable = () => {
  const content = [columns.value.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.value.map((row) => columns.value.map((col) => wrapCsvValue(typeof col.field === "function" ? col.field(row) : row[col.field === void 0 ? col.name : col.field], col.format, row)).join(","))
    )
    .join("\r\n");

  exportFile(`table_data_${new Date().toISOString().slice(0, 10)}.csv`, content, "text/csv");
  Notify.create({
    message: "File download successfully",
    color: "positive",
    // icon: "completed",
    position: "top-right",
  });
};
</script>

<style lang="sass" sc>
.table-data
  tr th
    background: #00b4ff
    color: #fff
    font-weight: bold
  tr td
    max-width: 120px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    box-sizing: border-box
    text-align: left
  tr:nth-child(even)
    background-color: #f5f5f5
</style>
