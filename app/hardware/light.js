const mcpadc = require('mcp-spi-adc')
const MA = require('moving-average')
const S = require('../configuration/settings')
const scale = require('../utils/scale')
const VB = require('../utils/value-buffer')

// module status
let initialized = 0

// moving average
let timespan = S.light.getTimeSpan() * 1000
let average = MA(timespan)

// open sensor and set reading interval
let lightSensor = mcpadc.open(0, { speedHz: 1350000 }, e => {
    if (e) {
        console.log(e)
        initialized = -1
        return;
    }
    
    setInterval(() => {
        lightSensor.read((err, reading) => {
            if (err) throw err;
            
            average.push(Date.now(), reading.value)
            VB.pushValue(reading.value)
        })
    }, S.light.getReadInterval())
})

// brightness function
let getBrightness = () => {
    if (S.brightness.getStrategy() === S.brightness.STRATEGIES.AMBIENT_LIGHT) {
        return scale(average.movingAverage())
    }

    if (S.brightness.getStrategy() === S.brightness.STRATEGIES.SCHEDULE) {
        // todo: implement ;)
    }

    // default strategy: fixed value
    return S.brightness.getFixedValue()
}

// exports
module.exports = {
    getBrightness: getBrightness
}
