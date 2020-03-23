// set / map 是两种存储结构
// set 集合 不能重复的东西,放了 就白放了
let s = new Set([1,2,3,4,1,2,3,4]);
console.log(typeof s); // 基础类型 string number boolean undefined object symbol
s.add('5');
s.delete('5'); // 添加和删除  并且没顺序
// promise symbol.iterator
// let arr = [...s];
// console.log(arr);
let s01 = [1,2,3,1,2,6];
let s02 = [3,4,5,1,2];
// 集合 并集  交集  差集
function union(){
    let s1 =  new Set(s01);
    let s2 = new Set(s02);
    console.log([...new Set([...s1,...s2])])
}
union();
function intersection(){
    // 返回true表示留下
    return [...new Set(s01)].filter(function(item){
        return new Set(s02).has(item);
    })
}
console.log(intersection());
function diff(){
    // 返回true表示留下
    return [...new Set(s01)].filter(function(item){
        return !new Set(s02).has(item);
    });
}
console.log(diff());


// map 是有key的,不能放重复的 

let m = new WeakMap(); // WeakMap 的key 必须是对象类型
// m.set('name','zfjg');
// m.set('name','123');
let obj = {name:1}
m.set(obj,'123');
// m.set(obj,'456'); // 这个obj的引用的空间被set所引用
//obj = null; // 把obj清空 这个空间还是在的
console.log(m);
// v8引擎的垃圾回收
