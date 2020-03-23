// koa中路由的用法

let Koa = require('koa');
let Router = require('koa-router');
// let router = new Router({
//     prefix:'/user' // 虚拟出一个路径
// });
let router = new Router();
let router1 = new Router();
let router2 = new Router();
let app = new Koa();

// koa-router
router1.get('/add',async (ctx,next)=>{
    ctx.body = 'upload'
});
router1.get('/remove',async (ctx,next)=>{
    ctx.body = '/'
});

router2.get('/student',async (ctx,next)=>{
    ctx.body = '/student'
})
router2.get('/teacher',async (ctx,next)=>{
    ctx.body = '/teacher'
});
// 挂载路由
// 把两个子路由挂载父路由上 父路由 挂载在app上
router.use('/user',router1.routes());
router.use('/school',router2.routes());
app.
    use(router.routes()).
    use(router.allowedMethods()); // 当前我允许哪些方法 
app.listen(3000);

// koa中 二级路由


// 文件上传的原理 (细活)
// mongo  redis
// webpack 应用和优化
// 插件的写法 loader的写法

// vue vue全家桶 vuex vue-router mvvm  vue-ssr nuxt.js pwa serviceWorker
