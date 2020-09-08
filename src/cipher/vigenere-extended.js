import { Cipher } from "./cipher.js";

class VigenereExtended extends Cipher {

    encrypt(plain) {
        let indexKey = 0;
        const isTextBinary = !plain[0]?.charCodeAt;
        let encryptText = isTextBinary
            ? new Uint8Array(plain.length)
            : '';
        [...plain].forEach((c, i) => {
            if (isTextBinary)
                encryptText[i] += (c + this.key.charCodeAt(indexKey)) % 256;
            else
                encryptText += String.fromCharCode((c.charCodeAt() + this.key.charCodeAt(indexKey)) % 256);
            indexKey++;
            if (indexKey === this.key.length) {
                indexKey = 0;
            }
        })
        return encryptText;
    }

    decrypt(encryptedText) {
        let indexKey = 0;
        const isTextBinary = !encryptedText[0]?.charCodeAt;
        let decryptText = isTextBinary
            ? new Uint8Array(encryptedText.length)
            : '';
        [...encryptedText].forEach((c, i) => {
            if (isTextBinary)
                decryptText[i] += (c - this.key.charCodeAt(indexKey) + 256) % 256;
            else
                decryptText += String.fromCharCode((c.charCodeAt() - this.key.charCodeAt(indexKey) + 256) % 256);
            indexKey++;
            if (indexKey === this.key.length) {
                indexKey = 0;
            }
        })
        return decryptText;
    }

}

export { VigenereExtended };

let cipherKey = new VigenereExtended("halo");
console.log(cipherKey.decrypt(cipherKey.encrypt("hanifadzkiya")));