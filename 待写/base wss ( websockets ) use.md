### base wss ( websockets ) use
* easy use *
```
var ws = new WebSocket("wss://echo.websocket.org");

const onOp = (msg)=>{
  console.log('open',msg);
  ws.send("Hello WebSockets!");
}
const onMsg = (msg)=>{
  console.log('msg',msg.data);
  ws.close();
}
const onClose = (msg)=>{
  console.log('close',msg);
}

ws.addEventListener('open',onOp);
ws.addEventListener('message',onMsg);
ws.addEventListener('close',onClose);
 // 定时执行wss 通讯

```