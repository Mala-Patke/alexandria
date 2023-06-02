<script setup lang="ts">
    //@ts-nocheck file
    let cookie = useCookie('userinfo');
    if(!cookie.value.id) navigateTo('/login');
    else navigateTo('/home');
</script>