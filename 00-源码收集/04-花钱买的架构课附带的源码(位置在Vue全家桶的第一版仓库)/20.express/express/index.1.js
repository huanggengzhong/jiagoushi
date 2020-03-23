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
            if((method === curretnLayer.method ||curretnLayer.method == 'all' )&&(pathname === curretnLayer.path || curretnLayer.path === '*')){
                return curretnLayer.callback(req,res);
            }
        }
        res.end(`Cannot ${method} ${pathname} `)
    }
    app.routes = [];
    [...methods,'all'].forEach(method=>{ // 批量添加各种方法
        app[method] = function(path,callback){
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