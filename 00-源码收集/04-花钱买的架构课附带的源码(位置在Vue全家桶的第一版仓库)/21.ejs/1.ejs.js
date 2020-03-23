let ejs = require('ejs');

let fs = require('fs');
let path = require('path');
let template = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');


// new Function + with
function render(templateStr,obj){ // 以data作为上下文 来取对象中的数据
    // with
    let head = 'with(data){\r\nlet str = `'
    // 先替换变量
    let content = templateStr.replace(/<%=([\s\S]*?)%>/g,function(){
        return '${' + arguments[1] + '}';
    });
    // 在替换js语法
    content = content.replace(/<%([\s\S]*?)%>/g,function(){
        return '`\r\n' + arguments[1] + '\r\nstr+=`';
    });
    let tail = '`\r\n return str \r\n}';
    // 把字符串变成函数执行
    let fn = new Function('data',head + content+tail);
    return fn(obj);
}

let str = render(template,{arr:[1,2,3]});
console.log(str); // ' ""  "\'"  '\"'  


// 1) 字符串替换 用对象中的数据渲染到模板上
// function render(templateStr,data){
//     return templateStr.replace(/<%=([\s\S]*?)%>/g,function(){
//         return data[arguments[1]];
//     })
// }

// let str = render(template,{name:'zf'});
// console.log(str);