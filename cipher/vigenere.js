import { Cipher } from "./cipher.js";

class Vigenere extends Cipher {

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
                (c.charCodeAt(0) + uppercaseKey.charCodeAt(indexKey) - 130) % 26 + 65);
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
                (c.charCodeAt(0) - uppercaseKey.charCodeAt(indexKey) + 26) % 26 + 65);
            indexKey++;
            if (indexKey == this.key.length) {
                indexKey = 0;
            }
        })
        return decryptText;
    }

}

export { Vigenere };

let cipherKey = new Vigenere("rangga");
console.log(cipherKey.decrypt(cipherKey.encrypt("tugasmakalah")));