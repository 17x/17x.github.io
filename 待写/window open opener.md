 ``` bash
 //in parent
 let win = window.open('', '请求中...');
 window.myName='parent';
 window.myName; // 'parent';
 win.document.write();
 win.window;

 //in child
 window.opener.myName // 'parent'
 
 ```