let Koa = require('koa');

let Router = require('./koa-router');
let convert = require('koa-convert');
// let betterBody = require('koa-better-body')
let router = new Router();
let app = new Koa();

Buffer.prototype.split = function(sep){
    let arr = [];
    let offset = 0;
    let len = Buffer.from(sep).length;
    let current;
    while(-1 !== (current = this.indexOf(sep,offset))){
        arr.push(this.slice(offset,current));
        offset = current + len;
    }
    arr.push(this.slice(offset));
    return arr;
}
function betterBody({uploadDir}){
    return async(ctx,next)=>{
        await new Promise((resolve,reject)=>{
            // 把结果放到 ctx.request.fields
            let arr = [];
            ctx.req.on('data',function(data){
                arr.push(data);
            })
            ctx.req.on('end',function(){
                if(ctx.get('content-type').includes('multipart/form-data')){
                    let r = Buffer.concat(arr);
                    let boundary = '--'+ctx.get('content-type').split('=')[1];
                    let lines = r.split(boundary).slice(1,-1);
                    let fields = {};
                    lines.forEach(line=>{ // formdata
                        let [head1,body] = line.split('\r\n\r\n');
                        body = body.slice(0,-2); // 取出内容区域有效的内容
                        head = head1.toString(); // 标题转化成字符串
                        if(head.includes('filename')){
                            // 处理文件 总共的内容 减去 头部的长度 - 4就是剩下的请求体
                           let filecontent = line.slice(head.length + 4,-2);
                           require('fs').writeFileSync(require('path').join(uploadDir,Math.random()+''),filecontent);
                        }else{
                            fields[head.match(/name="(\w+)"/)[1]] = body.toString();
                        }
                    });
                    ctx.request.fields = fields;
                }
                resolve();
            })
        });
        await next();
    }
}
app.use(betterBody({
    uploadDir:'temp'
}))
router.get('/upload',async (ctx,next)=>{
    ctx.body = ctx.request.fields
})
app.use(router.routes());
app.listen(3000);
