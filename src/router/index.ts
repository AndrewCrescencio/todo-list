import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { supabase } from "@/services/supabase";

import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { hideAppHeader: true },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/todos",
    name: "todos",
    component: () => import("../views/TodosView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("../views/ResetPasswordView.vue"),
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("../views/UnauthorizedView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
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

router.beforeEach(async (to, _from, next) => {
  const userIsAuthenticated = await isAuthenticated();
  if (to.meta.requiresAuth) {
    if (userIsAuthenticated) {
      next();
    } else {
      next("/unauthorized");
    }
  } else {
    if (
      (to.path == "/" && userIsAuthenticated) ||
      (to.path == "/login" && userIsAuthenticated)
    ) {
      next("/todos");
    } else {
      next();
    }
  }
});

export default router;
