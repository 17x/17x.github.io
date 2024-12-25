function getStyle(obj,attr)//获取元素的值
	{
		if(attr.currentStyle)
		{
			return obj.currentStyle[attr];
		}
		else
		{
			return getComputedStyle(obj,false)[attr];
		}
	}


function startMove(obj, json, fn)
	{
		clearInterval(obj.timer);//清除当前对象的定时器

		obj.timer=setInterval(function (){ //定义当前对象的定时器

			var bStop=true;  //假设：所有值都已经到了

			for(var attr in json)
			{
				//1.取当前的值
				var iCur=0;

				if(attr=='opacity')//如果attr属性是opacity时
				{
					iCur=parseInt(parseFloat(getStyle(obj, attr))*100);//opacity要用parseFloat强制转换为浮点数才能起作用，因为浮点数习惯用整数表示所以乘以100。因为有些小数*100在计算机中会出现bug，会出现算不尽的数，所以要用Math.round()来四舍五入来获取当前值。
				}
				else
				{
					iCur=parseInt(getStyle(obj, attr));//把从对象获取到的属性当前值强制转换为整形
				}

				//2.算速度
				var iSpeed=(json[attr]-iCur)/3;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);//用三目运算符，当速度大于0就向上取整，否则就向下取整，这样能避免缓冲运动出现bug

				//3.检测停止
				if(iCur!=json[attr]) //如果有当前的值不等于目标点
				{
					bStop=false;//不是所有的值都到了目标值
				}

				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';//IE
					obj.style.opacity=(iCur+iSpeed)/100;// chrome ff
				}
				else
				{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}

			if(bStop)//如果所有目标值都到了目标值
			{
				clearInterval(obj.timer); //就清除当前定时器

				if(fn)
				{
					fn();//如果有回调函数传进来就执行函数
				}
			}
		}, 30)
	}


function getColorH()//随机颜色高级版，二进制随机原理。
	{
		var color=('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
		return "#"+color;
	}


function getClientSize() //获取浏览器可用尺寸，返回两个值，例：getClientSize().width
	{
	    var a = h = 0;
	    if (window.innerHeight) {
	        a = window.innerWidth;
	        h = window.innerHeight
	    } else {
	        if (document.documentElement && document.documentElement.clientHeight) {
	            a = document.documentElement.clientWidth;
	            h = document.documentElement.clientHeight
	        } else {
	            a = document.body.clientWidth;
	            h = document.body.clientHeight
	        }
	    }
	    return {
	        width: a,
	        height: h
	    };
	}


function getElementsByClassName(className,root,tagName) //getElementsByClassName ie兼容解决 root：父节点，tagName：该节点的标签名。 这两个参数均可有可无
	{    
	    if(root)
	    {
	        root=typeof root=="string" ? document.getElementById(root) : root;   
	    }
	    else
	    {
	        root=document.body;
	    }
	    tagName=tagName||"*";                                    
	    if (document.getElementsByClassName) {                    //如果浏览器支持getElementsByClassName，就直接的用
	        return root.getElementsByClassName(className);
	    }
	    else 
	    { 
	        var tag= root.getElementsByTagName(tagName);    //获取指定元素
	        var tagAll = [];                                    //用于存储符合条件的元素
	        for (var i = 0; i < tag.length; i++) //遍历获得的元素
	        {                
	            for(var j=0,n=tag[i].className.split(' ');j<n.length;j++) //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
	            {   
	                if(n[j]==className)
	                {
	                    tagAll.push(tag[i]);
	                    break;
	                }
	            }
	        }
	        return tagAll;
	    }
	}


function righthit()//鼠标右击
	{
	    if (event.button==2)
	    { 
	        alert('nonono');
	    }
	 
	}
	

function wheel(obj, fn ,useCapture)//鼠标滚轮事件绑定
	{
		var mousewheelevt=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll": "mousewheel"//FF doesn't recognize mousewheel as of FF3.x
		if(obj.attachEvent) //if IE (and Opera depending on user setting)
		obj.attachEvent("on"+mousewheelevt, handler, useCapture);
		else if(obj.addEventListener) //WC3 browsers
		obj.addEventListener(mousewheelevt, handler, useCapture);

		function handler(event) 
		{
			var event =window.event ||event ;
			var delta =0;
			var delta =event.detail ?-event.detail/3 : event.wheelDelta/120;

			if(event.preventDefault) event.preventDefault();

			event.returnValue =false;
			return fn.apply(obj, [event, delta]);

		}
	}


function keyCode(ev)//键盘按键是？
	{
		var x;
		var oEvent=ev||window.event;

		x=oEvent.keyCode;								
		return x
	}


function array_unique_o(arr)//数组去重1
	{
		var tmp=new Array();//声明一个空数组
		for (var i in arr)//i在传进来的数组中
		{
			if(tmp.indexOf(arr[i])==-1)//push判定 indexOf查找tmp中是否已经有了此元素，没有才push.
			{
				tmp.push(arr[i]);//push
			}
		}
		return tmp;//返回push完成的数组		
	}


function array_unique_t(arr)//数组去重2
	{
		var tmp=new Array();
		var tmparr=new Array();

		for(var i in arr)
		{
			tmp[arr[i]]=1;
		}

		for(var n in tmp)
		{
			tmparr.push(n)
		}
		return tmparr;
	}

(function isIe(){

 	var dd=("\v"=="v")?dd="快点换浏览器吧，别用IE了":dd="\"不是IE\"\t\"^_^\"";
 	console.dir(dd);
 })() //判断IE