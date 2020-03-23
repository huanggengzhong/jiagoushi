import Vue from 'vue';
import App from './App.vue'
import store from  './store'
export default new Vue({
    el:'#app',
    store, // router  $route $router
    // store $store
    render:h=>h(App)
})