let Koa = require('koa');
let app = new Koa();
let static = require('koa-static');
let fs = require('mz/fs');
let formidable = require('formidable');
let path = require('path');
app.use(static(__dirname));
let total = 0; // 总数量
let i = 0;
let filename;
// 断点续传 在前段给每一段 都加一个md5 戳 如果暂停了 下次再传 看文件夹里的文件 md5 能否对应上
// 每次上传 拿到上传的进度条 xhr.onprogress e.loaded   取百分比 。。。。。

async function parser(form,req){
    return new Promise((resolve,reject)=>{
        form.parse(req, async function(err, fields, files) {
            total = fields.count;
            filename = fields.filename
            await fs.rename(files.chunk.path,'temp/'+fields.chunkNum);
        });
        form.on('end',function(){
            if(++i == total){ // 28断都收好了
                console.log(filename,'file');
                resolve(filename);
            }else{ // 可能还有几段没完成
                resolve(false);
            }
        })
    })
} 
async function mergeFiles(filename){
    // 同步  
    let dirs = await  fs.readdir('./temp');
    dirs.sort((a,b)=>a-b);
    dirs = dirs.map(dir=>path.join('temp',dir));
    let ws = fs.createWriteStream(filename);
    for(let i = 0 ; i< dirs.length;i++){
        ws.write(fs.readFileSync(dirs[i]));
    }
    ws.end();
}
app.use(async (ctx,next)=>{ 
    if(ctx.path === '/upload' && ctx.method === 'POST'){
        let fd = new formidable.IncomingForm();
        fd.uploadDir = 'temp';
        let filename = await parser(fd,ctx.req);
        if(!filename){
            ctx.body = '当前数据块上传成功'
        }else{
            await mergeFiles(filename);
            ctx.body = '全部完成';
        }
    }else{
        await next(); 
    }
});
app.listen(4000);