let querystring = require('querystring');

let str = {name:'zfpx',age:9};
console.log(querystring.stringify(str,'&&','='));