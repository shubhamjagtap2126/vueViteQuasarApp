<template>
  <q-page class="bg-grey-100 row items-center justify-center">
    <div class="column q-pa-md" style="max-width: 400px; width: 90%">
      <q-card class="q-pa-md">
        <q-tabs v-model="tab" align="justify">
          <q-tab label="Login" name="login" />
          <q-tab label="Signup" name="signup" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <q-form @submit="login">
              <q-input
                v-model="loginForm.mobile"
                label="Mobile Number"
                type="tel"
                :rules="[(val) => !!val || 'Mobile is required', (val) => /^\d{10}$/.test(val) || 'Invalid mobile number']"
                required
              />
              <q-input v-if="showPasswordInput" v-model="loginForm.password" label="Password" type="password" :rules="[(val) => !!val || 'Password is required']" required />
              <q-btn v-if="!showPasswordInput" label="Check Mobile Number" type="button" color="primary" class="full-width q-mt-sm" @click="checkMobileNumber" :loading="checkingMobile" />
              <q-btn v-if="showPasswordInput" label="Login" type="submit" color="primary" class="full-width q-mt-sm" :loading="loggingIn" />
              <q-btn v-if="showPasswordInput" label="Forgot Password?" type="button" color="grey" flat class="full-width q-mt-sm" @click="forgotPassword" />
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="signup">
            <q-form @submit="signup">
              <q-input
                v-model="signupForm.mobile"
                label="Mobile Number"
                type="tel"
                :rules="[(val) => !!val || 'Mobile is required', (val) => /^\d{10}$/.test(val) || 'Invalid mobile number']"
                required
                :disable="otpSent"
              />
              <q-input
                v-if="!otpSent"
                v-model="signupForm.password"
                label="Password"
                type="password"
                :rules="[(val) => !!val || 'Password is required', (val) => val.length >= 6 || 'Password must be at least 6 characters']"
                required
              />
              <q-input
                v-if="!otpSent"
                v-model="signupForm.confirmPassword"
                label="Confirm Password"
                type="password"
                :rules="[(val) => !!val || 'Confirm Password is required', (val) => val === signupForm.password || 'Passwords do not match']"
                required
              />
              <q-btn v-if="!otpSent" label="Send OTP" type="button" color="primary" class="full-width q-mt-sm" @click="sendOTP" :loading="sendingOTP" />

              <q-input v-if="otpSent" v-model="signupForm.otp" label="OTP" type="text" :rules="[(val) => !!val || 'OTP is required', (val) => /^\d{6}$/.test(val) || 'Invalid OTP']" required />
              <q-btn v-if="otpSent" label="Verify OTP and Signup" type="submit" color="primary" class="full-width q-mt-sm" :loading="verifyingOTP" />
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Notify } from "quasar";

const tab = ref("login");

const loginForm = reactive({
  // ... (same as before)
});

const signupForm = reactive({
  mobile: "",
  password: "",
  confirmPassword: "",
  otp: "",
});

const showPasswordInput = ref(false);
const checkingMobile = ref(false);
const loggingIn = ref(false);
const sendingOTP = ref(false);
const verifyingOTP = ref(false);
const otpSent = ref(false);

// ... (checkMobileNumber and login functions - same as before)

const sendOTP = async () => {
  sendingOTP.value = true;
  try {
    // Replace with your actual Send OTP API call
    const response = await new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000)); // Mock API call

    if (response.success) {
      otpSent.value = true;
      Notify.create({
        type: "positive",
        message: "OTP sent successfully!",
         caption: '5 minutes ago',
        position: "top",
      });
    } else {
      Notify.create({
        type: "negative",
        message: "Failed to send OTP. Please try again.",
        position: "top",
      });
    }
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Error sending OTP.",
       caption: '5 minutes ago',
      position: "top",
    });
  } finally {
    sendingOTP.value = false;
  }
};

const signup = async () => {
  verifyingOTP.value = true;
  try {
    // Replace with your actual Verify OTP and Signup API call
    const response = await new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000)); // Mock API call

    if (response.success) {
      Notify({
        type: "positive",
        message: "Signup successful!",
      });
      tab.value = "login";
    } else {
      Notify({
        type: "negative",
        message: "OTP verification failed or Signup failed. Please check OTP and try again.",
      });
    }
  } catch (error) {
    Notify({
      type: "negative",
      message: "Error during signup.",
    });
  } finally {
    verifyingOTP.value = false;
  }
};

// ... (forgotPassword function - same as before)
</script>
