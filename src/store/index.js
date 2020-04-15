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
    show: null
  },
  getters: {
    getShow: state => state.show
  },
  mutations: {
    setShow: (state, show) => (state.show = show)
  },
  actions: {
    async getRandomShow({commit}) {
      const res = await a.get('/random');
      console.log(res.data);
      commit('setShow', res.data);
    }
  },
  modules: {
  }
})
