import { Cipher } from "./cipher.js";

class PlayfairCipher extends Cipher {

    constructor(key) {
        super(PlayfairCipher.constructMatrixFromKey(key));
    }

    encrypt(plain) {
        plain = this.preprocessingPlainText(plain);
        let encryptedText = "";
        for (let index = 0;index < plain.length;index += 2) {
            let positionLeft = this.findCharInKey(plain[index]);
            let positionRight = this.findCharInKey(plain[index + 1]);
            if (positionLeft.x == positionRight.x) {
                encryptedText += this.key[positionLeft.x][(positionLeft.y + 1) % 5];
                encryptedText += this.key[positionRight.x][(positionRight.y + 1) % 5];
            } else if (positionLeft.y == positionRight.y) {
                encryptedText += this.key[(positionLeft.x + 1) % 5][positionLeft.y];
                encryptedText += this.key[(positionRight.x + 1) % 5][positionRight.y];
            } else {
                encryptedText += this.key[positionLeft.x][positionRight.y];
                encryptedText += this.key[positionRight.x][positionLeft.y];
            }
        }
        return encryptedText;
    }

    decrypt(encryptedText) {
        let plain = "";
        for (let index = 0;index < encryptedText.length;index += 2) {
            let positionLeft = this.findCharInKey(encryptedText[index]);
            let positionRight = this.findCharInKey(encryptedText[index + 1]);
            if (positionLeft.x == positionRight.x) {
                plain += this.key[positionLeft.x][(positionLeft.y + 4) % 5];
                plain += this.key[positionRight.x][(positionRight.y + 4) % 5];
            } else if (positionLeft.y == positionRight.y) {
                plain += this.key[(positionLeft.x + 4) % 5][positionLeft.y];
                plain += this.key[(positionRight.x + 4) % 5][positionRight.y];
            } else {
                plain += this.key[positionLeft.x][positionRight.y];
                plain += this.key[positionRight.x][positionLeft.y];
            }
        }
        if (plain[plain.length - 1] == "X" && (plain.length % 2 == 0)) {
            plain = plain.slice(0,plain.length - 1);
        }
        for (let index = 1;index < plain.length-1;index++) {
            if (plain[index] == "X" && (plain[index - 1] == plain[index + 1])) {
                plain = plain.slice(0,index) + plain.slice(index + 1);
            }
        }
        return plain;
    }

    preprocessingPlainText(plain) {
        let result = plain.replace(/ /gi, "");
        result = result.toUpperCase();
        result = result.replace(/J/gi,"I");
        let index = 0;
        while (index < result.length) {
            if (result[index] == result[index - 1]) {
                result = result.slice(0,index) + "X" + result.slice(index);
                index += 1;
            }
            index += 1;
        }
        if (result.length % 2) {
            result = result + "X";
        }
        return result;
    }

    static constructMatrixFromKey(key) {
        key = key.replace(/ /gi, "");
        key = key.toUpperCase();
        key = key.replace(/J/gi, "");
        let noDuplicateKey = "";
        while (key.length > 0) {
            noDuplicateKey += key[0];
            key = key.replace(new RegExp(key[0], "gi"), "");
        }
        let alphabet = "ABCDEFGHIKMNOPQRSTUVWXYZ";
        [...alphabet].forEach(a => {
            if (noDuplicateKey.search(a) == -1) {
                noDuplicateKey += a;
            }
        });
        let matrixKey = Array.from(Array(5), () => new Array(5));
        for (let i = 0;i < 25;i++) {
            matrixKey[Math.floor(i / 5)][i % 5] = noDuplicateKey[i];
        }
        return matrixKey;
    }

    findCharInKey(character) {
        for (let i = 0;i < 5;i++) {
            for (let j = 0;j < 5;j++) {
                if (this.key[i][j] == character) {
                    return new Position(i,j);
                }
            }
        }
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let cipherKey = new PlayfairCipher("halo");
console.log(cipherKey.decrypt(cipherKey.encrypt("hanifadzkiya")));