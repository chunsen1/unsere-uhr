const leds = require('./hardware/leds'),
      LL = require('./configuration/led-layout'),
      timeMapping = require('./clock/timeMapping'),
      state = require('./clock/state'),
      is = require('./utils/is'),
      schedule = require('./utils/schedule')

module.exports = (dateTime) => {
    let date = dateTime ? dateTime : new Date(Date.now())

    // initialize the state
    state.initState(date.getHours(), date.getMinutes())

    // clear old LED states
    leds.clear()

    // check schedule
    const active = schedule.applySchedule(date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds())

    // determine which LEDs should be activated
    if (active) {
        state.leds.push(LL.esIst)
        timeMapping.setMinutes(state)
        timeMapping.setHours(state)
        timeMapping.setSmallMinutes(state)

        // render the result
        leds.lightLeds(state.leds)
        leds.render()
    }
}
