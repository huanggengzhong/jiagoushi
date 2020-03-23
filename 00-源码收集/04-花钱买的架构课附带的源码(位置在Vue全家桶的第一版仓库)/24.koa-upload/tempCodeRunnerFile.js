let sign = require('crypto').createHmac('sha1','jw').update('name=zf').digest('base64');
console.log(sign);