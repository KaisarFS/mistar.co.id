<template>
  <v-row>
    <v-dialog v-model="model" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ content }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close">
            {{ $t("app.back") }}
          </v-btn>
          <v-btn color="gradient-blue" dark @click="save" :loading="loadingBtn">
            {{ $t("app.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    model: {
      type: Boolean,
      required: true
    },
    title: String,
    content: {
      type: String,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    save: {
      type: Function,
      required: true
    },
    loadingBtn: {
      type: Boolean,
      required: true
    }
  }
};
</script>
