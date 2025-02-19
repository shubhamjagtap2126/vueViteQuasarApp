import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./store/Store";

const routes = [
  // { path: '/about', component: About },
  {
    path: "/",
    name: "index",
    component: () => import("./layout/PublicLayout.vue"),
    children: [
      { path: "/", name: "Authpage", component: () => import("./components/AuthPage.vue") },
      { path: "about", name: "About", component: () => import("./views/About.vue") },
      // { path: "login", name: "login", component: Login },
      // { path: "signup", name: "signup", component: Signup },
      // { path: 'contact', name: 'Contact', component: () => import('./views/Contact.vue') },
    ],
  },
  {
    path: "/u",
    name: "User",
    meta: { requiresAuth: true }, // Add a meta property for authentication
    component: () => import("./layout/AuthLayout.vue"),
    children: [
      // { path: "/", name: "AuthHome", component: () => import("./views/AuthHome.vue") },
      { path: "home", name: "AuthHome", component: () => import("./views/AuthHome.vue") },
      { path: "apps", name: "AppPage", component: () => import("./views/apps/AppPage.vue") },
      // { path: "todo", name: "todo", component: () => import("./views/TodoApp.vue") },
      // { path: "products", name: "Products", component: () => import("./views/Products.vue") },
      // { path: "forms", name: "Forms", component: () => import("./views/Forms.vue") },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("./views/admin/layouts/MainLayout.vue"),
    // meta: { requiresAdmin: true, requiresAuth: true }, // Requires both authentication and admin role
    children: [
      { path: "", name: "Dashboard", component: () => import("./views/admin/Dashboard.vue") },
      { path: "Dashboard1", name: "Dashboard1", component: () => import("./views/admin/pages/Dashboard.vue") },
      { path: "Dashboard2", name: "Dashboard2", component: () => import("./views/admin/pages/Dashboard2.vue") },
      { path: "Profile", name: "Profile", component: () => import("./views/admin/pages/UserProfile.vue") },
      { path: "Map", name: "Map", component: () => import("./views/admin/pages/Map.vue") },
      { path: "MapMarker", name: "MapMarker", component: () => import("./views/admin/pages/MapMarker.vue") },
      { path: "TreeTable", name: "TreeTable", component: () => import("./views/admin/pages/TreeTable.vue") },
      { path: "StreetView", name: "StreetView", component: () => import("./views/admin/pages/StreetView.vue") },
      { path: "Cards", name: "Cards", component: () => import("./views/admin/pages/Cards.vue") },
      { path: "Tables", name: "Tables", component: () => import("./views/admin/pages/Tables.vue") },
      { path: "Contact", name: "Contact", component: () => import("./views/admin/pages/Contact.vue") },
      { path: "Checkout", name: "Checkout", component: () => import("./views/admin/pages/Checkout.vue") },
      { path: "Ecommerce", name: "Ecommerce", component: () => import("./views/admin/pages/ProductCatalogues.vue") },
      { path: "Pagination", name: "Pagination", component: () => import("./views/admin/pages/Pagination.vue") },
      { path: "Charts", name: "Charts", component: () => import("./views/admin/pages/Charts.vue") },
      // { path: "Calendar", name: "Calendar", component: () => import("./views/admin/pages/Calendar.vue") },
      { path: "Directory", name: "Directory", component: () => import("./views/admin/pages/Directory.vue") },
      { path: "Footer", name: "Footer", component: () => import("./views/admin/pages/Footer.vue") },
      { path: "CardHeader", name: "CardHeader", component: () => import("./views/admin/pages/CardHeader.vue") },
      { path: "Maintenance", name: "Maintenance", component: () => import("./views/admin/pages/Maintenance.vue") },
      { path: "Pricing", name: "Pricing", component: () => import("./views/admin/pages/Pricing.vue") },
      { path: "Login-1", name: "Login-1", component: () => import("./views/admin/pages/Login-1.vue") },
      { path: "Lock", name: "Lock", component: () => import("./views/admin/pages/LockScreen.vue") },
      { path: "Lock-2", name: "Lock-2", component: () => import("./views/admin/pages/LockScreen-2.vue") },

      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},

      // { path: 'users', name: 'Users', component: () => import('./views/Users.vue') },
    ],
  },
  { path: "/whatsapp", name: "Whatsapp", component: () => import("./views/Whatsapp.vue") },
  { path: "/youtube", name: "Youtube", component: () => import("./views/Youtube.vue") },
  { path: "/Mail", component: () => import("./views/Mail.vue") },
  {
    path: "/tickets",
    name: "TicketMania",
    // meta: { requiresAuth: true }, // Add a meta property for authentication
    component: () => import("./views/Ticketmania/Layout.vue"),
    children: [
      { path: "", name: "TicketManiaHome", component: () => import("./views/Ticketmania/Home.vue") },
      { path: ":id", name: "SingleEvent", component: () => import("./views/Ticketmania/SingleEvent.vue") },
    ],
  },
  // { path: "/:catchAll(.*)*", component: () => import("./views/ErrorNotFound.vue") },
  { path: "/:catchAll(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Authentication and Authorization
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // const isAuthenticated = true; /* Your authentication logic here (e.g., check local storage) */
  const isAdmin = true; /* Your admin role check logic here (e.g., check user roles) */

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: "User" }); // Redirect to home or login page
  } else if (to.meta.requiresAdmin && (isAdmin || !authStore.user?.isAdmin)) {
    next({ name: "Admin" }); // Redirect to a page accessible by authenticated users
  } else {
    next(); // Allow navigation
  }
});

export default router;
