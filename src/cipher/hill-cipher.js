import { Cipher } from './cipher.js';
import { WRONG_KEY_FORMAT } from '../constants.js';

const KEY_NOT_INVERTIBLE = 'Inserted key is not invertible, please try with another key!';
const DETERMINANT_NOT_COPRIME = 'Inserted key has determinant that is not coprime with 26, please try with another key!';

function inverseModulo(divisor, modulo) {
    let divisorModulo = divisor % modulo;
    for (let x = 1; x < modulo; x++) {
        if ((divisorModulo * x) % modulo === 1) {
            return x;
        }
    }
}

function greatestCommonDivisor(a, b) {
    if (b === 0) return a;
    return greatestCommonDivisor(b, a%b);
}

function inverseMatrixModulo(matrix, modulo) {
    const [
        [a, b, c],
        [d, e, f],
        [g, h, i]
    ] = matrix;

    const determinant = a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g);
    if (determinant === 0) {
        alert(KEY_NOT_INVERTIBLE);
        throw WRONG_KEY_FORMAT;
    }
    if (greatestCommonDivisor(determinant, 26) !== 1) {
        alert(DETERMINANT_NOT_COPRIME);
        throw WRONG_KEY_FORMAT;
    }
    const multiplicator = inverseModulo(determinant, modulo);

    return [
        [e*i - f*h, c*h - b*i, b*f - c*e],
        [f*g - d*i, a*i - c*g, c*d - a*f],
        [d*h - e*g, b*g - a*h, a*e - b*d]
    ].map(row => row.map(val => (((val*multiplicator) % 26) + 26) % 26));
}

function multiplyMatrixWithString(matrix, string) {
    const missingCharacters = (3 - (string.length % 3)) % 3;
    const appendedString = string.toUpperCase() + 'X'.repeat(missingCharacters);

    const splitPerThree = appendedString.toUpperCase().match(/.{1,3}/g) || [''];
    
    let result = '';
    splitPerThree.forEach(triplet =>
        [...triplet].forEach((_, i) =>
            result += String.fromCharCode('A'.charCodeAt() +
                [...triplet].reduce((tot, chr, j) => (tot + (chr.charCodeAt() - 'A'.charCodeAt()) * matrix[i][j]) % 26, 0)
            )
        )
    );
    return result;
}

class HillCipher extends Cipher {
    constructor(key) {
        super(key);
        const letters = /^[A-Za-z]+$/;
        if (key.length !== 9 || !key.match(letters)) {
            alert(WRONG_KEY_FORMAT);
            throw WRONG_KEY_FORMAT;
        }
        const splitPerThree = key.toUpperCase().match(/.{1,3}/g);
        this.matrix = splitPerThree.map(row => [...row].map(chr => (chr.charCodeAt() - 'A'.charCodeAt()) % 26));
        this.inverse = inverseMatrixModulo(this.matrix, 26);
    }

    encrypt(plain) {
        return multiplyMatrixWithString(this.matrix, plain);
    }

    decrypt(encryptedText) {
        return multiplyMatrixWithString(this.inverse, encryptedText);
    }
}

export { HillCipher };
