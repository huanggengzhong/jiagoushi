let MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 不支持热更新 所以只能放在生产环境下
let prodConfig = {
    mode: "development",
    devtool:'cheap-module-source-map', // source-map 慢 //eval可以放到文件中 并且把文件变化成 eval执行 cheap精简不支持loader中的sourcemap cheap-module
    module:{
        rules:[
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader"
              },
              "postcss-loader",
              "sass-loader"
            ]
          }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({})
    ]
}

module.exports = prodConfig