``` bash
//图片预览
function previewFile(file) {
    let reader = new FileReader();

    reader.addEventListener('load', function () {
        // preview.src = reader.result;
        console.log(reader.result);
    }, false);

    reader.readAsDataURL(file);
    console.log(reader);
}

//类型限制
helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function (item) {
        return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function (file) {
        const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
};


// angular 上传form数据

let formData = new FormData();
formData.append('file', val);

$http.post('uploadImage.html', formData, {
    transformRequest: angular.identity,
    headers: {'Content-Type': undefined}
}).then(resp => {
    console.log(resp);
});

```

### 当实现一个内滚动时，父元素内涵含若干个子元素 但是子元素总是有外边距，原因为子元素之间的空格，将父元素的font-size设为 0 