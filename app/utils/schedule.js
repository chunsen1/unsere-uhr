// [x] globalen status finden -> uhrzeit
// [x] aus settings.schedule aktuelles intervall finden
// [x] in hardware/light -> getbrightness aufruf hierhin einbauen (fixer wert oder umleitung auf ambient)
// [x] in settings/color -> getcolor aufruf hierhin einbauen
// [ ] http-Endpunkt zur Einstellung!

// [ ] sleep mode bis zum nächsten intervall
// [ ] party-mode bis zum nächsten intervall
// [ ] regenbogen

// [x] es ist nur zur vollen stunde
// [x] 10 vor/nach halb

const settings = require('../configuration/settings')
const is = require('./is')

const toSeconds = (d, h, m, s) => d * 24 * 3600 + h * 3600 + m * 60 + s

function determineScheduleItem(day, hour, minute, second) {
    return settings.schedule.find(x => {
        return is(toSeconds(day, hour, minute, second))
                .between(
                    toSeconds(x.startDay, x.startTime.h, x.startTime.m, x.startTime.s), 
                    toSeconds(x.endDay, x.endTime.h, x.endTime.m, x.endTime.s))
                .then(() => true)
    })
}

function applySchedule(day, hour, minute, second) {
    const item = determineScheduleItem(day, hour, minute, second)

    if (!item) {
        return false
    }

    if (item.color) {
        settings.color.setAllUniform(item.color)
    }

    if (item.brightness) {
        settings.brightness.setFixedValue(item.brightness)
    }

    return item.brightness > 0
}

module.exports = {
    applySchedule
}
