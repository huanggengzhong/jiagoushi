import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter); // Vue.component() ; router-link  router-view


import routes from './routes';
export default new VueRouter({ // hash history
    mode:'hash',
    routes
})