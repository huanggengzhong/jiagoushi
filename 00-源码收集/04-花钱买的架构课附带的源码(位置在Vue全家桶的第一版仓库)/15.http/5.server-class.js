let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('mz/fs');  // 0.1+0.2!=0.3 双精度  
let mime = require('mime'); // 第三方模块
// express + koa
// 下周2 ajax + koa原理 500行
// koa中间件 + cookie + session
// express   ----------------

// mongo  redis -------------

// webpack webpack 应用 优化  第三周 

// vue --------------- vue-component vue-router  vuex  手写组件  
// datePicker日期  树组件  菜单组件 权限校验   （递归）elementui - iview  table如何扩展了 render方法 jsx语法 （在vue 写react）
// pwa nuxtjs

// element-admin


// 2 - 3
class Server{
    async handleRequest(req,res){ // 这里的this是server的实例
        try{
            let {pathname} = url.parse(req.url,true);
            let currentPath = path.join(__dirname,pathname);
            let statObj = await fs.stat(currentPath);
            if(statObj.isDirectory()){
                currentPath = path.join(currentPath,'index.html');
                await fs.access(currentPath); // 如果路径不存在 则直接报错
                this.sendFile(req,res,currentPath);
            }else{
                this.sendFile(req,res,currentPath);
            }
        }catch(e){
            this.emitError(e,res,req);
        }
    }
    async sendFile(req,res,currentPath){
        res.setHeader('Content-Type',mime.getType(currentPath)+';charset=utf8');
        let content = await fs.readFile(currentPath);
        res.end(content);
    }
    emitError(err,res,req){
        console.log(err);
        res.statusCode = 404;
        res.end('not found');
    }
    start(){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}
let server = new Server();
server.start(3000,()=>{
    console.log(`server start 3000 + my`)
});


// http://localhost:3000/client/
// http://localhost:3000/client/index.html?  
// http://localhost:3000/client/1.js  