import M3U8 from "./m3u8.js";
import decryptData from "./utils.js";

export default class Player {
    // uninitialized
    #status = 'status-0'
    #ms
    #blobUrl

    constructor({
                    dom, src
                }) {
        this.dom = dom
        // this.src = src

        try {
            this.init(src)
        } catch (e) {

        }
    }

    async init(src) {
        this.#status = 'status-0'
        const m3u8 = await fetch(src).then(resp => {
            return resp.text()
        }).then(text => {
            return new M3U8({rawText: text})
        })
        const keyAB = await fetch(m3u8.encrypt.URI).then(res => res.arrayBuffer())
        const cryptoKey = await window.crypto.subtle.importKey('raw', keyAB, {name: 'AES-CBC'}, false, [
            'encrypt',
            'decrypt',
        ]);
        const promises = []

        m3u8.list.map(async ({d, u}, index) => {
            promises.push(new Promise(async (resolve, reject) => {
                m3u8.list[index].segData = await this.fetchSegABAndDecrypt(cryptoKey, m3u8.encrypt.IV, u)
                resolve()
            }))
        })

        await Promise.all(promises)
        const mediaSource = new MediaSource()
        const srcUrl = URL.createObjectURL(mediaSource)

        this.#ms = mediaSource
        this.#blobUrl = srcUrl
        this.dom.src = srcUrl

        // console.log(mediaSource.readyState)

        mediaSource.addEventListener('sourceopen', () => {
            // .m3u8	application/vnd.apple.mpegurl	playlist file that contains a path to a media file or directory of media files and meta information about the playlist
            // .ts	video/mp2t	video stream file
            // .m4s	video/iso.segment or video/mp4	fragmented media segment
            // .m4a	audio/mp4	audio file encoded with advanced audio coding
            // .m4v	video/mp4	video container format
            // .mp4	video/mp4	video segment or media initialization segment
            // const sourceBuffer = mediaSource.addSourceBuffer('video/mp4;codecs="avc1.4d400d,mp4a.40.2"');
            // const sourceBuffer = mediaSource.addSourceBuffer('video/mp4;codecs="avc1.4d400d"');
            const sourceBuffer = mediaSource.addSourceBuffer('video/mp4;codecs="avc1.4D4001,mp4a.40.2"');
            // const sourceBuffer = mediaSource.addSourceBuffer('video/mp4;codecs="avc1.4D4001,mp4a.40.2"');

            sourceBuffer.mode = 'sequence'
            let _i = 0

            const loadSegmentData = () => {
                if (_i < m3u8.list.length) {
                    sourceBuffer.appendBuffer(m3u8.list[_i++].segData)
                } else {
                    mediaSource.endOfStream();
                }
            }

            sourceBuffer.onupdateend = loadSegmentData
            // sourceBuffer.onupdateend = loadSegmentData
            sourceBuffer.onabort = () => {
                console.log('onabort')
            }
            sourceBuffer.onerror = () => {
                console.log('onerror')
            }

            sourceBuffer.seeked = () => {
                console.log('seeked')
            }

            loadSegmentData()
        })

        this.dom.oncanplay = () => {
            console.log('oncan')
        }

        this.dom.onprogress = () => {
            console.log('onprogress')
        }
        this.dom.onended = () => {
            console.log('onended')
        }
        this.dom.oncanplaythrough = () => {
            console.log('oncanplaythrough')
        }
    }

    async fetchSegABAndDecrypt(key, iv, url) {
        const segAB = await fetch(url).then(res => res.arrayBuffer())

        return await decryptData(key, iv, segAB)
    }

    pause() {

    }

    play() {

    }

    destroy() {

    }
}