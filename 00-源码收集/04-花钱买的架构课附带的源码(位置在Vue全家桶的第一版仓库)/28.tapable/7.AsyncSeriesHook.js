
// let {AsyncSeriesHook} =require('tapable'); 
class  AsyncSeriesHook {
    constructor(){
        this.tasks = []
    }
    tapPromise(name,cb){
        this.tasks.push(cb);
    }
    promise(){
        let firstFn = this.tasks.shift();
        // 需要等待第一个promise执行后 执行第二个绑定函数 依次调用
        return this.tasks.reduce((a,b)=>a.then(b),firstFn())
    }
}
let hook = new AsyncSeriesHook(); 

hook.tapPromise('吃饭',function(){ 
   return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('1')
            resolve('hello'); 
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
hook.tapPromise('睡觉',function(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('3')
            resolve();
        }, 1000);
   })
}); 
hook.promise().then(function(){
    console.log('all')
}) // 异步调用


// 作业:

// 使用 AsyncSeriesWaterFallHook + tapAsync + callAsync
// AsyncSeriesWaterFallHook + tapPromise + promise