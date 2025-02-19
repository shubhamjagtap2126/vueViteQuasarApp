<template>
  <q-page class="bg-image p-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div class="text-3xl font-bold mb-4 text-center">Signup / Login</div>

      <q-tabs v-model="tab" :dense="true" :narrow-indicator="true" class="text-grey-700">
        <q-tab label="Signup" name="signup" />
        <q-tab label="Login" name="login" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="signup">
          <q-form @submit.prevent="signup">
            <q-input v-model="signupForm.name" label="Name" filled required :rules="[(val) => (val && val.length > 0) || 'Name is required']" />
            <q-input v-model="signupForm.email" label="Email" filled type="email" required :rules="[(val) => /.+@.+\..+/.test(val) || 'Please enter a valid email']" />
            <q-input v-model="signupForm.password" label="Password" filled type="password" required :rules="[(val) => (val && val.length >= 6) || 'Password must be at least 6 characters']" />
            <q-btn label="Signup" type="submit" color="primary" class="mt-4" />
            <div v-if="authStore.error" class="text-red-500 mt-2">{{ authStore.error }}</div>
            <div v-if="authStore.loading">Loading...</div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="login">
          <q-form @submit.prevent="login">
            <q-input v-model="loginForm.email" filled label="Email" type="email" required :rules="[(val) => /.+@.+\..+/.test(val) || 'Please enter a valid email']" />
            <q-input v-model="loginForm.password" filled label="Password" type="password" required :rules="[(val) => (val && val.length >= 6) || 'Password must be at least 6 characters']" />
            <q-btn label="Login" type="submit" color="primary" class="mt-4" />
            <div v-if="authStore.error" class="text-red-500 mt-2">{{ authStore.error }}</div>
            <div v-if="authStore.loading">Loading...</div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { loadAppsScriptAPI, request } from "../ServerFunc";
import { useAuthStore } from "../store/Store";

const authStore = useAuthStore();

const tab = ref("signup");
const signupForm = reactive({ name: "", email: "", password: "" });
const loginForm = reactive({ email: "", password: "" });
const error = authStore.error;

onMounted(async () => {
  await loadAppsScriptAPI(); // Await the API loading
});

const signup = () => {
  // console.log(signupForm);
  authStore.signup(signupForm);
};

const testRequest = async () => {
  // const response = await request("testFunction", testData);
  // console.log("Test Response:", response);
};

const login = () => {
  // console.log(loginForm);
  authStore.login(loginForm);
};
</script>

<style scoped>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
