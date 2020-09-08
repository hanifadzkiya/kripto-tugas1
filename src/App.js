import React, { useState } from 'react';

import TextBox from './components/TextBox.js';

import { AffineCipher } from './cipher/affine-cipher.js';
import { HillCipher } from './cipher/hill-cipher.js';
import { PlayfairCipher } from './cipher/playfair-cipher.js';
import { Vigenere } from './cipher/vigenere.js';
import { VigenereAutoKey } from './cipher/vigenere-auto-key.js';
import { VigenereExtended } from './cipher/vigenere-extended.js';
import { VigenereFull } from './cipher/vigenere-full.js';
import { VigenereTransposisi } from './cipher/vigenere-transposisi.js';
import { WRONG_KEY_FORMAT } from './constants.js';

import './App.css';

const CIPHER_OPTIONS = [
  { name: 'Affine',
    class: AffineCipher,
    keyPlaceholder: 'Key, ex: "1,2"',
    getMachine: (key) => {
      try {
        const splitKey = key.split(',');
        const a = parseInt(splitKey[0]);
        const b = parseInt(splitKey[1]);
        if (!a || !b)
          throw WRONG_KEY_FORMAT;
        return new AffineCipher(a, b);
      } catch (err) {
        alert(WRONG_KEY_FORMAT);
        throw WRONG_KEY_FORMAT;
      }
    }
  },
  { name: 'Hill Cipher', class: HillCipher, keyPlaceholder: '9-digit key, ex: "gybnqkurp"'},
  { name: 'Playfair', class: PlayfairCipher},
  { name: 'Vigenere', class: Vigenere },
  { name: 'Vigenere Auto-Key', class: VigenereAutoKey },
  { name: 'Vigenere Extended', class: VigenereExtended, allowBinary: true },
  { name: 'Vigenere Full', class: VigenereFull },
  { name: 'Vigenere Transposisi', class: VigenereTransposisi }
]

function App() {
  const [cipher, setCipher] = useState(null);
  const [key, setKey] = useState('');
  const [plainText, setPlainText] = useState('');
  const [cipherText, setCipherText] = useState('');

  const handleChangeSelector = ({target: {value}}) => {
    setCipher(CIPHER_OPTIONS.find(opt => opt.name === value));
  };

  const renderSelector = () => (
    <select onChange={handleChangeSelector}>
      <option disabled selected value> -- select cipher method -- </option>
      {CIPHER_OPTIONS.map(opt => <option value={opt.name}>{opt.name}</option>)}
    </select>
  );

  const renderKeyInput = () => (
    <input
      type='text'
      placeholder={cipher?.keyPlaceholder || 'Key, ex: "samplekey"'}
      onChange={({target: {value}}) => {
        setKey(value);
        if (cipher && !cipher.name) {
          setCipher(CIPHER_OPTIONS.find(opt => cipher instanceof opt.class));
        }
      }}
    />
  );

  const renderButtonEncode = () => (
    <button onClick={() => {
      if (!cipher) return;
      try {
        const processedText = cipher.allowBinary || CIPHER_OPTIONS.filter(opt => opt.allowBinary && cipher instanceof opt.class).length
          ? plainText
          : plainText.replace(/[^a-z]/gi, '').toUpperCase();
        let encoder;
        if (cipher.name) {
          encoder = cipher.getMachine
            ? cipher.getMachine(key)
            : new cipher.class(key);
          setCipher(encoder);
        } else {
          encoder = cipher;
        }
        setPlainText(processedText);
        setCipherText(encoder.encrypt(processedText));
      } catch (err) {
        if (err !== WRONG_KEY_FORMAT)
          throw err;
      }
    }}>
      {'ENCODE >>'}
    </button>
  );

  const renderButtonDecode = () => (
    <button onClick={() => {
      if (!cipher) return;
      try {
        let decoder;
        if (cipher.name) {
          decoder = cipher.getMachine
            ? cipher.getMachine(key)
            : new cipher.class(key);
          setCipher(decoder);
        } else {
          decoder = cipher;
        }
        setPlainText(decoder.decrypt(cipherText));
      } catch (err) {
        if (err !== WRONG_KEY_FORMAT)
          throw err;
      }
    }}>
      {'<< DECODE'}
    </button>
  );

  return (
    <div className='App'>
       <div className='rows'>
        <div className='row'>
          <TextBox
            cols={40}
            rows={30}
            text={plainText}
            setText={setPlainText}
          />
        </div>
        <div className='row'>
          <div className='options'>
            {renderSelector()}
            {renderKeyInput()}
            {renderButtonEncode()}
            {renderButtonDecode()}
          </div>
        </div>
        <div className='row'>
          <TextBox
            cols={40}
            rows={30}
            text={cipherText}
            setText={setCipherText}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
