// 数组的方法 es5 forEach reduce map filter some every 
// es6 find findIndex 
// es7 includes

// reduce 收敛

// 求和
let r = [{price:100,count:1},{price:200,count:2},{price:3,count:3}].reduce((a,b)=>{
    return a + b.price*b.count;
},0);
console.log(r);


// reduce常见的功能 多个数据 最终变成了一个数据
// let  keys = ['name','age'];
// let values = ['jw',18];  // => {name:'jw',age:18}

// let obj = keys.reduce((memo,current,index)=>(memo[current] = values[index],memo)
// ,{});

// reduce  redux compose 方法 (组合多个函数)
function sum(a,b){
    return a+b;
}
function toUpper(str){
    return str.toUpperCase();
}
function add(str){
    return "***"+str+"***";
}
function compose(...fns){ // [add,toUpper,sum];
    return function(...args){
        let lastFn = fns.pop();
        return fns.reduceRight((a,b)=>{
            return b(a)
        },lastFn(...args));
    }
}
let r = compose(add,toUpper,sum)('zfpx','jw');
// let compose = (...fns) => (...args)=>{
//     let lastFn = fns.pop();
//     return fns.reduceRight((a,b)=>b(a),lastFn(...args));
// }

// 回去多想想
// toUpper是 a  sum 是我们的b   ...args是参数
// a:add  b:toUpper
// a:(...args)=>{add(toUpper(...args))}  b:sum
// (...args)=>{a(b(...args))}
// function compose(...fns){
//     return fns.reduce((a,b)=>{ // 此时返还的函数 是通过reduce方法返回的
//         return (...args)=>{ // toUpper(sum('zfpx','jw'))
//             return a(b(...args))
//         }
//     })
// }

// let compose = (...fns) => fns.reduce((a,b)=>(...args)=>a(b(...args)))
let r = compose(add,toUpper,sum)('zfpx','jw');
// console.log(r);
// console.log(add(toUpper(sum('zfpx','jw'))));

Array.prototype.reduce = function(callback,prev){
    // this = [1,2,3]
    for(let i = 0; i< this.length;i++){
       if(prev == undefined){
           // this[i] = 1  this[i+1] = 2
         prev = callback(this[i],this[i+1],i+1,this);
         i++;
       }else{
         prev = callback(prev,this[i],i,this);
       }
    }
    return prev;
};
// 平均数 求幂 
let r = [1,2,3].reduce((a,b,index,current)=>{
    return a+b;
},100)
console.log(r);

// map 映射 filter some every 
let newArr = [1,2,3].map(item=>item*2); // 循环每一项 都*2
[1,2,3].filter(item=>item!=2); // 删除为2的 返回true表示留下
[1,2,3,4].some((item)=>item==5);
[1,2,3,4,5].every((item)=>item==1); // 看看有没有不等于1的 有的话返回false
[1,2,3].find(item=>item==2) // 找到后返回找到的那一项 找不到返回undefind
// [1,2,3].indexOf(1)>-1   => [1,2,3].includes(2)  true