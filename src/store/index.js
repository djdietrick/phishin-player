import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import {functions} from '../main.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show: null,
    playIndex: 0,
    searchError: null,
    isPlaying: false,
    playStats: {
      duration: 0.0,
      time: 0.0
    }
  },
  getters: {
    getShow: state => state.show,
    getIndex: state => state.playIndex,
    getSearchError: state => state.searchError,
    isPlaying: state => state.isPlaying,
    getPlayStats: state => state.playStats,
    getDuration: state => state.playStats.duration,
    getTime: state => state.playStats.time
  },
  mutations: {
    setShow: (state, show) => (state.show = show),
    setIndex: (state, index) => (state.playIndex = index),
    setSearchError: (state, error) => (state.searchError = error),
    togglePlaying: (state) => (state.isPlaying = !state.isPlaying),
    setIsPlaying: (state, p) => (state.isPlaying = p),
    setDuration: (state, d) => (state.playStats.duration = d),
    setTime: (state, t) => (state.playStats.time = t)
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
    },
    togglePlaying({commit}) {
      commit('togglePlaying');
    },
    setIsPlaying({commit}, p) {
      commit('setIsPlaying', p);
    },
    setDuration({commit}, d) {
      commit('setDuration', d);
    },
    setTime({commit}, t) {
      commit('setTime', t);
    }
  }
})
