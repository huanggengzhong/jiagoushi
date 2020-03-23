let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let htmlPlugins = [
    'index',
].map(chunkName=>{
    return new HtmlWebpackPlugin({
        filename: `${chunkName}.html`,
        chunks:[chunkName]
    })
});
module.exports = {
    devServer:{
        port:3000, // 服务启动的端口号
        //open:true, // 自动打开浏览器
        compress:true,// 启用gzip压缩
        contentBase:'./dist' // express.static(dist)
        // 默认打包的结果通过webpack-dev-server 放到内存中的，而且目录是当前的根目录，contentBase 在启动一个静态文件目录
    },
    mode:'development',
    entry:{
        index:'./src/index.js',
    },
    output:{
        filename:'[name].js'
    },
    module:{
        // loader 的执行顺序 从右往左
        // 从下往上 
        // 可写成 数组 对象 字符串的格式
        // loader的分类 三类 前置loader(pre) 后置loader(post)  普通loader(normal)
        rules:[
            {
                test:/\.css$/,
                use:{
                    loader:'css-loader',
                    options:{
                        modules:true
                    }
                },
            },
            {
                test:/\.css$/,
                // loader的顺序是从右边往左边
                // 从下到上
                use:'style-loader',
                enforce:'post'
            }
            
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        ...htmlPlugins
    ]
}

// loader 加载器 翻译官 （转化模块的）