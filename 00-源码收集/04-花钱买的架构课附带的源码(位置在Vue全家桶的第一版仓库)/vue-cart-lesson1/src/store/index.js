import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistence from 'vuex-persist';
import _ from 'lodash';
// import logger from 'vuex/dist/logger';
import cart from './modules/cart';
import product from './modules/product';
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
// });
// function vuexLocal() {
//   return function (store) {
//     const local = JSON.parse(localStorage.getItem('myvuex')) || store.state;
//     store.replaceState(local);
//     store.subscribe((mutations, state) => {
//       const newLocal = _.cloneDeep(state);
//       sessionStorage.setItem('myvuex', JSON.stringify(newLocal));
//     });
//   };
// }
function logger() {
  return function (store) {
    let prevState = store.state;
    store.subscribe((mutations, state) => {
      console.log('prevState', prevState);
      console.log(mutations);
      console.log('currentState', state);
      prevState = _.cloneDeep(state);
    });
  };
}
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    cart,
    product,
  },
  strict: true,
  plugins: process.NODE_ENV === 'prudction' ? [logger()] : [],
});
// cube-ui vue全家桶 + koa-mongo 2天
// vue + ts 讲一次
// 省市级联讲一次 异步的
