<template>
    <div class="icon">
        <sl-icon name="soundwave"></sl-icon>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters({
            isPlaying: 'isPlaying'
        })
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