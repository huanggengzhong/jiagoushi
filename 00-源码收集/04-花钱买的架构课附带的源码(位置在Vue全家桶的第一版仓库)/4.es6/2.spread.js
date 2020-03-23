// ... 展开运算符

// 把两个数组合并成一个数组
// 把两个对象合并成一个对象

// let arr1 = [1,2,3];
// let arr2 = [4,5,6];
// let arr3 = [...arr1,...arr2];
// console.log(arr3);

// 深拷贝 （拷贝后无关）  浅拷贝 （拷贝后还有关）
// ... 只能拷贝一层
// let school = {name:'zfpx'};
// let my = {age:{count:18},name:'jw'};
// // 把原来的my放在新对象里，用一个新的age 把原来的age也拷贝一份
// let newMy = {...my,age:{...my.age}}
// let all = {...school,...newMy}
// my.age.count = 100;
// console.log(all);

// 我们可以把对象先转化成字符串  在把字符串转换成对象
// Object.assign = ...
// let school = {name:'zfpx',fn:function(){},aa:undefined,b:null,arr:[1,2,3,[4,5]]};
// let my = {age:{count:18},name:'jw'};
// let all = JSON.parse(JSON.stringify({...school,...my}));
// my.age.count = 100;
// console.log(all);

// 自己实现深拷贝的方法 （递归拷贝 要一层层的拷贝 ）
// 掌握类型判断 typeof  instanceof  Object.prototype.toString.call constructor
// weakMap 弱链接 map的区别  回收机制的
function deepClone(obj,hash=new WeakMap()){ // 判断obj是null还是undefined
    if(obj == null) return obj;
    // 不是对象就不用拷贝了
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    if(typeof obj !== 'object') return obj;
    // 要不是数组 要不是对象
    if(hash.has(obj)) return hash.get(obj); // 如果weakmap中有对象就直接返回
    let cloneObj = new obj.constructor;
    // 如果是对象把他放到weakMap中，如果在拷贝这个对象这个对象就存在了 直接返回这个对象即可
    hash.set(obj,cloneObj);
    for(let key in obj){ // 实现深拷贝
        if(obj.hasOwnProperty(key)){
            // 如果赋予的值是对象 我就把这个对象放到weakmap中
            cloneObj[key] = deepClone(obj[key],hash);
        }
    }
    return cloneObj
}
// map  weakMap  set 集合 map 映射表
let obj = {age:{name:123}}
obj.xxx = obj;
let n = deepClone(obj); 
console.log(n);


// let obj = {name:'zfjg',age:18};
// let newObj = {}
// Object.assign(newObj,obj,{c:18});
// console.log(newObj)
// 前拷贝