let Promise = require('./promise')
let fs = require('fs');
// anguar1.0  defer 对象  Q

function read(url){
    // 延迟对象
    let defer = Promise.deferred(); // {promise,resolve,reject}
    fs.readFile(url,'utf8',function(err,data){ // age.txt
        if(err)return defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise
}
read('./name.txt').then(data=>{
    console.log(data);
});
