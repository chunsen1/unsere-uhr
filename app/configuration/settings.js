const LED_COUNT = require('./led-layout').getLedCount()

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

// color configuration
const colors = new Uint32Array(LED_COUNT)

function setColors(values) {
    if (Array.isArray(values) && values.length === LED_COUNT) {
        values.forEach((val, idx) => colors[idx] = val)
        return true
    }

    return false
}

// set initial colors to white
setColors(Array.from(new Array(LED_COUNT), () => 0xffffff))

// text configuration
const quarterPastStrategies = {
    VIERTEL_NACH: 'VIERTEL_NACH',
    VIERTEL: 'VIERTEL'
}
const quarterToStrategies = {
    VIERTEL_VOR: 'VIERTEL_VOR',
    DREIVIERTEL: 'DREIVIERTEL'
}
const oClockStrategies = {
    MIT_UHR: 'MIT_UHR',
    OHNE_UHR: 'OHNE_UHR'
}

let quarterPastStrategy = quarterPastStrategies.VIERTEL
let quarterToStrategy = quarterToStrategies.DREIVIERTEL
let oClockStrategy = oClockStrategies.MIT_UHR

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
        QuarterPastStrategies: quarterPastStrategies,
        QuarterToStrategies: quarterToStrategies,
        OClockStrategies: oClockStrategies,
        getQuarterPastStrategy: () => quarterPastStrategy,
        getQuarterToStrategy: () => quarterToStrategy,
        getOClockStrategy: () => oClockStrategy,
        setQuarterPastStrategy: (value) => {
            if (Object.values(quarterPastStrategies).indexOf(value) > -1) {
                quarterPastStrategy = value
            } else {
                throw new TypeError(`'${value}' is not an accepted value for this property`)
            }
        },
        setQuarterToStrategy: (value) => {
            if (Object.values(quarterToStrategies).indexOf(value) > -1) {
                quarterToStrategy = value
            } else {
                throw new TypeError(`'${value}' is not an accepted value for this property`)
            }
        },
        setOClockStrategy: (value) => {
            if (Object.values(oClockStrategies).indexOf(value) > -1) {
                oClockStrategy = value
            } else {
                throw new TypeError(`'${value}' is not an accepted value for this property`)
            }
        }
    }
}
