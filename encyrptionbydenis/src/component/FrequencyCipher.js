import React, { useState } from 'react';

const FrequencyCipher = () => {
  const [inputText, setInputText] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const letterFrequencies = {
    a: 8.12, b: 1.49, c: 2.71, d: 4.32, e: 12.02, f: 2.30, g: 2.03,
    h: 5.92, i: 7.31, j: 0.10, k: 0.69, l: 3.98, m: 2.61, n: 6.95,
    o: 7.68, p: 1.82, q: 0.11, r: 6.02, s: 6.28, t: 9.10, u: 2.88,
    v: 1.11, w: 2.09, x: 0.17, y: 2.11, z: 0.07
  };

  const frequencyOrder = Object.keys(letterFrequencies).sort((a, b) => letterFrequencies[b] - letterFrequencies[a]);

  const encrypt = (plaintext) => {
    // Existing substitution mapping
    const substitution = {
      'a': 'e', 'b': 't', 'c': 'o', 'd': 'n', 'e': 'i',
      'f': 's', 'g': 'r', 'h': 'h', 'i': 'l', 'j': 'u',
      'k': 'd', 'l': 'w', 'm': 'm', 'n': 'c', 'o': 'f',
      'p': 'y', 'q': 'p', 'r': 'j', 's': 'v', 't': 'k',
      'u': 'g', 'v': 'x', 'w': 'z', 'x': 'q', 'y': 'a',
      'z': 'b'
    };

    let ciphertext = '';
    for (let ch of plaintext) {
      if (/[a-zA-Z]/.test(ch)) { // Check if ch is an alphabet character
        const lowerChar = ch.toLowerCase();
        ciphertext += substitution[lowerChar].toUpperCase();
      } else {
        ciphertext += ch; // Non-alphabetic characters remain unchanged
      }
    }

    return ciphertext;
  };

  const decrypt = (ciphertext) => {
    const frequencyCount = {};

    // Count the frequency of each character in the ciphertext
    for (let char of ciphertext) {
      if (/[A-Z]/.test(char)) { // Check if char is an uppercase alphabet character
        const lowerChar = char.toLowerCase();
        frequencyCount[lowerChar] = (frequencyCount[lowerChar] || 0) + 1;
      }
    }

    // Sort characters by frequency (most common first)
    const sortedFrequency = Object.entries(frequencyCount).sort((a, b) => b[1] - a[1]);
    const substitution = {};

    // Map each character in sorted frequency to the frequency order based on letterFrequencies
    sortedFrequency.forEach(([char], index) => {
      if (index < frequencyOrder.length) {
        substitution[char] = frequencyOrder[index]; // Map to lowercase for plaintext
      }
    });

    // Decrypt the ciphertext using the substitution mapping
    let result = '';
    for (let char of ciphertext) {
      if (/[A-Z]/.test(char)) { // Check if char is an uppercase alphabet character
        const lowerChar = char.toLowerCase();
        result += substitution[lowerChar] || lowerChar; 
      } else {
        result += char; // Non-alphabetic characters remain unchanged
      }
    }

    return result.toLowerCase(); // Ensure decrypted text is in lowercase
  };

  const handleEncrypt = () => {
    const encryptedText = encrypt(inputText);
    setCipherText(encryptedText);
  };

  const handleDecrypt = () => {
    const decryptedText = decrypt(cipherText);
    setDecryptedText(decryptedText);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-yellow-200 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Frequency-Based Encryption & Decryption</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Encrypt Text</h2>
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter plain text (lowercase)"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          onClick={handleEncrypt}
        >
          Encrypt
        </button>

        <h2 className="text-xl font-semibold mb-2 mt-6">Cipher Text</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={cipherText}
          readOnly
          placeholder="Encrypted text (uppercase)"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Decrypt Cipher</h2>
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={cipherText}
          onChange={(e) => setCipherText(e.target.value)}
          placeholder="Enter cipher text to decrypt"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          onClick={handleDecrypt}
        >
          Decrypt
        </button>

        <h2 className="text-xl font-semibold mb-2 mt-6">Decrypted Text</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={decryptedText}
          readOnly
          placeholder="Decrypted text"
        />
      </div>
    </div>
  );
};

export default FrequencyCipher;
