const state = {
    leds: [],
    log: [],
    minutes: 0,
    hour: 0,
    initState: (hour, minutes) => {
        state.leds = [],
        state.log = [],
        state.minutes = minutes,
        state.hour = hour
    }
}

function is(v) {
    let a, b
    return {
        between: (lower, upper) => {
            a = lower
            b = upper

            return {
                then: (cb) => (v >= a && v <= b) ? cb(state) : false
            }
        }
    }
}

module.exports = {
    state: state,
    is: is
}
