
let {AsyncParallelHook} =require('tapable'); // 
let hook = new AsyncParallelHook();  
// tap call 同步的
// tap + callAsync 回调会立即执行
// tapAsync + callAsync
// tapPromise + promise

hook.tapPromise('吃饭',function(){ 
   return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('1')
            reject('hello'); //
        }, 1000);
   })
}); 
hook.tapPromise('睡觉',function(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('2')
            resolve();
        }, 1000);
   })
}); 
hook.promise().then(function(){
    console.log('all')
}) // 异步调用