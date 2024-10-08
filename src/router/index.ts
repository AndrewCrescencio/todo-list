import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { supabase } from "../services/supabase";

import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("../views/UnauthorizedView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const userIsAuthenticated = await isAuthenticated();

    if (userIsAuthenticated) {
      next();
    } else {
      next("/unauthorized");
    }
  } else {
    next();
  }
});

export default router;
