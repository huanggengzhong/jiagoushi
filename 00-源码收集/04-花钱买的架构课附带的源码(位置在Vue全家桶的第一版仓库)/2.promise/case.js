// let fs = require('mz/fs');
// fs.readFile('./name.txt','utf8').then(data=>{
//     console.log(data);
// })
let fs = require('fs');
// node中的所有方法 都是错误优先 第二个就是结果  bluebird
// function promisify(fn){ // 把方法xpromise化
//     return function(){ // ['name.txt','utf8']
//         return new Promise((resolve,reject)=>{
//             fn(...arguments,function(err,data){
//                 if(err) reject(err);
//                 resolve(data);
//             })
//         })
//     }
// }
// // let read = promisify(fs.readFile);
// function promisifyAll(obj){
//     for(let key in obj){  // 遍历整个对象 如果是函数的 我就把方法重写
//         if(typeof obj[key] === 'function'){
//             obj[key+'Async'] = promisify(obj[key]); // 把每个方法都promise化
//         }
//     }
// }
// promisifyAll(fs);
// fs.readFileAsync('./name.txt','utf8').then(data=>{
//     console.log(data);
// })



// function read(url){
//     return new Promise((resolve,reject)=>{
//         fs.readFile(url,'utf8',(err,data)=>{
//             if(err) return reject(err);
//             resolve(data);
//         })
//     });
// }

Promise.all = function(values){
    return new Promise((resolve,reject)=>{
        let arr = [];
        let count = 0;
        function processData(key,value){
            arr[key] = value; // 将结果和数据 对应起来
            if(++count === values.length){
                resolve(arr); // 成功后 把结果抛出来
            }   
        }
        for(let i = 0 ; i< values.length;i++){
            let current = values[i];
            let then = current.then;
            if(then && typeof then === 'function'){ // 是一个promise
                then.call(current,y=>{ // 是promise的就让promise执行
                    processData(i ,y);
                },reject); // 如果其中一个promose出错 就停止执行
            }else{
                processData(i ,current); // 常量直接返回即可
            }
        };
    })
}
Promise.race = function(values){
    return new Promise((resolve,reject)=>{
        for(let i = 0 ; i< values.length;i++){
            let current = values[i];
            let then = current.then;
            if(then && typeof then === 'function'){ // 是一个promise
                then.call(current,y=>{ // 是promise的就让promise执行
                    resolve(y);
                },reject); // 如果其中一个promose出错 就停止执行
            }else{
                resolve(current);
            }
        };
    })
}
Promise.race([read('./age.txt'),read('./name.txt'),1,2,3]).then(data=>{
    console.log(data);
}).catch(err=>{ 
    console.log(err);
})