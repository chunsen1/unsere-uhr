const mcpadc = require('mcp-spi-adc')
const MA = require('moving-average')
const S = require('../configuration/settings')
const scale = require('../utils/scale')
const { createBuffer } = require('../utils/value-buffer')
const schedule = require('../utils/schedule')

// module status
let initialized = 0

// value buffer
const VB = createBuffer(24 * 60 * 60 * 10) // 24 hours, 60 minutes, 60 seconds, 10 values/s
const GestureBuffer = createBuffer(2 * 10) // 2s
 
// moving average
let timespan = S.light.getTimeSpan() * 1000
let average = MA(timespan)

// check gestures
function checkGestures(b) {
    const threshold = 0.2
    let low = false
    let count = 0

    for (let i = 0; i < b.length; i += 1) {
        if (b[i] > threshold) {
            low = false
        } else {
            if (low = false) {
                count += 1
            }

            low = true
        }
    }

    if (count >= 4) {
        console.log("Geste 1")
    }

    if (count >= 2) {
        console.log("Geste 2")
    }
}

// open sensor and set reading interval
let lightSensor = mcpadc.openMcp3008(0, { speedHz: 1350000 }, e => {
    if (e) {
        console.log(e)
        console.log('SPI NOT INITIALIZED!')
        initialized = -1
        return;
    }
    
    setInterval(() => {
        lightSensor.read((err, reading) => {
            if (err) throw err;
            
            average.push(Date.now(), reading.value)
            VB.pushValue(reading.value)
            GestureBuffer.pushValue(reading.value)
        })
    }, S.light.getReadInterval())
})

// brightness function
let getBrightness = () => {
    if (S.brightness.getStrategy() === S.brightness.STRATEGIES.AMBIENT_LIGHT) {
        return scale(average.movingAverage())
    }

    if (S.brightness.getStrategy() === S.brightness.STRATEGIES.SCHEDULE) {
        const current = schedule.getCurrentScheduleItem()
        return Number.isInteger(current.brightness) ? current.brightness : scale(average.movingAverage())
    }

    // default strategy: fixed value
    return S.brightness.getFixedValue()
}

// exports
module.exports = {
    getBrightness: getBrightness
}
