export function ivHexStringToUint8Array(hexString) {
    // Remove any leading "0x" if present
    if (hexString.startsWith("0x")) {
        hexString = hexString.slice(2);
    }

    // Create a new Uint8Array from the hex string
    const bytes = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        bytes[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
    }
    return bytes;
}

export default function decryptData(key, iv, ciphertext) {
    // The iv value is the same as that used for encryption
    return window.crypto.subtle.decrypt({name: "AES-CBC", iv}, key, ciphertext);
}

export function ivHexStringToArrayBuffer(hexString) {
    // Remove any leading "0x" if present
    if (hexString.startsWith("0x")) {
        hexString = hexString.slice(2);
    }

    // Create a typed array from the hex string
    const typedArray = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        typedArray[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
    }

    // Create an ArrayBuffer from the typed array
    return typedArray.buffer;
}