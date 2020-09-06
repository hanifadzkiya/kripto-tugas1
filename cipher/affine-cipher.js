import {Cipher} from "./cipher.js";

class AffineCipher extends Cipher {
    constructor(m, b) {
        super(new Key(m, b));
    }

    encrypt(plain) {
        plain = plain.toUpperCase();
        let encryptedText = "";
        [...plain].forEach(c => {
            encryptedText += String.fromCharCode((this.key.m * (c.charCodeAt(0) - 65) + this.key.b) % 26 + 65);
        });
        return encryptedText;
    }

    decrypt(encryptedText) {
        encryptedText = encryptedText.toUpperCase();
        let decryptedText = "";
        let invers = this.modInverse(this.key.m, 26);
        [...encryptedText].forEach(c => {
            decryptedText += String.fromCharCode((invers * (c.charCodeAt(0) - 65 - this.key.b + 26) % 26) + 65);
        });
        return decryptedText;
    }

    modInverse(a, b) {
        a %= b;
        for (var x = 1; x < b; x++) {
            if ((a*x)%b == 1) {
                return x;
            }
        }
    }

}

class Key {
    constructor(m, b) {
        this.m = m;
        this.b = b;
    }
}

let cipher = new AffineCipher(7, 10);
console.log(cipher.decrypt(cipher.encrypt("kripto")));