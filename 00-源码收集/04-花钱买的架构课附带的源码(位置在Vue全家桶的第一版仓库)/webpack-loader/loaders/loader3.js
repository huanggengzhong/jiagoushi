function loader(source){
    // 要用到this
    console.log(3)
    return source;
}
loader.pitch = function(){
    console.log('loader3-pitch');
}
module.exports = loader;


// loader的特点 尽可能职责单一，每一个loader只干一件事
// 多个loader可以组合 pitch中断loader的执行 像中间件函数 
// loader 不能有状态 只能是一个纯函数

