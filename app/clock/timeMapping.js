const MF = require('./minutes'),
      leds = require('../../utils/leds')

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

function setHours(state) {
    let y = []

    if (state.hour === 0 || state.hour === 12 || state.hour === 24) { y = leds.pins.zwoelf }
    if (state.hour === 1 || state.hour === 13) { if (state.minutes < 5) { y = leds.pins.ein } else { y = leds.pins.eins } }
    if (state.hour === 2 || state.hour === 14) { y = leds.pins.zwei }
    if (state.hour === 3 || state.hour === 15) { y = leds.pins.drei }
    if (state.hour === 4 || state.hour === 16) { y = leds.pins.vier }
    if (state.hour === 5 || state.hour === 17) { y = leds.pins.fuenf }
    if (state.hour === 6 || state.hour === 18) { y = leds.pins.sechs }
    if (state.hour === 7 || state.hour === 19) { y = leds.pins.sieben }
    if (state.hour === 8 || state.hour === 20) { y = leds.pins.acht }
    if (state.hour === 9 || state.hour === 21) { y = leds.pins.neun }
    if (state.hour === 10 || state.hour === 22) { y = leds.pins.zehn }
    if (state.hour === 11 || state.hour === 23) { y = leds.pins.elf }

    state.leds.push(y)
}

function setSmallMinutes(state) {
    switch (state.minutes % 5) {
        case 1: state.leds.push(leds.pins.undEins); break;
        case 2: state.leds.push(leds.pins.undZwei); break;
        case 3: state.leds.push(leds.pins.undDrei); break;
        case 4: state.leds.push(leds.pins.undVier); break;
        default: state.log.push("nothing")
    }
}

module.exports = {
    setHours: setHours,
    setMinutes: setMinutes,
    setSmallMinutes: setSmallMinutes
}
