
 let {AsyncParallelHook} =require('tapable');
// class AsyncParallelHook { // 带保险的钩子 可以终端执行
//     constructor(args){
//         this.args = args || []
//         this.tasks = [];
//     }
//     tapAsync(name,cb){
//         this.tasks.push(cb);
//     }
//     callAsync(...args){ 
//         let lastFn = args.pop();
//         args = args.slice(0,this.args.length);
//         let index = 0;
//         let done = ()=>{
//             if(++index === this.tasks.length){
//                 lastFn();
//             }
//         } // Promise.all的原理
//         this.tasks.forEach(task=>{
//             task(done);
//         })
//     }
// }
let hook = new AsyncParallelHook();  
hook.tapAsync('吃饭',function(cb){ 
   setTimeout(() => {
        console.log('1');
        cb();
   }, 1000);
}); 
hook.tapAsync('睡觉',function(cb){
    setTimeout(() => {
        console.log('2')
        cb();
    }, 1000);
}); 
hook.callAsync(function(){ // promise.all
    console.log('ok');
}); // 异步调用