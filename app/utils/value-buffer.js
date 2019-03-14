const length = 24 * 60 * 60 * 10 // 24 hours, 60 minutes, 60 seconds, 10 values/s
const values = []
let index = 0

/**
 * Add a value to the value buffer.
 * 
 * @param {number} value The actual value 
 */
function pushValue(value) {
    // assign value
    values[index] = value

    // increment
    index += 1

    // reset if the maximum index was reached
    if (index >= length) {
        index = 0
    }
}

/**
 * Returns the next index and all values.
 */
function getStatus() {
    return {
        index, values
    }
}

module.exports = {
    pushValue, getStatus
}
