<!------------------------------- Setup Script ------------------------------------->
<script setup>
import { defineProps, ref, computed, reactive } from "vue";

const formData = reactive({ name: "", mobile: "", gender: "", pincode: "", pet: "", breed: "" });
const ticketAmount = ref(300);
const ticketCount = ref(0);
const couponCode = ref("");
const coupons = ref([
  { name: "pay20", discount: 0.2 },
  { name: "pay50", discount: 0.5 },
]);

const amount = computed(() => ticketCount.value * ticketAmount.value);
const discount = ref(0);

const incrementTickets = () => {
  ticketCount.value++;
};

const decrementTickets = () => {
  if (ticketCount.value > 0) {
    ticketCount.value--;
  }
};

const applyCoupon = () => {
  const enteredCoupon = coupons.value.find((coupon) => coupon.name === couponCode.value);
  discount.value = enteredCoupon ? enteredCoupon.discount * amount.value : 0;

  if (ticketCount.value >= 1 && ticketCount.value <= 3) {
    discount.value += amount.value * 0.05;
  } else if (ticketCount.value >= 4 && ticketCount.value <= 6) {
    discount.value += amount.value * 0.1;
  }
};

const finalAmount = computed(() => amount.value - discount.value);

import CryptoJS from "crypto-js";
import axios from "axios";
import querystring from "querystring";

const key = "FI47G31AVU";
const salt = "CSNESUGNP4";

const submitForm = async () => {
  const { name, mobile, gender, pincode, pet, breed } = formData;
  const email = "s@gmail.com";
  if (name && mobile && pincode) {
    console.log("Form submitted:", formData); // Replace with Easebuzz integration
    const txnid = `TXN${Date.now()}`;
    const hashSequence = `${key}|${txnid}|${formData.amount}|${email}|${formData.phone}|${salt}`; // Correct hash sequence
    const hash = CryptoJS.SHA512(hashSequence).toString();
    const encodedParams = querystring.stringify({
      txnid: txnid,
      key: key,
      amount: formData.amount,
      email: email,
      phone: formData.mobile,
      hash: hash,
    });
    const options = {
      method: "POST",
      url: "https://dashboard.easebuzz.in/transaction/v1/retrieve",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      data: encodedParams,
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Form is invalid");
  }
};
</script>

<template>
  <q-page class="bg-gray-100 p-4">
      <q-card class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <q-card-section class="q-pa-md">
          <div class="text-2xl font-bold text-center">Sign Up Form</div>
          <div class="text-subtitle2 text-center">Using</div>
        </q-card-section>

        <q-form @submit="submitForm" class="q-pa-md">
          <q-input v-model="formData.name" label="Name" :rules="[(val) => (val && val.length > 0) || 'Name is required']" />
          <q-input v-model="formData.mobile" label="Mobile" :rules="[(val) => /^\d{10}$/.test(val) || 'Invalid mobile number']" type="tel" />

          <q-radio-group
            v-model="formData.gender"
            :options="[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]"
            label="Gender"
            :rules="[(val) => !!val || 'Gender is required']"
          />

          <q-input v-model="formData.pincode" label="Pincode" :rules="[(val) => /^\d{6}$/.test(val) || 'Invalid pincode']" type="tel" />

          <q-checkbox v-model="formData.pet.dog" label="Dog" />
          <q-checkbox v-model="formData.pet.cat" label="Cat" />

          <q-input v-model="formData.breed" label="Breed" />

          <div class="q-mt-md">
            <q-btn icon="remove" @click="decrementTickets" :disable="ticketCount <= 0" />
            <span class="q-mx-sm">{{ ticketCount }}</span>
            <q-btn icon="add" @click="incrementTickets" />
          </div>

          <div class="q-mt-md">
            <p>Amount: ₹{{ amount }}</p>
            <p>Discount: ₹{{ discount }}</p>
            <q-input v-model="couponCode" label="Coupon Code" @blur="applyCoupon" />
            <p>Final Amount: ₹{{ finalAmount }}</p>
          </div>

          <q-btn label="Register Now" type="submit" color="primary" class="q-mt-md" />
        </q-form>
      </q-card>
  </q-page>
</template>

<!-------------------------------  CSS  ------------------------------------->
<style scoped></style>
