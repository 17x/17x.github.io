export default (url = location.href, param) => {
    if (url.indexOf('?') === -1) {
        return null;
    }

    let search = url.split('?')[1],
        arr = search.substring(1).split('&'),
        query = [],
        len = arr.length;

    for (let i = 0; i < len; i++) {
        let pair = [];

        pair.push(
            arr[i].split('=')[0],
            arr[i].split('=')[1]
        );

        query[pair[0]] = pair[1];
    }

    //查询模式
    if (param) {
        return query[param];
    }

    return query;
}