'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.jsx';


var p1 = new Promise(function(resolve,reject){
	var httpRequest = new XMLHttpRequest();
	
	// if POST 
	// you have to set the MIME type of the request 
	// httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// httpRequest.send("name=value&anothername="+encodeURIComponent(myVar)+"&so=on")
	
	// if GET
	httpRequest.open('GET','./src/allarea.json',true);
	httpRequest.send();

	httpRequest.onreadystatechange = function(){
	    // process the server response
	    if (httpRequest.readyState === XMLHttpRequest.DONE) {
	    	if (httpRequest.status === 200) {
			    resolve(httpRequest.response);
			} else {
				reject(httpRequest)
			}
		} else {
		    // still not ready
		}
	};
});

p1.then(function(val){
	// console.log(val);
}).catch(function(reason){
	console.log(reason.response + 'in ' + reason.responseURL);
	console.log(reason);
});

var App = ()=> <h1>hello react!!</h1>;
ReactDOM.render(
	<App />,
	document.getElementById('root')
);




// ~!!!!!!!!!!!!!!!!!!!!Promise