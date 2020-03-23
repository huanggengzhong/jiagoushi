import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
new Vue({
  // 渲染函数 这个函数还是比较重要的
  // 默认main文件中只支持render方法
  methods:{
    say(){
      alert(1)
    }
  },
  // template:`<h1>123213</h1>`,
  render:h=>h(App),
  // render:function(h){
  //   return <h1 
  //     on-click={()=>this.say()} 
  //     class="a"
  //     style={{color:'red'}}
  //   >点我啊</h1>
  // }
}).$mount('#app')
