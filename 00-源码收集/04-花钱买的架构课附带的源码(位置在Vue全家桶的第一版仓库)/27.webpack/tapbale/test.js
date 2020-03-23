let {SyncHook} = require('tapable');
let sh = new SyncHook(['xxx']); // 标示当前钩子的参数
sh.tap('开始编译',function(a,b){
    console.log('开始编译',a,b)
})
sh.tap('结束编译',function(a,b){
    console.log('结束编译',a,b)
});
sh.call('hello','xxx');


// 模拟用这个库 写上一个功能