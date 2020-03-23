
// let {SyncBailHook} =require('tapable');
class SyncBailHook { // 带保险的钩子 可以终端执行
    constructor(args){
        this.args = args || []
        this.tasks = [];
    }
    tap(name,cb){
        this.tasks.push(cb);
    }
    call(...args){
        args = args.slice(0,this.args.length);
        let index = 0;
        let r;
        do{
            r = this.tasks[index++](...args)
        }while(r==undefined && index != this.tasks.length);
    }
}
let hook = new SyncBailHook([]); 
hook.tap('吃饭',function(a){ // 注册钩子
    console.log('吃饭',a);
    // return false
}); 
hook.tap('睡觉',function(a){
    console.log('睡觉',a)
}); 
hook.call('hello'); // events on emit 调用钩子