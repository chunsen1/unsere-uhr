const leds = require('./hardware/leds'),
      timeMapping = require('./clock/timeMapping'),
      state = require('./clock/state'),
      schedule = require('./utils/schedule')

module.exports = (dateTime) => {
    let date = dateTime ? dateTime : new Date(Date.now())

    // initialize the state
    state.initState(date.getHours(), date.getMinutes())

    // clear old LED states
    leds.clear()

    // check schedule (might influence brightness and color settings)
    const active = schedule.updateCurrentScheduleItem(date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds())

    // determine which LEDs should be activated
    if (active) {
        timeMapping.setItIs(state)
        timeMapping.setMinutes(state)
        timeMapping.setHours(state)
        timeMapping.setSmallMinutes(state)

        // render the result
        leds.lightLeds(state.leds)
        leds.render()
    }
}
