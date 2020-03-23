let HtmlWebpackPlugin = require('html-webpack-plugin')
class MyPlugin {
  constructor({match}){
    this.match = match;
  }
  processTag(tag,compilation){
    // 取出css路径和js路径
    let url = tag.attributes.href || tag.attributes.src 
    if(this.match.test(url)){
      // 修改css
      if(tag.tagName === 'link'){
        tag = {tagName:'style',
          innerHTML:compilation.assets[url].source()
        }
      }
      // 修改js
      if(tag.tagName === 'script'){
        tag = {tagName:'script',
          innerHTML:compilation.assets[url].source()
        }
      }
      delete compilation.assets[url]; // 从打包后的资源中删除掉
    }
    return tag;
  }
  processTags(data,compilation){
    let headTags = data.headTags;
    let bodyTags = data.bodyTags;
    headTags = headTags.map(tag=>{
      return this.processTag(tag,compilation)
    });
    bodyTags = bodyTags.map(tag=>{
      return this.processTag(tag,compilation)
    });
    return {...data,headTags,bodyTags}
  }
    apply (compiler) {
      compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        console.log('The compiler is starting a new compilation...')
       
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'MyPlugin', 
          (data, cb) => {
            data = this.processTags(data,compilation);
            cb(null, data)
          }
        )
      })
    }
  }
  module.exports = MyPlugin;
