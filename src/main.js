import Vue from 'vue'
import App from './App.vue'
import store from './store'
import APlayer from 'vue-aplayer'
import firebase from 'firebase/app';
import 'firebase/functions';

Vue.component('aplayer', APlayer);

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyDbhc3wdxJ_2BsAJvy3xxcmvRVIxWmYtX4",
  authDomain: "dash-website-1b9cb.firebaseapp.com",
  databaseURL: "https://dash-website-1b9cb.firebaseio.com",
  projectId: "dash-website-1b9cb",
  storageBucket: "dash-website-1b9cb.appspot.com",
  messagingSenderId: "959681181393",
  appId: "1:959681181393:web:6b6e7502580f47f450f7f0"
});

export const functions = firebase.functions();

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
