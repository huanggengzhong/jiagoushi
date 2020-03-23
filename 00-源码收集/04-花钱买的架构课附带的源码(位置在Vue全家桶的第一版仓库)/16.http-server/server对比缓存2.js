let http = require('http');
let url = require('url'); 
let path = require('path');
let crypto = require('crypto')
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
    sendFile(req,res,statObj,absPath){
        // 增加缓存  服务端 设置缓存 有两种方式 1)强制缓存  2) 对比缓存 304
        // 在真正的开发中  2018-7－20-3

        // cache-control  expires
        // 对比缓存 协商缓存 last-modified if-modified-since  etag if-none-match

        res.setHeader('Cache-Control','no-cache');

        res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf8');
        let rs = fs.createReadStream(absPath)
        let md5 = crypto.createHash('md5');
        let arr = [];
        rs.on('data',function(chunk){
            md5.update(chunk);
            arr.push(chunk);
        });
        rs.on('end',function(){
            let server = md5.digest('base64');
            let client = req.headers['if-none-match'];
            if(server === client) {
                res.statusCode = 304;
                res.end();
                return;
            }
            res.setHeader('ETag',server);
            res.end(Buffer.concat(arr));
        });
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