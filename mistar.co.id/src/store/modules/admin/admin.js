import i18n from "@/i18n";

const admin = {
  state: {
    modal_change_password: false
  },
  mutations: {
    TOGGLE_CHANGE_PASSWORD: state => {
      state.modal_change_password = !state.modal_change_password;
    }
  },
  actions: {
    toggleModalChangePassword({ commit }, data) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("TOGGLE_CHANGE_PASSWORD");
          commit("CALL_SNACKBAR", {
            msg: i18n.t("app.change_password_success"),
            color: "success"
          });
          resolve(data);
        }, 2000);
      });
    }
  }
};

export default admin;
