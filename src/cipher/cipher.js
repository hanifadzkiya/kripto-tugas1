class Cipher {
    constructor(key) {
        this.key = key;
    }

    removeSpace(text) {
        return text.replace(/ /gi, "");
    }
}

export { Cipher };