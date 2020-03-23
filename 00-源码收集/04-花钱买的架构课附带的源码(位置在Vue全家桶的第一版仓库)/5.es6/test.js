"use strict";
function _inheritsLoose(subClass, superClass) { 
    // 继承公共属性
    subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; // 改造 构造函数的指向
    subClass.__proto__ = superClass; // 继承静态属性 、 方法
 }
 // vue Object.defineProperties
var Animal = function () {
  Animal.flag = function flag() {
    return 123;
  };
  function Animal(name) {
    this.name = name;
    this.eat = '吃肉';
  }

  var _proto = Animal.prototype;

  _proto.say = function say() {
    console.log('say'); 
  };

  return Animal;
}(); 
var Tiger = function (_Animal) {
    // 子类  父类
  _inheritsLoose(Tiger, _Animal);
  function Tiger(name) {
    // 继承父类的实例上的属性
    return _Animal.call(this, name) || this;
  }

  return Tiger;
}(Animal);
var tiger = new Tiger('王老虎');
console.log(Tiger.flag());