// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    // The private keys which are only available within server-side
    // SMTP
    SMTP_HOST: 'localhost',
    SMTP_PORT: (process.env.NUXT_SMTP_PORT && parseInt(process.env.NUXT_SMTP_PORT)) || 1025,
    SMTP_IGNORE_TLS: process.env.NUXT_SMTP_IGNORE_TLS !== 'false', // default = true
    SMTP_SECURE: process.env.NUXT_SMTP_SECURE === 'true',
    SMTP_USERNAME: '',
    SMTP_PASSWORD: '',
    SMTP_MAX_CONNECTIONS:
      (process.env.NUXT_SMTP_MAX_CONNECTIONS && parseInt(process.env.NUXT_SMTP_MAX_CONNECTIONS)) ||
      5,
    SMTP_MAX_MESSAGES:
      (process.env.NUXT_SMTP_MAX_MESSAGES && parseInt(process.env.NUXT_SMTP_MAX_MESSAGES)) || 100,
    // DOMAIN
    CLIENT_URI: 'http://localhost:3000',

    // Keys within public, will be also exposed to the client-side
    public: {},
  },
})