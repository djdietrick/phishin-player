<template>
    <audio ref="audio"></audio>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    computed: {
        audio() {
            return this.$refs.audio;
        },
        ...mapGetters({
            show: 'getShow',
            index: 'getIndex'
        })
    },
    methods: {
        
    }
}
</script>