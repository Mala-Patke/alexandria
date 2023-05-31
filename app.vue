<template>
    <NuxtPage/>
</template>

<script lang="ts" setup>
    useHead({
        link: [
            {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
        //  {rel: 'prefetch', href: 'https://fonts.gstatic.com', crossorigin: ""},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap'}
        ]
    });
</script>

<style>
html, body, #__nuxt {
    height: 100%!important;
    width: 100%!important;
    margin: 0;

    font-family: 'Inter', sans-serif;

    background: #121212;
    color: white;

}
</style>