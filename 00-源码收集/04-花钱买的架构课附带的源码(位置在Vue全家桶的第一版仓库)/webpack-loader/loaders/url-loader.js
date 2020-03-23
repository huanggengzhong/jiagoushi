let loaderUtils = require('loader-utils');
let mime  = require('mime');
function loader(source){ // 转化的图片的总大小
    let {limit} = loaderUtils.getOptions(this);
    if(limit>source.length){
        let code = `data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}`
        return `module.exports = "${code}"`;
    }else{
        return require('./file-loader').call(this,source);
    }
}
loader.raw = true;
module.exports = loader;