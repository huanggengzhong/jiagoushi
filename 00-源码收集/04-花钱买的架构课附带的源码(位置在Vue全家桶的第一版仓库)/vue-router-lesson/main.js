import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
Vue.use(ElementUI);// install Vue.component Vue.prototype.xxx

router.beforeEach((to,from,next)=>{
    // 拿出所有匹配的去判断
    if(to.matched.some(n=>n.meta.needLogin)){
        if(localStorage.getItem('login')){
            next();
        }else{
            next('/');
        }
    }else{
        next();
    }
});
router.afterEach(()=>{
    console.log('结束')
});


export default new Vue({
    el:'#app',
    render:h=>h(App),
    router // this.$route 放的都是属性 this.$router 都是方法
});
