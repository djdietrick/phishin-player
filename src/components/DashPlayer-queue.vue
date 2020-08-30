<template>
    <div class="queue">
        <div v-for="(song, i) in show.tracks" :key="i" class="song"
            :class="{ selected: i == index}"
            @click="selectSong(i)">
            <p>{{song.title}}</p>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    computed: {
        ...mapGetters({
            show: 'getShow',
            index : 'getIndex'
        })
    },
    methods: {
        ...mapActions(['selectSong'])
    }
}
</script>

<style lang="scss">

.queue {
    background-color: gray;
}

.song {
    padding: 0.4rem 1rem;
}

.selected {
    background-color: red;
}
    
</style>