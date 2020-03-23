class Animal {
    static flag(){
        return 123
    }; // es7支持静态属性 es6 只支持静态方法
    constructor(name){
        this.name = name;
        this.eat = '吃肉';
    }
    say(){ // 原型上的方法
        console.log('say'); // es6 规范里 如果单独调用原型上的方法 this是不存在的
    }
}
// 1) 类不能当做函数调用
// let animal = new Animal();
// console.log(Animal.flag());
class Tiger extends Animal{ // 实例 + 原型
    constructor(name){ // Animal.call(this,'王老虎')
        super(name);
    }
}
let tiger = new Tiger('王老虎');
console.log(tiger); // 静态方法可以被继承


// 这是架构第二期  时间 周二 周四 8-10
// 周六全天


// 腾讯课堂 给个好评
