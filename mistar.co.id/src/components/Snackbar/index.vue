<template>
  <v-snackbar
    :value="g_snackbar.status"
    :bottom="g_snackbar.positiony === 'bottom'"
    :color="g_snackbar.color"
    :left="g_snackbar.positionx === 'left'"
    :multi-line="g_snackbar.mode === 'multi-line'"
    :right="g_snackbar.positionx === 'right'"
    :timeout="g_snackbar.timeout"
    :top="g_snackbar.positiony === 'top'"
  >
    {{ g_snackbar.msg }}
    <v-btn icon dark text @click="closeSnackbar">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "snackbar",
  computed: {
    ...mapGetters(["g_snackbar"])
  },
  methods: {
    closeSnackbar() {
      this.$store.commit("CALL_SNACKBAR");
    }
  }
};
</script>
