function EventEmitter() {
    this._events = {}
}
// {'女生失恋':[cry,drink]}
EventEmitter.prototype.on = function(eventName,callback){
    // 判断这个事件是否已经存在了，如果不存在创建一个数组保存
    // 存在就放到数组中
    if(eventName !== 'newListener'){
        this._events['newListener']?this._events['newListener'].forEach(fn=>fn(eventName)):void 0
    }
    if(!this._events){ // 给调用者增了个属性
        this._events = {}
    }
    if(this._events[eventName]){
        this._events[eventName].push(callback)
    }else{
        this._events[eventName] = [callback]
    }
}
EventEmitter.prototype.once = function(eventName,callback){
    function one(){
        callback(...arguments); // 面向切片
        this.off(eventName,one);
    }
    one.l = callback // {女生失恋:[one]}
    this.on(eventName,one); // 绑定的one ，有可能删除的时候 会拿drink来删除 那就无法找到，找不到就删不掉
}
EventEmitter.prototype.off = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(fn=>{
            return fn != callback && fn.l !== callback
        });
    }
}

EventEmitter.prototype.emit = function(eventName){
    if(this._events[eventName]){
        this._events[eventName].forEach(fn => {
            fn.call(this,...arguments);
        });
    }
}

module.exports = EventEmitter