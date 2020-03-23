let Koa = require('koa');
let app = new Koa();
let Router = require('./koa-router');
let session = require('koa-session');
let router = new Router();
app.keys = ['zf'];
app.use(session({},app)); // ctx.session
router.get('/write',async(ctx,next)=>{
    ctx.session.a = 'hello';
})
router.get('/read',async(ctx,next)=>{
    ctx.body = ctx.session.a
})
app.use(router.routes());
app.listen(3000);

// session 有没有原生的api {} 

// nuxtjs + koa + cookie+session 登录权限

// name=zf => HHmcef73U7Tr9vZHUoDHDWHgbeg
//            HHmcef73U7Tr9vZHUoDHDWHgbeg
// name.sign
let sign = require('crypto').createHmac('sha1','jw').update('name=zf').digest('base64');
console.log(sign);

// 进程 集群