
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');


let htmlPlugins = [
    'index',
].map(chunkName=>{
    return new HtmlWebpackPlugin({
        filename: `${chunkName}.html`,
        chunks:[chunkName],
        template:`./public/${chunkName}.html`
    })
});
module.exports = {
    
    devServer:{
        port:3000,
        compress:true,
        contentBase:'./dist' 
    },
    mode:'production',
    entry:{
        index:'./src/index.js',
    },
    output:{
        //publicPath:'http://www.zhufeng.cn/111',
        filename:'[name].js'
    },
    performance:false,
    module:{
        rules:[
            {
                test:/\.html/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(eot|svg|woff2|woff|ttf)/,
                use:'file-loader'
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:'url-loader', // 如果图片小 会转base6,超过限制会打包出文件
                    options:{
                        limit:2,
                       // publicPath:'http://www.zhufeng.cn/img', // 增加访问前缀
                        outputPath:'img' // 输出到某个文件夹中
                    }
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                    },
                        'postcss-loader',
                        'sass-loader', 
                    ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        ...htmlPlugins,
    ]
}
