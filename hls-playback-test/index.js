import Player from "./player.js";

// https://developers.google.com/cast/docs/media

const main = () => {
    const player = new Player({
        dom: document.querySelector('#video1'),
        src: './hls/index.m3u8.m3u'
    })
}

window.addEventListener('DOMContentLoaded', main)