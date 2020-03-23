let loaderUtils=  require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');
let path = require('path');
// 转化时处理
function loader(source){
    let options = loaderUtils.getOptions(this);
    let schema = {
        type:'object',
        properties:{
            "text":{
                type:"string"
            },
            "filename":{
                type:"string"
            }
        }
    }
    validateOptions(schema,options,'banner-loader');
    if(options.filename){
        // 希望如果依赖的某个文件 变化了 可以做到实时更新
        this.addDependency(path.resolve(__dirname,'../',options.filename));
        return fs.readFileSync(options.filename,'utf8')+source
    }
    return options.text + source;
}
module.exports = loader;