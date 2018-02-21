const state = require('../clock/state')

/**
 * Lets you test ranges fluently.
 * 
 * @example
 * is(5).between(4, 6).then(() => console.log(true))
 * 
 * @param {number} value The value which should be tested.
 */
function is(value) {
    let a, b
    return {
        between: (lower, upper) => {
            a = lower
            b = upper

            return {
                then: (cb) => (value >= a && value <= b) ? cb(state) : false
            }
        }
    }
}

// exports
module.exports = is
