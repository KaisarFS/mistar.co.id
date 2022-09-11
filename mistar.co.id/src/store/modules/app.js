import Cookies from "js-cookie";

const app = {
  state: {
    app_version: "v0.0.1",
    language: Cookies.get("language") || process.env.VUE_APP_I18N_LOCALE,
    snackbar: {
      status: false,
      timeout: 5000,
      color: "blue-grey darken-2",
      msg: "",
      mode: "",
      positionx: "",
      positiony: ""
    },
    full_loading: false,
    modal_pendaftaran: false
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set("language", "id");
    },
    CALL_SNACKBAR: (state, data) => {
      state.snackbar.status = false;

      if (data) {
        setTimeout(() => {
          state.snackbar.msg = data.msg ? data.msg : "";
          state.snackbar.color = data.color ? data.color : "blue-grey darken-2";
          state.snackbar.positionx = data.x ? data.x : "left";
          state.snackbar.positiony = data.y ? data.y : "bottom";
          state.snackbar.status = true;
        }, 200);
      }
    },
    TOGGLE_FULL_LOADING: state => {
      state.full_loading = !state.full_loading;
    },
    TOGGLE_MODAL_PENDAFTARAN: state => {
      state.modal_pendaftaran = !state.modal_pendaftaran;
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit("TOGGLE_FULL_LOADING");
      setTimeout(() => {
        commit("SET_LANGUAGE", language);
        commit("TOGGLE_FULL_LOADING");
      }, 200);
    }
  }
};

export default app;
