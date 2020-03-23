import Vue from 'vue';
import App from './App.vue';


let info = {a:1,b:2,c:3};
export default new Vue({
    name:'parent',
    el:'#app',
    info,
    render:h=>h(App)
});