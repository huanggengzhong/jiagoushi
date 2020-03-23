import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3333';

export const getTreeList = () =>{
    return axios.get('/getTreeList')
}