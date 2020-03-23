## http头的应用
- 多语言 前端实现多语言 vue-i18n  ／ 做成多个网站 / 通过服务端来实现多语言
     Accept-Language: zh-CN,en;q=0.8,fr;q=0.6
     Accept-Language
- 断点续传  范围请求  写一个客户端  1-5  5-10 10-15
    Range:bytes=0-5  
    Content-Range: bytes 0-5/2381

- 判断内核
    - 服务端 判断浏览器内核跳转到不同网站 302

- referer 来源 安全 xss csrf
    - 防盗链  nginx node
- gzip压缩
    - 压缩体积
        - Content-Encoding: gzip  res
        - Accept-Encoding: gzip, deflate req  视频 图片
- 代理
