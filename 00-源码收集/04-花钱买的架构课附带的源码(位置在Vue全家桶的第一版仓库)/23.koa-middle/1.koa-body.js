let Koa = require('koa');
let app = new Koa();
let fs = require('mz/fs');
let mime =require('mime');
let static = require('koa-static');
let bodyParser = require('koa-bodyparser');
// koa-router   express 内置 express.static 静态服务中间件

function static1(dir){
    return async (ctx,next)=>{
        try{
            let requestUrl = ctx.path;
            let path = require('path');
            let absPath = path.join(dir,requestUrl);
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                absPath = path.join(absPath,'index.html');
            }
            ctx.set('Content-Type',mime.getType(absPath)+';charset=utf8');
            ctx.body = fs.createReadStream(absPath)
        }catch(e){
            // 如果有错误说明此中间件无法处理
            await next();
        }
    }
}
// function bodyParser(ctx){ // express body-parser req.request.body
//     return new Promise((resolve,reject)=>{
//         let arr = [];
//         ctx.req.on('data',function(chunk){
//             arr.push(chunk);
//         });
//         ctx.req.on('end',function(){
//            let qs = require('querystring').parse(Buffer.concat(arr).toString());
//            resolve(qs)
//         })
//     })
// }
function bodyParser1(){
    return async (ctx,next) =>{
        await new Promise((resolve,reject)=>{
            let arr = [];
            ctx.req.on('data',function(chunk){
                arr.push(chunk);
            });
            ctx.req.on('end',function(){
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
app.use(static(__dirname)); // koa中和express 中间件的写法是一样的
app.use(async (ctx,next)=>{ // 只要koa 中有异步代码 那他就是一个promise
    if(ctx.path === '/upload' && ctx.method === 'POST'){
        // 获取请求体中的数据
        ctx.body = ctx.request.body;
    }else{
        await next(); // next 前面必须加await 
    }
});
app.listen(3000);