import React, { useState } from 'react';

const SubstitutionCipher = () => {
  const [plainText, setPlainText] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptions, setDecryptions] = useState([]);
  const [shiftValue, setShiftValue] = useState(0);
  const [bestDecryptions, setBestDecryptions] = useState([]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const letterFrequencies = {
    a: 8.12, b: 1.49, c: 2.71, d: 4.32, e: 12.02, f: 2.30, g: 2.03,
    h: 5.92, i: 7.31, j: 0.10, k: 0.69, l: 3.98, m: 2.61, n: 6.95,
    o: 7.68, p: 1.82, q: 0.11, r: 6.02, s: 6.28, t: 9.10, u: 2.88,
    v: 1.11, w: 2.09, x: 0.17, y: 2.11, z: 0.07
  };

  const handlePlainTextChange = (event) => {
    setPlainText(event.target.value.toLowerCase());
  };

  const handleCipherTextChange = (event) => {
    setCipherText(event.target.value.toUpperCase());
  };

  const handleShiftValueChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setShiftValue(isNaN(value) ? 0 : value);
  };

  const encryptText = () => {
    let encryptedText = '';
    for (let i = 0; i < plainText.length; i++) {
      let currentChar = plainText[i].toUpperCase();
      if (alphabet.includes(currentChar)) {
        let index = alphabet.indexOf(currentChar);
        let newIndex = (index + shiftValue) % 26;
        encryptedText += alphabet[newIndex];
      } else {
        encryptedText += plainText[i];
      }
    }
    setCipherText(encryptedText);
  };

  const decryptCipher = () => {
    let results = [];
    for (let shift = 0; shift < 26; shift++) {
      let decryptedText = '';
      for (let i = 0; i < cipherText.length; i++) {
        let currentChar = cipherText[i].toUpperCase();
        if (alphabet.includes(currentChar)) {
          let newIndex = (alphabet.indexOf(currentChar) - shift + 26) % 26;
          decryptedText += alphabet[newIndex].toLowerCase();
        } else {
          decryptedText += currentChar;
        }
      }
      results.push({ shift, text: decryptedText });
    }
    setDecryptions(results);
    findBestDecryptions(results);
  };

  const findBestDecryptions = (results) => {
    const rankedDecryptions = results.map((result) => {
      let score = 0;
      for (let char of result.text) {
        if (letterFrequencies[char]) {
          score += letterFrequencies[char];
        }
      }
      return { ...result, score };
    });

    const bestResults = rankedDecryptions.sort((a, b) => b.score - a.score).slice(0, 5);
    setBestDecryptions(bestResults);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-yellow-200 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Not_so_simple Substitution Cipher</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Encrypt Text</h2>
        <textarea 
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={plainText} 
          onChange={handlePlainTextChange} 
          placeholder="Enter plain text (lowercase)"
        />
        <div className="flex items-center mb-4">
          <input 
            type="number" 
            className="w-20 p-2 border border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={shiftValue} 
            onChange={handleShiftValueChange} 
            placeholder="Shift value" 
          />
          <button 
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            onClick={encryptText}
          >
            Encrypt
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-2">Cipher Text</h2>
        <textarea 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={cipherText} 
          onChange={handleCipherTextChange} 
          placeholder="Encrypted text (uppercase)"
        />
      </div>

      <div className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2">Decrypt Cipher</h2>
        <button 
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          onClick={decryptCipher}
        >
          Decrypt
        </button>

        <h2 className="text-xl font-semibold mb-2 mt-6">Decryption Results</h2>
        <ul className="grid grid-cols-4 list-disc pl-5 border border-gray-800 bg-black/10">
          {decryptions.map((decryption, index) => (
            <li key={index}>
              Shift {decryption.shift}: {decryption.text}
            </li>
          ))}
        </ul>

        <h2 className="text-xl  font-semibold mb-2 mt-6">Best Decryptions (Ranked by Ai function)</h2>
        <ul className="list-disc grid grid-cols-4 pl-5  border border-gray-800 bg-green-600/20">
          {bestDecryptions.map((decryption, index) => (
            <li key={index}>
              Shift {decryption.shift}: {decryption.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubstitutionCipher;
