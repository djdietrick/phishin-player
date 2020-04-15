<template>
  <div id="app">
    <div class="header">
      <h1 class="heading-primary">{{show.date}}: {{show.venue}}, {{show.location}}</h1>
      <div class="tools">
        <div class="btn" @click="getRandomShow">Get Random Show</div>
      </div>
    </div> 
    <aplayer
      :music="show.tracks[0]"
      :list="show.tracks"
      theme="#143cece7"
    />
  </div>
</template>

<script>
import APlayer from 'vue-aplayer';
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'App',
  components: {
    APlayer
  },
  computed: {
    ...mapGetters({
      show: 'getShow'
    })
  },
  methods: {
    ...mapActions(['getRandomShow'])
  },
  async created() {
    await this.getRandomShow();
  }
}
</script>

<style lang="scss">
@import "./styles/main.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.header {
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-items: start;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.tools {
  position: absolute;
  right: 1%;

}

</style>
