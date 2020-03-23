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
        rules:[ // postcss-loader （autoprefixer）
            {
                test:/\.css$/,
                use:['style-loader',{
                    loader:'css-loader',
                    options:{
                        modules:true
                    }
                },'postcss-loader'],
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        ...htmlPlugins
    ]
}

// loader 加载器 翻译官 （转化模块的）