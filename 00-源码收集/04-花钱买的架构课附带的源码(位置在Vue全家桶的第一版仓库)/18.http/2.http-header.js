// http 多语言 Accepet-Language zh,en;q=1 多于语言 
// 范围请求 206 Range="bytes=2-10" 获取某部分数据
// 防盗链 限制用户发请求的网站 来源 referer (可以伪造的) ＋ 验证码 （影响用户体验）
// gzip压缩 前端 accept-encoding gzip / deflate   content-encoding
// user-agent 统计 判断用户内核
// 缓存强制缓存    304  对比缓存 ／ 协商缓存 
//    Cache-Control max-age Expires
//    last-modifed （服务端） if-modified-since （客户端）
//    Etag   if-none-match

// content-length content-type

// host (ecs)  多个域名 a.zhufeng.cn  b.zhufeng.cn