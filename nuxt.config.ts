// https://nuxt.com/docs/api/configuration/nuxt-config

const categories = ['absoluto', 'junior', 'infantil', 'alevin']
const modalities = ['duo', 'duo-mixto', 'combo', 'equipo']
const competitionRoutes = categories.flatMap(c => modalities.map(m => `/${c}/${m}`))
const adminRoutes = categories.flatMap(c => modalities.map(m => `/admin/${c}/${m}`))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/image',
  ],
  image: {
    quality: 82,
    format: ['webp', 'png'],
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/login', '/admin', ...competitionRoutes, ...adminRoutes],
    },
  },
})
