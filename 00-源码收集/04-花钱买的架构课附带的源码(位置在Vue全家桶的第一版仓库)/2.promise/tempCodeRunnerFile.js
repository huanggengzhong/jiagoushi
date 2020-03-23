let fs = require('mz/fs');
fs.readFile('./name.txt','utf8').then(data=>{
    console.log(data);
})
