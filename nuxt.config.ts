import { config } from 'dotenv';
config();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    }
});