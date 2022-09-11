import Vue from "vue";
import router from "./router";
import store from "./store";
import { getToken } from "@/utils/storage";

import VueProgressBar from "vue-progressbar";
Vue.use(VueProgressBar, {
  color: "#27ACE2",
  failedColor: "#FF0D64",
  thickness: "5px"
});

let newVue = new Vue({});

function hasPermission(roles, permissionRoles) {
  if (roles) return true;
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ["/cms/login", "/404", "/401"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  newVue.$Progress.start();
  if (getToken()) {
    if (to.path === "/") {
      next({ path: "/inspiration/ebook" });
      newVue.$Progress.finish();
    } else {
      if (store.getters.g_roles.length === 0) {
        store
          .dispatch("GetUserInfo")
          .then(() => {
            const roles = store.getters.g_roles;
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              router.addRoutes(store.getters.addRouters);
              next({ ...to, replace: true });
            });
          })
          .catch(() => {
            store.dispatch("LogOut");
          });
      } else {
        if (hasPermission(store.getters.g_roles, to.meta.roles)) {
          next();
        } else {
          next({ path: "/401", replace: true, query: { noGoBack: true } });
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/cms/login");
    }
    newVue.$Progress.finish();
  }
});

router.afterEach(() => {
  newVue.$Progress.finish();
});
