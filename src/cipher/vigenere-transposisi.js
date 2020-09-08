import { Cipher } from "./cipher.js";
import { Vigenere } from "./vigenere.js";
class VigenereTransposisi extends Cipher {

    constructor(key) {
        super(key);
        this.vigenereCipher = new Vigenere(key);
    }

    encrypt(plain) {
        plain = this.removeSpace(plain);
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
        let detransformKey = Math.ceil(encryptedText.length / this.key.length);
        let remainText = "";
        let newEncryptedText = encryptedText;
        for (let i = 0;i < encryptedText.length % this.key.length;i++) {
            let posIndex = (1+i)*detransformKey - 1;
            remainText += encryptedText[posIndex];
            newEncryptedText = newEncryptedText.substring(0, posIndex - i)
                + newEncryptedText.substring(posIndex + 1 - i, newEncryptedText.length);
        }
        detransformKey = Math.ceil(newEncryptedText.length / this.key.length);
        let detransformText = "";
        let pos = 0;
        let started = 0;
        for (let i = 0; i < newEncryptedText.length;i++) {
            detransformText += newEncryptedText[pos];
            pos += detransformKey;
            if (pos >= newEncryptedText.length) {
                started++;
                pos = started;
            }
        }
        detransformText += remainText;
        return this.vigenereCipher.decrypt(detransformText);
    }

}

export { VigenereTransposisi };

let cipherKey = new VigenereTransposisi("sample");
console.log(cipherKey.decrypt(cipherKey.encrypt("kamu dimana")));