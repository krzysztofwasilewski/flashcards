/**
 * Generates a random string of random hex charters (0–f).
 * @param length {number} – the length of the id to be generated, 20 is good. 
 * @returns {string}
 */
export default function (length) {
    return new Array(length).fill('').map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}