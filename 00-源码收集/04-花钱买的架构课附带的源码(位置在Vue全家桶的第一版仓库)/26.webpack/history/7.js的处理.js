let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let htmlPlugins = ["index"].map(chunkName => {
  return new HtmlWebpackPlugin({
    filename: `${chunkName}.html`,
    chunks: [chunkName],
    template: `./public/${chunkName}.html`
  });
});
module.exports = {
  devServer: {
    // overlay:true, // 增加一个代码校验弹层
    port: 3000,
    compress: true,
    contentBase: "./dist"
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
        {
            test:/\.ts$/,
            use:'ts-loader'
        },
        // {
        //     test:/\.js$/,
        //     use:{
        //         loader:'eslint-loader'
        //     },
        //     enforce:'pre' // 默认在编译js之前校验
        // },
      {
        test:/\.js$/,
        exclude:/node_modules/, // 忽略掉不要进行loader处理的文件
        include:path.resolve(__dirname,'./src'),
        use:{
            // eslint 1） 手动配置  2） 直接初始化一个规范
            // eslint-loader eslint
            loader:'babel-loader', // .babelrc
            options:{
                // 帮你转化 高版本的api语法
                // 不使用这种方式 你可以在代码中引入@babel/pollyfill

                // '@babel/preset-env' 如果需要 promise 我会在代码中直接引入@babel/pollyfill
                presets:[['@babel/preset-env',{
                    // useBuiltIns:'usage', // 只转化使用的api
                    // corejs:{version:3} 需要额外的安装corejs
                }]], // 装饰器 , 类的属性
                plugins:[
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                ]
                // 并不支持 实例上的方法 string.includes
                // plugins:[['@babel/plugin-transform-runtime',
                // {
                //     "absoluteRuntime": false,
                //     "corejs": 3,
                //     "helpers": true,
                //     "regenerator": true,
                //     "useESModules": false
                //   }
                // ]
                // ]
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
  plugins: [new CleanWebpackPlugin(), ...htmlPlugins]
};