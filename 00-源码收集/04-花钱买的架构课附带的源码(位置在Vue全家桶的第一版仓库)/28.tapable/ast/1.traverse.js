let code = `function ast(){}`
let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen = require('escodegen');
let ast = esprima.parseScript(code);

estraverse.traverse(ast,{ // 只有带type的属性
    enter(node){
        if(node.type === 'Identifier'){
            node.name = 'hello';
        }
        console.log('enter:'+node.type)
    },
    leave(node){
        console.log('leave:'+node.type)
    }
});
let r = escodegen.generate(ast);
console.log(r);// function hello(){}
