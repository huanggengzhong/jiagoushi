let http = require('http');
let url = require('url');
let methods = require('methods');
function application (){
    let app = (req,res)=>{
        // 获取用户请求的方法 
        let method = req.method.toLowerCase();
        // 获取用户请求的路径
        let {pathname} = url.parse(req.url);
        for(let i = 0; i<app.routes.length;i++){
            let curretnLayer = app.routes[i];
            if(curretnLayer.path.params){ // 是一个路径参数
                //  curretnLayer.path => reg
                // pathname /username/1/2
                if(method === curretnLayer.method && curretnLayer.path.test(pathname)){
                    let [,...args] = pathname.match(curretnLayer.path); // 匹配出用户参数
                    // 使用参数 和路由 返回出匹配的结果
                    req.params = curretnLayer.path.params.reduce((memo,current,index)=>(memo[current]=args[index],memo),{});
                    return curretnLayer.callback(req,res);
                }
            }
            if((method === curretnLayer.method ||curretnLayer.method == 'all' )&&(pathname === curretnLayer.path || curretnLayer.path === '*')){
                return curretnLayer.callback(req,res);
            }
        }
        res.end(`Cannot ${method} ${pathname} `)
    }
    app.routes = [];
    [...methods,'all'].forEach(method=>{ // 批量添加各种方法
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
    return app;
}
module.exports = application;