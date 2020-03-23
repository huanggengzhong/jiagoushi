let Promise = require('./promise')
let fs = require('fs');

Promise.reject(123).catch(data=>{
    console.log(data);
})

let p = new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(100)
        },1000)
    }))
})
p.then((r)=>{
    console.log(r);
})
// anguar1.0  defer 对象  Q
// let p = new Promise((resolve,reject)=>{
//     reject('123');
// });
// 1) catch的实现
// Promise.prototype.catch = function(errCallback){
//     return this.then(null,errCallback)
// }
// p.catch(err=>{
//     console.log(err);
// }).then(data=>{
//     return 100
// }).finally(()=>{ // 无论如何都执行
//     console.log('1000');
// }).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log('err',err)
// })
// 作业：实现一个finally


// Promise.all Promise.race  promisify

// let obj = {}
// Object.defineProperty(obj,'then',{
//     get(){
//         // todo
//         return 123
//     }
// })
// console.log(obj.then);