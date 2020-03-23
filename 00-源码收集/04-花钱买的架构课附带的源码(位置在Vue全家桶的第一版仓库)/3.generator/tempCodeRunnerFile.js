function * a(){
    let fs = require('mz/fs');
    try{
        yield fs.readFile('./name1.txt','utf8');
    }catch(e){
        console.log(e,'----');
    }
}
let it = a();
it.next();
