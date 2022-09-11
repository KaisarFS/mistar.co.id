<template>
  <v-menu
    ref="timepicker"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        :label="label ? $t(label) : $t(initLabel)"
        :rules="rule ? [v => !!v || $t('app.required')] : []"
        :disabled="isDisabled ? true : false"
        append-icon="mdi-av-timer"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="time"
      format="24hr"
      @click:minute="$refs.timepicker.save(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "Timepicker",
  props: {
    label: String,
    rule: Boolean,
    isDisabled: Boolean
  },
  watch: {
    time(newVal) {
      this.$emit("value", newVal);
    },
    isDisabled(value) {
      if (value) {
        this.time = null;
      }
    }
  },
  data() {
    return {
      initLabel: "components.choose_time",
      time: null,
      menu: false
    };
  }
};
</script>
