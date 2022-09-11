import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VueLoading from 'vuejs-loading-plugin'

// using default options
Vue.use(VueLoading)

// overwrite defaults
Vue.use(VueLoading, {
  dark: true, // default false
  text: 'Loading....', // default 'Loading'
  loading: true, // default false
  background: 'rgb(255,255,255)', // set custom background
  classes: ['myclass'] // array, object or string
})

VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);

Vue.use(Vuetify);


export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#27ace2",
        secondary: "#3E4295",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFA000"
      }
    }
  }
  
});
