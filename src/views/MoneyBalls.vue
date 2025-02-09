<!------------------------------- Setup Script ------------------------------------->
<script setup>
import { ref } from 'vue';
import { uid, useQuasar } from 'quasar'
import { useTransactionStore } from '../store/Store'

const $q = useQuasar()

const transactionEntries = useTransactionStore()
// console.log(transactionEntries.data.entries);

const expense = ref('')
const amount = ref(null)

const onSubmit = () => {
  // console.log("onSubmit");
  const addEntryForm = { name: expense.value, amount: parseFloat(amount.value) }
  transactionEntries.addEntry(addEntryForm)
  expense.value = "",
    amount.value = null
}

const useAmountColorClass = (amount) => {
  if (amount > 0) return 'text-positive'
  else if (amount < 0) return 'text-negative'
  else return 'text-grey-6'
}

const useCurrencify = (amount) => {
  // format: "+ $ 4,999.99" | "- $ 999.00"

  let posNegSymbol = ''
  if (amount > 0) posNegSymbol = '+'
  else if (amount < 0) posNegSymbol = '-'

  const currencySymbol = '$',
    amountPositive = Math.abs(amount),
    amountFormatted = amountPositive.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`
}

// Dialog Alert
const onEntrySlideRight = ({ reset }, entry) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
          Delete this entry?
          <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">
            ${entry.name} : ${useCurrencify(entry.amount)}
          </div>
        `,
    cancel: true,
    persistent: true,
    html: true,
    ok: { label: 'Delete', color: 'negative', noCaps: true },
    cancel: { color: 'primary', noCaps: true }
  }).onOk(() => {
    transactionEntries.deleteEntry(entry)
  }).onCancel(() => {
    reset()
  })
}

// Pop up edit handler for slider list


const onNameUpdate = (entry, value) => {
  // console.log(entry.id, value);
  // console.log(value);
  transactionEntries.updateEntry(entry.id, { name: value })
}

const onAmountUpdate = (entry, value) => {
  // console.log(entry.id, value);
  transactionEntries.updateEntry(entry.id, { amount: parseFloat(value) })
}

</script>

<!------------------------------- Template Render ------------------------------------->
<template>
  <q-page class="q-ma-lg">
    <p class="text-h4 text-center">Using Pinia Store</p>

    <!-- Form -->
    <q-form @submit.prevent="onSubmit" class="row q-col-gutter-x-md">
      <q-input v-model="expense" type="text" label="Expenses" placeholder="Text" class="col" />
      <q-input v-model="amount" type="number" step="0.01" input-class="text-right" label="Amount" placeholder="12"
        class="col" />
      <div class="col-auto q-mt-sm">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" @click="expense = '', amount = ''" color="info" class="q-ml-sm" />
      </div>
    </q-form>

    <!-- Empty Filler -->
    <div class="text-center q-pt-xl" v-if="!transactionEntries.data.entries.length">
      <q-icon name="add_reaction" size="150px" color="grey" />
      <div class="text-black-6 text-h4">
        Lets Add Something!
      </div>
    </div>


    <!-- Card -->
    <q-card class="my-card row q-mt-lg" v-if="transactionEntries.data.entries.length">
      <q-card-section class="col">
        <div class="text-h6 text-weight-bold">Balance:</div>
      </q-card-section>
      <q-card-section class="col" side>
        <div class="text-h6 text-weight-bold text-right" :class="useAmountColorClass(transactionEntries.balance)">
          {{ useCurrencify(transactionEntries.balance) }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Loop List -->
    <q-list bordered separator class="q-mt-xl" v-if="transactionEntries.data.entries.length">
      <p class="text-h5 text-center">Using Button</p>
      <q-item v-ripple v-for="entry in transactionEntries.data.entries" :key="entry.id">
        <q-item-section avatar @click="transactionEntries.deleteEntry(entry)">
          <q-icon color="negative" style="min-width: 6px" name="delete" />
        </q-item-section>

        <q-item-section avatar>
          <q-icon color="grey" name="edit" style="min-width: 6px" />
          <!-- Todo Pop Up editor -->
          <q-popup-edit @save="onNameUpdate(entry, $event)" :model-value="entry.name" v-slot="scope" :cover="false"
            :offset="[0, 0]" anchor="top left" label-set="Ok" auto-save buttons>
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </q-item-section>

        <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
          {{ entry.name }}
        </q-item-section>

        <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)" side>
          {{ useCurrencify(entry.amount) }}
          <!-- Todo Pop Up editor -->
          <q-popup-edit @save="onAmountUpdate(entry, $event)" :model-value="entry.amount" v-slot="scope" :cover="false"
            :offset="[16, 12]" anchor="top left" label-set="Ok" auto-save buttons>
            <q-input input-class="text-right" type="number" v-model="scope.value" dense autofocus counter
              @keyup.enter="scope.set" />
          </q-popup-edit>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered separator class="q-mt-xl" v-if="transactionEntries.data.entries.length">
      <p class="text-h5 text-center">Using Slider</p>
      <q-slide-item @right="onEntrySlideRight($event, entry)" left-color="grey" right-color="negative"
        v-for="entry in transactionEntries.data.entries" :key="entry.id">
        <template v-slot:left>
          <q-icon name="edit" />
        </template>
        <template v-slot:right>
          <q-icon name="delete" />
        </template>

        <q-item v-ripple>

          <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
            {{ entry.name }}
            <!-- Todo Pop Up editor -->
            <q-popup-edit @save="onNameUpdate(entry, $event)" :model-value="entry.name" v-slot="scope" :cover="false"
              :offset="[16, 12]" anchor="top left" label-set="Ok" auto-save buttons>
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-item-section>

          <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)" side>
            {{ useCurrencify(entry.amount) }}

            <!------------------------------- Todo Pop Up editor  ------------------------------------->
            <q-popup-edit @save="onAmountUpdate(entry, $event)" :model-value="entry.amount" v-slot="scope"
              :cover="false" :offset="[16, 12]" anchor="top left" label-set="Ok" auto-save buttons>
              <q-input input-class="text-right" type="number" v-model="scope.value" dense autofocus counter
                @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </q-page>

</template>

<!-------------------------------  CSS  ------------------------------------->
<style lang="scss" scoped></style>
