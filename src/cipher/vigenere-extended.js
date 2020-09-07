import { Cipher } from "./cipher.js";

class VigenereExtended extends Cipher {

    constructor(key) {
        super(key);
    }

    encrypt(plain) {
        let indexKey = 0;
        let encryptText = "";
        let uppercaseKey = this.key.toUpperCase();
        let uppercasePlain = plain.toUpperCase();
        [...uppercasePlain].forEach(c => {
            encryptText += String.fromCharCode(
                (c.charCodeAt(0) + uppercaseKey.charCodeAt(indexKey)) % 256);
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
        let uppercaseKey = this.key.toUpperCase();
        let uppercaseEncrypted = encryptedText.toUpperCase();
        [...uppercaseEncrypted].forEach(c => {
            decryptText += String.fromCharCode(
                (c.charCodeAt(0) - uppercaseKey.charCodeAt(indexKey) + 256) % 256);
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