import axios from './util/request';

export const getProductList = () => axios.get('/getproductlist');
