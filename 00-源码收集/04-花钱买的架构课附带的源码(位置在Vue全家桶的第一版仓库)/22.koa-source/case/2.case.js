let Koa = require('../koa/application');

let app = new Koa();
// use方法就是注册函数的，当请求到来时会执行此函数
app.use(async (req,res)=>{
    res.end('xxxx');
})

// listen 监听端口的
app.listen(3000,function(){
    console.log(`server start 3000`);
});