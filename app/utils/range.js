/**
 * Generates an array of integer values.
 * 
 * @param {number} a Start value.
 * @param {number} b End value.
 */
let range = (a, b) => Array.from(Array(b - a + 1), (x, i) => i + a) 

// exports
module.exports = range
