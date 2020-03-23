let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = { // node commonjs规范
    entry:'./src/a.js', // 当前入口文件的位置  
    output:{
        filename:'bundle.[hash:8].js',
        path:path.resolve(__dirname,'a')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true
            },
            hash:true,
            filename:'login.html'
        })
    ]
}
// 默认webpack的配置文件 webpack.config.js
// html-webpack-plugin (用来根据模板产生一个打包后的html)
