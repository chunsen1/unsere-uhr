const LL = require('../configuration/led-layout'),
      W = require('../configuration/settings').words

// es ist ... (uhr)
function between0and4(state) {
    if (W.getOClockStrategy() === W.OClockStrategies.MIT_UHR) {
        state.log.push("uhr")
        state.leds.push(LL.uhr)
    }
}

// es is 5 nach ...
function between5and9(state) {
    state.log.push("5", "nach")
    state.leds.push(LL.mFuenf)
    state.leds.push(LL.nach)
}

// es ist 10 nach ...
function between10and14(state) {
	state.log.push("10", "nach")
    state.leds.push(LL.mZehn)
    state.leds.push(LL.nach)
}

// viertel nach / viertel ...+1
function between15and19(state) {
    if (W.getQuarterPastStrategy() === W.QuarterPastStrategies.VIERTEL) {
        state.log.push("viertel", "h+1")
        state.leds.push(LL.viertel)
        state.hour += 1
    } else {
        state.log.push("viertel", "nach")
        state.leds.push(LL.viertel)
        state.leds.push(LL.nach)
    }
}

// es ist zwanzig nach ...
function between20and24(state) {
    state.log.push("zwanzig", "nach")
    state.leds.push(LL.mZwanzig)
    state.leds.push(LL.nach)
}

// es ist 5 vor halb ...+1
function between25and29(state) {
    state.log.push("fuenf", "vor", "halb", "h+1")
    state.leds.push(LL.mFuenf)
    state.leds.push(LL.vor)
    state.leds.push(LL.halb)
    state.hour += 1
}

// es ist halb ...+1
function between30and34(state) {
    state.log.push("halb", "h+1")
    state.leds.push(LL.halb)
    state.hour += 1
}

// es ist 5 nach halb ...+1
function between35and39(state) {
	state.log.push("fünf", "nach", "halb", "h+1")
    state.leds.push(LL.mFuenf)
    state.leds.push(LL.nach)
    state.leds.push(LL.halb)
    state.hour += 1
}

// es ist 20 vor ...+1
function between40and44(state) {
	state.log.push("zwanzig", "vor", "h+1")
    state.leds.push(LL.mZwanzig)
    state.leds.push(LL.vor)
    state.hour += 1
}

// es ist dreiviertel ...+1
function between45and49(state) {
    if (W.getQuarterToStrategy() === W.QuarterToStrategies.DREIVIERTEL) {
        state.log.push("dreiviertel", "h+1")
        state.leds.push(LL.dreiviertel)
    } else {
        state.log.push("viertel", "vor", "h+1")
        state.leds.push(LL.viertel)
        state.leds.push(LL.vor)
    }

    state.hour += 1
}

// es ist 10 vor ...+1
function between50and54(state) {
    state.log.push("zehn", "vor", "h+1")
    state.leds.push(LL.mZehn)
    state.leds.push(LL.vor)
    state.hour += 1
}

// es ist 5 vor ...+1
function between55and59(state) {
    state.log.push("fünf", "vor", "h+1")
    state.leds.push(LL.mFuenf)
    state.leds.push(LL.vor)
    state.hour += 1
}

module.exports = {
    between0and4: between0and4,
    between5and9: between5and9,
    between10and14: between10and14,
    between15and19: between15and19,
    between20and24: between20and24,
    between25and29: between25and29,
    between30and34: between30and34,
    between35and39: between35and39,
    between40and44: between40and44,
    between45and49: between45and49,
    between50and54: between50and54,
    between55and59: between55and59
}
