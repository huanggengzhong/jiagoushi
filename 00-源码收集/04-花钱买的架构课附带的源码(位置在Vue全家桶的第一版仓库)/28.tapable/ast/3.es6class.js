let babel = require('@babel/core');
let t = require('@babel/types');
let code = `class Person {
    constructor(type){
        this.type = type;
    }
    getType(a,b){
        return this.type;
    }
}`
// function Person(type){
//     this.type = type;
// }
// Person.prototype.getType = function(){
//     return this.type;
// }
let classPlugin = {
    visitor:{
        ClassDeclaration(path){
            let node = path.node; // 当前类的节点
            let body = node.body.body; // 类中的函数
            let id = node.id; // 当前类的名字  identifier
            let methods = body.map(method=>{
                // 是构造函数的话
                if(method.kind === 'constructor'){
                    return t.functionDeclaration(id,method.params,method.body)
                }else{ // 分析 转化前的树 和 转化后的树 
                    // Person.prototype
                    let left = t.memberExpression(id,t.identifier('prototype'));
                    // Person.prototype.getType
                    left = t.memberExpression(left,method.key);
                    let right = t.functionExpression(null,method.params,method.body);
                    return t.assignmentExpression('=',left,right);
                }
            });
            path.replaceWithMultiple(methods);
        }
    }
}
let r = babel.transform(code,{
    plugins:[
        classPlugin
    ]
});
console.log(r.code);

// tree-shaking 把没用的代码 摇晃掉
// import {Button} from 'antd'; // import-plugin  按需加载
// import Button from 'antd/lib/Button'
// import _,{join} from 'lodash';
// import _ from 'lodash'
// import join from 'lodash/join'
// 实现 babel的import插件的转化

// 2 4 咱们讲vue  3 5 6 讲react 
// 主react  辅vue 


// 本周六 讲 webpack手写 loader 和 plugin 怎么实现
