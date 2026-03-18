import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
      //  "https://suppliers-sap-api-ceevdgezcycwgne8.francecentral-01.azurewebsites.net",

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      apiToken: process.env.API_TOKEN
     
    },
  },
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
