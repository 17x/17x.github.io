### promise

``` bash 
// determine a > b
function determine(a,b){
    var p1 = new Promise(function(resolve,reject){
         setTimeout(function(){
             if(a > b ){
                resolve('right')
             } else{
                reject('wrong')
             }
        },2000)
    })
    return p1;
};

determine(10,5).then(function(val){
    console.log(val)
    // right
}).catch(function(reason){
    console.log(reason)    
});

determine(5,10).then(function(val){
    console.log(val)
}).catch(function(reason){
    console.log(reason)    
    // wrong
});

```