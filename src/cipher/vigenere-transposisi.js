import { Cipher } from "./cipher.js";
import { Vigenere } from "./vigenere.js";
class VigenereTransposisi extends Cipher {

    constructor(key) {
        super(key);
        this.vigenereCipher = new Vigenere(key);
    }

    encrypt(plain) {
        let vigenereText = this.vigenereCipher.encrypt(plain);
        let encryptedText = "";
        let transformKey = this.key.length;
        let pos = 0;
        let started = 0;
        for (let i = 0; i < vigenereText.length;i++) {
            encryptedText += vigenereText[pos];
            pos += transformKey;
            if (pos >= vigenereText.length) {
                started++;
                pos = started;
            }
        }
        return encryptedText;
    }

    decrypt(encryptedText) {
        let detransformText = "";
        let detransformKey = Math.ceil(encryptedText.length / this.key.length);
        let pos = 0;
        let started = 0;
        for (let i = 0; i < encryptedText.length;i++) {
            detransformText += encryptedText[pos];
            pos += detransformKey;
            if (pos >= encryptedText.length) {
                started++;
                pos = started;
            }
        }
        return this.vigenereCipher.decrypt(detransformText);
    }

}

export { VigenereTransposisi };

let cipherKey = new VigenereTransposisi("rangga");
console.log(cipherKey.decrypt(cipherKey.encrypt("tugasmakalah")));