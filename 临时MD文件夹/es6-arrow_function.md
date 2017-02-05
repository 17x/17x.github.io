### es6-arrow_function

#### basis

```bash 
var materialsLength1 = materials.map(function(material){
    return material.length;
});

var materialsLength2 = materials.map((material) =>{
    return material.length;
});


var materialsLength3 = materials.map(material => material.length);

console.log(materialsLength1,materialsLength2,materialsLength3);
// [8, 6, 7, 9] [8, 6, 7, 9] [8, 6, 7, 9]

var f = ([x,y] = [1,2]) =>{ return x+y};
console.log(f())

var f = ([x,y] = [1,2]) => x+y;
console.log(f())

var f = ([x,y] = [1,2]) => ({value:x+y});
console.log(f())

```