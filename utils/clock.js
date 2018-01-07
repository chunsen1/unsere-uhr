const leds = require('./utils/leds')

module.exports = () => {
    let date = new Date(Date.now())
    let minutes = date.getMinutes()
    let hour = date.getHours()

    let x = []
    let log = []

    leds.clear()

    // es ist
    x.push(leds.pins.esIst)

    if (minutes < 5) {
        // es ist ... uhr
	log.push("uhr")
        x.push(leds.pins.uhr)
    }

    if (minutes >= 5 && minutes < 10) {
        // es is 5 nach ...
	log.push("5", "nach")
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.nach)
    }

    if (minutes >= 10 && minutes < 15) {
        // es ist 10 nach ...
	log.push("10", "nach")
        x.push(leds.pins.mZehn)
        x.push(leds.pins.nach)
    }

    if (minutes >= 15 && minutes < 20) {
        // viertel ...+1
	log.push("viertel", "h+1")
        x.push(leds.pins.viertel)
        hour++
    }

    if (minutes >= 20 && minutes < 25) {
        // es ist zwanzig nach ...
	log.push("zwanzig", "nach")
        x.push(leds.pins.mZwanzig)
        x.push(leds.pins.nach)
    }

    if (minutes >= 25 && minutes < 30) {
        // es ist 5 vor halb ...+1
	log.push("fuenf", "vor", "halb", "h+1")
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.vor)
        x.push(leds.pins.halb)
        hour++
    }

    if (minutes >= 30 && minutes < 35) {
	log.push("halb", "h+1")
        x.push(leds.pins.halb)
        hour++
    }

    if (minutes >= 35 && minutes < 40) {
        // es ist 5 nach halb ...+1
	log.push("fünf", "nach", "halb", "h+1")
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.nach)
        x.push(leds.pins.halb)
        hour++
    }

    if (minutes >= 40 && minutes < 45) {
        // es ist 20 vor ...+1
	log.push("zwanzig", "vor", "h+1")
        x.push(leds.pins.mZwanzig)
        x.push(leds.pins.vor)
        hour++
    }

    if (minutes >= 45 && minutes < 50) {
        // es ist dreiviertel ...+1
	log.push("dreiviertel", "h+1")
        x.push(leds.pins.dreiviertel)
        hour++
    }

    if (minutes >= 50 && minutes < 55) {
        // es ist 10 vor ...+1
	log.push("zehn", "vor", "h+1")
        x.push(leds.pins.mZehn)
        x.push(leds.pins.vor)
        hour++
    }

    if (minutes >= 55) {
	log.push("fünf", "vor", "h+1")
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.vor)
        hour++
    }

    let y = []
    if (hour === 0 || hour === 12 || hour === 24) { y = leds.pins.zwoelf }
    if (hour === 1 || hour === 13) { if (minutes < 5) { y = leds.pins.ein } else { y = leds.pins.eins } }
    if (hour === 2 || hour === 14) { y = leds.pins.zwei }
    if (hour === 3 || hour === 15) { y = leds.pins.drei }
    if (hour === 4 || hour === 16) { y = leds.pins.vier }
    if (hour === 5 || hour === 17) { y = leds.pins.fuenf }
    if (hour === 6 || hour === 18) { y = leds.pins.sechs }
    if (hour === 7 || hour === 19) { y = leds.pins.sieben }
    if (hour === 8 || hour === 20) { y = leds.pins.acht }
    if (hour === 9 || hour === 21) { y = leds.pins.neun }
    if (hour === 10 || hour === 22) { y = leds.pins.zehn }
    if (hour === 11 || hour === 23) { y = leds.pins.elf }

    x.push(y)

    switch (minutes % 5) {
        case 1: x.push(leds.pins.undEins); break;
        case 2: x.push(leds.pins.undZwei); break;
        case 3: x.push(leds.pins.undDrei); break;
        case 4: x.push(leds.pins.undVier); break;
        default: log.push("nix")
    }

    leds.lightleds(x)
    leds.render()
}
