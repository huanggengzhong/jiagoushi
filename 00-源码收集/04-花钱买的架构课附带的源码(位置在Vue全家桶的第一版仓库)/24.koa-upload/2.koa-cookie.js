let Koa = require('koa');
let app = new Koa();
let Router = require('./koa-router');
let router = new Router();
app.keys = ['jw']; // sha1 s:xxxx.sign  
router.get('/write',async(ctx,next)=>{
    ctx.cookies.set('name','zf',{ signed: true });
    ctx.body = 'write ok';
})
router.get('/read',async(ctx,next)=>{
    let name = ctx.cookies.get('name',{ signed: true});
    ctx.body = name;
})
app.use(router.routes());
app.listen(3000);