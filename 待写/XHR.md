### XMLHttpRequest

``` bash 
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
                console.log(httpRequest.response);
            } else {
                //state , response , etc.
                console.log(httpRequest)
            }
        } else {
            // still not ready
        }
    };

```