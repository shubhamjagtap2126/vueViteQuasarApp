<!------------------------------- Setup Script ------------------------------------->
<script setup>

import { ref } from 'vue'
// const count = ref(0)
// defineProps({ msg: String })

const signFormValues = ref({ name: '', email: '', password: null })
const tab = ref('signIn')

const onSubmit = () => {
  // console.log('Submit');
  console.log(signFormValues.value);
}

const onReset = () => { signFormValues.value.resetValidation();  console.log('onReset'); }

import { useJasonData } from '../store/Store';
const jsonData = useJasonData().data
const chipClick = (chip) => {
  // console.log('Submit');
  console.log(chip.name);
}

</script>


<!------------------------------- Template Render ------------------------------------->


<template>
  <q-page>

    <div class="q-mb-md chip" >
      <ul style="overflow-x: scroll">
        <li v-for='(chip, index) in jsonData.tabsList' style=" display:inline-block"><q-chip clickable
            @click="chipClick(chip)" :key="index" color="secondary" text-color="white" :icon="chip.icon">
            {{ chip.label }}
          </q-chip>
        </li>
      </ul>
    </div>

    <!------------------------------- Signup Form ------------------------------------->
    <q-card class='my-card'>
      <q-card-section class='q-pa-md'>
        <div class='text-h6  text-center'>Sign Up Form</div>
        <div class='text-subtitle2  text-center'>Using </div>
      </q-card-section>

      <q-card-section style="width: '600px'">
        <q-form @submit.prevent='onSubmit' @reset='onReset' class=''>

          <div>
            <q-input bottom-slots v-model='signFormValues.name' label='Name' type='text' counter>
              <template v-slot:prepend>
                <q-icon name='person' />
              </template>
              <template v-slot:append>
                <q-icon name='close' @click="signFormValues.name = ''" class='cursor-pointer' />
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>

            <q-input bottom-slots v-model='signFormValues.email' label='Email' type='text' counter>
              <template v-slot:prepend>
                <q-icon name='email' />
              </template>
              <template v-slot:append>
                <q-icon name='close' @click="signFormValues.email = ''" class='cursor-pointer' />
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>

            <q-input bottom-slots v-model='signFormValues.password' label='Password' type='password' counter>
              <template v-slot:prepend>
                <q-icon name='password' />
              </template>
              <template v-slot:append>
                <q-icon name='close' @click="signFormValues.password = ''" class='cursor-pointer' />
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>

            <div class='q-mt-md'>
              <q-btn label='Submit' type='submit' color='blue' />
              <q-btn label='Reset' type='reset' color='primary' flat class='q-ml-sm' />
            </div>

          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!------------------------------- SignOut Form ------------------------------------->
    <q-card bordered class='my-card q-pa-md-lg q-mt-lg'>

      <!-- <div class='text-h6'>Our Changing Planet</div>
        <div class='text-subtitle2'>by John Doe</div> -->

      <q-tabs v-model='tab' class='text-blue'>
        <q-tab label='Sign In' name='signIn' />
        <q-tab label='Sign Up' name='signUp' />
      </q-tabs>

      <!-- <q-separator /> -->
      <q-card-section>
        <q-tab-panels v-model='tab' animated>

          <q-tab-panel name='signIn'>
            With so much content to display at once, and often so little screen real-estate,
            Cards have fast become the design pattern of choice for many companies, including
            the likes of Google and Twitter.

            <p class="text-bold text-italic q-mt-lg">Not registered Please <span class="text-orange"
                @click="tab = 'signUp'">
                Sign Up</span> </p>
          </q-tab-panel>

          <q-tab-panel name='signUp'>
            <img src='https://cdn.quasar.dev/img/image-src.png'>

            <div class='text-h6  text-center'>The QCard component is a great way to display important pieces of grouped
              content.</div>

            <p class="text-bold text-italic q-mt-lg">Already registered Please <span class="text-orange"
                @click="tab = 'signIn'"> Sign
                In</span> </p>
          </q-tab-panel>

        </q-tab-panels>
      </q-card-section>
    </q-card>

    <!------------------------------- Registration Form ------------------------------------->


  </q-page>
</template>


<!-------------------------------  CSS  ------------------------------------->
<style scoped></style>
