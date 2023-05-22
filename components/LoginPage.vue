<template>
    <div class="root">
        <div class="main">
            <h1>Welcome to Alexandria</h1>
            <p class="descriptor">The number one name in media reviews</p>
            <h2>Log in</h2>
            <input v-model="email" type="email" placeholder="email"/>
            <input v-model="password" type="password" placeholder="password"/>
            <button class="loginbutton" @click="login">Login</button>
            <h5>Don't have an account? <NuxtLink to="/signup">Sign up!</NuxtLink></h5>
            <h5 v-if="error?.length > 0">Error: {{ error }}</h5>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    let email: String;
    let password: String;
    let error = ref('');

    const updateError = (e : String) => error.value = `${e}`;

    function login() {
        console.log(email, password);
        fetch(`/api/auth/login?email=${email}&password=${password}`)
            .then(e => e.json())
            .then(res => {
                if(res.statusCode >= 400) updateError(res.message);
                console.log(res, error);
            });
    }
</script>

<style>
    .root {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: #121212;
        color: white;
    }

    .descriptor {
        margin: 0px;
        padding: 5px;
    }

    .main {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 50%;
        width: 50%;
        border: 3px solid white;
        border-radius: 25px;
    }

    input {
        border: 2px solid #545353;
        border-radius: 5px;
        width: 50%;
        padding: 4px;
        margin: 4px;
    }

    input:focus {
        outline: 2px solid black !important;
        border: 2px solid black;
        box-shadow: 0 0 10px #000000;
    }

    .loginbutton {
        margin: 15px;
    }
</style>