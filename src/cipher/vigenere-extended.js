import { Cipher } from "./cipher.js";

class VigenereExtended extends Cipher {

    constructor(key) {
        super(key);
    }

    encrypt(plain) {
        let indexKey = 0;
        let encryptText = "";
        [...plain].forEach(c => {
            encryptText += String.fromCharCode(
                (c.charCodeAt(0) + this.key.charCodeAt(indexKey)) % 256);
            indexKey++;
            if (indexKey == this.key.length) {
                indexKey = 0;
            }
        })
        return encryptText;
    }

    decrypt(encryptedText) {
        let indexKey = 0;
        let decryptText = "";
        [...encryptedText].forEach(c => {
            decryptText += String.fromCharCode(
                (c.charCodeAt(0) - this.key.charCodeAt(indexKey) + 256) % 256);
            indexKey++;
            if (indexKey == this.key.length) {
                indexKey = 0;
            }
        })
        return decryptText;
    }

}

export { VigenereExtended };

let cipherKey = new VigenereExtended("halo");
console.log(cipherKey.decrypt(cipherKey.encrypt("hanifadzkiya")));