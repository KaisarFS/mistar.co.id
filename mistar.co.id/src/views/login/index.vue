<template>
  <v-app app>
    <v-content class="body">
      <v-row justify="center" align="center" no-gutters>
        <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="12" sm="8" md="8">
          <v-row justify="center" align="center" no-gutters>
            <img
              style="max-height: 80vh; min-width: 80%"
              src="@/assets/svg/login.svg"
              alt="Login Assets"
            />
            <!-- <div class="text-center">
              <img
                class="sistesi-text mt-6"
                src="@/assets/svg/only-text-sistesi.svg"
                alt="Sistesi Text"
              />
              <p class="brown--text font-italic font-weight-light subtitle-1">
                {{ $t("login.section1") }}
              </p>
            </div> -->
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="grey lighten-5 text-center">
          <v-row
            no-gutters
            style="min-height: 100vh"
            justify="center"
            align="center"
          >
            <div style="width: 80%">
              <div class="text-center mb-6">
                <div class="mb-5">
                  <Lottie
                    :width="180"
                    :height="180"
                    :options="lottieOptions"
                    :animCreated="handleAnimation"
                  />
                </div>
                <div class="mb-0">{{ $t("login.title_a") }}</div>
                <div>{{ $t("login.title_b") }} <b>{{sistesi}}</b></div>
              </div>
              <p v-if="errorLogin" dense class="error--text subtitle-2">
                {{ $t("app.login_error") }}
              </p>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="data.username"
                  label="Username"
                  name="username"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  outlined
                  v-on:keyup.enter="validate"
                  :rules="formValidation($t('login.username_rules'))"
                />

                <v-text-field
                  v-model="data.password"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="
                    formValidation(
                      {
                        a: $t('login.password_rules'),
                        b: $t('login.password_rules_minlength'),
                      },
                      'password'
                    )
                  "
                  :type="showPwd ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  outlined
                  v-on:keyup.enter="validate"
                  @click:append="showPwd = !showPwd"
                ></v-text-field>
              </v-form>
              <v-col cols="12" sm="12" md="12" class="px-0">
                <v-btn
                  block
                  x-large
                  dark
                  class="gradient-blue elevation-0 br8"
                  :disabled="!valid"
                  :loading="waitLogin"
                  @click="validate"
                  >Login</v-btn
                >
              </v-col>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import Lottie from "vue-lottie";
import logoAnimation from "@/assets/animation/logoAnimation.json";

export default {
  name: "Login",
  metaInfo: {
    title: "Login",
    titleTemplate: "%s | Sistesi",
  },
  components: {
    Lottie,
  },
  data() {
    return {
      lottieOptions: { animationData: logoAnimation, loop: false },
      valid: true,
      sistesi: process.env.VUE_APP_SISTESI_TEXT,
      showPwd: false,
      errorLogin: false,
      waitLogin: false,
      data: {
        username: this.$route.query.username ? this.$route.query.username : "",
        password: "",
      },
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    formValidation(text, type) {
      switch (type) {
        case "password":
          return [(v) => !!v || text.a, (v) => v.length >= 6 || text.b];
        default:
          return [(v) => !!v || text];
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.errorLogin = false;
        this.waitLogin = true;
        this.$store
          .dispatch("Login", this.data)
          .then((res) => {
            if (res) this.waitLogin = false;
            this.$router.push("/inspiration/ebook").catch(() => {
              this.waitLogin = false;
            });
          })
          .catch((err) => {
            if (err && err.status == 401) this.errorLogin = true;
            this.waitLogin = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.body {
  background-color: white;
}
.left-img {
  height: 75%;
  width: 90%;
}
.sistesi-text {
  max-height: 98%;
  width: 100px;
}
a {
  text-decoration: none;
}
</style>
