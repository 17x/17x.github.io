### defineProperty getter setter

```bash
function Comps(render) {
  state = {}  
  Object.defineProperty(this,'state',{
    get:function(e){console.log('get',e)},
    set:function(e){console.log('set',e);render(e)},
  })
} 

const handleStateChange=(state)=>{ 
 console.log('state',state);
  /*Array.prototype.slice.call(document.all).map(val=>{
      
  });*/  
}
 
let comps1 = new Comps(handleStateChange);
comps1.state = {age:25,name:'mike'};  

console.log(comps1.state);




```