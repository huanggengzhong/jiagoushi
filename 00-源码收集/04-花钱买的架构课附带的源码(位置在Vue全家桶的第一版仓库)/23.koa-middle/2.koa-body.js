let Koa = require('koa');
let app = new Koa();
let static = require('koa-static');
// let bodyParser = require('koa-bodyparser'); // 不支持文件格式
function bodyParser(){
    return async (ctx,next) =>{
        await new Promise((resolve,reject)=>{
            let arr = [];
            ctx.req.on('data',function(chunk){
                arr.push(chunk);
            });
            ctx.req.on('end',function(){
                console.log(Buffer.concat(arr).toString())
                if(ctx.get('content-type') === 'application/x-www-form-urlencoded'){
                    ctx.request.body = require('querystring').parse(Buffer.concat(arr).toString());
                }else if(ctx.get('content-type') === 'application/json'){
                    ctx.request.body = JSON.parse(Buffer.concat(arr).toString());
                }else{
                    ctx.request.body = {}
                }
                resolve();
            });
        });
        await next();
    }
}
app.use(bodyParser());
app.use(static(__dirname)); 
app.use(async (ctx,next)=>{ 
    if(ctx.path === '/upload' && ctx.method === 'POST'){
        ctx.body = ctx.request.body;
    }else{
        await next(); 
    }
});
app.listen(3000);