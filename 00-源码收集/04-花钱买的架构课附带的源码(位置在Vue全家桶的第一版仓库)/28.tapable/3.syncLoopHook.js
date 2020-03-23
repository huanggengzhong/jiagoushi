
//  let {SyncLoopHook} =require('tapable'); // SyncLoopHook
class SyncLoopHook { // 带保险的钩子 可以终端执行
    constructor(args){
        this.args = args || []
        this.tasks = [];
    }
    tap(name,cb){
        this.tasks.push(cb);
    }
    call(...args){
        args = args.slice(0,this.args.length);
        this.tasks.forEach(task=>{
            let r;
            do{
                r = task();
            }while(r !==undefined);
        });
    }
}
let hook = new SyncLoopHook([]); 
let index = 0;
hook.tap('吃饭',function(a){ // 注册钩子
    console.log('吃饭',a);
    return index++ === 3?undefined:false
}); 
hook.tap('睡觉',function(a){
    console.log('睡觉',a)
}); 
hook.call('hello'); // events on emit 调用钩子