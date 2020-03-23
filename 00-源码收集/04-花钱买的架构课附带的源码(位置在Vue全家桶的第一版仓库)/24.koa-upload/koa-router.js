class Router {
    constructor(){
        this.middlewares = [];
    }
    get(path,handler){
        this.middlewares.push({
            path,
            handler
        });
    }
    compose(routes,ctx,next){
        // koa 中间件原理   reduce   reduce promise function next(){}
        async function dispatch(index){
            if(index === routes.length) return next();
            let route = routes[index].handler;
            route(ctx,()=>dispatch(index+1));
        }
        dispatch(0);
    }
    routes(){
        // next函数 最后一个路由 应该调用这个next方法
        return async (ctx,next)=>{
            let path = ctx.path;
            let routes = this.middlewares.filter(route=>path === route.path);
            this.compose(routes,ctx,next)
        }
    }
}

module.exports = Router;