export default arr => {
    let tempArr = [];

    arr.map(val => {
        if (tempArr.indexOf(val) === -1) {
            tempArr.push(val);
        }
    });

    return tempArr;
}