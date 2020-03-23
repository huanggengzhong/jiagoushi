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
        let {pathname} = url.parse(req.url); // req.url  /xxx?a=1
        let absPath = path.join(this.dir,decodeURIComponent(pathname));
        try{
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
            // console.log(e);
            this.sendError(req,res,absPath);
        }
    }
    sendError(req,res,absPath){
        res.statusCode = 404;
        res.end('Not Found')
    }
    sendFile(req,res,statObj,absPath){
        // 对比缓存 比较一下 内容是否变化    服务器先给一个最后的文件修改时间
        // 这种方式并不是非常靠谱 可能时间变了 但是内容没有更改
        let client = req.headers['if-modified-since']; // 取值全部小写
        let server = statObj.ctime.toUTCString()
        if(client === server ){ // 服务端发给客户的文件 没有更新 ，可以使用缓存
            res.statusCode = 304;
            res.end();
            return;
        }
        res.setHeader('Last-Modified',server);
        res.setHeader('Cache-Control','no-cache');

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