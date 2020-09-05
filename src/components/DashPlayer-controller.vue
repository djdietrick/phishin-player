<template>
    <div class="controller">
      <h1 class="heading-primary">{{show.date}}: {{show.venue}}, {{show.location}}</h1>
      <h2>{{selectedSong}}</h2>
      <div class="controller__controls">
        <sl-button @click="skipBack" circle>
            <sl-icon name="skip-backward"></sl-icon>
        </sl-button>
        <sl-button @click="togglePlaying" circle>
            <sl-icon v-if="isPlaying" name="pause"></sl-icon>
            <sl-icon v-else name="play"></sl-icon>
        </sl-button>
        <sl-button @click="skipForward" circle>
            <sl-icon name="skip-forward"></sl-icon>
        </sl-button>
      </div>
      <sl-progress-bar ref="progress" :percentage="time / duration * 100" @click="onClick"></sl-progress-bar>
    </div>
</template>  

<script>
import {mapGetters, mapActions} from 'vuex';
import {bus} from '../main';
export default {
    data() {
        return {
            time: 0.0,
            duration: 0.0
        }
    },
    computed: {
        ...mapGetters({
            show: 'getShow',
            index : 'getIndex',
            isPlaying: 'isPlaying'
        }),
        selectedSong() {
            if(!this.show.tracks)
                return '';
            
            return this.show.tracks[this.index].title
        }
    },
    methods: {
        ...mapActions(['togglePlaying', 'selectSong']),
        onClick(e) {
            let progress = this.$refs.progress;
            let rect = progress.getBoundingClientRect();

            let left = rect.x;
            let width = rect.width;
            let clickX = e.x;

            let percentage = (clickX - left) / width;
            bus.$emit('timeSet', percentage);
        },
        skipBack() {
            if(this.time > 5.0 || this.index === 0) {
                bus.$emit('timeSet', 0.0);
            } else {
                this.selectSong(this.index - 1);
            }
        },
        skipForward() {
            if(this.index === this.show.tracks.length - 1) {
                this.selectSong(0);
            } else {
                this.selectSong(this.index + 1);
            }
        }
    },
    mounted() {
        bus.$on('timeUpdate', (time) => this.time = time);
        bus.$on('durationUpdate', (duration) => this.duration = duration);
    }
}
</script>

<style lang="scss">
@import "../styles/main.scss";
.controller {
    &__controls {
        display: flex;
        justify-content: center;
        margin: 1rem 5rem;

        sl-icon {
            font-size: 2rem;
        }

        sl-button {
            &::part(base) {
                background-color: $color-background;
                padding: 0.5rem;
            }

            &:not(:last-child) {
                margin-right: 1rem;
            }
        }
    }
}

       
sl-progress-bar {
    margin: 1rem 5rem;
    cursor: pointer;

    &::part(base) {
        background-color: $color-background;
    }

    &::part(indicator) {
        background-color: $color-primary;
    }
}

</style>