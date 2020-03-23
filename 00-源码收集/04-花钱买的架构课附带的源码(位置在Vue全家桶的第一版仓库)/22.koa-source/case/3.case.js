let Koa = require('./koa/application');

let app = new Koa();
app.use(async (ctx)=>{
    // 这两个取的都是原生req对象
    console.log(ctx.req.url);
    console.log(ctx.request.req.url);

    // 取的是自己封装的url
    console.log(ctx.request.url);
    console.log(ctx.url);

    ctx.body = 'hello'; // 返回给客户端
    console.log(ctx.response.body);
})

app.listen(3000,function(){
    console.log(`server start 3000`);
});