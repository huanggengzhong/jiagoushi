## webpack （js转化的功能没有）
webpack是一个模块打包器，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

- 核心 入口 出口 loader plugin

- webpack安装 webpack/webpack-cli (不要安装到全局)
- npx 运行和脚本的运行
- 模块化 commonjs/esModule (混用问题)
- 默认的配置文件 webpack.config.js
- 入口和出口的配置
- html-webpack-plugin配置 多入口配置
- clean-webpack-plugin (cleanOnceBeforeBuildPatterns)
  > https://www.npmjs.com/package/clean-webpack-plugin

## loader
- webpack-dev-server dev配置
  - port,contentBase,open,compress
- 样式配置 style-loader css-loader css-module配置
- postcss-loader 增加前缀
- sass-loader使用  node-sass sass-loader  (importLoaders)
- MiniCssExtractPlugin  publicPath/output配置
  > https://www.npmjs.com/package/mini-css-extract-plugin

- css压缩


## es6语法配置 (exclude)
- babel-loader @babel/core 
- @babel/preset-env (useBuiltIns) core-js@3
  > https://babeljs.io/docs/en/next/babel-preset-env.html
- @babel/pollyfill
  ```
  [
    "@babel/preset-env",
    {
      "useBuiltIns": "usage",
      "corejs": { version: 3, proposals: true }
    }
  ]
  ```
  
- @babel/plugin-transform-runtime
- @babel/runtime
- @babel/runtime-corejs2
  ```
  {
    "absoluteRuntime": false,
    "corejs": 2,
    "helpers": true,
    "regenerator": true,
    "useESModules": false
  }
  ```
- typescript 配置 typescript ts-loader
- @babel/preset-react 

## 图片处理
- file-loader publicPath outputPath
- url-loader  转options
- html-withimg-loader
- 图标处理

## eslint配置
- eslint eslint-loader enforce使用
- overlay:true

## 暴露全局变量
- expose-loader
- externals
- ProvidePlugin

## sourceMap配置
- inline  内嵌 SourceMap 文件.
- cheap   生成一个没有列信息（column-mappings）的SourceMaps文件，不包含loader的 sourcemap（譬如 babel 的 sourcemap）
- cheap-module  生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。
- eval  每个module会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL.

> https://webpack.docschina.org/configuration/devtool/
> https://www.cnblogs.com/wangyingblog/p/7027540.html

## 跨域 proxy 
- webpack-dev-middleware
- proxy pathRewrite,secure,changeOrigin (http-proxy-middleware)
- before/after

## watch应用
```
watch:true,
watchOptions:{
  aggregateTimeout: 300,
  poll: 1000
},  
```

## resovle参数
- extensions 
- mainField/mainFiles
- alias

## 环境变量区分
- DefinePlugin
- webpack-merge 拆分文件
- npx webpack --env.development

## 插件使用
- bannerWebpackPlugin
- copyWebpackPlugin

## include/exclude

## dllPlugin
- dllPlugin
- referencePlugin
- add-asset-html-webpack-plugin

## treeshaking
- usedExports:true
- sideEffects
## scope hosting

## 代码分割
- splitChunks
> https://webpack.docschina.org/plugins/split-chunks-plugin/#src/components/Sidebar/Sidebar.jsx
## 热更新
- HotModuleReplacementPlugin
- hot:true

## 懒加载
- @babel/plugin-syntax-dynamic-import
- webpackPreLoad webpackPrefetch

## happyPack