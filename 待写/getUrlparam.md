
function getUrlParam(str) {
    var urlArr = str.split('?')[1].split('&'),
        newObj = {}

    for (var i = 0; i < urlArr.length; i++) {
        var tempArr = urlArr[i].split('=');

        newObj[tempArr[0]] = tempArr[1]
    }

    return newObj
}

console.log(getUrlParam(str))