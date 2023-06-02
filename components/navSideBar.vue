<template>
    <div class="navmain" to="/home">
        <NuxtLink class="logoholder">
            <img src="logo.png" width="150" height="150">
        </NuxtLink>
        <div class="thebigone">
            <NuxtLink class="thebigbutton" to="/review">REVIEW!</NuxtLink>
        </div>
        <div></div>
        <div class="linkholder">
            <NuxtLink class="navItem" to="/home">Home</NuxtLink>
            <NuxtLink class="navItem" to="/search">Search</NuxtLink>
            <NuxtLink class="navItem" to="/friends">Friends</NuxtLink>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style>
    .navmain {
        width: 15%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        
        border-right: 3px solid white;
        border-radius: 5px;
        position: fixed;
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

    .thebigone {
        background-color: white;
        color: black;
        border-radius: 10px;
        padding: 15px 20px;
    }

    .thebigbutton {
        color: black;
        text-decoration: none;
        font-size: 1.75em;
    }

    .navItem {
        margin: 5px;
        color: white;
        text-decoration: none;
        font-size: 1.5em;
    }
</style>