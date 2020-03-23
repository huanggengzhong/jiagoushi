
let buffer = Buffer.from('珠峰架构珠峰架构珠峰架构');
Buffer.prototype.split = function(sep){
   let pos = 0;
   let len = Buffer.from(sep).length;
   let arr = [];
   let current;
   while( -1!== (current=this.indexOf(sep,pos))){
        arr.push(this.slice(pos,current));
        pos = current+len;
   }
   arr.push(this.slice(pos));// 最后那一项无法找到
   return arr;
}
let arr = buffer.split('珠峰');
console.log(arr.join(''));
