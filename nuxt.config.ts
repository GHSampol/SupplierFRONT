import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'    

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
  devtools: { enabled: true },
  $production:{
    devtools:{enabled:true}
  }
})
