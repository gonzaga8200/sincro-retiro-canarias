// https://nuxt.com/docs/api/configuration/nuxt-config

const categories = ['absoluto', 'junior', 'infantil', 'alevin']
const modalities = ['duo', 'duo-mixto', 'combo', 'equipo']
const locales = ['en', 'fr', 'de', 'it', 'ca']

const competitionRoutes = categories.flatMap(c => modalities.map(m => `/${c}/${m}`))
const adminRoutes = categories.flatMap(c => modalities.map(m => `/admin/${c}/${m}`))
const localeCompetitionRoutes = locales.flatMap(l =>
  categories.flatMap(c => modalities.map(m => `/${l}/${c}/${m}`))
)
const localeHomeRoutes = locales.map(l => `/${l}`)
const localeProgramaRoutes = locales.map(l => `/${l}/programa`)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'ca', language: 'ca-ES', name: 'Català', file: 'ca.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
    detectBrowserLanguage: false,
  },
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
      routes: [
        '/',
        '/login',
        '/admin',
        '/programa',
        ...competitionRoutes,
        ...adminRoutes,
        ...localeHomeRoutes,
        ...localeCompetitionRoutes,
        ...localeProgramaRoutes,
      ],
    },
  },
})
