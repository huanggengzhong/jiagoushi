// Object.defineProperty 不支持数组的更新 push slice
// 希望数组变化就能更新试图
function update(){
    console.log('更新视图')
}
let arr =[1,2,3];
// proxy可以监控到数组的变化 和 对象的变化
// 数组变化 会先改变数组的内容 还会改变数组的长度
let proxy = new Proxy(arr,{
    set(target,key,value){
        // 不要手动操作原数组，因为数组变化时 可能调用的是push方法 pop 这个时候key 就会出现问题
        if(key === 'length') {return true};
        update();
        return Reflect.set(target,key,value);
    },
    get(target,key){
       return Reflect.get(target,key);
    }
});
proxy.push(1);
console.log(proxy[0]);
// console.log(proxy[0]);