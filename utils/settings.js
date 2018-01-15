// brightness strategy
const brightnessStrategies = {
    AMBIENT_LIGHT: 'AMBIENT_LIGHT',
    FIXED_VALUE: 'FIXED_VALUE',
    SCHEDULE: 'SCHEDULE'
} 
let selectedStrategy = brightnessStrategies.AMBIENT_LIGHT
let brightness = 60

// light sensor
let ambientLightTimeSpan = 10
let ambientLightMin = 0
let ambientLightMax = 0.5
let ambientLightReadInterval = 100 // needs restart

// LED configuration
const LED_COUNT = 224,
      colors = new Uint32Array(LED_COUNT)

function setColors(values) {
    if (Array.isArray(values) && values.length === LED_COUNT) {
        values.forEach((val, idx) => colors[idx] = val)
        return true
    }

    return false
}

// set initial colors to white
setColors(Array.from(new Array(LED_COUNT), () => 0xffffff))

// exports
module.exports = {
    light: {
        getTimeSpan: () => ambientLightTimeSpan,
        setTimeSpan: timeSpan => ambientLightTimeSpan = timeSpan,
        getMinimum: () => ambientLightMin,
        setMinimum: minimum => ambientLightMin = minimum,
        getMaximum: () => ambientLightMax,
        setMaximum: maximum => ambientLightMax = maximum,
        getReadInterval: () => ambientLightReadInterval,
        setReadInterval: readInterval => ambientLightReadInterval = readInterval,
    },
    brightness: {
        STRATEGIES: brightnessStrategies,
        getStrategy: () => selectedStrategy,
        setStrategy: strategy => selectedStrategy = brightnessStrategies[strategy],
        getFixedValue: () => brightness,
        setFixedValue: value => brightness = Math.min(Math.max(0, value), 100)
    },
    color: {
        get: pixel => colors[pixel],
        set: (pixel, value) => colors[pixel] = value,
        getAll: () => colors,
        setAll: (values) => setColors(values)
    },
    words: {
        // viertel nach x // viertel x+1 // issue #8
        // es ist x // es ist x uhr // issue #9
        // viertel vor x // dreiviertel x // issue #10
    }
}