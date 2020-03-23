// 装饰器可以修饰类 类的属性 类的原型上的方法
// 修饰的时候 就是把这个类 属性... 传递给修饰的函数
// @connect  @withRoute 
@flag('哺乳类')
class Animal {
    @readonly(123)
    PI = 3.14;
    name = 'xxx'; // 实例上的属性  并不是原型上的属性
    @before
    say(a,b,c){
        console.log('说话',a,b,c,this.a)
    }
    a(){return 1}
}
// 1) 类的静态属性
 function flag(value){
    // consructor 当前类
    return function(consructor){
        consructor.type=value
    }
}
console.log(Animal.type)
// 2) 类的属性 （实例上的属性）

function readonly(target,property,descriptor){
    descriptor.writable = false;
    // console.log(target == Animal.prototype); // 类的原型
}

let animal = new Animal();
// animal.PI = 3.15

// target = Animal.prototype 类的原型
// property 装饰的属性
// descriptor 属性的描述器
function before(target,property,descriptor){
    let oldSay = descriptor.value;
    descriptor.value = function(){
        console.log('before');
        oldSay.call(target,...arguments);
    }
}
animal.say(1,2,3);