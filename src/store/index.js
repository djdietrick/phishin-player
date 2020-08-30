import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import {functions} from '../main.js';

// const a = axios.create({
//   baseURL: process.env.VUE_APP_SERVER_URL
// })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show: null,
    playIndex: 0,
    searchError: null
  },
  getters: {
    getShow: state => state.show,
    getIndex: state => state.playIndex,
    getSearchError: state => state.searchError
  },
  mutations: {
    setShow: (state, show) => (state.show = show),
    setIndex: (state, index) => (state.playIndex = index),
    setSearchError: (state, error) => (state.searchError = error)
  },
  actions: {
    async getRandomShow({commit}) {
      const getRandomShow = functions.httpsCallable('getRandomShow');
      const res = await getRandomShow();
      console.log(res.data);

      commit('setShow', res.data);
      commit('setIndex', 0);
    },
    async getShowOnDate({commit}, date) {
      const getShowOnDate = functions.httpsCallable('getShowOnDate');
      const res = await getShowOnDate({date});
      commit('setShow', res.data);
      commit('setIndex', 0);
    },
    selectSong({commit}, index) {
      commit('setIndex', index);
    },
    clearError({commit}) {
      commit('setSearchError', null);
    }
  },
  modules: {
  }
})
