// es6 类  es5 构造函数
// 1) 了解构造函数的属性
// function Animal(name){
//     // 属性 分为两种 实例上的属性  公有属性
//     this.name = name;
//     this.arr = [1,2,3];
// }
// Animal.prototype.address = {location:'山里'}
// let a1 = new Animal('猴子');
// let a2 = new Animal('小鸡');
// console.log(a1.arr === a2.arr);
// console.log(a1.address === a2.address); 
// // 每个实例都有一个__proto__ 指向所属类的原型
// console.log(a1.__proto__ === Animal.prototype);
// console.log(a1.constructor === Animal);

// console.log(Animal.__proto__ === Function.prototype);
// console.log(a1.__proto__.__proto__ === Object.prototype);
// console.log(Object.prototype.__proto__);

// 2) 类的继承 
function Animal(name){
    // 属性 分为两种 实例上的属性  公有属性
    this.name = name;
    this.eat = '吃肉'
}
Animal.prototype.address = {location:'山里'}
function Tiger(name){
    //this.name = name;
    this.age = 10;  
    Animal.apply(this,arguments);
}
// 继承父类的公共属性 / 方法
// Tiger.prototype.__proto__ = Animal.prototype; 等价下面的方法
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype) // es7
// Object.create es5的方法
// function create(parentPrototype){
//     let Fn = function(){} 
//     Fn.prototype = parentPrototype; // 当前函数的原型 只有父类的原型
//     let fn = new Fn(); 
//     fn.constructor = Tiger; 
//     return fn // 当前实例可以拿到 animal.prototype
// }
// Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}});
Tiger.prototype = new Animal(); // 不能用 不能给父类传递参数 
Tiger.prototype.say = function(){
    console.log('说话')
}
// 2) 继承父类实例上的属性
// let tiger = new Tiger();  
console.log(tiger.constructor);
console.log(tiger.address);

// 我们写的时候 call + Object.create / call + setProtypeOf

