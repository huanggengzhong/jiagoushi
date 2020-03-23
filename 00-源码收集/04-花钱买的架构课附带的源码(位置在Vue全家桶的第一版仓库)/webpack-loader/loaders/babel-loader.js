// loader-utils loader的工具库
let loaderUtils = require('loader-utils');
let babel = require('@babel/core'); // 引用babel的核心模块

// loader中可以实现国际化
function loader(source){ // 当前loader的上下文
    let options = loaderUtils.getOptions(this);
    // loader有两种方式 一种同步 同步可以直接返回
    // 异步 可以传递多个参数
    let cb = this.async(); // 只有用户调用了cb函数 才能执行下一个loader
    babel.transform(source,{
        ...options,
        sourceMap:true,// 需要使用sourceMap
        filename:this.resourcePath.split('/').pop()
    },function(err,result){ // loader 现在是一个异步的loader
        console.log(err);
        console.log(Object.keys(result));
        // source-map  产生一个源码映射
        cb(err,result.code,result.map); // cb的第一个参数是错误信息
    });
}
module.exports = loader;