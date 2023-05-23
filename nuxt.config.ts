import { config } from 'dotenv';
config();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: [
        '@nuxtjs/google-fonts',
        '@sidebase/nuxt-session'
    ],
    googleFonts: {
        families: {
            Inter: true
        }
    },
    runtimeConfig: {
        SALT: process.env.SALT,
    }
});