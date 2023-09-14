// Tag explain:
// https://developer.apple.com/documentation/http-live-streaming/video-on-demand-playlist-construction
// About the EXT-X-VERSION tag:
// https://developer.apple.com/documentation/http-live-streaming/about-the-ext-x-version-tag
import {ivHexStringToArrayBuffer, ivHexStringToUint8Array} from "./utils.js";

export default class M3U8 {
    head
    version
    targetDuration
    mediaSequence
    playlistType
    // EXT-X-KEY:
    // https://www.rfc-editor.org/rfc/rfc8216.html#page-15

    // https://www.rfc-editor.org/rfc/rfc8216.html#section-5
    encrypt
    list

    constructor({
                    rawText
                }) {
        try {
            this.parse(rawText)
        } catch (e) {
            console.error('Something went wrong! ', e)
        }
    }

    parse(rawText) {
        this.head = rawText.substring(0, 7)
        this.version = Number(rawText.match(/(?<=#EXT-X-VERSION:)\d+/)[0])
        this.targetDuration = Number(rawText.match(/(?<=#EXT-X-TARGETDURATION:)\d+/)[0])
        this.mediaSequence = Number(rawText.match(/(?<=#EXT-X-MEDIA-SEQUENCE:)\d+/)[0])
        this.playlistType = rawText.match(/(?<=#EXT-X-PLAYLIST-TYPE:)\w+/)[0]
        this.encrypt = rawText.match(/(?<=#EXT-X-KEY:).+/)[0].split(',').reduce((previousValue, currentValue, currentIndex) => {
            const k = currentValue.split('=')[0]
            let v = currentValue.split('=')[1]

            if (k === 'URI') {
                v = JSON.parse(v)
            }
            if (k === 'IV') {
                v = ivHexStringToArrayBuffer(v)
            }

            previousValue[k] = v

            return previousValue
        }, {})

        this.list = rawText.match(/#EXTINF:.[^\n]+\n.+/g).map(match => match.split(/,\n/)).map(arr => {
            return {
                // d for duration
                d: Number(arr[0].replace('#EXTINF:', '')),
                // u for url
                u: arr[1]
            }
        })

        // #EXT-X-ENDLIST
    }
}