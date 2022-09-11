<template>
  <div>
    <v-row class="mt-5" no-gutters v-if="$vuetify.breakpoint.smAndDown">
      <v-col cols="12" class="py-0 d-flex justify-center align-center">
        <v-select
          :items="items"
          v-model="perPage"
          hide-details
          outlined
          dense
          class="select-75"
        ></v-select>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="page"
          :length="length"
          dense
          :total-visible="10"
          class="float-right"
          style="width: 200px !important;"
        />
      </v-col>
    </v-row>

    <v-row class="mt-5" v-else>
      <v-col cols="12" sm="7" align-self="center" class="py-0">
        <div class="body-2">
          <div class="d-inline">
            Showing 1 - {{ length }} of {{ length }} | show
          </div>
          <v-select
            :items="items"
            v-model="perPage"
            hide-details
            outlined
            dense
            class="caption mx-2"
            style="width: 80px; display: inline-flex"
          ></v-select>
          <div class="d-inline">Per Page</div>
        </div>
      </v-col>
      <v-col cols="12" sm="5" align-self="center" class="py-0">
        <v-pagination
          v-model="page"
          :length="length"
          :total-visible="10"
          dense
          class="float-right"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    length: Number
  },
  watch: {
    page(newVal) {
      this.$emit("currentPage", newVal);
    },
    perPage(newVal) {
      this.$emit("perPage", newVal);
    }
  },
  data() {
    return {
      page: 1,
      perPage: 10,
      items: [10, 25, 50, 100]
    };
  }
};
</script>

<style lang="scss">
.v-pagination {
  width: initial;
  .v-pagination__item {
    height: 20px;
    width: 20px;
    min-width: 20px;
    margin: 0px !important;
    padding: 0px;
    font-size: 14px !important;
    margin: 5px;
    color: lightgray !important;
    background: white !important;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }
  .v-pagination__navigation {
    height: 20px;
    width: 20px;
    min-width: 20px;
    margin: 0px !important;
    padding: 0px;
    margin: 5px;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    .v-icon {
      font-size: 20px;
      color: #27ace2;
    }
    &:focus {
      outline: none;
    }
  }
  .v-pagination__item {
    &:focus {
      outline: none;
    }
  }
  .v-pagination__item--active {
    color: black !important;
  }
}

@media only screen and (max-width: 600px) {
  .v-pagination {
    width: 100%;
  }
}
</style>
