function numOpreation(opreation,param){
  // 加法操作
   if(opreation==='add'){
       let intCount = 0;
       let floatCount = 0;
       param.map((val,index)=>{
         intCount +=parseInt(val);
         val = val.toString();
         const nIndexOfPoint = val.indexOf('.');
         if(nIndexOfPoint>=0){
           floatCount+=parseInt(val.slice(nIndexOfPoint+1,val.length));
         }
       });
     
     return Number(intCount +'.'+ floatCount);
   }
  //乘法操作
  if(opreation==='times'){    
    return numOpreation('add',[...param]);
  }
}
const num1 = 2241.94;
const num2 = 1880.00;
const num3 = 450.45;
const num4 = 450.50;


let result1 = numOpreation('add',[num1,num2,num3,num4]);
console.log('result is '+result1);
    
const baseNum = 0.3;    
let result2 = numOpreation('times',[baseNum,3] );
console.log('result is '+result2);