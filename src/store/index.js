import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

console.log(process.env.VUE_APP_SERVER_URL);
const a = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show: null,
    searchError: null
  },
  getters: {
    getShow: state => state.show,
    getSearchError: state => state.searchError
  },
  mutations: {
    setShow: (state, show) => (state.show = show),
    setSearchError: (state, error) => (state.searchError = error)
  },
  actions: {
    async getRandomShow({commit}) {
      const res = await a.get('/random');
      commit('setShow', res.data);
    },
    async getShowOnDate({commit}, date) {
      a.get(`/show/${date}`)
        .then(res => {
          commit('setShow', res.data);
        })
        .catch(err => {
          commit('setSearchError', `No show on ${date}`);
        });
    },
    clearError({commit}) {
      commit('setSearchError', null);
    }
  },
  modules: {
  }
})
