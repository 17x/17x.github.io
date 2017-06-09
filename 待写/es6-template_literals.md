### es6-template_literals

#### basis
```bash
var a = 10, 
    b = 5;
console.log(`Fifteen is ${a + b} \n not ${2*(a+b)}`);
// Fifteen is 15 
// not 30

```

#### in arguments of function

```bash

function myTag(strings,personExpression,ageExpression){
    var str0 = strings[0];
    var str1 = strings[1];

    return str0 + personExpression + str1 + (personExpression > 99? 'centenarian' : "youngin");
}

var output = myTag`that ${"mike"} is a ${28}`;
console.log(output);
// that mike is a youngin

```

#### Another complicated example

```bash 
function template(strings,...keys){
    // console.log(strings)
    return function(...values){
        var dict = values[values.length-1],
            result = [];
        keys.forEach(function(key,i){
            console.log(key,i)
            var value;
            if(Number.isInteger(key)){
                value = values[key]
            } else{
                value = dict[key]
            }
            result.push(value,strings[i+1])
        });
        console.log(result.join(''))
    }
}

var t1Closure = template`${0}${1}${0}!`;
t1Closure('Y','A'); 
//YAY!
var t2Closure = template`${0} ${'foo'}!`;
t2Closure('hello',{foo:'world'});
//hello world!

```