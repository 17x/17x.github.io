/*
* input a data return its type
* */
export default (object) => {
    switch (Object.prototype.toString.call(object)) {
        case '[object Array]':
            return 'Array';
        case '[object Object]':
            return 'Object';
        case '[object Number]':
            return 'Number';
        case '[object Null]':
            return 'Null';
        case '[object Undefined]':
            return 'Undefined';
        case '[object String]':
            return 'String';
        default:
            throw new Error(' what the hell did you passed in ? ');
    }
}