import Vue from "vue";
import VueRouter from "vue-router";
import Admin from "../views/layout/admin/index.vue";
Vue.use(VueRouter);

// Modules
import Inspiration from "./modules/inspiration";

export const constantRoute = [
  {
    path: "/cms/login",
    name: "login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorpage/404"),
    hidden: true
  }
];

export default new VueRouter({
  // mode: "history",
  base: process.env.ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoute
});

export const asyncRoute = [
  {
    path: "/dashboard",
    component: Admin,
    redirect: "dashboard",
    meta: {
      title: "routes.dashboard",
      icon: "sidebar-icon-dashboard.svg",
      roles: [4]
    },
    children: [
      {
        name: "Dashboard",
        path: "/dashboard",
        component: () => import("@/views/admin/dashboard"),
        meta: {
          title: "routes.dashboard",
          roles: [4],
          icon: "sidebar-icon-dashboard.svg"
        }
      }
    ]
  },
  Inspiration,
  { path: "*", hidden: true, redirect: "/404" }
];
