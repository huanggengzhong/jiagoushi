let fs = require('mz/fs');

// 1.callback  多个请求并发 不好管理 链式调用 导致回调嵌套过多
// 2.promise 优点 可以优雅的处理异步 处理错误， 基于回调的 ，还是会有嵌套问题
// 3.generator + co  dva 让代码像同步 不能支持try catch
// 4.async + await 异步问题 而且支持tryCatch

// 事件环 ＋ promise
async function read(){
    let age = await fs.readFile(r,'utf8');
    let e =  await [age];
    return e;
}
// async 函数执行后返回的是一个promise
// 如果被try + catch 那么这个promise返回的就是真
read().then(data=>{
    console.log(data);
}).catch(e=>{
    console.log(e);
});
// function _asyncToGenerator(fn) {
//     return function() {
//         var self = this,
//         args = arguments;
//         return new Promise(function(resolve, reject) {
//             var gen = fn.apply(self, args);
//             function _next(value) {
//                 // it
//                 asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
//             }
//             function _throw(err) {
//                 asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
//             }
//             _next(undefined);
//         });
//     };
// }
// function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
//     try {
//         // var info = it.next(undefine)
//         var info = gen[key](arg);
//         var value = info.value;
//     } catch(error) {
//         reject(error);
//         return;
//     }
//     if (info.done) {
//         resolve(value);
//     } else {
//         Promise.resolve(value).then(_next, _throw);
//     }
// }