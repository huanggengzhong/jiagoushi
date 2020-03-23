import * as types from '../mutation-types';
import * as apis from '../../api';

export default { // dva
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    [types.GET_PRODUCT_LIST](state, products) {
      state.products = products;
    },
  },
  actions: {
    async [types.GET_PRODUCT_LIST]({ commit }) {
      const productList = await apis.getProductList();
      commit(types.GET_PRODUCT_LIST, productList.carts);
    },
  },
};
