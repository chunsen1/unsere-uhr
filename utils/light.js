const mcpadc = require('mcp-spi-adc')
const MA = require('moving-average')
const S = require('./settings')

// constants
const output_min = 1
const output_max = 100

// module status
let initialized = 0

// moving average
let timespan = S.light.getTimeSpan() * 1000
let average = MA(timespan)

// open sensor and set reading interval
let tempSensor = mcpadc.open(0, { speedHz: 1350000 }, e => {
    if (e) {
        console.log(e)
        initialized = -1
        return;
    }
    
    setInterval(() => {
        tempSensor.read((err, reading) => {
            if (err) throw err;
            
            average.push(Date.now(), reading.value)
        })
    }, S.light.getReadInterval())
})

// scale function
let scale = x => {
    let y = output_min + (output_max - output_min) * (x - S.light.getMinimum()) / (S.light.getMaximum() - S.light.getMinimum())

    y = Math.max(output_min, y)
    y = Math.min(output_max, y)

    return y
}

// exports
module.exports = {
    getBrightness: () => scale(average.movingAverage())
}