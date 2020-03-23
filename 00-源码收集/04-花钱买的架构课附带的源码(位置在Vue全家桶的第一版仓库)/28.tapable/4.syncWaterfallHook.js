
// let {SyncWaterfallHook} =require('tapable'); // SyncLoopHook
class SyncWaterfallHook { // 带保险的钩子 可以终端执行
    constructor(args){
        this.args = args || []
        this.tasks = [];
    }
    tap(name,cb){
        this.tasks.push(cb);
    }
    call(...args){ // 第一个人的输出 是第二个人的输入
        args = args.slice(0,this.args.length)
        let first = this.tasks.shift();
        this.tasks.reduce((a,b)=>{
            return b(a)
        },first(...args));
    }
}
let hook = new SyncWaterfallHook(['xxx','xxxx']);  // 参数列表个数
hook.tap('吃饭',function(a,b,c){ // 注册钩子
    console.log('吃饭',a,b,c);
    return 100
}); 
hook.tap('睡觉',function(a){
    console.log('睡觉',a)
    return a+100;
}); 
hook.tap('睡觉',function(a){
    console.log('睡觉',a)
}); 
hook.call('hello','world','xxx');