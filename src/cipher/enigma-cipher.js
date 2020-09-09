import { Cipher } from "./cipher.js";
import { WRONG_KEY_FORMAT } from '../constants.js';

const MINIMUM_KEY_ERROR = 'Key must be at minimum of 3 characters!';
const REVERSED_ALPHABETS = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

function alphabetPosition(chr) {
    return chr.charCodeAt() - 'A'.charCodeAt();
}

class EnigmaCipher extends Cipher {

    constructor(key) {
        super(key);
        if (key.length < 3) {
            alert(MINIMUM_KEY_ERROR);
            throw WRONG_KEY_FORMAT;
        }
    }

    encrypt(plain) {
        const rotor = [...this.key.slice(0, 3).toUpperCase()].map(chr => alphabetPosition(chr) % 26);
        return [...plain].map(chr => {
            const plainPosition = alphabetPosition(chr);
            const outputPosition = (plainPosition + rotor.reduce((a, b) => a + b, 0)) % 26;
            const chrOutput = REVERSED_ALPHABETS[outputPosition];

            rotor[2] += 1;
            if (rotor[2] === 26) {
                rotor[2] = 0;
                rotor[1] += 1;
            }
            if (rotor[1] === 26) {
                rotor[1] = 0;
                rotor[0] += 1;
            }
            if (rotor[0] === 26) {
                rotor[0] = 0;
            }

            return chrOutput;
        }).join('');
    }

    decrypt(encryptedText) {
        return this.encrypt(encryptedText);
    }

}

export { EnigmaCipher };
