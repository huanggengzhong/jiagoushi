let code = `let fn = (a,b) => {return a+b}` // let fn = function(a,b){return a+b}
// @babel/core 调用 presets中的预设进行转化
let babel = require('@babel/core');
let t = require('@babel/types'); // 这个模块的作用 1） 判断这个node是不是这个node，生成对应的表达式

// 使用自己的插件来实现箭头函数的转化 (babel插件的写法 webpack可能会使用到babel插件)
let arrowFunction = { // 访问者模式
    visitor:{ // 当访问到某个路径的时候进行匹配
        ArrowFunctionExpression(path){
            let node = path.node; // 取到对应的对象 通过路径获取
            let params = node.params; // 获取当前函数的参数
            let body = node.body; // 函数函数体
            if(!t.isBlockStatement(body)){ // 如果当前有代码块了，就不处理了
                // 否则声明一个代码块 返回以前的箭头函数的结果
                body = t.blockStatement([t.returnStatement(body)])
            }
            let functionExpression = t.functionExpression(null,params,body);
            // 用新的内容 替换掉老的内容
            path.replaceWith(functionExpression);
        }
    }
}
let r = babel.transform(code,{ // escodegen 忽略掉
    plugins:[
        arrowFunction
        // '@babel/plugin-transform-arrow-functions'
    ]
});
console.log(r.code);

// es6类 转化成es5的类