<template>
    <p>{{ data }}</p>
</template>

<script setup lang="ts">
    //@ts-nocheck
    let stuff : string;

    let cookie = useCookie('userinfo');
    console.log(cookie.value);
    let data = await fetch(`/api/user/${cookie.value.id}?token=${cookie.value.token}`).then(res => res.json());
    
</script>