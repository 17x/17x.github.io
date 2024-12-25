export default str => {
    let arr = str.split(''),
        sFirstChar = arr.splice(0, 1)[0];

    arr = arr.join('');
    switch (sFirstChar) {
        case '#':
            return document.getElementById(arr);
        case '.':
            return document.getElementsByClassName(arr);
        default:
            return document.getElementsByTagName(str);
    }

};