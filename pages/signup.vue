<template>
    <div class="root">
        <div class="main">
            <h1>Sign up for an Alexandria account!</h1>
            <p class="descriptor">Enter information below: </p>
            <input v-model="email" type="email" placeholder="Email"/>
            <input v-model="displayname" type="text" placeholder="Display Name"/>
            <input v-model="password" type="password" placeholder="Password"/>
            <input v-model="password2" type="password" placeholder="Confirm Password"/>
            <button class="loginbutton" @click="signup">Sign Up!</button>
            <p>Already have an account? <NuxtLink class="dmlink" to="/login">Log In!</NuxtLink></p>
            <h5 v-if="error?.length > 0" class="error">Error: {{ error }}</h5>
        </div>
    </div>
</template>

<script setup lang="ts">
    let email: String;
    let displayname: String;
    let password: String;
    let password2: String;
    let error = ref('');

    const updateError = (e : String) => error.value = `${e}`;

    function signup() {
        if(password !== password2) return updateError('Passwords do not match.')
        fetch(`/api/auth/signup?email=${email}&password=${password}&displayname=${displayname}`)
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

    .error {
        border-radius: 5px;
        background-color: rgba(255, 0, 0, 0.2);
        padding: 10px;
    }

    .dmlink {
        color: skyblue
    }
</style>