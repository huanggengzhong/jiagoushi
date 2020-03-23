## 文件模块 自定义模块
- require('./xxxx')
- require(绝对路径)


## 核心模块 
- require('fs'); 


## 第三方模块 (得需要安装)
- 全局安装 promises-aplus-test -g (在命令行中)
- 本地安装 require('bluebird')


## 如何定义全局包 （包是模块的集合）
- 包必须要有package.json
- 在命令行里用的  
- 运行方式  #! /usr/bin/env node
```
bin:{
    command:'./entry.js'
}
```
- 发布包  (先去官方源) (nrm,npm,nvm)
```
npm install nrm -g 切换源
nrm ls 列出所有源
nrm use npm
npm publish
如果需要更新包 需要提升版本号
npm publish 
npm unpublish --force 卸载包
```

## yarn 包管理器
- yarn 需要npm来安装(一般和 npm 功能是一样的)
```
sudo npm install yarn -g   大约的速度 cnpm 差不多
```

> 后面会写一些工具方法 ，后面可以发布上去

