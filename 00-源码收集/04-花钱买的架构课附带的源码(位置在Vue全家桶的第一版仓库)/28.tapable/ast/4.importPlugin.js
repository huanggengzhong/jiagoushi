let code =`import {button,xxx} from 'antd'`; 
// import antd from 'antd/lib/Button'  import Button

let babel = require('@babel/core');
let t = require('@babel/types'); // 判断 生成节点

// ast 替换的时候 import {Button} => import Button
// 只需要处理非默认导入，如果是默认导入我就不需要处理了 
let importPlugin = {
    visitor:{ // ast 用的时候很简单
        ImportDeclaration(path){
            let node = path.node;
            let specifiers = node.specifiers;
            // 当前长度不是1 并且不是不认导出我就要进行转化
            if(!(specifiers.length == 1 && t.isImportDefaultSpecifier(specifiers[0]))){
                specifiers = specifiers.map(specifer=>{
                    if(t.isImportDefaultSpecifier(specifer)){
                        // 当前是默认导出 import xxx from
                        return t.importDeclaration([t.importDefaultSpecifier(specifer.local)],t.stringLiteral(node.source.value));
                    }else{
                        return t.importDeclaration([t.importDefaultSpecifier(specifer.local)],t.stringLiteral(node.source.value+'/'+specifer.local.name));
                    }
                });
                path.replaceWithMultiple(specifiers);
            }
        }
    }
}
let r = babel.transform(code,{
    plugins:[
        importPlugin
    ]
});
console.log(r.code);

// 1) 先自己实现一个webpack 
//    -  入口文件， 通过入口找到所有的依赖
// 2) loader是如何编写的
// 3) 插件是如何编写的
// 4) create-react-app 的流程 （扩展）