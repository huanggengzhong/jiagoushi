let {AsyncSeriesWaterfallHook} =require('tapable'); 
let hook = new AsyncSeriesWaterfallHook(['name']);
// 异步 + 串行 + 上一个的输出 是下一个人的输入
hook.tapPromise('吃饭',function(){ 
    return new Promise((resolve,reject)=>{
         setTimeout(() => {
             console.log('1')
             resolve('hello'); 
         }, 1000);
    })
 }); 
 hook.tapPromise('吃饭',function(a){ 
    console.log(a);
    return new Promise((resolve,reject)=>{
         setTimeout(() => {
             console.log('2')
             resolve('hello'); 
         }, 1000);
    });
 }); 
 hook.promise().then(r=>{
     console.log(r);
 });
 // AST

 // 虚拟dom  用一个对象表示dom结构

 // <h1>xxx</h1> => {type:"h1",children:'xxx'}

 // function a(){} => {functionExpression:{identifier:b,}}

 // ast => 正常的代码 function b(){}

 // let a = () =>a+b let a =function(){return a+b}

 // 1) 把代码转换成ast语法树 esprima  code => ast
 // 2) 遍历每一个树的节点 深度优先  estraverse  traverse  ast
 // 3) 更改树 
 // 4) 重新生成代码 escodegen ast=>code
