// vue的特点 如果是对象会使用Object.defineProperty
// 会把数组的方法重写

function render() {
    console.log('模拟视图渲染')
}

let obj = [1,2,3];

let methods = ['pop','shift','unshift','sort','reverse','splice','push'];
// 先获取到原来的原型上的方法
let arrayProto = Array.prototype;
// 创建一个自己的原型 并且重写methods这些方法
let proto = Object.create(arrayProto);

methods.forEach(method=>{
    proto[method] = function () { // AOP
        arrayProto[method].call(this,...arguments);
        render();
    }
})

function observer(obj) { // 把所有的属性定义成set/get的方式
    if(Array.isArray(obj)){
        obj.__proto__ = proto;
        return;
    }
    if(typeof obj == 'object'){
        for(let key in obj){
            defineReactive(obj,key,obj[key]);
        }
    }
}
function defineReactive(data,key,value) {
    observer(value);
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            observer(newValue);
            if(newValue !== value){
                render();
                value = newValue;
            }
        }
    })
}
observer(obj);
//  vue 1) 如果给对象新增属性 是不会被监控的 $set
// 如果想给对象增加一个不存在的属性 obj.location = {...obj.location,a:1}
function $set(data,key,value) {
    if(Array.isArray(data)){
        return data.splice(key,1,value); // 当前用户调用了splice方法
    }
    defineReactive(data,key,value);
}
$set(obj,0,100); // 不支持数组的长度变化 也不支持数组的内容发生变化 必须通过上面的方法来触发更新 或者替换成一个新的数组
// $set(obj,'a',1);
// obj.a = 100;
// console.log(obj.a)

