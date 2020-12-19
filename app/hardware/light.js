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
let GestureBuffer = []

// moving average
let timespan = S.light.getTimeSpan() * 1000
let average = MA(timespan)

// check gestures
function checkGestures() {
    const threshold = 0.05
    let low = false
    let countToLow = 0
    let countToHigh = 0
    let startedAt = -1

    for (let i = 0; i < GestureBuffer.length; i += 1) {
        if (GestureBuffer[i] > threshold) {
            if (low && countToHigh + 1 === countToLow) {
                countToHigh += 1
            }

            if (countToHigh === 1 && startedAt < 0) {
                startedAt = GestureBuffer.length - 1
            }

            low = false
        } else {
            if (low == false) {
                countToLow += 1
            }

            low = true
        }
    }

    if (startedAt >= 0) {
        console.log('Gesture: ', countToLow)

        startedAt = -1
        countToLow = 0
        low = false
        GestureBuffer = []
    }

    if (GestureBuffer.length > 50) {
        GestureBuffer = []
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
            GestureBuffer.push(reading.value)
            checkGestures()
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
