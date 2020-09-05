<template>
    <div class="queue">
        <div v-for="(song, i) in show.tracks" :key="i" class="song"
            :class="{ selected: i === index}"
            @click="selectSong(i)">
            
            <p class="song__title">{{song.title}}</p>
            <div v-if="i === index">
                <sl-animation name="heart-beat" easing="ease-in-out" duration="2000">
                    <sl-icon class="playing__icon" name="music-note"></sl-icon>
                </sl-animation>
            </div>
            <p class="song__duration">{{formatTime(parseInt(song.duration))}}</p>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    computed: {
        ...mapGetters({
            show: 'getShow',
            index : 'getIndex',
            isPlaying: 'isPlaying'
        })
    },
    methods: {
        ...mapActions(['selectSong']),
        formatTime(s) {
            var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;

            return mins + ':' + (secs.toString().length === 1 ? '0' + secs : secs);
        }
    }
}
</script>

<style lang="scss">
@import "../styles/main.scss";
.queue {
    border-top: solid 3px rgba(0,0,0, 0.2);
    overflow-y: auto;
}

.song {
    padding: 0.4rem 1rem;
    margin: 0 10rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    position: relative;

    @media only screen and (max-width: $bp-mobile) {
       margin: 0 2rem;
    }

    &:hover {
        background-color: rgba($color-background, 0.5);

    }

    .playing__icon {
        font-size: 2rem;
        margin-left: 2rem;
    }

    &__title {
        margin-left: 1rem;
    }

    &__duration {
        position: absolute;
        right: 3rem;
        align-self: flex-end;
        opacity: 0.7;
    }

    &:first-child {
        margin-top: 1.5rem;
    }
}

.selected {
    background-color: $color-background;
}
    
</style>