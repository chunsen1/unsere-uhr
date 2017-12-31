let ambientLightTimeSpan = 10
let ambientLightMin = 0
let ambientLightMax = 0.5
let ambientLightReadInterval = 100 // needs restart

module.exports = {
    light: {
        getTimeSpan: () => ambientLightTimeSpan,
        getMinimum: () => ambientLightMin,
        getMaximum: () => ambientLightMax,
        getReadInterval: () => ambientLightReadInterval
    }
}