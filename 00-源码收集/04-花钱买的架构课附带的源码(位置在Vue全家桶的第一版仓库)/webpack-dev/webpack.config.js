let path = require('path');
let EmitPlugin = require('./plugins/EmitPlugin');
let DonePlugin = require('./plugins/DonePlugin');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    path.resolve(__dirname,'loaders','style-loader.js'),
                    path.resolve(__dirname,'loaders','less-loader.js')
                ]
            }
        ]
    },
    plugins:[ // 一般情况下 插件的顺序 是不一定
        new DonePlugin(),
        new EmitPlugin()  // 多个插件监听了同一个事件，那就是谁在前谁先执行
    ]
}