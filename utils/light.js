const mcpadc = require('mcp-spi-adc')
const MA = require('moving-average')

// module status
let initialized = 0

// moving average
let timespan = 60 * 1000
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
    }, 100)
})

// scale function
let scale = x => {
    let reading_min = 0
    let reading_max = 0.5
    let output_min = 1
    let output_max = 100

    let y = output_min + (output_max - output_min) * (x - reading_min) / (reading_max - reading_min)

    y = Math.max(output_min, y)
    y = Math.min(output_max, y)

    return y
}

// exports
module.exports = {
    getBrightness: () => scale(average.movingAverage())
}
