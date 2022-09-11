# SISTesi CMS

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

<br />

---
## Project Structure

```
  public !static assets for production
  src
    |--- api !all request will write in this folder
        | login.js
    |--- assets !all assets like images !svg !fonts
    |--- components !global component that will used in project
    |--- locales !custom dictionary
    |--- plugins
         |- vuetify.js !custom config style for vuetify
    |--- router
         |---modules
            |- example async route
         |- index.js !project router 
    |--- store !global state (vuex)
         |- modules !action / mutation / actions
         |- getters !vuex getters
         |- index.js !initial vuex
    |--- styles !global styles
    |--- utils !all reusable function will write in here
    |--- view !application page
    |- App.vue !main application
    |- i18n.js !internationalization
    |- permission.js !vue router for handle auth in app
    |- registerServiceWorker.js !PWA handler
    |- sw.js !PWA config
  tests
    |- unit !Unit Testing example
  .browserslistrc
  .env !global env
  .env.development !env for dev only
  .env.production !env for prod only
  .eslintrc !web linter
  .gitignore !ignored files to git repo
  babel.config.js
  CHANGELOG !project documentation
  LICENSE
  package-lock.json
  package.json !dev dependency, npm package
  README.md
  vue.config.js !optional config vue-cli

```