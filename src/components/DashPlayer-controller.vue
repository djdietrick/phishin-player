<template>
    <div class="controller">
      <h1 class="heading-primary">{{show.date}}: {{show.venue}}, {{show.location}}</h1>
      <h3>{{selectedSong}}</h3>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    computed: {
        ...mapGetters({
            show: 'getShow',
            index : 'getIndex'
        }),
        selectedSong() {
            if(!this.show.tracks)
                return '';
            
            return this.show.tracks[this.index].title
        }
    }
}
</script>

<style lang="scss">
    
.controller {
    background-color:aquamarine;
}

</style>