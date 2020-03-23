// var 要求全部该用const let

// 1)var 声明的变量 (污染全局变量)
// var a = 1;
// console.log(window.a);


// 2) 使用var导致变量提升的问题
console.log(a); // function var
let a = 1;

// 3) var 可以被重复声明 let可以解决重复定义的问题
// let a = 1;
// let a = 2;
// let a = 3

// 4) var作用域的问题  (常见的作用域 全局作用域  函数作用域)
// {
//     let a = 1;
// }
// console.log(a);

let a = 100;
{
    console.log(a); // 暂存死区
    let a = 200;
}

for(let i = 0; i< 10;i++){
        setTimeout(function(){
            console.log(i);
        })
}
// const 常量 不会变的量 (地址不变即可)
const PI = {r:'3.14'};
PI.r = 3.15;

// 全部使用let+const