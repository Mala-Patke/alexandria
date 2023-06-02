<template>
    <div>
        <NavSideBar/>
        <div class="search_main">
            <div class="search_form">
                <h1>What Media Form?</h1>
                <div class="vButtonList">
                    <button @click="mediaSelected('book')">Book</button>
                    <button @click="mediaSelected('show')">Show</button>
                    <button @click="mediaSelected('movie')">Movie</button>
                </div>
                <div class="searchPageInputHolder">
                    <input class="searchPageInput" v-model="searchQuery" :placeholder="`What ${mediaType} are you looking for?`" :disabled="mediaType.length == 0"/>
                    <button @click="search()">Search!</button>
                </div>
                <div class="searchPageResultsHolder">
                    <div v-for="mediaElem in searchResults" 
                        :key="mediaElem.id"
                        :mid="mediaElem.id"
                        class="searchResultSingular"
                    >
                    <img class="searchResultImage" :src="mediaElem.image" width="50" height="75">
                        {{ mediaElem.title }} <span class="subTitle">{{ mediaElem.type === 'book' ? `by ${mediaElem.author}` : `(${mediaElem.year})` }}</span>
                    </div>

                </div>
            </div>            
        </div>
    </div>
</template>

<script setup lang="ts">
    //@ts-nocheck file
    let mediaType = ref('');
    let searchQuery;
    let searchResults = ref([]);

    function mediaSelected(type) {
        mediaType.value = type;
    }

    async function search() {
        let rawSearchData = await $fetch(`/api/mdata/${mediaType.value}/search?${new URLSearchParams({ term: searchQuery }).toString()}`);
        if(!rawSearchData.length) searchResults.value = [{title: "Sorry, we couldn't find anything"}];
        else searchResults.value = rawSearchData.slice(0, 5);
    }

</script>

<style>
    .search_main {
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

    .searchPageInputHolder {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .searchPageInput {
        width : 100%;
    }

    .searchResultSingular {
        display: flex; 
        align-items: center;
    }

    .searchResultImage {
        margin: 20px
    }
</style>