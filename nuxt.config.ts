import { config } from 'dotenv';
config();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: [
        '@nuxtjs/google-fonts'
    ],
    googleFonts: {
        families: {
            Inter: true
        }
    },
    runtimeConfig: {
        SALT: process.env.SALT,
        TMDB_API_KEY: process.env.TMDB_API_KEY
    }
});