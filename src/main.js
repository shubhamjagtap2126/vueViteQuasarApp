// FILE: main.js

import { createApp } from "vue";
import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { Dialog, Notify, LocalStorage, SessionStorage } from "quasar";

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.use(Quasar, {
  plugins: {
    Dialog, // No need for string keys anymore
    Notify,
    LocalStorage,
    SessionStorage,
  }, // import Quasar plugins and add here
});

// Assumes you have a <div id='app'></div> in your index.html
app.mount("#app");
