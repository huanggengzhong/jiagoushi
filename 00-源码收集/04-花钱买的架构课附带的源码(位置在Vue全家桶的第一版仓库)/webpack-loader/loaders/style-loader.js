let less = require('less'); //
function loader(source){
    let code = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style);
    `
    return code
}
module.exports =loader;

// less-loader 可以转化成css
// style-loader  插入到style标签内
// css-loader background:url('./xxx.jpg') =>
// background:url(require('./xxx.jpg'))
// 在原生的cssloader中 @import '1.css'


// 手写插件  create-react-app模块
