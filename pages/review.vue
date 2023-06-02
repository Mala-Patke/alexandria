<template>
    <div style="height:50%">
        <NavSideBar/>
        <div class="review_main">
            <div class="review_form">
            <div class="init" v-if="initVisible">
                <h1>What Media Form?</h1>
                <div class="vButtonList">
                    <button @click="!searchVisible ? mediaSelected('book') : null">Book</button>
                    <button @click="!searchVisible ? mediaSelected('show') : null">Show</button>
                    <button @click="!searchVisible ? mediaSelected('movie') : null">Movie</button>
                </div>
            </div>
            <div class="searchArea" v-if="searchVisible">
                <h1>What {{ mediaType }} do you want to review?</h1>
                <input class="input" v-model="searchInput" :placeholder="`Search for a ${mediaType}`">
                <div class="searchButtonContainer">
                    <button class="searchbutton" @click="search()">Search!</button>
                </div>
                <div v-if="searchResultsVisible" class="searchResults">
                    <div v-for="mediaElem in searchData" 
                        :key="mediaElem.id"
                        :mid="mediaElem.id"
                        @click="elementSelected(mediaElem)"
                        class="searchResultSingular">
                        <img class="searchResultImage" :src="mediaElem.image" width="50" height="75">
                        {{ mediaElem.title }} <span class="subTitle">{{ mediaElem.type === 'book' ? ` by ${mediaElem.author}` : `(${mediaElem.year})` }}</span>
                    </div>
                </div>
            </div>
            <div v-if="ratingVisible">
                <h2>What'd you think of {{ selectedMedia.title }} {{selectedMedia.type === 'book' ? `by ${selectedMedia.author}` : `(${selectedMedia.year})`}}?</h2>
                <div class="vButtonList">
                    <button class="rateButtonBackground" @click="handleRate('W')">
                        <img src="w.png">
                    </button>
                    <button class="rateButtonBackground" @click="handleRate('M')">
                        <img src="m.png">
                    </button>
                    <button class="rateButtonBackground" @click="handleRate('L')">
                        <img src="l.png">
                    </button>
                </div>
            </div>
            <div v-if="reviewVisible">
                <textarea v-model="reviewText" :placeholder="`Write your review of ${selectedMedia.title} here!`" rows="5" cols="50"></textarea><br/>
                <button @click="submitReview()">Submit review!</button>
            </div>
        </div>
        <div></div>
    </div>    

    </div>
</template>

<script setup lang="ts">
    //@ts-nocheck file
    let initVisible = ref(true);
    let searchVisible = ref(false);
    let searchResultsVisible = ref(false);
    let ratingVisible = ref(false);
    let reviewVisible = ref(false);
    let searchData = ref([]);

    let mediaType;
    let selectedMedia;
    let rating;

    let searchInput; //Modeled to search
    let reviewText; //Modeled to reviewArea

    function mediaSelected(e : string) {
        mediaType = e;
        initVisible.value = false;
        searchVisible.value = true;
    }

    async function search() {
        searchResultsVisible.value = true;
        let rawSearchData = await $fetch(`/api/mdata/${mediaType}/search?${new URLSearchParams({ term: searchInput }).toString()}`);
        if(!rawSearchData.length) searchData.value = [{title: "Sorry, we couldn't find anything"}];
        else searchData.value = rawSearchData.slice(0, 5);
    }

    function elementSelected(selectedMItem) {
        searchVisible.value = false;
        searchResultsVisible.value = false;
        ratingVisible.value = true;
        selectedMedia = selectedMItem;
    }

    function handleRate(givenRanking) {
        reviewVisible.value = true;
        rating = givenRanking;
    }

    async function submitReview() {
        let cookie = useCookie('userinfo');
        let res = await $fetch(`/api/actions/review?token=${cookie.value.token}`, {
            method: 'POST',
            body: {
                media_id: selectedMedia.id,
                rating, 
                review: reviewText
            }
        });
        if(res.statusCode < 400) navigateTo('/');
        else alert(res.message);
    }
</script>

<style>
    .review_main {
        margin-left: 15%;
        width: 85%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    
    .review_form {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
    }

    h1 {
        text-align: center;    
    }

    .vButtonList {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .searchArea {
        margin-top: 50px;
        margin-bottom: 5px;
        width: 50vh;
    }

    .searchButtonContainer {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .rateButtonBackground {
        background-color: #121212
    }

    .input {
        width: 100%;
    }

    .subTitle {
        font-size: 0.8em;
    }
</style>