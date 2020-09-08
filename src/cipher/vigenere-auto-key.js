import { Cipher } from "./cipher.js";

class VigenereAutoKey extends Cipher {

    constructor(key) {
        key = key.replace(/ /gi, "").toUpperCase();
        super(key);
    }

    encrypt(plain) {
        plain = this.removeSpace(plain);
        let indexKey = 0;
        let encryptText = "";
        let uppercasePlain = plain.toUpperCase();
        this.key = this.generateAutoKey(plain);
        [...uppercasePlain].forEach(c => {
            encryptText += String.fromCharCode(
                (c.charCodeAt(0) + this.key.charCodeAt(indexKey) - 130) % 26 + 65);
            indexKey++;
        })
        return encryptText;
    }

    generateAutoKey(plain) {
        let autoKey = this.key;
        for (let index = 0;index < plain.length;index++) {
            if (autoKey.length == plain.length) {
                return autoKey;
            }
            autoKey += plain[index].toUpperCase();
        }
        return autoKey;
    }

    decrypt(encryptedText) {
        let indexKey = 0;
        let decryptText = "";
        [...encryptedText].forEach(c => {
            decryptText += String.fromCharCode(
                ((c.charCodeAt(0) - this.key.charCodeAt(indexKey)) + 26) % 26 + 65);
            indexKey++;
            if (indexKey == this.key.length) {
                indexKey = 0;
            }
        })
        return decryptText;
    }

}

export { VigenereAutoKey };

let cipherKey = new VigenereAutoKey("halo");
console.log(cipherKey.decrypt(cipherKey.encrypt("hanifadzkiya")));