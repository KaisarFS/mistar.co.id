<template>
  <v-app>
    <v-system-bar
      v-if="!onLine"
      app
      dark
      color="error"
      :height="30"
      class="system-bar text-center"
    >
      <span>{{ $t("app.offline") }}</span>
    </v-system-bar>
    <v-system-bar
      v-if="onLine && showBackOnline"
      app
      dark
      color="success"
      :height="30"
      class="system-bar text-center"
    >
      <span>{{ $t("app.back_online") }}</span>
    </v-system-bar>

    <v-overlay
      :value="g_full_loading"
      :opacity="1"
      color="white"
      style="z-index: 10001"
    >
      <Lottie
        :options="lottieOptions"
        :height="200"
        :width="200"
        :animCreated="handleAnimation"
      />
    </v-overlay>

    <Snackbar></Snackbar>
    <UpdateApp></UpdateApp>
    <vue-progress-bar></vue-progress-bar>

    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Snackbar from "@/components/Snackbar";
import UpdateApp from "@/components/UpdateApp";
import Lottie from "vue-lottie";
import loading from "@/assets/animation/loading.json";

export default {
  name: "App",
  components: {
    Snackbar,
    UpdateApp,
    Lottie,
  },
  data() {
    return {
      onLine: navigator.onLine,
      showBackOnline: false,
      lottieOptions: { animationData: loading },
    };
  },
  computed: {
    ...mapGetters(["g_full_loading"]),
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    },
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
        }, 1000);
      }
    },
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
};
</script>
