<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label ? $t(label) : $t(initLabel)"
        :rules="rule ? [v => !!v || $t('app.required')] : []"
        :disabled="disabled"
        append-icon="mdi-calendar"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      :min="minDate"
      :max="maxDate"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "Datepicker",
  props: {
    label: String,
    rule: Boolean,
    minDate: String,
    maxDate: String,
    disabled: Boolean
  },
  watch: {
    date(newVal) {
      this.$emit("value", newVal);
    }
  },
  data() {
    return {
      initLabel: "components.choose_date",
      date: null,
      menu: false
    };
  }
};
</script>
