let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let webpack = require('webpack')
let htmlPlugins = ["index"].map(chunkName => {
  return new HtmlWebpackPlugin({
    filename: `${chunkName}.html`,
    chunks: [chunkName],
    template: `./public/${chunkName}.html`
  });
});
module.exports = {
  // externals:{
  //   'jquery':'$' // 外部的变量 不需要打包
  // },
  devServer: {
    // overlay:true, // 增加一个代码校验弹层
    port: 3000,
    compress: true,
    contentBase: "./dist",
    before(app){ // http监听函数
      // 3000 模拟了一个3000接口 不存在跨域问题的
      // app.get('/api/user',function(req,res){
      //   res.json({name:'before'})
      // });
      // 我可以自己写一个服务 把webpack跑在我自己的服务上
    }
    // proxy:{
    //   '/api':{ // 跨域并且重写路径
    //     target:'http://localhost:4000',
    //     //secure:false, // 代理的是https服务
    //     changeOrigin:true, // 主要是把host改成访问的服务器地址
    //     pathRewrite:{'/api':''} // 重写路径
    //   }
    // }
  },
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].js"
  },
  performance: false,
  module: {
    rules: [
      // {
      //   test:require.resolve('jquery'),
      //   use:{
      //     loader:'expose-loader',
      //     options:'$'
      //   }
      // },
      {
            test:/\.ts$/,
            use:'ts-loader'
      },
      {
        test:/\.js$/,
        exclude:/node_modules/, // 忽略掉不要进行loader处理的文件
        include:path.resolve(__dirname,'./src'),
        use:{
            loader:'babel-loader', 
            options:{
                presets:[['@babel/preset-env',{
                }]],
                plugins:[
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                ]
            }
        }
      },
      {
        test: /\.html/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(eot|svg|woff2|woff|ttf)/,
        use: "file-loader"
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2,
            outputPath: "img"
          }
        }
      },
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
  },
  plugins: [
    new CleanWebpackPlugin(), ...htmlPlugins,
    new webpack.ProvidePlugin({ // 使用jquery 导出一个$对象
      '$':'jQuery'
    })
  ]
};