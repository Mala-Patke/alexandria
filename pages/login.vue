<template>
    <div class="root">
        <div class="main">
            <h1>Welcome to Alexandria</h1>
            <p class="descriptor">The number one name in media reviews</p>
            <h2>Log in</h2>
            <input v-model="email" type="email" placeholder="Email"/>
            <input v-model="password" type="password" placeholder="Password"/>
            <button class="loginbutton" @click="login">Login</button>
            <p>Don't have an account? <NuxtLink class="dmlink" to="/signup">Sign up!</NuxtLink></p>
            <p v-if="error?.length > 0" class="error">Error: {{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    let email: string;
    let password: string;
    let error = ref('');

    const updateError = (e : String) => error.value = `${e}`;

    function login() {
        console.log(email, password);
        fetch(`/api/auth/login?${new URLSearchParams({ email, password: password }).toString()}`)
            .then(e => e.json())
            .then(res => {
                if(res.statusCode >= 400) updateError(res.message);
                let cookie = useCookie('userinfo');
                cookie.value = JSON.stringify({ id: res.userId , token: res.access_token });
                navigateTo('/')
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

    .error {
        border-radius: 5px;
        background-color: rgba(255, 0, 0, 0.2);
        padding: 10px;
    }

    .dmlink {
        color: skyblue
    }
</style>