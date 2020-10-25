<template>
    <audio ref="audio" id="audio"></audio>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {bus} from '../main';
export default {
    data() {
        return {
            audio: null,
            duration: 0.0,
            time: 0.0,
            nextSongAudio: null
        }
    },
    computed: {
        // audio() {
        //     return this.$refs.audio;
        // },
        ...mapGetters({
            show: 'getShow',
            index: 'getIndex',
            isPlaying: 'isPlaying'
        })
    },
    methods: {
        ...mapActions(['setIsPlaying', 'setTime', 'setDuration', 'selectSong']),
        initAudio() {
            // const mediaEvents = [
            //     'abort',
            //     'canplay', 'canplaythrough',
            //     'durationchange',
            //     'emptied', 'encrypted', 'ended', 'error',
            //     'interruptbegin', 'interruptend',
            //     'loadeddata', 'loadedmetadata', 'loadstart',
            //     'mozaudioavailable',
            //     'pause', 'play', 'playing', 'progress',
            //     'ratechange',
            //     'seeked', 'seeking', 'stalled', 'suspend',
            //     'timeupdate',
            //     'volumechange',
            //     'waiting',
            // ]
            // mediaEvents.forEach(event => {
            //     this.audio.addEventListener(event, e => this.$emit(event, e))
            // })

            this.audio = this.$refs.audio;

            this.addEventListeners();
        },
        addEventListeners() {
            this.audio.addEventListener('play', this.onAudioPlay)
            this.audio.addEventListener('pause', this.onAudioPause)
            // this.audio.addEventListener('abort', this.onAudioPause)
            // this.audio.addEventListener('waiting', this.onAudioWaiting)
            // this.audio.addEventListener('canplay', this.onAudioCanplay)
            //this.audio.addEventListener('progress', this.onAudioProgress)
            this.audio.addEventListener('durationchange', this.onAudioDurationChange)
            // this.audio.addEventListener('seeking', this.onAudioSeeking)
            // this.audio.addEventListener('seeked', this.onAudioSeeked)
            this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate)
            // this.audio.addEventListener('volumechange', this.onAudioVolumeChange)
            this.audio.addEventListener('ended', this.onAudioEnded)
        },
        onAudioDurationChange(e) {
            bus.$emit('durationUpdate', this.audio.duration);
            this.duration = this.audio.duration;
        },
        onAudioTimeUpdate(e) {
            bus.$emit('timeUpdate', this.audio.currentTime);
            this.time = this.audio.currentTime;
        }, 
        onAudioPause(e) {
            this.setIsPlaying(false)
        },
        onAudioPlay() {
            this.setIsPlaying(true)
        },
        onAudioEnded() {
            this.selectSong(this.getNextSongIndex());
        },
        getNextSongIndex() {
            if(this.index === this.show.tracks.length - 1) return 0;
            return this.index + 1;
        }
    },
    watch: {
        index: function(i) {
            if(this.nextSongAudio && this.nextSongAudio.index === i)
            {
                this.audio = this.nextSongAudio.audio;
                this.addEventListeners();
            }
            else
                this.audio.src = this.show.tracks[i].src
            this.nextSongAudio = null;
            this.audio.play();
        },
        show: function(s) {
            if(this.index === 0) {
                this.audio.src = this.show.tracks[this.index].src;
                this.audio.play();
            }
        },
        isPlaying: function(p) {
            if(p) this.audio.play();
            else this.audio.pause();
        },
        time: function(t) {
            if(this.duration - this.time < 3) {
                this.nextSongAudio = {
                    index: this.getNextSongIndex(),
                    audio: document.createElement('audio')
                }
                this.nextSongAudio.audio.src = this.show.tracks[this.nextSongAudio.index].src
            }
        }
    },
    mounted() {
        this.initAudio();
        if(this.show.tracks) {
            this.audio.src = this.show.tracks[0].src
            //this.audio.play();
        }

        bus.$on('timeSet', (percentage) => {
            this.audio.currentTime = percentage * this.audio.duration;
        })
    }
}
</script>