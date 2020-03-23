let http = require('http');
let url = require('url');
let methods = require('methods');
function application (){
    let app = (req,res)=>{
        // 获取用户请求的方法 
        let method = req.method.toLowerCase();
        // 获取用户请求的路径
        let {pathname} = url.parse(req.url);

        // 默认先取出第一个 看一看是路由还是中间件 如果是中间件
        let index = 0;
        function next(err){ // 如果有err 就找错误中间件
            if(index >=  app.routes.length){
                if(err){
                    return res.send(err); // 如果没有捕获 会将错误打印出来
                }
                return res.end(`Cannot ${method} ${pathname} `)
            };
            let curretnLayer = app.routes[index++];
            if(err){ // 有错误 并且是中间件 函数的参数长度是4 就是找到了
                if(curretnLayer.method === 'middle' && curretnLayer.callback.length===4){
                    return curretnLayer.callback(err,req,res,next)
                }else{
                    next(err); // 继续向下传递错误
                }
            }else{
                if(curretnLayer.method === 'middle'){
                    if(curretnLayer.path === '/' || curretnLayer.path== pathname || pathname.startsWith(curretnLayer.path+'/')){
                        return curretnLayer.callback(req,res,next);
                    }else{
                        next();
                    }
                }else{ 
                    if(curretnLayer.path.params){ 
                        if(method === curretnLayer.method && curretnLayer.path.test(pathname)){
                            let [,...args] = pathname.match(curretnLayer.path); 
                            req.params = curretnLayer.path.params.reduce((memo,current,index)=>(memo[current]=args[index],memo),{});
                            return curretnLayer.callback(req,res);
                        }
                    }else if((method === curretnLayer.method ||curretnLayer.method == 'all' )&&(pathname === curretnLayer.path || curretnLayer.path === '*')){
                        return curretnLayer.callback(req,res);
                    }else{
                        next();
                    }
                }
            }
            
        }
        next();
    }
    app.routes = [];

    app.use = function(path,handler){
        if(typeof handler == 'undefined'){
            handler = path;
            path = '/'
        }
        let layer = {
            method:'middle',
            path,
            callback:handler
        }
        app.routes.push(layer);
    }

    ;[...methods,'all'].forEach(method=>{ // 批量添加各种方法
        app[method] = function(path,callback){
            // path 有可能有: 有冒号就是路径参数路由 特殊处理
            if(path.includes(':')){
                let params = [];
                path = path.replace(/:([^\/]+)/g,function(){
                    params.push(arguments[1]);
                    return '([^\/]+)'
                });
                path = new RegExp(path);
                path.params = params; // 我把匹配到的结果 绑定到当前的正则上
            }
            let layer = {
                method,
                path,
                callback
            }
            app.routes.push(layer)
        }
    })
    app.listen = (...args) =>{
        let server = http.createServer(app);
        server.listen(...args);
    }



    // express内置的中间件 可以实现封装一些公共方法和属性
    app.use(function(req,res,next){
        let {pathname,query} = require('url').parse(req.url,true);
        req.path = pathname;
        req.query = query;
        res.sendFile = function(p,options={}){
            let abs = require('path').join(options.root,p);
            let fs = require('fs');
            // mime
            fs.createReadStream(abs).pipe(res);
        }
        res.send = function(value){
            if(Buffer.isBuffer(value) || typeof value == 'string'){
                res.setHeader('Content-Type','text/html;charset=utf-8');
                return res.end(value);
            }
            if(typeof value === 'object'){
                res.setHeader('Content-Type','application/json;charset=utf-8');
                res.end(JSON.stringify(value));
            }
            if(typeof value === 'number'){
                res.statusCode = value;
                res.end(require('_http_server').STATUS_CODES[value]);
            }
        }
        next();
    });
    
    return app;
}
application.static = function(dirname){
    return function(req,res,next){
        let fs = require('fs');
        let path = require('path');
        let current = path.join(dirname,req.path);
        fs.stat(current,(err,statObj)=>{ // 304 statObj.ctime / isFile isDirectory size...
            if(err){
                console.log(err);
                return next(); // 中间件无法处理 向下执行吧
            }
            if(statObj.isFile()){
                fs.createReadStream(current).pipe(res);
            }
        });
    }
}
module.exports = application;