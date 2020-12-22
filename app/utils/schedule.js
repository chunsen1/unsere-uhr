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

let currentItem = null

function updateCurrentScheduleItem(day, hour, minute, second) {
    currentItem = determineScheduleItem(day, hour, minute, second)
    return currentItem || !settings.brightness.getStrategy() === settings.brightness.STRATEGIES.SCHEDULE
}

function getCurrentScheduleItem() {
    return currentItem
}

module.exports = {
    updateCurrentScheduleItem, getCurrentScheduleItem
}
