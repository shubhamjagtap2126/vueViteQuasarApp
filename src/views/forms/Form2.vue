<template>
  <q-page class="q-pa-md bg-gray-100">
    
    <q-form @submit="submitForm" class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <p class="text-2xl font-bold mb-6 text-center">Registration 2025</p>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <q-input v-model="form.fullName" label="Full Name" :rules="[(val) => !!val || 'Name is required', (val) => /^[a-zA-Z\s]+$/.test(val) || 'Invalid name format']" />
        <q-input v-model="form.phone" label="Phone" type="tel" :rules="[(val) => !!val || 'Phone is required', (val) => /^[6789]\d{9}$/.test(val) || 'Invalid phone number']" />
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <q-input v-model="form.email" label="Email" type="email" :rules="[(val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format']" />
        <q-select v-model="form.gender" label="Gender" :options="['Male', 'Female']" :rules="[(val) => !!val || 'Gender is required']" />
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <q-input v-model="form.age" label="Age" type="number" :rules="[(val) => !!val || 'Age is required', (val) => /^[0-9]\d{0,2}$/.test(val) || 'Invalid age format']" />
        <q-input v-model="form.pincode" label="Pincode" type="number" :rules="[(val) => !!val || 'Pincode is required', (val) => /^[1-9]\d{5}$/.test(val) || 'Invalid pincode format']" />
      </div>

      <q-select
        v-model="form.education"
        label="Education/Category"
        :options="['1st to 2nd', '3rd to 4th', '5th to 7th', '8th to 10th', '11th & 12th', 'Graduation', 'Post Graduation', 'Adult', 'Parent', 'Senior Citizen']"
        :rules="[(val) => !!val || 'Education is required']"
      />

      <div class="container mx-auto p-4 bg-white rounded-lg shadow-md mt-4">
        <h1 class="text-2xl font-bold mb-4 text-center">Payment Calculator</h1>
        <p class="block text-center text-sm font-medium text-gray-700">Per unit Price: ₹{{ unitPrice }}</p>

        <div class="flex items-center justify-center mt-2">
          <div class="q-mt-md">
            <q-btn icon="remove" @click="decrement" :disable="ticketCount <= 0" />
            <span class="q-mx-sm">{{ unitCount }}</span>
            <q-btn icon="add" @click="increment" :disable="unitCount >= 5" />
          </div>
        </div>

        <div id="result" class="flex items-center justify-center mt-4">
          <div class="" v-if="totalAmount">
            <div class="text-red-500 line-through mr-2">Total Amount: ₹{{ totalAmount.toFixed(2) }}</div>
            <div class="text-blue-400 font-bold mr-2">Discount Amount: ₹{{ discountAmount.toFixed(2) }}</div>
            <div class="text-sm text-grey-300">(Current Discount: {{ discount }}%)</div>
          </div>
        </div>
        <p class="text-green-400 text-xl text-center font-bold">Payable Amount: ₹{{ payableAmount.toFixed(2) }}</p>
      </div>

      <q-btn label="Register Now" type="submit" color="primary" class="mt-3 w-full" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

const form = reactive({
  fullName: "",
  phone: "",
  email: "",
  gender: null,
  age: null,
  pincode: null,
  education: null,
  district: null,
});

const unitPrice = 300;
const unitCount = ref(1);
const discountRules = [
  { minUnits: 1, maxUnits: 3, discount: 10 },
  { minUnits: 4, maxUnits: 5, discount: 20 },
];

const totalAmount = computed(() => unitPrice * unitCount.value);
const discount = computed(() => {
  for (const rule of discountRules) {
    if (unitCount.value >= rule.minUnits && unitCount.value <= rule.maxUnits) {
      return rule.discount;
    }
  }
  return 0;
});
const discountAmount = computed(() => (totalAmount.value * discount.value) / 100);
const payableAmount = computed(() => totalAmount.value - discountAmount.value);

const increment = () => {
  if (unitCount.value < 5) {
    unitCount.value++;
  }
};

const decrement = () => {
  if (unitCount.value > 1) {
    unitCount.value--;
  }
};

const submitForm = () => {
  console.log("Form submitted:", form);
};


</script>
