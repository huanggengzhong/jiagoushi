let Koa = require('koa');

let app = new Koa(); // app就是这个类的实例 

// use 中间件
// async 函数执行后返回的是一个promise
// http.createServer((req,res)=>{})
app.use(async (ctx)=>{ //ctx.req  ctx.res(原生的)   ctx.request ctx.response（自己封装的）
    //ctx.res.end('hello'); // 尽量不要使用ctx.req/res 要使用他封装好的

    ctx.body = 'hello';
})

// listen 监听端口的
app.listen(3000,function(){
    console.log(`server start 3000`);
})