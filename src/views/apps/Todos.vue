<script setup>
import { reactive, ref } from 'vue';
import { Notify, uid } from 'quasar'

let todos = reactive([
  { id: 0, text: "todo000", status: false },
  { id: 1, text: "todo101", status: false },
]);

const newTask = ref('')

const addTask = () => {
  // console.log(newTask.value);

  todos.push({ id: uid(), text: newTask.value, status: false }),
    localStorage.setItem("todos", JSON.stringify(todos));

  Notify.create({
    message: `${newTask.value} Added`,
    position: "bottom-right",
    color: "positive",
  });
  newTask.value = ""
}

const completeTodo = (index) => {
  // console.log(todos.value[index].status, todos.value[index].id);

  localStorage.setItem("todos", JSON.stringify(todos));
}

const editTodo = (todo, value) => {
  // console.log(todo, value);
  const index = todos.findIndex((t) => t.id === todo.id);
  Object.assign(todos[index], { text: value });
  localStorage.setItem("todos", JSON.stringify(todos));
  Notify.create({
    message: `${value} Updated`,
    position: "bottom-right",
    color: "positive",
  });
}

const deleteTodo = (index) => {
  Notify.create({
    message: `${todos[index].text} Deleted`,
    position: "bottom-right",
    color: "negative",
  });

  todos.splice(index, 1);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}
</script>


<template>
  <q-page>
    <!-- Todo Page Header -->
    <p class="text-h4 text-center">Using Local Storage</p>

    <!-- Todo Form -->
    <q-input v-model="newTask" @keyup.enter="addTask" label="Add your todos" counter>
      <template v-slot:prepend>
        <q-icon name="event_available" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="newTask = ''" class="cursor-pointer" />
      </template>

      <template v-slot:hint>
        Add your todo
      </template>
    </q-input>

    <!-- Empty Filler -->
    <div class="text-center q-pt-xl" v-if="!todos.length">
      <q-icon name="add_reaction" size="150px" color="grey" />
      <div class="text-black-6 text-h4">
        Lets Add Something!
      </div>
    </div>

    <br>

    <!-- Todo List -->
    <q-list separator>
      <q-item v-for="(todo, index) in todos" :key="todo.id">
        <!-- Todo Add -->
        <q-item-section>
          <q-checkbox v-model="todo.status" :label="todo.text" color="teal" @click="completeTodo(index)" />
        </q-item-section>

        <!-- Todo Edit Button -->
        <q-item-section side>
          <q-btn round dense flat icon="edit" />
          <!-- Todo Pop Up editor -->
          <q-popup-edit @save="editTodo(todo, $event)" :model-value="todo.text" v-slot="scope" :cover="false"
            :offset="[-20, 0]" anchor="top left" label-set="Ok" auto-save buttons>
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </q-item-section>
        <!-- @click="editTodo(todo.id)"  -->
        <!-- Todo Delete Button -->
        <q-item-section side>
          <q-icon name="delete" @click="deleteTodo(index)" color="red" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- <q-footer>
      <q-text>Hello</q-text>
    </q-footer> -->
  </q-page>
</template>


<style scoped></style>
