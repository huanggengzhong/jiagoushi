let EventEmitter = require('./events');
let util= require('util');
// util.promisify(fs.readFile)

// on 绑定事件  emit 发射事件
// __proto__
// Object.create
// Object.setPrototypeof
function Girl(){
}
util.inherits(Girl,EventEmitter);
let girl = new Girl;
let cry = (thing) =>{
   console.log(thing);
};
girl.on('newListener',(type)=>{
    girl.emit(type)
    //console.log(type); // 每次调用on方法时会执行，先触发这个方法，才把回调放入
});
girl.on('女生失恋',cry); // addListener 订阅
girl.on('女生失恋',cry); 
// girl.off('女生失恋',cry); // node 10+ 取消订阅

// 第二个人在另一个模块中 又监听两次
girl.on('女生失恋',cry); // addListener 订阅
girl.on('女生失恋',cry);

let drink = ()=>{
    console.log('喝酒')
}
// girl.once('女生失恋',drink); // 触发一次后 会把自己删除掉
// girl.off('女生失恋',drink)
// girl.emit('女生失恋');
// girl.emit('女生失恋');
// 接受数据 
// on off emit newListener

// 第一次绑定时 流