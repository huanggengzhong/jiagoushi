import Vue from 'vue';
import Vuex from 'vuex'; // install,mixin  $store  
Vue.use(Vuex)
export default new Vuex.Store({  // new Vue
    state:{ // data
        count:10,
        a:{
            a:1
        }
    },
    mutations:{ // methods
        addTen(state,count){
            state.count += count;
        }
    },
    getters:{ // computed
        multi(state){
            return state.count%3==0?'能整除3':'不能整除3'
        }
    },
    actions:{// async methods
        minusTen({commit},count){
           setTimeout(()=>{
            commit('addTen',count*-1)
           },2000); 
        }
    }
})