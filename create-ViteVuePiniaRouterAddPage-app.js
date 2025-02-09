const { execSync } = require("child_process");
execSync("npm install fs-extra path prompts", { stdio: "inherit" });
const fs = require("fs-extra");
const path = require("path");
import prompts from "prompts";

  const { projectName } = await prompts({
    // Get viewName first
    type: "text",
    name: "projectName",
    message: "Enter project name:",
    validate: (value) => value.length > 0,
  });
// const projectName = "my-vue-app"; // Customize project name


async function createVueApp() {
  try {
    // Create Vite project
    execSync(`npm create vite@latest ${projectName} --template vue`, { stdio: "inherit" });

    //  process.chdir(projectName); // Change directory

    // Install dependencies
    execSync("npm i pinia vue-router axios quasar @quasar/extras vite-plugin-singlefile prompts", { stdio: "inherit", cwd: path.join(__dirname, projectName) });
    execSync("npm i -D @google/clasp @types/google-apps-script @quasar/vite-plugin sass-embedded@^1.80.2", { stdio: "inherit", cwd: path.join(__dirname, projectName) });

    // Update index.html to include Tailwind CDN
    const indexHtmlPath = path.join(__dirname, projectName, "index.html");
    const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="/vite.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
</body>
</html>`;

    fs.writeFileSync(indexHtmlPath, indexHtmlContent);

    // Create router file (src/router/index.js)
    const routerFile = `
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // { path: '/about', component: About },
  {
    path: "/",
    name: "index",
    component: () => import("./layout/PublicLayout.vue"),
    children: [
      { path: "/", name: "Home", component: () => import("./views/Home.vue") },
      // { path: "login", name: "login", component: Login },
      // { path: "signup", name: "signup", component: Signup },
      // { path: 'contact', name: 'Contact', component: () => import('./views/Contact.vue') },
      // { path: "about", name: "about", component: () => import("./views/About.vue") },
    ],
  },
  {
    path: "/u",
    name: "User",
    meta: { requiresAuth: true }, // Add a meta property for authentication
    component: () => import("./layout/AuthLayout.vue"),
    children: [
      // { path: "todo", name: "todo", component: () => import("./views/TodoApp.vue") },
      // { path: "products", name: "Products", component: () => import("./views/Products.vue") },
      // { path: "forms", name: "Forms", component: () => import("./views/Forms.vue") },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("./layout/AdminLayout.vue"),
    meta: { requiresAdmin: true, requiresAuth: true }, // Requires both authentication and admin role
    children: [
      { path: "dashboard", name: "Dashboard", component: () => import("./views/Dashboard.vue") },
      // { path: 'users', name: 'Users', component: () => import('./views/Users.vue') },
    ],
  },
  { path: "/:catchAll(.*)*", component: () => import("./views/ErrorNotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Authentication and Authorization
router.beforeEach((to, from, next) => {
  const isAuthenticated = true; /* Your authentication logic here (e.g., check local storage) */
  const isAdmin = true; /* Your admin role check logic here (e.g., check user roles) */

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Home" }); // Redirect to home or login page
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: "Profile" }); // Redirect to a page accessible by authenticated users
  } else {
    next(); // Allow navigation
  }
});

export default router;

`;
    fs.mkdirSync(path.join(__dirname, projectName, "src"), { recursive: true }); // Make directory if needed
    fs.writeFileSync(path.join(__dirname, projectName, "src", "router.js"), routerFile);

    // Create Pinia store file (src/stores/counter.js) - Optional
    fs.mkdirSync(path.join(__dirname, projectName, "src", "store"), { recursive: true });
    const piniaStoreFile = `
import { defineStore } from "pinia";
import { ref, computed } from "vue"; // Import ref and computed

export const useCounterStore = defineStore("counter", () => {
  // State (using ref for primitive values)
  const count = ref(0);

  // Computed properties
  const doubleCount = computed(() => count.value * 2);

  // Actions (functions that modify state)
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  // Return what you want to expose (state and actions)
  return { count, doubleCount, increment, decrement };
});

// import {useCounterStore} from '@/store/counter.js'
// const counterStore = useCounterStore()
// counterStore.count

`;
    fs.writeFileSync(path.join(__dirname, projectName, "src", "store", "store.js"), piniaStoreFile);

    // Update main.js (register Quasar, Pinia, router)
    // https://quasar.dev/start/vite-plugin/
    const mainJsFile = `
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar'

import App from './App.vue';
import router from './router';
import './index.css'; // Or ./main.css
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

app.mount('#app');
`;

    fs.writeFileSync(path.join(__dirname, projectName, "src", "main.js"), mainJsFile);


const vitecConfigueFile = `
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSingleFile(),
    vue({
      template: { transformAssetUrls },
    }),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: fileURLToPath(new URL("./src/quasar-variables.sass", import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": path.resolve(__dirname, "./"), //
    },
  },
  server: {
    proxy: {
      // Example: Proxy API requests to a backend server
      "/api": {
        target: "http://localhost:8080", // Your backend URL
        changeOrigin: true,
      },
    },
  },
});

`;

    fs.writeFileSync(path.join(__dirname, projectName, "vite.config.js"), vitecConfigueFile);
    // Run the development server
    execSync("code .", { stdio: "inherit", cwd: path.join(__dirname, projectName) });

    console.log("Project setup complete. Open your browser to view the app.");
  } catch (error) {
    console.error("Error creating Vue app:", error);
  }
}

createVueApp();
