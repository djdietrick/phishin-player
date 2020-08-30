<<template>
    <div class="dashplayer">
       <Queue />
        <Icon />
        <Controller />
        <audio ref="audio"></audio>
    </div>
</template>

<script>
import Controller from './DashPlayer-controller';
import Icon from "./DashPlayer-icon";
import Queue from "./DashPlayer-queue";

const REPEAT = {
    NO_REPEAT: 'no-repeat',
    REPEAT_ONE: 'repeat-one',
    REPEAT_ALL: 'repeat-all'
}

const AudioPlayer = {
    components: {
        Controller,
        Icon,
        Queue
    },
    props: {
        queue: {
            type: Array,
            default() {
                return []
            }
        },
        showQueue: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        shuffle: {
            type: Boolean,
            default: false
        },
        repeat: {
            type: String,
            default: REPEAT.NO_REPEAT
        },
        volume: {
            type: Number,
            default: 0.8,
            validator (value) {
            return value >= 0 && value <= 1
            },
        },
        controls: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            index: 0,
            audioPlayPromise: Promise.resolve(),
            mutQueue: this.queue,
            muted: false
        }
    },
    computed: {
        audio() {
            return this.$refs.audio;
        },
        currentSong() {
            if(this.queue.length === 0)
                return null;
            return this.queue[index];
        }
    },
    methods: {
        toggle () {
            if (!this.audio.paused) {
            this.pause()
            } else {
            this.play()
            }
        },
        play () {
            // handle .play() Promise
            const audioPlayPromise = this.audio.play()
            if (audioPlayPromise) {
            return this.audioPlayPromise = new Promise((resolve, reject) => {
                // rejectPlayPromise is to force reject audioPlayPromise if it's still pending when pause() is called
                this.rejectPlayPromise = reject
                audioPlayPromise.then((res) => {
                this.rejectPlayPromise = null
                resolve(res)
                }).catch(warn)
            })
            }
        },
        pause () {
            this.audioPlayPromise
            .then(() => {
                this.audio.pause()
            })
            // Avoid force rejection throws Uncaught
            .catch(() => {
                this.audio.pause()
            })

            // audioPlayPromise is still pending
            if (this.rejectPlayPromise) {
            // force reject playPromise
            this.rejectPlayPromise()
            this.rejectPlayPromise = null
            }
        },
        setIndex(index) {
            this.index = index;
        },
        shuffleQueue() {
            return;
        },
        onEnded() {
            if(this.index === this.mutQueue.length - 1) {
                if(this.repeat === REPEAT.REPEAT_ALL)
                    this.index = 0;
                else return;
            } else if(this.repeat !== REPEAT.REPEAT_ONE) {
                this.index++;
            }
            this.play();
        },
        init() {
            this.audio.controls = false;
            this.audio.muted = this.muted;
            this.audio.volume = this.volume;
            this.audio.preload = true;

            // Still emit events so we can receive them in our outer app
            const eventsToEmit = [
                'abort',
                'canplay', 'canplaythrough',
                'durationchange',
                'emptied', 'encrypted', 'ended', 'error',
                'interruptbegin', 'interruptend',
                'loadeddata', 'loadedmetadata', 'loadstart',
                'mozaudioavailable',
                'pause', 'play', 'playing', 'progress',
                'ratechange',
                'seeked', 'seeking', 'stalled', 'suspend',
                'timeupdate',
                'volumechange',
                'waiting'
            ]
            eventsToEmit.forEach(event => {
                this.audio.addEventListener(event, e => this.$emit(event, e));
            });

            this.audio.addEventListener('play', this.onPlay);
            this.audio.addEventListener('pause', this.onPause);
            this.audio.addEventListener('abort', this.onPause);
            this.audio.addEventListener('waiting', this.onWaiting);
            this.audio.addEventListener('canplay', this.onCanplay);
            this.audio.addEventListener('progress', this.onProgress);
            this.audio.addEventListener('durationchange', this.onDurationChange);
            this.audio.addEventListener('seeking', this.onSeeking);
            this.audio.addEventListener('seeked', this.onSeeked);
            this.audio.addEventListener('timeupdate', this.onTimeUpdate);
            this.audio.addEventListener('volumechange', this.onVolumeChange);
            this.audio.addEventListener('ended', this.onEnded);
        }
    },
    watch: {
        index: function(index) {
            try {
                this.audio.src = mutQueue[index];
            } catch(e) {
                console.log(e);
            }
        }
    },
    created() {
        if(this.shuffle)
            this.shuffleQueue();
    },
    mounted() {
        this.init();
        if(this.autoplay)
            this.play();
    }
}

export default AudioPlayer;

</script>

<style lang="scss" scoped>

.dashplayer {
    height: 90vh;
    width: 90vw;
    background-color: #eee;
    
    display: grid;
    grid-template-rows: 1fr 7fr;
    grid-template-columns: 1fr 7fr;

    .queue {
        grid-row: 2 / -1;
        grid-column: 1 / -1;
    }

    .controller {
        grid-row: 1 / 2;
        grid-column: 2 / -1;
    }
}

</style>