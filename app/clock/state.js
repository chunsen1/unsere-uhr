/** 
 * @typedef {Object} State
 * @property {Array} leds The LED indices which should be rendered.
 * @property {Array} log The word log (for debugging purposes).
 * @property {number} minutes The minute for the current render cycle.
 * @property {number} hour The hour for the current render cycle.
 * @property {Function} initState Initializer for the next render cycle.
*/
const state = {
    leds: [],
    log: [],
    minutes: 0,
    hour: 0,
    initState: (hour, minutes) => {
        state.leds = [],
        state.log = [],
        state.minutes = minutes,
        state.hour = hour
    }
}

// exports
module.exports = state
