import Vue from 'vue'
import App from './App.vue'
import store from './store'
import APlayer from 'vue-aplayer'

Vue.component('aplayer', APlayer);

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
