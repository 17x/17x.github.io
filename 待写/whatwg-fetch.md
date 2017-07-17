### 

``` bash
    import 'whatwg-fetch';
    const data = new FormData();
    data.append('specialId', 4);

    const myInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain'
        },
        mode: 'cors',
        body: data
    };

    fetch('http://192.168.1.13:80/ak-sw-tg/pages/m/specialDetail.html', myInit)
        .then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
        }).catch(err => {
            console.log(err);
        });
```