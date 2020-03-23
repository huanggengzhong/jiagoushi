let path = require('path');
// 解析webpack中loader的方式
// 1) 直接把编写的loader放到node_modules目录下
// 2) resolveLoader (modules)  alias
// 3) rule 配置绝对路径
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    resolve:{}, // module,alias,mainFiles ... 
    resolveLoader:{
        // module
        modules:[path.resolve(__dirname,'node_modules'),path.resolve(__dirname,'loaders')]
        // alias:{
        //     loader1:path.resolve(__dirname,'loaders','loader1.js'),
        // }
    },
    module:{ 
        // loader 的类型 pre 前置 normal + inline + post 后置
        // loader的执行顺序 从右向左  从下到上
        // 内部webpack 设置了一个数组 来存放loader 
        rules:[
            {
                test:/\.js$/,
                enforce:'pre',
                use:{
                    loader:'loader1'
                }
            },
            {
                test:/\.js$/,
                use:{
                    loader:'loader2'
                }
            },
            {
                test:/\.js$/,
                enforce:'post',
                use:{
                    loader:'loader3'
                }
            }
        ]
    }
}
// 编写常见的loader 参数