let http = require('http');
class Koa{
    constructor(){
        this.middleware;
    }
    use(fn){
        this.middleware = fn;
    }
    handleRequest(req,res){
        this.middleware(req,res);
    }
    listen(...args){
       // 创建一个http服务
       let server = http.createServer(this.handleRequest(this));
       // 监听端口号 启动一个服务
       server.listen(...args);
    }
}
module.exports = Koa;