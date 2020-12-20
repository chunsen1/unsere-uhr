const mcpadc = require('mcp-spi-adc')
const MA = require('moving-average')
const S = require('../configuration/settings')
const scale = require('../utils/scale')
const { createBuffer } = require('../utils/value-buffer')
const schedule = require('../utils/schedule')
const GestureBuffer = require('../utils/GestureBuffer')

// module status
let initialized = 0

// value buffer
const VB = createBuffer(24 * 60 * 60 * 10) // 24 hours, 60 minutes, 60 seconds, 10 values/s
let gb = new GestureBuffer()

// moving average
let timespan = S.light.getTimeSpan() * 1000
let average = MA(timespan)

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
            gb.push(reading.value)
            const gesture = gb.checkGestures()
            if (gesture) {
                console.log('Gesture: ', gesture.low, gesture.high)
            }
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
