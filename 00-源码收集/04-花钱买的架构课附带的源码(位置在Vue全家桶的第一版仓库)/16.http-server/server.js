let http = require('http');
let url = require('url'); 
let path = require('path');

let chalk = require('chalk'); // 粉笔 画各种颜色的
let mime = require('mime');  // 解析类型的
let ejs = require('ejs'); // 用数据和模板 组成一个页面
let fs = require('mz/fs'); // promise

let template = fs.readFileSync(path.resolve(__dirname,'template.html'),'utf8');

class Server {
    constructor(config){
        this.host = config.host;
        this.dir = config.dir;
        this.port = config.port;
        this.template = template;
    }
    async handleRequest(req,res){
        //  1) 判断是目录还是文件 如果是文件 直接将内容展示给用户 
        try{
            let {pathname} = url.parse(req.url); // req.url  /xxx?a=1
            let absPath = path.join(this.dir,decodeURIComponent(pathname));
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                // 先读取当前目录下的所有的列表
                let dirs = await fs.readdir(absPath);
                // 我们需要拿到当前url  和 目录的每一项拼接
                let str = ejs.render(this.template,{arrs: dirs.map(dir=>({
                    href:path.join(pathname,dir),
                    content:dir
                }))});
                res.setHeader('Content-Type','text/html;charset=utf8');
                res.end(str);
            }else{
                this.sendFile(req,res,statObj,absPath);
            }
            // 如果是目录 列出目录列表
        }catch(e){
            console.log(e);
            this.sendError(req,res,statObj,absPath);
        }
    }
    sendError(req,res,statObj,absPath){
        res.statusCode = 404;
        res.end('Not Found')
    }
    cache(req,res,statObj,absPath){
        // 服务器要写给客户端 加3个头

        // 周六 koa  

        // 304  gzip  206  多语言 防盗链  头 cookie-session

        // 周六 koa原理  koa中间件 文件上传

        // 在下周 2 express  4express中间件  周六webpack
        
        // vue 的章节


        let lastModified = statObj.ctime.toUTCString()
        let modifiedSince = req.headers['if-modified-since'];
        let etag = statObj.size+'';
        let noneMatch = req.headers['if-none-match'];
        res.setHeader('Cache-Control','max-age=5');
        res.setHeader('Last-Modified',lastModified);
        res.setHeader('Etag',etag);

        if(lastModified !== modifiedSince){
            return false;
        }
        if(noneMatch !== etag){
            return false;
        }
        return true
    }
    sendFile(req,res,statObj,absPath){
        // 增加缓存  服务端 设置缓存 有两种方式 1)强制缓存  2) 对比缓存 304

        if(this.cache(req,res,statObj,absPath)){
            res.statusCode = 304;
            return res.end();
        }

        res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf8')
        fs.createReadStream(absPath).pipe(res);
    }   
    start(){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port,this.host,()=>{
            console.log(chalk.yellow(`Starting up http-server, serving ${this.dir} \r\nAvailable on\r\n`));
            console.log(chalk.green(` http://${this.host}:${this.port}`));
        })
    }
}

module.exports = Server;