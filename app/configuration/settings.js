const fs = require('fs')

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
const itIsStrategies = {
    IMMER: 'IMMER',
    VOLLE_STUNDE: 'VOLLE_STUNDE',
    NIE: 'NIE'
}
const twentyMinutesStrategies = {
    ZWANZIG_NACH: 'ZWANZIG_NACH',
    ZEHN_VOR_HALB: 'ZEHN_VOR_HALB'
}
const fourtyMinutesStrategies = {
    ZWANZIG_VOR: 'ZWANZIG_VOR',
    ZEHN_NACH_HALB: 'ZEHN_NACH_HALB'
}

let quarterPastStrategy = quarterPastStrategies.VIERTEL
let quarterToStrategy = quarterToStrategies.DREIVIERTEL
let oClockStrategy = oClockStrategies.MIT_UHR
let itIsStrategy = itIsStrategies.VOLLE_STUNDE
let twentyMinutesStrategy = twentyMinutesStrategies.ZWANZIG_NACH
let fourtyMinutesStrategy = fourtyMinutesStrategies.ZWANZIG_VOR

// schedule
const schedule = [
    {
        startDay: 0,
        startTime: { h: 0, m: 0, s: 0},
        endDay: 6,
        endTime: { h: 24, m: 0, s: 0},
        color: null,
        brightness: 60
    }
]

// save and load config
let saveConfiguration = null

if (process.env.CONFIG) {
    fs.readFile(process.env.CONFIG, (error, data) => {
        if (!error) {
            try {
                const data = JSON.parse(data)

                if (data.quarterPastStrategy) { quarterPastStrategy = data.quarterPastStrategy }
                if (data.quarterToStrategy) { quarterToStrategy = data.quarterToStrategy }
                if (data.oClockStrategy) { oClockStrategy = data.oClockStrategy }
                if (data.itIsStrategy) { itIsStrategy = data.itIsStrategy }
                if (data.twentyMinutesStrategy) { twentyMinutesStrategy = data.twentyMinutesStrategy }
                if (data.fourtyMinutesStrategy) { fourtyMinutesStrategy = data.fourtyMinutesStrategy }

                if (data.schedule) { schedule = data.schedule}

                if (data.selectedStrategy) { selectedStrategy = data.selectedStrategy}
                if (data.brightness) { brightness = data.brightness}
            } catch (e) {

            }
        }
    })

    saveConfiguration = () {
        fs.writeFile(process.env.CONFIG, JSON.stringify({
            quarterPastStrategy: quarterPastStrategy,
            quarterToStrategy: quarterToStrategy,
            oClockStrategy: oClockStrategy,
            itIsStrategy: itIsStrategy,
            twentyMinutesStrategy: twentyMinutesStrategy,
            fourtyMinutesStrategy: fourtyMinutesStrategy,
            schedule: schedule,
            selectedStrategy: selectedStrategy,
            brightness: brightness
        }))
    }
}

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
        setFixedValue: value => brightness = Math.min(Math.max(0, value), 100),
        outputRange: {
            minimum: 1,
            maximum: 100
        }
    },
    color: {
        get: pixel => colors[pixel],
        set: (pixel, value) => colors[pixel] = value,
        getAll: () => colors,
        setAll: (values) => setColors(values),
        setAllUniform: (value) => setColors(Array.from(new Array(LED_COUNT), () => value))
    },
    words: {
        QuarterPastStrategies: quarterPastStrategies,
        QuarterToStrategies: quarterToStrategies,
        OClockStrategies: oClockStrategies,
        ItIsStrategies: itIsStrategies,
        TwentyMinutesStrategies: twentyMinutesStrategies,
        FourtyMinutesStrategies: fourtyMinutesStrategies,
        getQuarterPastStrategy: () => quarterPastStrategy,
        getQuarterToStrategy: () => quarterToStrategy,
        getOClockStrategy: () => oClockStrategy,
        getItIsStrategy: () => itIsStrategy,
        getTwentyMinutesStrategy: () => twentyMinutesStrategy,
        getFourtyMinutesStrategy: () => fourtyMinutesStrategy,
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
        },
        setItIsStrategy: (value) => {
            if (Object.values(itIsStrategies).indexOf(value) > -1) {
                itIsStrategy = value
            } else {
                throw new TypeError(`'${value}' is not an accepted value for this property`)
            }
        },
        setTwentyMinutesStrategy: (value) => {
            if (Object.values(twentyMinutesStrategies).indexOf(value) > -1) {
                twentyMinutesStrategy = value
            } else {
                throw new TypeError(`'${value}' is not an accepted value for this property`)
            }
        },
        setFourtyMinutesStrategy: (value) => {
            if (Object.values(fourtyMinutesStrategies).indexOf(value) > -1) {
                fourtyMinutesStrategy = value
            } else {
                throw new TypeError(`'${value}' is not an accepted value for this property`)
            }
        }
    },
    schedule: schedule,
    trySaveConfig: () => {
        if (saveConfiguration) { saveConfiguration() }
    }
}
