
Array.prototype.reduce = function(callback,prev){
    // this = [1,2,3]
    for(let i = 0; i< this.length;i++){
       if(prev == undefined){
           // this[i] = 1  this[i+1] = 2
         prev = callback(this[i],this[i+1],i+1,this);
         i++;
       }else{
         prev = callback(prev,this[i],i,this);
       }
    }
    return prev;
}
// 平均数 求幂 
[1,2,3].reduce((a,b,index,current)=>{
    return a+b;
})