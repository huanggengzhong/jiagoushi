function Promise(executor){
    // promise 有三个状态 pending  fulfilled rejected
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    let self = this;
    self.onResolveCallbacks = []; 
    self.onRejectedCallbacks = []; 
    function resolve(value){ // 变成成功态
        if(value instanceof Promise){
            return value.then(resolve,reject)
        }
        // if(value !== null && (typeof value === 'object' || typeof value =='function')){
        //     if(value.then && typeof value.then === 'function')
        //     return value.then(resolve,reject)
        // }
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'fulfilled';
            self.onResolveCallbacks.forEach(fn=>fn())
        }
    }
    function reject(reason){ // 变成是失败态
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn=>fn())
        }
    }
    try{
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
}
// 这个方法要兼容别人的promise  严谨一些  这个方法 要兼容别人的promise 
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){ // 防止返回的promise 和 then方法返回的promise 是同一个
        return reject(new TypeError('循环引用'));
    }
    if(x!== null && (typeof x === 'object' || typeof x === 'function')){ // {}
        let called;
        try{
            let then = x.then;  // 看看这个对象有没有then方法，如果有 说明x是promise   ｛then:undefined｝
            if(typeof then === 'function'){  
                then.call(x,y=>{
                    if(called) return
                    called = true;
                    // 如果返回的是一个promise这个promise，resolve的结果可能还是一个promise，递归解析直到这个y是一个常量为止
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    if(called) return // 防止调用失败 又调用成功
                    called = true;
                    reject(r);
                });
            }else{ 
                resolve(x); // {then:{}} {then:123}
            }
        }catch(e){ // 这个then方法 是通过 ObjectDefineProperty定义的
            if(called) return
            called = true; // 这个判断为了防止出错后 继续要调用成功逻辑
            reject(e);
        }
    }else{
        resolve(x); // x就是普通常量
    }
}
Promise.prototype.then = function(onfulfilled,onrejected){
    // 参数的可选
    onfulfilled = typeof onfulfilled ==='function'?onfulfilled :val=>val;
    onrejected = typeof onrejected == 'function'?onrejected :err=>{throw err}
    let self = this;
    // 每个promise必须返回一个新的状态 保证可以链式调用
    let promise2 = new Promise(function(resolve,reject){
        if(self.status === 'fulfilled'){ 
            setTimeout(()=>{
                try{
                    let x = onfulfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e);
                }
            })
        }
        if(self.status === 'rejected'){
            setTimeout(()=>{
                try{
                    let x = onrejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e);
                }
            })
        }
        if(self.status === 'pending'){
            self.onResolveCallbacks.push(function(){ 
                setTimeout(()=>{
                    try{
                        let x = onfulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
            });
            self.onRejectedCallbacks.push(function(){
                setTimeout(()=>{
                    try{
                        let x = onrejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
            })
        }
    });
    return promise2
}
// catch是then的简写
Promise.prototype.catch = function(errCallback){
    return this.then(null,errCallback)
}
// 请实现一个延迟对象
Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
// 上来就创建一个成功的promise ／ 失败的promise
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
         reject(reason);
    })
}
Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
         resolve(value);
    })
}
module.exports = Promise