// require('expose-loader?$!jquery')
// import 'expose-loader?$!jquery'
// import './a'
// console.log(window.$,'------');
// console.log($,'----------')
 //很多的库 依赖于全局的jquery 
import $ from 'jquery'

// 1)直接使用cdn的方式
// 2)providePlugin
// 3)暴露的方式

// let xhr = new XMLHttpRequest();
// xhr.open('get','/api/user',true);
// xhr.onload = function(){
//     console.log(xhr.response,'----');
// }

// xhr.send();

//http-proxy
//http-proxy-middleware

console.lo('xxxxxx')

import './index.css';
let btn = document.createElement('button');
btn.innerHTML = '点我啊'
btn.addEventListener('click', function(){
    // 点击按钮 去调用一个js文件 jsonp 动态的去加载js文件
    // webpackPrefetch webpackPreload
    // 首页加载完毕后就开始下载异步模块
    import(/*webpackPrefetch:true*/'./other').then(({default:o})=>{
        btn.innerHTML = o('a','b');
    });
});
// let p = document.createElement('p');
// p.innerHTML = 'hello'
// window.app.appendChild(p)
 window.app.appendChild(btn);
// btn.innerHTML = other(1,2);




// websocket实现了热更新
if(module.hot){
    // 重新干你想干的事
    // module.hot.accept(); // 如果有任何一个文件编号会重新执行整个文件
    module.hot.accept(['./other'],function(){
       let sum =  require('./other').default
       btn.innerHTML = sum(1,2)
    });
}
// lazyload vue react 路由懒加载的 import() 

