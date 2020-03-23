let http = require('http');
let context = require('../koa/context');
let request = require('../koa/request');
let response = require('../koa/response');


class Koa{
    constructor(){
        this.middleware;
        this.context = Object.create(context); // 防止用户直接修改context对象
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    use(fn){
        this.middleware = fn;
    }
    // 此方法用来产生ctx上下文
    createContext(req,res){
        let ctx = this.context;
        // 自己封装的
        ctx.request = this.request;
        ctx.response = this.response;
        // 原生的 为了可以在自己的request属性上拿到req就把req挂载在了自己封装的对象上
        ctx.request.req = ctx.req = req;
        ctx.response.res = ctx.res = res;
        return ctx;
    }
    handleRequest(req,res){
        let ctx = this.createContext(req,res); // 创建上下文
        res.statusCode = 404; // 预先定义一个404状态码
        this.middleware(ctx);
        if(ctx.body){
            res.end(ctx.body);
        }else{
            res.end(`Not Found`);
        }
    }
    listen(...args){
       // 创建一个http服务
       let server = http.createServer(this.handleRequest.bind(this));
       // 监听端口号 启动一个服务
       server.listen(...args);
    }
}
module.exports = Koa;