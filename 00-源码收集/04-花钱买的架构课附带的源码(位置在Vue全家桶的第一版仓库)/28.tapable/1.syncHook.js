
// let {SyncHook} =require('tapable');
class SyncHook {
    constructor(args){
        this.args = args || []
        this.tasks = [];
    }
    tap(name,cb){
        this.tasks.push(cb);
    }
    call(...args){
        args = args.slice(0,this.args.length)
        this.tasks.forEach(task=>task(...args));
    }
}
let hook = new SyncHook([]); // []限制当前传递的参数个数
hook.tap('吃饭',function(a){ // 注册钩子
    console.log('吃饭',a)
}); 
hook.tap('睡觉',function(a){
    console.log('睡觉',a)
}); 
hook.call('hello'); // events on emit 调用钩子