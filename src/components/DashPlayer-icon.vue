<template>
    <div class="icon">
        <canvas id="waveform"></canvas>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Wave from '@foobar404/wave';

export default {
    computed: {
        ...mapGetters({
            isPlaying: 'isPlaying'
        })
    },
    mounted() {
        let wave = new Wave();
        wave.fromElement("audio","waveform", {
            type: "flower",
            colors: [
                "#004DCC"
            ]
        });
    }
}
</script>

<style lang="scss" scoped>

.icon {
    text-align: center;

    sl-icon {
        font-size: 7rem;
        top: 50%;
        transform: translateY(-50%);
    }
}


    
</style>