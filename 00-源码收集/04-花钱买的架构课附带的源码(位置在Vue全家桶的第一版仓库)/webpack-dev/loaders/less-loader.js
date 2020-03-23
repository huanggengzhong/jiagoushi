// less-loader 的作用 就是 匹配到less文件  用less转化一下
let less = require('less'); // less.render
function loader(source){
    let css;
    less.render(source,function(err,r){
        css = r.css;
    });
    return css;
}
module.exports = loader;