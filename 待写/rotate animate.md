#### 创建一个旋转动画,可以设置目标旋转角度,可以暂停,
html:

```
    <div id="rotate">rotate content</div>
    <input type="text" id="degree">
    <button id="btn">start</button>
    <p id="output"></p>
```

css:
```
#rotate{
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align:center;
  border-radius:50%;
  border:1px solid #dfdfdf;
}

#degree{
  margin:10px 0;
  display:block;
  padding:0;
}
```



```
window.addEventListener('load',()=>{
  let oCircle = document.getElementById('rotate'),
      oInput = document.getElementById('degree'),
      oBtn = document.getElementById('btn'),
      oOutput = document.getElementById('output'),
      statusFlag = 'stoped',
      curDeg = 0,
      _timer = null,
      desDeg = NaN;
  
    oBtn.addEventListener('click',()=>{
      if(isNaN(oInput.value.trim()));
      if(statusFlag==='stoped'){
        desDeg = oInput.value.trim();
      }
      
      if(statusFlag==='started'){ 
        clearInterval(_timer);
        oBtn.innerHTML = 'start';
        statusFlag = 'paused';
        oCircle.style.transition='transform 0s'; 
        //console.log(curDeg);
      }else{
        statusFlag = 'started';
        oBtn.innerHTML = 'pause';        
        oCircle.style.transition='transform 0s';
        
        _timer = setInterval(()=>{
          oCircle.style.transform = `rotate(${curDeg}deg)`;
          if(curDeg>=desDeg){
             clearInterval(_timer);
          }
          if((curDeg+10)>=desDeg){
            curDeg = desDeg;           
          }else{
            curDeg+=10;
          }
          oOutput.innerHTML = `curDeg is ${curDeg} `;
        },1); 
      }

    });
  
});
```