import { Cipher } from "./cipher.js";

class VigenereFull extends Cipher {

    constructor(key) {
        super(key);
        this.transformTable = this.generateMatrixKey();
    }

    encrypt(plain) {
        let indexKey = 0;
        let encryptText = "";
        let uppercasePlain = plain.toUpperCase();
        [...uppercasePlain].forEach(c => {
            let posCharKey = this.getPosCharacter(this.key[indexKey]);
            let posPlainKey = this.getPosCharacter(c);
            let posTableKey = this.transformTable[posPlainKey][posCharKey];
            encryptText += posTableKey;
            indexKey = (indexKey + 1) % this.key.length;
        })
        return encryptText;
    }

    decrypt(encryptedText) {
        let indexKey = 0;
        let plainText = "";
        [...encryptedText].forEach(c => {
            plainText += this.findPlainChar(c, this.key[indexKey]);
            indexKey = (indexKey + 1) % this.key.length;
        })
        return plainText;
    }

    getPosCharacter(char) {
        let upperChar = char.toUpperCase();
        return upperChar.charCodeAt(0) - 65;
    }

    generateMatrixKey() {
        let matrixKey = Array.from(Array(26), () => new Array(26));
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 26; j++) {
                matrixKey[i][j] = String.fromCharCode(((i + j) % 26) + 65);
            }
        }
        for (let i = 0; i < 1000;i++) {
            let randomX = Math.floor(Math.random() * 26);
            let randomXAksen = Math.floor(Math.random() * 26);
            let randomY = Math.floor(Math.random() * 26);
            let tmp = matrixKey[randomX][randomY];
            matrixKey[randomX][randomY] = matrixKey[randomXAksen][randomY];
            matrixKey[randomXAksen][randomY] = tmp;
        }
        return matrixKey;
    }

    findPlainChar(cipher, key) {
        for (let i = 0; i < 26; i++) {
            if (this.transformTable[i][this.getPosCharacter(key)] == cipher) {
                return String.fromCharCode(i + 65);
            }
        }
    }

}

export { VigenereFull };

let cipherKey = new VigenereFull("halo");
console.log(cipherKey.decrypt(cipherKey.encrypt("hanifadzkiya")));
