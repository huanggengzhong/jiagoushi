let webpack = require('webpack')
let devConfig = {
  devtool:'cheap-module-eval-source-map', // 开发工具  inline cheap module eval source-map
  devServer: {
    port: 3000,
    compress: true,
    contentBase: "./dist",
    hot:true // 开启热更新 (如果热更新失效 会强制刷新代码)
  },
  mode: "development",
  plugins:[
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
}
module.exports = devConfig