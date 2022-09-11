import { setToken, getToken } from "@/utils/storage";
import router from "@/router";
import { api_login, user_profile } from "@/api/login";
// import i18n from "@/i18n";

const user = {
  state: {
    roles: [],
    token: getToken(),
    username: "",
    user: {
      fullname: "",
      photo: "",
      role: "",
      gender: ""
    },
    school: {
      name: "SMK Developer",
      logo: "@/assets/users/logo-sekolah.png"
    },
    id: ""
  },

  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_SCHOOL: (state, school) => {
      state.school = school;
    },
    SET_ID: (state, id) => {
      state.id = id;
    }
  },

  actions: {
    // Username login
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        api_login(username, userInfo.password)
          .then(res => {
            if (res.data.code) {
              const d = res.data;
              commit("SET_TOKEN", d.data.api_token);
              commit("MODAL_SCHOOL_ADDRESS");
              resolve(true);
            }
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        user_profile(state.token)
          .then(res => {
            if (res.data.code) {
              const data = res.data.data;
              // const roles = [];
              // if (data.roles.length > 0) {
              //   data.roles.map(r => {
              //     roles.push(r.role);
              //   });
              //   if (roles.length > 0) commit("SET_ROLES", roles);
              // }else {
              //   commit("CALL_SNACKBAR", {
              //     msg: i18n.t("app.no_roles"),
              //     color: "error",
              //     x: "right",
              //     y: "top"
              //   });
              //   reject("getInfo: you have no roles");
              // }

              
              commit("SET_ROLES", [4]);
              commit("SET_ID", data.id);
              commit("SET_USERNAME", data.nick_name);
              commit("SET_USER", {
                fullname: data.name ? data.name : "",
                photo: data.photo ? data.photo : "",
                role: data.type ? data.type : "",
                gender: data.gender ? data.gender : "L"
              });
            }
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    LogOut({ commit }) {
      return new Promise(resolve => {
        commit("TOGGLE_FULL_LOADING");
        commit("SET_TOKEN", "");
        commit("SET_ROLES", "");
        setTimeout(() => {
          if (router.currentRoute.name !== "Homepage") {
            router.replace({ path: "/" });
            commit("TOGGLE_FULL_LOADING");
            resolve();
          } else {
            commit("TOGGLE_FULL_LOADING");
            resolve();
          }
        }, 2000);
      });
    }
  }
};

export default user;
