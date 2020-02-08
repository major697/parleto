module.exports = {
   runtimeCompiler: true,
   css: {
      loaderOptions: {
         sass: {
            prependData: `@import "@/assets/scss/basic/_variables.scss";`,
         },
      },
   },
};
