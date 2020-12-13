const S = require('../configuration/settings')

// scale function
const output_min = S.brightness.outputRange.minimum
const output_max = S.brightness.outputRange.maximum

/**
 * Scales the ambient light reading to the LED brightness range.
 * 
 * @param {number} value The value which should be scaled to the configured output range.
 * @returns {number} The scale result
 */
let scale = value => {
    let y = output_min + (output_max - output_min) * (value - S.light.getMinimum()) / (S.light.getMaximum() - S.light.getMinimum())

    y = Math.max(output_min, y)
    y = Math.min(output_max, y)

    return y
}

// exports
module.exports = scale
