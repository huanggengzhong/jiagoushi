#! /usr/bin/env node
async function async1(){
    console.log('async1 start');
    await async2(); // 在浏览器 不同的版本 把promise进行转化后的结果不太一样
    // 可能转化成两个then  转换成一个then
    console.log('xxxx');
}
async function async2(){
    console.log('async2');
}
// script start
// async1 start
// async2'
// promise1
// script end
// promise2
// setTimeout
console.log('script start');
setTimeout(() => {
    console.log('setTimeout')
}, 0);
async1();
new Promise((resolve)=>{
    console.log('promise1');
    resolve();
}).then(()=>{
    console.log('promise2');
})
console.log('script end')

// https://segmentfault.com/a/1190000015057278

.sync v-model  