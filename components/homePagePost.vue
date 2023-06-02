<template>
    <div class="post_main">
        <div class="line line1">
            <span class="username">{{ userData.name }}</span>
            <span class="medianame">{{ mediaData.title }}</span>
        </div>
        <div class="line">
            <div class="reviewArea">
                <blockquote class="reviewElem">{{ review }}</blockquote>
            </div>
            <div class="posterArea">
                <img :src="`${ratings}.png`" class="rating">
                <img :src="mediaData.image" height="300" width="200"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    //@ts-nocheck file
    const props = defineProps(['review_id', 'media_id', 'user_id', 'ratings', 'review']);

    //For testing purposes
    const cookie = useCookie('userinfo');
    //End: For testing purposes

    let mediaType = {
        m: 'movie', s: 'show', b: 'book'
    }[props.media_id[0]];

    const mediaData = await $fetch(`/api/mdata/${mediaType}/${props.media_id}`);
    const userData = await $fetch(`/api/user/${props.user_id}/info?token=${cookie.value.token}`);
</script>

<style>
    .post_main {
        border: 1.5px solid white;
        border-radius: 5px;
        width: 100%;
        padding: 20px;
        margin: 20px;
    }

    .line {
        display: flex;
        justify-content: space-between;
    }

    .line1 {
        font-weight: 100;
        font-size: 1.25em;
    }

    .reviewElem {
        width: 200px;
    }

    .posterArea {
        margin-top: 10px;
    }

    .rating {
        position: absolute;
    }
</style>