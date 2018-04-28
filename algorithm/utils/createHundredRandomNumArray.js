const createHundredRandomNumArray = () => {
    let arr = [];

    while (arr.length < 100) {
        let nNum = parseInt(Math.random() * 100)+1;
        if (arr.indexOf(nNum) === -1) {
            arr.push(nNum)
        }
    }

    return arr;
}
