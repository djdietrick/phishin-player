<template>
  <div id="app">
    <div class="header">
      <div class="tools">
        <div class="form__group">
            <label for="title" class="form__label">Date</label>
            <input type="text" id='title' class='form__input' placeholder="YYYY-MM-DD"
                :class="{'form__input--error': error && searchDate.length !== 0}"
                v-model='searchDate'>
        </div>
        <div v-if="searchDate.length === 0" class="btn" @click="getRandomShow">Get Random Show</div>
        <div v-else class="btn" @click="getShowOnDate(searchDate)">Search for Show</div>

      </div>
    </div> 
    <AudioPlayer
      :queue="show.tracks"/>

    <!-- <aplayer
      preload="auto"
      :music="show.tracks[0]"
      :list="show.tracks"
      theme="#143cece7"
    /> -->
  </div>
</template>

<script>
import AudioPlayer from './components/DashPlayer';
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      searchDate: ''
    }
  },
  components: {
    AudioPlayer
  },
  computed: {
    ...mapGetters({
      show: 'getShow',
      error: 'getSearchError'
    })
  },
  methods: {
    ...mapActions(['getRandomShow', 'getShowOnDate', 'clearError'])
  },
  watch: {
    show: function(s) {
      s.tracks.forEach((track) => {
        track['pic'] = "./assets/phish.jpeg";
      })
    }
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
  //margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  position: relative;
  margin-bottom: 1rem; 
}

.tools {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;

  @media only screen and (max-width: $bp-mobile) {
       margin-top: 2rem;
       position: relative;

       .btn {
         height: min-content;
         align-self: flex-end;
       }
    }
}

.form {    
    &__group {
        margin-left: 1rem;
        margin-right: 1rem;
    }

    &__input {
        font-size: 1.5rem;
        color: inherit;
        padding: 1rem 1rem;
        border-radius: 4px;
        background-color: rgba($color-area, 1);
        border: none;
        border-bottom: 2px solid $color-primary;
        //width: 90%;
        display: inline;
        transition: all .3s;
        color: $color-primary;
        margin-left: 1rem;

        &:focus {
            outline: none;
            border-bottom: 3px solid $color-primary;
        }

        &--error {
            border-bottom: 3px solid red;
        }
    }


    &__label {
        font-size: 1.7rem;
        font-weight: 300;
        //margin-left: 2rem;
        //margin-top: .7rem;
        display: inline;
        color: $color-primary;     
    }
}
</style>
