let Koa = require('./koa/application');
let fs = require('fs');
let app = new Koa();

// 洋葱模型  async + await Promise => async+await
app.use(async (ctx,next)=>{
    ctx.body = {name:'zf'}
});


app.on('error',function(err){
    console.log(err,'-xxxx----');
})
// express 中间件 都是基于回调 （错误处理中间件）
// async + await + PROMISE
// 每一个next函数前面 都要增加一个await 保证上一个中间件可以等待下一个中间件执行后在执行
// app.use(async (ctx,next)=>{
//     ctx.body = 'hello';
//     await next(); // return后面不能再放置其他代码了 ,next方法不能被多次调用
// });
// 1 hello  2.world  3.等一秒出来 world

// app.use(async (ctx,next)=>{
//     await new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     })
//     ctx.body = 'world'; 
// })

app.listen(3000,function(){
    console.log(`server start 3000`);
});