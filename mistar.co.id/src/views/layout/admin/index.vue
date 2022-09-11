<template>
  <div>
    <!-- ################# Sidebar ################# -->
    <v-navigation-drawer
      v-model="sidebar"
      :mini-variant="sidebar_mini && $vuetify.breakpoint.smAndUp"
      mini-variant-width="60"
      :permanent="$vuetify.breakpoint.smAndUp"
      color="#16679A"
      dark
      app
    >
      <template v-slot:prepend>
        <v-list class="pa-0">
          <v-list-item>
            <v-list-item-icon>
              <v-avatar size="34">
                <v-img :src="logo"></v-img>
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-title style="font-size: 21px">
              {{ g_school.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>

      <v-list class="mt-6 pa-4">
        <!-- <v-list-item :to="{ path: '/dashboard' }" @click="active = false" link>
          <v-list-item-icon>
            <v-icon>mdi-speedometer</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item> -->

        <!-- <v-list-group :value="false"> -->
        <!-- <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-monitor-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>CMS</v-list-item-title>
          </template> -->

        <v-list-group :value="false" sub-group v-model="active">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                <p class="ma-auto">Inspirasi</p>
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, route], i) in inspiration"
            :key="i"
            link
            :to="route"
          >
            <v-list-item-title class="ml-12">
              <p class="my-auto" style="font-style: italic">{{ title }}</p>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item to="/inspiration/ebook" @click="active = false" link>
          <v-list-item-title class="ml-12">
            <p class="ml-2 my-auto">E-book</p>
          </v-list-item-title>
        </v-list-item>
        <!-- </v-list-group> -->
      </v-list>

      <template v-slot:append>
        <div class="white--text d-flex justify-center">
          <p>SISTesi {{ new Date().getFullYear() }}</p>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- ################# Sidebar ################# -->

    <!-- ################# App Bar ################# -->
    <v-app-bar height="79px" flat class="white" app>
      <v-app-bar-nav-icon
        style="color: #16679a"
        v-if="$vuetify.breakpoint.smAndUp"
        @click.stop="sidebar_mini = !sidebar_mini"
      />
      <v-app-bar-nav-icon v-else @click.stop="sidebar = !sidebar" />

      <v-spacer />

      <v-menu
        open-on-hover
        bottom
        left
        offset-y
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <div v-on="on" class="logout-wraper d-flex align-center">
            <v-avatar size="35">
              <v-img v-if="g_user.photo" :src="g_user.photo" />
              <v-img
                v-else
                :src="g_user.gender == 'L' ? boyPhoto : girlPhoto"
              />
            </v-avatar>
            <span class="ml-3 mr-5 mt-1 text-left logout-wraper">
              <div
                class="subtitle-2 d-inline-block text-truncate"
                style="max-width: 120px"
              >
                <strong>{{ g_user.fullname }}</strong>
              </div>
              <div class="caption text-capitalize">{{ g_user.role }}</div>
            </span>
          </div>
        </template>

        <v-list dense class="py-0 elevation-0">
          <v-list-item-group color="primary">
            <v-list-item style="cursor: pointer" @click="logoutHandler()">
              <v-icon class="pr-2">mdi-logout</v-icon>
              {{ $t("app.logout") }}
            </v-list-item>
          </v-list-item-group>
          <div
            class="
              d-flex
              justify-center
              caption
              font-weight-bold
              py-1
              grey
              lighten-4
            "
          >
            {{ g_version }}
          </div>
        </v-list>
      </v-menu>

      <v-badge
        :content="notif"
        :value="notif"
        overlap
        size="12"
        color="green"
        class="mr-3"
      >
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-app-bar>
    <!-- ################# App Bar ################# -->

    <!-- ################# Main Route ################# -->
    <v-content>
      <router-view />
    </v-content>
    <!-- ################# Main Route ################# -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isExternal } from "@/utils/validate";

export default {
  name: "Sidebar",
  props: {
    source: String,
  },
  data() {
    this.onlyOneChild = null;
    return {
      inspiration: [
        ["Article", "/inspiration/article"],
        ["Video", "/inspiration/video"],
        ["Podcast", "/inspiration/podcast"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline", "/inspiration/article"],
        ["Read", "mdi-file-outline", "/inspiration/video"],
        ["Update", "mdi-update", "/inspiration/podcast"],
        ["Delete", "mdi-delete", "/inspiration/ebook"],
      ],
      active: true,
      sidebar: false,
      sidebar_mini: false,
      mini: true,
      notif: 6,
      logo: require("@/assets/users/avatar.png"),
      boyPhoto: require("@/assets/svg/boy.svg"),
      girlPhoto: require("@/assets/svg/girl.svg"),
    };
  },
  computed: {
    ...mapGetters([
      "g_route_async",
      "g_version",
      "g_school",
      "g_user",
      "g_roles",
    ]),
  },
  methods: {
    getIconPath(icon) {
      return require("@/assets/svg/sidebar/" + icon);
    },
    checkSidebarMini() {
      if (this.sidebar_mini) {
        this.sidebar_mini = !this.sidebar_mini;
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      return routePath;
    },
    logoutHandler() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
  },
};
</script>

<style lang="scss">
.logout-wraper {
  cursor: pointer;
}
.icon-sidebar {
  max-width: 24px;
}
.list-bg-sidebar {
  color: black;
}

.v-list-item--active {
  color: white !important;
}

.v-list-item-group {
  .list-bg-sidebar {
    &.v-list-item--active {
      background: white;
      color: black !important;
      box-shadow: 2px 3px 5px #ececec;
    }
  }
  .theme--light.v-list-item--active:before {
    opacity: 0;
  }
  .v-list-item--active:before {
    opacity: 0;
  }
}
</style>
