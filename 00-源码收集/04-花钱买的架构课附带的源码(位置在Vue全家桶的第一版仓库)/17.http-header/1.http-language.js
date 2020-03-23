let http = require('http');

let languages = {
    "zh-CN":'你好',
    "en":"hello",
    "fr":"bonjour"
}
let defaultLanguage = 'zh-CN'
// Accept-Language: zh-CN   en;q=0.8    fr;q=0.6 用来表示当前要接受的语言
// [{lan:zh-CN,q:1},{lan:en,q:0.8}]

// curl -v --header "Accept-Language:zh-CN;q=0.1,fr;q=0.9,en;q=1" http://localhost:3000
let server = http.createServer((req,res)=>{
    let language = req.headers['accept-language'];
    res.setHeader('Content-type','text/plain;charset=utf8');
    if(language){
        language = language.split(',').map(lan=>{
            let [l,q="q=1"] = lan.split(';');
            return {lan:l,q:q.split('=')[1]}
        }).sort((a,b)=>b.q-a.q);
        for(let i = 0 ; i< language.length;i++){
            let current = language[i].lan; // 遍历所有语言 将支持的返回
            if(languages[current]){
                res.end(languages[current]);
                return;
            }
        }
        res.end(languages[defaultLanguage])
    }else{
        res.end(languages[defaultLanguage])
    }
});
server.listen(3000);