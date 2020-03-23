// Object.defineProperty es5 vue

// 通过Object.defineProperty定义属性 可以增加拦截器
//let obj = {name:'zfjg'};
// let obj = {};
// let other = '';
// // 不可枚举 函数的原型 Array.protoype
// Object.defineProperty(obj,'name',{
//     enumerable:true, 
//     configurable:true, // 能不能删除这个属性
//     //writable:true, // 是否可以重写
//     get(){ // 读取方法
//         console.log('----');
//         return other;
//     },
//     set(val){ // 设置方法
//         other = val
//     }
// });
// // delete obj.name;
// obj.name = 456;
// console.log(obj.name);

// let obj = {
//     other:'123',
//     get name(){
//         return this.other;
//     },
//     set name(val){
//         this.other = val;
//     }
// } 
// obj.name = 456;
// console.log(obj.name);

// 对象的setter和getter

// vue的数据劫持 （把所有的属性都改成 get和set方法）

function update(){ // 模拟的更新方法
    console.log('更新视图');
}
let data = {
    name:'zfpx',
    age:18,
    address:{
        location:'回龙观'
    }
}
function observer(obj){ // Object.defineProperty只能用在 对象上 （数组也不识别）
    if(typeof obj !== 'object') return obj;
    for(let key in obj){
        defineReactive(obj,key,obj[key]);
    }
}
function defineReactive(obj,key,value){
    observer(value);
    Object.defineProperty(obj,key,{
        get(){
            return value;
        },
        set(val){
            if(val !== value){
                observer(val);
                update();
                value =val;
            }
        }
    })
}
observer(data);
data.address = [1,2,3];
let methods = ['push','slice','pop','sort','reverse','unshift'];
methods.forEach(method=>{
    // 面相切片开发 装饰器
    let oldMethod = Array.prototype[method];
    Array.prototype[method] = function(){
        update();
        oldMethod.call(this,...arguments);
    }
})
data.address.push(4);
data.address.push(4);
