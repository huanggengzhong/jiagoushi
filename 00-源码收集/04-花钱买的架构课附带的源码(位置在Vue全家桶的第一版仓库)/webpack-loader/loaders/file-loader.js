let loaderUtils = require('loader-utils');
function loader(source){ // 默认source是会被toString的
    let fileUrl = loaderUtils.interpolateName(this,'[hash].[ext]',{content:source});
    this.emitFile(fileUrl,source);
    // 最终的buffer要被插入到页面中 所以类型 只能是buffer or string
    return `module.exports="${fileUrl}"`;
}
// loader 处理的是文件内容 二进制
loader.raw = true;

module.exports = loader;