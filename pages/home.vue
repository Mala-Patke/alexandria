<template>
    <div>
        <NavSideBar/>
        <div class="home_main">
        <div class="ics_area">
            <LazyHomePagePost 
                v-for="elem in elements" 
                :key="elem.review_id" 
                :review_id="elem.review_id" 
                :user_id="elem.user_id"
                :media_id="elem.media_id"
                :ratings="elem.ratings"
                :review="elem.review"
            />
        </div>
        <div></div>
    </div>

    </div>
</template>

<script setup lang="ts">
    //@ts-nocheck file
    let cookie = useCookie('userinfo');
    if(!cookie.value.id) navigateTo('/login');

    let searchParam = new URLSearchParams({ token: cookie.value?.token });
    let { elements } = await $fetch(`/api/user/${cookie.value.id}/getHomePage?${searchParam.toString()}`);
</script>

<style>
    .home_main {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
</style>