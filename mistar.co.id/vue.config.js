module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/sistesi-cms/" : "/",
  assetsDir: "static",
  pluginOptions: {
    i18n: {
      locale: "id",
      fallbackLocale: "id",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  pwa: {
    name: "Sistesi CMS",
    themeColor: "#27ACE2",
    msTileColor: "#FFFFFF",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js"
    }
  }
};
