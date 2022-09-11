import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";

import "./registerServiceWorker";
import "./styles/main.scss";
import "./permission";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

// Plugins
import VueTheMask from "vue-the-mask";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import VueProgressBar from "vue-progressbar";
import SocialSharing from "vue-social-sharing";
import JsonExcel from "vue-json-excel";
import Meta from "vue-meta";

Vue.use(VueProgressBar, {
  color: "#bffaf3",
  failedColor: "#874b4b",
  thickness: "5px"
});

Vue.use(VueTheMask);
Vue.use(SocialSharing);
Vue.use(Meta, {
  keyName: "metaInfo",
  refreshOnceOnNavigation: true
});

Vue.component(VueCropper);
Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
