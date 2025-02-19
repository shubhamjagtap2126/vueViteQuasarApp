<template>
  <q-page class="bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <p class="text-3xl text-blue-600 font-bold mb-4 text-center">File upload and Dependent dropdown Form</p>

      <q-form @submit="submitForm">
        <div class="mb-4">
          <q-select v-model="formData.l1Dropdown" label="District" :options="districts" @update:model-value="updatel1Dropdown" required> </q-select>
        </div>

        <div class="mb-4">
          <q-select v-model="formData.l2Dropdown" label="Competition Center" :options="competitionCenters" required :disable="!formData.l1Dropdown"> </q-select>
        </div>

        <!-- Table -->
        <div class="mb-4">
          <p class="text-2xl font-semibold mb-4 text-center">Participants Count table</p>
          <q-table :columns="columns" :rows="rows" row-key="name" :cell-class="getCellClass">
            <template v-slot:body-cell-count="props">
              <q-input type="number" v-model.number="props.row.counts[props.col.name]" :min="0" class="text-center" @input="calculateTotals" />
            </template>
            <template v-slot:bottom="props">
              <tr class="text-center font-bold">
                <th>Total</th>
                <th v-for="col in columns.slice(1, -1)" :key="col.name">
                  {{ columnTotals[col.name] }}
                </th>
                <th>{{ grandTotal }}</th>
              </tr>
            </template>
          </q-table>
        </div>

        <!-- File Upload -->
        <div class="mt-6">
          <q-file
            v-model="files"
            accept="image/*"
            :rules="[
              (val) => (val && val.length > 0) || 'Please select an image',
              // (val) => (val && val[0].size <= 1048576) || 'Image size must be less than 1MB', // Client-side size check
            ]"
            label="Upload files"
            counter
            filled
            multiple
            outlined
            use-chips
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div v-if="formData.uplaodedFiles.length > 0">
            <p>Uploaded File URLs:</p>
            <ul>
              <li v-for="(file, index) in uplaodedFiles" :key="index">
                <a :href="file.link" target="_blank">{{ `${index}.  ${file.name}` }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Form -->
        <q-input v-model="formData.representativeName" label="Center Representative Name" hint="Full Name: Name Middle Surname" required />
        <q-input
          v-model="formData.contact"
          label="Contact"
          type="number"
          :rules="[(val) => !!val || 'Feedback is required', (val) => val.length >= 10 || 'Feedback must be at least 10 characters long']"
          required
        />
        <!-- 
        <q-input
          v-model="formData.feedback"
          :rules="[(val) => !!val || 'Feedback is required', (val) => val.length >= 10 || 'Feedback must be at least 10 characters long']"
          label="Feedback"
          type="textarea"
          required
        /> -->

        <div>
          <Editor v-model="formData.feedback" @update:model-value="updateFeedback" />
        </div>

        <q-btn label="Submit" type="submit" color="primary" class="w-full mt-4" />
      </q-form>
      <div id="status" class="mt-4" v-html="statusMessage"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { request } from "../../ServerFunc";
import { Notify } from "quasar";
import Editor from "../../components/Editor.vue";

const districts = ref([]);
const competitionCenters = ref([]);
const files = ref([]);
const statusMessage = ref("");

const updateFeedback = (val) => {
  // console.log(val);
  formData.feedback = val;
};

const formData = reactive({
  l1Dropdown: "",
  l2Dropdown: "",
  representativeName: "",
  contact: "",
  feedback: "",
  uplaodedFiles: [],
});

const allValid = computed(() => {
  // return !fileError.value && !nameError.value && !contactError.value && !feedbackError.value;
});

const updatel1Dropdown = async () => {
  console.log(formData.l1Dropdown);
  if (formData.l1Dropdown) {
    competitionCenters.value = await request("getLevel2Data", formData.l1Dropdown); // Await the promise
  } else {
    competitionCenters.value = []; // Clear if district is deselected
  }
};

onMounted(async () => {
  // Make onMounted async
  districts.value = await request("getLevel1Data"); // Await the promise
  if (districts.value && districts.value.length > 0) {
    formData.selectedDistrict = districts.value[0]; // Select the first district by default after data is loaded
  }

  //
  rows.value = rowsHeader.map((header) => ({
    group: header,
    counts: {
      groupA: 0,
      groupB: 0,
      groupC: 0,
      groupD: 0,
      groupE: 0,
      groupF: 0,
    },
    total: 0,
  }));
  calculateTotals();
});

// watch(formData.selectedDistrict, async (newValue) => {
//   console.log(newValue);
//   console.log(formData.selectedDistrict);
//   if (newValue) {
//     competitionCenters.value = await request("getLevel2Data", newValue); // Await the promise
//   } else {
//     competitionCenters.value = (await request("getLevel2Data", formData.selectedDistrict)) || []; // Clear if district is deselected
//   }
// });

//

const rows = ref([]);
const columns = ref([
  { name: "group", label: "Groups", field: "group", align: "left" },
  { name: "groupA", label: "Group A (1st-2nd)", field: "groupA", align: "center" },
  { name: "groupB", label: "Group B (3rd-4th)", field: "groupB", align: "center" },
  { name: "groupC", label: "Group C (5th-7th)", field: "groupC", align: "center" },
  { name: "groupD", label: "Group D (8th-10th)", field: "groupD", align: "center" },
  { name: "groupE", label: "Group E (11th-College)", field: "groupE", align: "center" },
  { name: "groupF", label: "Group F (Parents/Senior)", field: "groupF", align: "center" },
  { name: "total", label: "Total", field: "total", align: "center" },
]);

const rowsHeader = ["Normal", "Special", "Physically Challenged", "Ashram/Resident Schools"];

const columnTotals = computed(() => {
  const totals = {};
  columns.value.slice(1, -1).forEach((col) => {
    // Exclude "Group" and "Total"
    totals[col.name] = rows.value.reduce((sum, row) => sum + (row.counts[col.name] || 0), 0);
  });
  return totals;
});

const grandTotal = computed(() => {
  return Object.values(columnTotals.value).reduce((sum, total) => sum + total, 0);
});

const calculateTotals = () => {
  rows.value.forEach((row) => {
    row.total = Object.values(row.counts).reduce((sum, count) => sum + (count || 0), 0);
  });
};

const getCellClass = (row, col) => {
  if (col.name !== "group" && col.name !== "total") {
    return "q-table--cell-center"; // Apply center class to input cells
  }
  return "";
};

// *********=============== ✨ Authentication 🌟  ===============********* //

const uploading = ref(false);
const uploadFiles = async () => {
  if (!files.value || files.value.length === 0) {
    Notify.create({
      message: `No files selected`,
      color: "negative",
      position: "top-right",
    });
    return;
  }

  uploading.value = true;
  const fileDataArray = [];

  for (const file of files.value) {
    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
      fileDataArray.push({ bytes: base64Data, contentType: file.type, name: file.name });
    } catch (error) {
      console.error("Error reading file:", error);
      uploading.value = false;
      return; // Stop the loop if there's an error reading a file
    }
  }

  try {
    console.log(fileDataArray);
    const result = await request("uploadFilesToDrive", fileDataArray);

    formData.uplaodedFiles = result;
    // fileUrls.value = result.fileUrls;
    // fileNames.value = result.fileNames;
    Notify.create({
      message: `Files uploaded successfully)`,
      color: "positive",
      position: "top-right",
    });
  } catch (error) {
    console.error("Error uploading to Drive:", error);
    Notify.create({
      message: `Error uploading file (${error.message})`,
      color: "negative",
      position: "top-right",
    });
  } finally {
    uploading.value = false;
  }
};

const columnHeader = ["district", "center", "representativeName", "contact", "feedback", "files", "links"];

const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    if (Array.isArray(formData[key])) {
      formData[key] = [];
    } else {
      formData[key] = "";
    }
  });
  files.value = null; // Reset q-file component
};

const submitForm = async () => {
  uploadFiles();

  if (!formData.uplaodedFiles || formData.uplaodedFiles.length === 0) {
    Notify.create({
      message: `No files uploaded`,
      color: "negative",
      position: "top-right",
    });
    return;
  }

  try {
    const data = {
      district: formData.l1Dropdown,
      center: formData.l2Dropdown,
      representativeName: formData.representativeName,
      contact: formData.contact,
      feedback: formData.feedback,
      files: formData.uplaodedFiles && formData.uplaodedFiles.length > 0 ? formData.uplaodedFiles.map((file) => file.name).join("|") : "",
      links: formData.uplaodedFiles && formData.uplaodedFiles.length > 0 ? formData.uplaodedFiles.map((file) => file.link).join("|") : "",
    };
    const response = await request("postData", { sheetID: "699957933", data, columnHeader });
    console.log(response);
    statusMessage.value = response.message;
    resetForm();
    Notify.create({
      message: `${response.message}`,
      position: "top-right",
      color: "positive",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    statusMessage.value = "Error submitting form";
    Notify.create({
      message: `Error submitting form (${error.message})`,
      position: "top-right",
      color: "negative",
    });
  }
};
</script>
