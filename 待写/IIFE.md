## 隐式类型转换

```
// 以下返回NaN
+ function(){   console.log(999); }();
- function(){   console.log(999); }();

// 以下返回true
! function(){   console.log(999); }();

// 以下返回false
!! function(){   console.log(999); }();

// 以下返回undefined
void function(){   console.log(999); }();
(function(){   console.log(999); }());

// 以下返回 'undefined'
typeof (function(){   console.log(999); }());

```