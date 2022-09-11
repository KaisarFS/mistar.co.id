<template>
  <v-app class="grey lighten-5">
    <v-content class="pa-8">
      <h1>Podcast</h1>
      <br />
      <v-container>
        <v-skeleton-loader
          v-if="firstLoad"
          :loading="loading"
          type="table"
        ></v-skeleton-loader>
        <v-data-table
          show-select
          must-sort
          v-model="selected"
          v-show="!firstLoad"
          class="elevation-1"
          :page.sync="page"
          :server-items-length="totalItems"
          :mobile-breakpoint="960"
          :footer-props="{
            'items-per-page-options': [10, 25, 50, 100],
            'show-current-page': true,

            firstIcon: 'mdi-chevron-double-left',
            lastIcon: 'mdi-chevron-double-right',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right',
          }"
          :items-per-page="10"
          :item-key="podcastData.id"
          :headers="headers"
          :items="podcastData"
          :loading="loading"
          @pagination="paginate"
        >
          <template v-slot:top>
            <v-toolbar prominent flat>
              <!-- Add Podcast -->
              <v-dialog v-model="dialog" max-width="fit-content" persistent>
                <!-- Header Table -->
                <template v-slot:activator="{ on, attrs }">
                  <v-container class="my-auto">
                    <div class="d-flex">
                      <!-- Add Podcast Button -->
                      <v-btn color="#2995D9" dark v-bind="attrs" v-on="on">
                        Add Podcast
                        <v-icon right> mdi-plus </v-icon>
                      </v-btn>
                      <!-- End Add Podcast Button -->

                      <!-- Teks Jumlah Podcast -->
                      <div class="d-flex ml-4">
                        <p class="my-auto">{{ totalItems }}</p>
                        <p class="my-auto ml-2">Podcast</p>
                      </div>
                      <!-- End Teks Jumlah Podcast -->

                      <v-spacer></v-spacer>
                      <div class="d-none d-md-flex">
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                          solo
                          flat
                          outlined
                          dense
                        ></v-text-field>
                      </div>
                    </div>

                    <!-- Search Podcast -->
                    <div class="d-md-none mt-4">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        solo
                        flat
                        outlined
                        dense
                        @keydown="handlerSearch"
                      ></v-text-field>
                    </div>
                    <!-- End Search Podcast -->
                  </v-container>
                </template>
                <!-- End Header Table -->

                <!-- Dialog add Podcast -->
                <v-card>
                  <!-- Card Header -->
                  <v-card-title>
                    <v-container class="d-flex">
                      <span class="headline">Add Podcast</span>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="close">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-container>
                  </v-card-title>
                  <!-- End Card Header -->

                  <v-divider></v-divider>

                  <!-- Main Card -->
                  <v-card-text>
                    <!-- Baris Choose Genre -->
                    <v-container>
                      <v-row>
                        <v-col md="3" cols="12" class="d-flex">
                          <h3 class="my-auto">Choose Genre</h3>
                        </v-col>
                        <v-col md="6" cols="12">
                          <v-select
                            :items="genres"
                            item-text="name"
                            item-value="value"
                            solo
                            flat
                            outlined
                            v-model="genre"
                            placeholder="Genre"
                            hide-details="auto"
                          ></v-select>
                        </v-col>
                        <v-col md="3" cols="12">
                          <v-select
                            :items="ages"
                            item-text="name"
                            item-value="value"
                            solo
                            flat
                            outlined
                            v-model="age_rating"
                            placeholder="Age"
                            hide-details="auto"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Choose Genre -->

                    <v-divider></v-divider>

                    <!-- Baris Title -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Title</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <v-text-field
                            solo
                            flat
                            v-model="title"
                            hide-details="auto"
                            background-color="#FAFAFA"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Title -->

                    <v-divider></v-divider>

                    <!-- Baris Language -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Language</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <v-select
                            solo
                            flat
                            outlined
                            v-model="language"
                            :items="languages"
                            hide-details="auto"
                            background-color="#FAFAFA"
                            placeholder="Bahasa Indonesia"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Language -->

                    <v-divider></v-divider>

                    <!-- Baris Thumbnail -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Add Thumbnail</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <div
                            class="image-input"
                            :style="{ 'background-image': `url(${imageData})` }"
                            @click="chooseImage"
                          >
                            <div v-if="!imageData" class="placeholder">
                              <div class="text-center">
                                <v-icon color="#2995D9">
                                  mdi-image-plus
                                </v-icon>
                                <p
                                  class="grey--text lighten-5"
                                  style="font-size: 14px"
                                >
                                  Drag & drop files <br />
                                  or browse from a
                                  <span class="primary--text">computer</span>
                                </p>
                              </div>
                            </div>
                            <input
                              class="file-input"
                              accept="image/*"
                              ref="fileInput"
                              type="file"
                              @input="onSelectFile"
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Thumbnail -->

                    <v-divider></v-divider>

                    <!-- Baris Description -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Description</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <v-textarea
                            solo
                            flat
                            v-model="description"
                            hide-details="auto"
                            background-color="#FAFAFA"
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Description -->

                    <v-divider></v-divider>

                    <!-- Baris Description Type File -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Description</h3>
                        </v-col>
                        <v-col cols="12" md="9" class="d-flex align-center">
                          <div class="d-flex">
                            <div>
                              <v-btn
                                color="primary"
                                class="text-none"
                                depressed
                                :loading="isSelecting"
                                @click="onButtonClick"
                              >
                                {{ buttonText }}
                                <v-icon right> mdi-cloud-upload </v-icon>
                              </v-btn>
                              <input
                                ref="uploader"
                                class="d-none"
                                type="file"
                                accept=".mp3,audio/*"
                                @change="onFileChanged"
                              />
                            </div>
                            <p class="my-auto ml-4" style="font-style: italic">
                              podcast.mp3
                            </p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Decription Type File -->

                    <v-divider></v-divider>
                  </v-card-text>
                  <!-- End Main Card -->

                  <!-- Footer Card -->
                  <v-card-actions>
                    <v-container class="d-flex">
                      <v-btn outlined color="#2995D9" @click="close">
                        Cancel
                      </v-btn>
                      <v-spacer></v-spacer>
                      <div v-if="!title || !content">
                        <v-btn dark id="btn-save-disabled" depressed>
                          Save
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-btn dark id="btn-save" @click="save"> Save </v-btn>
                      </div>
                    </v-container>
                  </v-card-actions>
                  <!-- End Footer Card -->
                </v-card>
                <!-- End Dialog add Podcast -->
              </v-dialog>
              <!-- End add Podcast -->

              <!-- ** Update Podcast ** -->
              <v-dialog
                v-model="dialogUpdate"
                max-width="fit-content"
                persistent
              >
                <!-- Dialog add Podcast -->
                <v-card>
                  <!-- Card Header -->
                  <v-card-title>
                    <v-container class="d-flex">
                      <span class="headline">Update Podcast</span>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="closeUpdate">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-container>
                  </v-card-title>
                  <!-- End Card Header -->

                  <v-divider></v-divider>

                  <!-- Main Card -->
                  <v-card-text>
                    <!-- Baris Choose Genre -->
                    <v-container>
                      <v-row>
                        <v-col md="3" cols="12" class="d-flex">
                          <h3 class="my-auto">Choose Genre</h3>
                        </v-col>
                        <v-col md="6" cols="12">
                          <v-select
                            :items="genres"
                            item-text="name"
                            item-value="value"
                            solo
                            flat
                            outlined
                            v-model="genre"
                            :placeholder="genre ? 'null' : genre"
                            hide-details="auto"
                          ></v-select>
                        </v-col>
                        <v-col md="3" cols="12">
                          <v-select
                            :items="ages"
                            item-text="name"
                            item-value="value"
                            solo
                            flat
                            outlined
                            v-model="age_rating"
                            :placeholder="age_rating ? 'null' : age_rating"
                            hide-details="auto"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Choose Genre -->

                    <v-divider></v-divider>

                    <!-- Baris Title -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Title</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <v-text-field
                            solo
                            flat
                            v-model="title"
                            hide-details="auto"
                            background-color="#FAFAFA"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Title -->

                    <v-divider></v-divider>

                    <!-- Baris Language -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Language</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <v-select
                            solo
                            flat
                            outlined
                            v-model="language"
                            :items="languages"
                            hide-details="auto"
                            background-color="#FAFAFA"
                            :placeholder="language ? 'null' : language"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Language -->

                    <v-divider></v-divider>

                    <!-- Baris Thumbnail -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Add Thumbnail</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <div
                            class="image-input"
                            :style="{ 'background-image': `url(${imageData})` }"
                            @click="chooseImage"
                          >
                            <div v-if="!imageData" class="placeholder">
                              <div class="text-center">
                                <v-icon color="#2995D9">
                                  mdi-image-plus
                                </v-icon>
                                <p
                                  class="grey--text lighten-5"
                                  style="font-size: 14px"
                                >
                                  Drag & drop files <br />
                                  or browse from a
                                  <span class="primary--text">computer</span>
                                </p>
                              </div>
                            </div>
                            <input
                              class="file-input"
                              accept="image/*"
                              ref="fileInput"
                              type="file"
                              @input="onSelectFile"
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Thumbnail -->

                    <v-divider></v-divider>

                    <!-- Baris Description -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Description</h3>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          class="d-flex justify-center align-center"
                        >
                          <v-textarea
                            solo
                            flat
                            v-model="description"
                            hide-details="auto"
                            background-color="#FAFAFA"
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Description -->

                    <v-divider></v-divider>

                    <!-- Baris Description Type File -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" class="d-flex">
                          <h3 class="my-auto">Description</h3>
                        </v-col>
                        <v-col cols="12" md="9">
                          <div class="d-flex">
                            <p>
                              <a :href="content">click here to see your file</a>
                            </p>
                          </div>
                          <div class="d-flex mt-4">
                            <div>
                              <v-btn
                                color="primary"
                                class="text-none"
                                depressed
                                :loading="isSelecting"
                                @click="onButtonClick"
                              >
                                {{ buttonText }}
                                <v-icon right> mdi-cloud-upload </v-icon>
                              </v-btn>
                              <input
                                ref="uploader"
                                class="d-none"
                                type="file"
                                accept=".mp3,audio/*"
                                @change="onFileChanged"
                              />
                            </div>
                            <p class="my-auto ml-4" style="font-style: italic">
                              podcast.mp3
                            </p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- End Baris Decription Type File -->

                    <v-divider></v-divider>
                  </v-card-text>
                  <!-- End Main Card -->

                  <!-- Footer Card -->
                  <v-card-actions>
                    <v-container class="d-flex">
                      <v-btn outlined color="#2995D9" @click="closeUpdate">
                        Cancel
                      </v-btn>
                      <v-spacer></v-spacer>
                      <div v-if="!title || !content">
                        <v-btn dark id="btn-save-disabled" depressed>
                          Save
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-btn dark id="btn-save" @click="update"> Save </v-btn>
                      </div>
                    </v-container>
                  </v-card-actions>
                  <!-- End Footer Card -->
                </v-card>
                <!-- End Dialog add Podcast -->
              </v-dialog>
              <!-- End Update Podcast -->

              <!-- ** Dialog delete Podcast ** -->
              <v-dialog
                v-model="dialogDelete"
                max-width="fit-content"
                persistent
              >
                <v-card>
                  <v-card-title class="headline">Delete Podcast</v-card-title>
                  <v-card-text
                    >Are you sure you want to delete this item?</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="red darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- End Dialog delete Podcast -->
            </v-toolbar>
          </template>

          <!-- Isi Tabel => Podcast Title Column -->
          <template v-slot:[`item.title`]="{ item }">
            <v-container class="d-flex">
              <v-avatar size="56px">
                <img alt="Avatar" :src="item.thumbnail" />
              </v-avatar>
              <p class="my-auto ml-3">{{ item.title }}</p>
            </v-container>
          </template>
          <!-- End Isi Tabel => Podcast Title Column -->

          <!-- Isi Tabel => Genre Column -->
          <template v-slot:[`item.genre`]="{ item }">
            <div v-if="!!item.genre">
              <p style="text-transform: capitalize">{{ item.genre }}</p>
            </div>

            <div v-else>
              <p>null</p>
            </div>
          </template>
          <!-- End Isi Tabel => Genre Column -->

          <!-- Isi Tabel => Publish Date Column -->
          <template v-slot:[`item.published`]="{ item }">
            <div v-if="item.published == null">
              <v-btn icon id="btn-unpublish" title="Unpublish">
                <v-icon class="white--text"> mdi-cancel </v-icon>
              </v-btn>
            </div>

            <div v-else>
              <p>{{ item.published }}</p>
            </div>
          </template>
          <!-- End Isi Tabel => Publish Date Column -->

          <!-- Isi Tabel => Publish Column -->
          <template v-slot:[`item.publish`]="{ item }">
            <div v-if="item.published == null">
              <v-btn icon id="btn-unpublish" title="Unpublish">
                <v-icon class="white--text"> mdi-cancel </v-icon>
              </v-btn>
            </div>

            <div v-else>
              <v-btn icon id="btn-publish" title="Publish">
                <v-icon class="white--text"> mdi-share </v-icon>
              </v-btn>
            </div>
          </template>
          <!-- End Isi Tabel => Publish Column -->

          <!-- Isi Tabel => Action Column -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              icon
              class="ma-2 pa-4"
              style="background-color: #2995d9"
              title="Edit"
              @click="editItem(item.id)"
            >
              <v-icon class="white--text"> mdi-square-edit-outline </v-icon>
            </v-btn>
            <v-btn
              icon
              class="ma-2 pa-4"
              style="background-color: #0c5380"
              title="Delete"
              @click="deleteItem(item.id)"
            >
              <v-icon class="white--text"> mdi-delete-forever </v-icon>
            </v-btn>
          </template>
          <!-- End Isi Tabel => Action Column -->

          <template v-slot:footer>
            <div class="footer-table">
              <div class="d-flex align-center">
                <p class="mb-0">Jump To Page :</p>
                <div style="width: fit-content">
                  <v-text-field
                    placeholder="1"
                    v-model="page"
                    dense
                    flat
                    solo
                    single-line
                    full-width
                    hide-details="auto"
                    class="my-2"
                  >
                  </v-text-field>
                </div>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/storage";

let typingTimer;
const doneTypingInterval = 750;

export default {
  data: () => ({
    api: process.env.VUE_APP_BASE_API,

    singleSelect: false,
    dialog: false,
    dialogUpdate: false,
    dialogDelete: false,
    selectType: true,
    imageData: null,
    loading: true,
    firstLoad: true,
    selectedFile: null,
    isSelecting: false,
    editedIndex: 0,

    selectedTypeFile: "",
    publishDate: "",
    search: "",
    page: 1,
    limit: 10,
    totalItems: 0,

    getPodcasts: [],
    selected: [],
    podcastData: [],

    // Properti dialog add Podcast
    genre: null,
    age_rating: null,
    title: null,
    language: null,
    thumbnail: null,
    description: null,
    category: "podcast",
    type: null,
    content: null,
    // ***////***/

    descType: ["File", "HTML"],
    defaultButtonText: "Choose File",
    languages: ["Bahasa Indonesia", "English"],
    ages: [
      {
        name: "Remaja",
        value: "SU",
      },
      {
        name: "Dewasa",
        value: "DW",
      },
    ],
    genres: [
      {
        name: "Business",
        value: "bussiness",
      },
      {
        name: "Children",
        value: "children",
      },
      {
        name: "Education",
        value: "education",
      },
      {
        name: "Family",
        value: "family",
      },
      {
        name: "Productivity",
        value: "productivity",
      },
      {
        name: "Religion",
        value: "religion",
      },
      {
        name: "Rumah Belajar",
        value: "rumah_belajar",
      },
      {
        name: "Sport",
        value: "sport",
      },
      {
        name: "Study at Home",
        value: "study_at_home",
      },
      {
        name: "Technology",
        value: "technology",
      },
    ],
  }),

  mounted() {
    this.loading = true;
    this.getData();
  },

  computed: {
    headers() {
      return [
        { text: "Podcast", value: "title", sortable: false, align: "start" },
        { text: "Genre", value: "genre" },
        { text: "Publish Date", value: "published" },
        { text: "Publish", value: "publish", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ];
    },

    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogUpdate(val) {
      val || this.closeUpdate();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    paginate(data) {
      this.limit = data.itemsPerPage;
      this.page = data.page;
      this.getData();
    },
    handlerSearch() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        this.page = 1;
        this.search = this.search;
        this.getData();
      }, doneTypingInterval);
    },
    getData() {
      this.loading = true;

      console.log("");
      console.log("Loading Podcast Data...");

      return new Promise((resolve) => {
        let items = this.podcastData.data;
        axios
          .post(this.api + "cms/inspiration/list", {
            category: ["article"],
            limit: this.limit,
            page: this.page,
            search: this.search,
          })
          .then((response) => {
            this.totalItems = response.data.data.total;
            this.limit = response.data.data.per_page;
            this.setPodcast(response.data);
            setTimeout(() => {
              if (this.firstLoad) this.firstLoad = false;
              console.log("data is loaded");
              this.loading = false;
              resolve({
                items,
              });
            }, 1000);
          })
          .catch((error) => console.log(error));
      });
    },
    getEditData(item) {
      console.log("");
      console.log("***** Get Edit Data From API *****");
      console.log("id: " + item.id);
      console.log("title: " + item.title);
      console.log("author: " + item.author);
      console.log("description: " + item.description);
      console.log("publisher: " + item.publisher);
      console.log("published: " + item.published);
      console.log("category: " + item.category);
      console.log("language: " + item.language);
      console.log("thumbnail: " + item.thumbnail);
      console.log("type: " + item.type);
      console.log("content: " + item.content);
      console.log("price: " + item.price);
      console.log("genre: " + item.genre);
      console.log("access: " + item.access);
      console.log("vendor: " + item.vendor);
      console.log("age_rating: " + item.age_rating);
      console.log("created_at: " + item.created_at);
      console.log("updated_at: " + item.updated_at);
      console.log("deleted_at: " + item.deleted_at);
    },
    setPodcast(data) {
      this.getPodcasts = data.data;
      this.podcastData = this.getPodcasts.data;
    },
    afterSelected() {
      this.selectType = false;
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },

    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        this.thumbnail = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.content = e.target.files[0];
      this.type = "file";
    },

    editItem(item) {
      this.$loading(true);

      this.editedIndex = item;
      axios
        .post(this.api + "cms/inspiration/detail", {
          id: this.editedIndex,
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        })
        .then((response) => {
          this.editArticleData = response.data;
          var item = this.editArticleData.data;
          this.getEditData(item);

          this.category = item.category;
          this.genre = item.genre;
          this.age_rating = item.age_rating;
          this.title = item.title;
          this.imageData = item.thumbnail;
          this.language = item.language;
          this.type = item.type;
          this.thumbnail = item.thumbnail;
          this.content = item.content;

          if (item.description === null) {
            this.description = "null";
          } else {
            this.description = item.description;
          }

          this.$loading(false);
        })
        .catch();

      this.editedItem = Object.assign({}, item);
      this.dialogUpdate = true;
    },

    deleteItem(item) {
      this.editedIndex = item;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var index = this.editedIndex;
      this.podcastData.splice(
        this.podcastData.findIndex(function (i) {
          return i.id === index;
        }),
        1
      );

      axios
        .post(this.api + "cms/inspiration/delete", {
          id: this.editedIndex,
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        })
        .then((response) => {
          console.log("deleted: ", response);
        })
        .catch();

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });

      this.genre = null;
      this.age_rating = null;
      this.title = null;
      this.language = null;
      this.thumbnail = null;
      this.description = null;
      this.type = null;
      this.content = null;
      this.selectedTypeFile = null;
      this.imageData = null;
      this.selectType = true;
    },

    closeUpdate() {
      this.dialogUpdate = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });

      this.genre = null;
      this.age_rating = null;
      this.title = null;
      this.language = null;
      this.thumbnail = null;
      this.description = null;
      this.type = null;
      this.content = null;
      this.selectedTypeFile = null;
      this.imageData = null;
      this.selectType = true;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // ** Method Save ** //
    save() {
      this.$loading(true);

      let formData = new FormData();

      formData.append("genre", this.genre);
      formData.append("age_rating", this.age_rating);
      formData.append("title", this.title);
      formData.append("language", this.language);
      formData.append("thumbnail", this.thumbnail);
      formData.append("description", this.description);
      formData.append("type", this.type);
      formData.append("content", this.content);
      formData.append("category", this.category);

      axios
        .post(this.api + "inspiration/add_inspiration/", formData, {
          headers: {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          (response) => {
            console.log(response);
            this.$router.go();
          },
          (error) => {
            console.log(error);
            this.$loading(false);
            alert(error);
          }
        );
    },
    // ** End Method Save ** //

    // ** Method Update ** //
    update() {
      this.$loading(true);

      let formData = new FormData();

      formData.append("id", this.editedIndex);
      formData.append("genre", this.genre);
      formData.append("age_rating", this.age_rating);
      formData.append("title", this.title);
      formData.append("language", this.language);
      formData.append("thumbnail", this.thumbnail);
      formData.append("description", this.description);
      formData.append("type", this.type);
      formData.append("content", this.content);
      formData.append("category", this.category);

      axios
        .post(this.api + "cms/inspiration/update", formData, {
          headers: {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          (response) => {
            console.log(response);
            this.$router.go();
          },
          (error) => {
            console.log(error);
            this.$loading(false);
            alert(error);
          }
        );
    },
    // *** End Method Update //
  },
};
</script>

<style scoped>
.footer-table {
  position: relative;
  bottom: 0;
  margin-left: 20px;
}
.footer-table p {
  font-family: "Titillium Web", sans-serif !important;
  font-size: 1rem;
}
.v-btn {
  text-transform: capitalize;
}
.v-data-table-header {
  background-color: #e3f2fd;
}
.v-data-table-header span {
  font-size: 18px !important;
}
.v-text-field--outlined >>> fieldset {
  border-color: #e1e1e1 !important;
}
.v-text-field--solo >>> fieldset {
  background-color: #fafafa !important;
}
.image-input {
  display: block;
  width: 300px;
  height: 300px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #fafafa;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
#btn-save {
  padding: 0 25px;
  background: transparent
    linear-gradient(
      90deg,
      var(--unnamed-color-2995d9) 0%,
      var(--unnamed-color-83c5ee) 100%
    )
    0% 0% no-repeat padding-box;
  background: transparent linear-gradient(90deg, #2995d9 0%, #83c5ee 100%) 0% 0%
    no-repeat padding-box;
}
#btn-save-disabled {
  padding: 0 25px;
  background: var(--unnamed-color-d4d4d4) 0% 0% no-repeat padding-box;
  background: #d4d4d4 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
}
#btn-publish {
  background: transparent linear-gradient(114deg, #ffa10a 0%, #ffd796 100%) 0%
    0% no-repeat padding-box;
}
#btn-unpublish {
  background: transparent linear-gradient(114deg, #aeb0b3 0%, #e0e1e3 100%) 0%
    0% no-repeat padding-box;
}
</style>