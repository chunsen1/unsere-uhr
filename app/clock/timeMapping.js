const MF = require('./minutes'),
      W = require('../configuration/settings').words,
      LL = require('../configuration/led-layout'),
      is = require('../utils/is')

/**
 * Given the current time in the state object, this method sets the according LED pins (in the state.leds array) for 5 minute intervals.
 * 
 * @param {State} state The current state.
 */
function setMinutes(state) {
    is(state.minutes).between(0, 4).then(MF.between0and4)
    is(state.minutes).between(5, 9).then(MF.between5and9)
    is(state.minutes).between(10, 14).then(MF.between10and14)
    is(state.minutes).between(15, 19).then(MF.between15and19)
    is(state.minutes).between(20, 24).then(MF.between20and24)
    is(state.minutes).between(25, 29).then(MF.between25and29)
    is(state.minutes).between(30, 34).then(MF.between30and34)
    is(state.minutes).between(35, 39).then(MF.between35and39)
    is(state.minutes).between(40, 44).then(MF.between40and44)
    is(state.minutes).between(45, 49).then(MF.between45and49)
    is(state.minutes).between(50, 54).then(MF.between50and54)
    is(state.minutes).between(55, 59).then(MF.between55and59)
}

/**
 * Given the current time in the state object, this method sets the according LED pins for the hour. This method needs to run after setMinutes()!
 * 
 * @param {State} state The current state.
 */
function setHours(state) {
    let y = []

    if (state.hour === 0 || state.hour === 12 || state.hour === 24) { y = LL.zwoelf }
    if (state.hour === 1 || state.hour === 13) { if (state.minutes < 5) { y = LL.ein } else { y = LL.eins } }
    if (state.hour === 2 || state.hour === 14) { y = LL.zwei }
    if (state.hour === 3 || state.hour === 15) { y = LL.drei }
    if (state.hour === 4 || state.hour === 16) { y = LL.vier }
    if (state.hour === 5 || state.hour === 17) { y = LL.fuenf }
    if (state.hour === 6 || state.hour === 18) { y = LL.sechs }
    if (state.hour === 7 || state.hour === 19) { y = LL.sieben }
    if (state.hour === 8 || state.hour === 20) { y = LL.acht }
    if (state.hour === 9 || state.hour === 21) { y = LL.neun }
    if (state.hour === 10 || state.hour === 22) { y = LL.zehn }
    if (state.hour === 11 || state.hour === 23) { y = LL.elf }

    state.leds.push(y)
}

/**
 * Enables the LEDs for (state.minutes % 5)
 * 
 * @param {State} state 
 */
function setSmallMinutes(state) {
    switch (state.minutes % 5) {
        case 1: state.leds.push(LL.undEins); break;
        case 2: state.leds.push(LL.undZwei); break;
        case 3: state.leds.push(LL.undDrei); break;
        case 4: state.leds.push(LL.undVier); break;
        default: state.log.push("nothing")
    }
}

function setItIs(state) {
    if (
        (W.getItIsStrategy() === W.ItIsStrategies.IMMER) ||
        (W.getItIsStrategy() === W.ItIsStrategies.VOLLE_STUNDE && is(state.minutes).between(0, 4).then(() => true))
    ) {
        state.leds.push(LL.esIst)
    }
}

// exports
module.exports = {
    setHours, setMinutes, setSmallMinutes, setItIs
}
