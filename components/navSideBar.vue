<template>
    <div class="navmain">
        <div class="logoholder">LOGO</div>
        <div class="thebigone">
            <NuxtLink class="thebigbutton" to="/review">REVIEW!</NuxtLink>
        </div>
        <div class="linkholder">
            <NuxtLink class="navItem" to="/home">Home</NuxtLink>
            <NuxtLink class="navItem" to="/search">Search</NuxtLink>
            <NuxtLink class="navItem" to="/friends">Friends</NuxtLink>
        </div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style>
    .navmain {
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        
    }

    .logoholder {
        margin: 30px 0px 0px 0px;
    }

    .linkholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .navItem {
        margin: 10px;
    }
</style>