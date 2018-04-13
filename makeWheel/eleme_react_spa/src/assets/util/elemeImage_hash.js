/*
0e764044fb6df771e9cb42196ae3eeeejpeg
//fuss10.elemecdn.com/0/e7/64044fb6df771e9cb42196ae3eeeejpeg.jpeg?imageMogr/format/webp/

https://fuss10.elemecdn.com/0/e7/64044fb6df771e9cb42196ae3eeeejpeg.jpeg?imageMogr/format/webp/

*/

export default str => {
    let arr = str.split('');

    return `https://fuss10.elemecdn.com/${arr.splice(0, 1)}/${arr.splice(0, 2).join('')}/${arr.join('')}.jpeg?imageMogr/format/webp/`;
};