<template>
    <div class="home_main">
        <NavSideBar/>
        <div class="ics_area3">
            <p>thinger</p>
        </div>
        <div class="infobar">
            <p>Thonger</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    //@ts-ignore
    let cookie = useCookie('userinfo');
    console.log('cookie value', cookie.value, );
    if(!cookie.value?.id) navigateTo('/login');
    let searchParam = new URLSearchParams({ token: cookie.value?.token });
    let data = await $fetch(`/api/user/${cookie.value?.id}/info?${searchParam.toString()}`);
</script>

<style>
    .home_main {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>