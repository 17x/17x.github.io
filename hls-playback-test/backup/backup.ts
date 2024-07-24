/*
export default class AESCrypto {
    private subtle: SubtleCrypto;
    private aesIV: Uint8Array;

    constructor(subtle: SubtleCrypto, iv: Uint8Array) {
        this.subtle = subtle;
        this.aesIV = iv;
    }

    decrypt(data: ArrayBuffer, key: CryptoKey) {
        return this.subtle.decrypt({ name: 'AES-CBC', iv: this.aesIV }, key, data);
    }
}
*/

/*

this.subtle.importKey('raw', this.key, { name: 'AES-CBC' }, false, [
    'encrypt',
    'decrypt',
]);
*/

// Convert avc1 codec string from RFC-4281 to RFC-6381 for MediaSource.isTypeSupported